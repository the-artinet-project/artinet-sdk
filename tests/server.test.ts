import {
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
  jest,
} from "@jest/globals";
import express from "express";
import request from "supertest";
import {
  A2A,
  ExpressAgentServer,
  createAgentServer,
  AgentEngine,
} from "../src/index.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "./utils/info.js";
import { configure } from "../src/config/index.js";
// import { configurePino } from "../src/extensions/pino.js";
// import pino from "pino";
// import pinoCaller from "pino-caller";
// configure({
//   logger: configurePino(
//     pinoCaller(
//       pino({
//         level: "info",
//         transport: {
//           target: "pino-pretty",
//           options: { colorize: true },
//         },
//       })
//     )
//   ),
// });
jest.setTimeout(10000);
// Define test task handler
const basicTaskHandler: AgentEngine = async function* (context: A2A.Context) {
  const message = context.userMessage;
  const taskId = message.taskId ?? "";
  const contextId = message.contextId ?? "";
  // Check if task already has status, if not, use "working"
  const workingUpdate: A2A.TaskStatusUpdateEvent = {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: A2A.TaskState.working,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Working on it..." }],
      },
    },
    final: false,
  };
  yield workingUpdate;
  // Simulate some work
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Check for cancellation
  // if (context.isCancelled()) {
  //   yield {
  //     taskId: taskId,
  //     contextId: contextId,
  //     kind: "status-update",
  //     status: { state: TaskState.canceled },
  //     final: true,
  //   };
  //   return;
  // }
  // Generate a result artifact
  const artifactUpdate: A2A.TaskArtifactUpdateEvent = {
    taskId: taskId,
    contextId: contextId,
    kind: A2A.Kind["artifact-update"],
    artifact: {
      artifactId: "test-artifact-id",
      name: "result.txt",
      parts: [
        {
          kind: "text",
          text: `Task ${contextId} completed successfully.`,
        },
      ],
    },
    lastChunk: true,
  };
  yield artifactUpdate;
  // Final completion status
  yield {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: A2A.TaskState.completed,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Task completed successfully!" }],
      },
    },
    final: true,
  };
};

describe("A2AServer", () => {
  let server: ExpressAgentServer;
  let app: express.Express;
  // Track any pending requests for cleanup
  let pendingRequests: request.Test[] = [];

  beforeEach(() => {
    server = createAgentServer({
      agent: { engine: basicTaskHandler, agentCard: defaultAgentCard },
      agentCardPath: "/.well-known/agent.json",
    });
    app = server.app;
    app.get("/agent-card", (req, res) => {
      res.json(defaultAgentCard);
    });
    pendingRequests = [];
  });

  afterEach(async () => {
    // Ensure all pending requests are completed
    await Promise.all(
      pendingRequests.map((req) => {
        try {
          return req;
        } catch (e) {
          // Ignore errors during cleanup
          return null;
        }
      })
    );
  });

  // Helper function to track supertest requests
  const trackRequest = (req: request.Test): request.Test => {
    pendingRequests.push(req);
    return req;
  };

  describe("Agent Card", () => {
    it("serves agent card at /.well-known/agent.json", async () => {
      const response = await trackRequest(
        request(app).get("/.well-known/agent.json")
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("capabilities");
    });

    it("serves agent card at /agent-card", async () => {
      const response = await trackRequest(request(app).get("/agent-card"));
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("capabilities");
    });
  });

  describe("message/send", () => {
    it.skip("handles a valid task send request", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "test-request-1",
        method: "message/send",
        params: {
          message: {
            kind: "message",
            messageId: "test-message-id",
            taskId: "test-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Hello, world!" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.jsonrpc).toBe("2.0");
      expect(response.body.id).toBe("test-request-1");
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("test-task-1");
      expect(response.body.result.status.state).toBe("completed");
      expect(response.body.result.artifacts).toHaveLength(1);
      expect(response.body.result.artifacts[0].name).toBe("result.txt");
    });

    it("returns an error for invalid request format", async () => {
      const invalidRequest = {
        // Missing required jsonrpc field
        id: "invalid-req",
        method: "message/send",
        params: {
          id: "task-id",
          message: {
            role: "user",
            parts: [{ kind: "text", text: "Test" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(invalidRequest)
      );
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeInvalidRequest);
      expect(response.body.error.message).toBe("Invalid JSON-RPC Request.");
    });
  });

  describe("tasks/get", () => {
    it("retrieves a task after it has been created", async () => {
      // First create a task
      const createRequest: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "create-req",
        method: "message/send",
        params: {
          message: {
            messageId: "test-message-id",
            kind: "message",
            taskId: "retrieve-task",
            role: "user",
            parts: [{ kind: "text", text: "Task to retrieve" }],
          },
        },
      };

      const createResponse = await trackRequest(
        request(app).post("/").send(createRequest)
      );

      // Now try to retrieve it
      const getRequest: A2A.GetTaskRequest = {
        jsonrpc: "2.0",
        id: "get-req",
        method: "tasks/get",
        params: {
          id: "retrieve-task",
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(getRequest)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("retrieve-task");
      expect(response.body.result.status.state).toBe("completed");
    });

    it("returns an error for non-existent task", async () => {
      const getRequest = {
        jsonrpc: "2.0",
        id: "nonexistent-req",
        method: "tasks/get",
        params: {
          id: "nonexistent-task",
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(getRequest)
      );
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeTaskNotFound);
      expect(response.body.error.message).toBe("Task not found");
    });
  });

  describe("tasks/cancel", () => {
    it("successfully cancels a task", async () => {
      // First create a task
      const createRequest: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "create-cancel-req",
        method: "message/send",
        params: {
          message: {
            messageId: "test-message-id",
            kind: "message",
            taskId: "cancel-task",
            role: "user",
            parts: [{ kind: "text", text: "Task to cancel" }],
          },
        },
      };

      await trackRequest(request(app).post("/").send(createRequest));

      // Now try to cancel it (note: the task may complete before cancellation in this test)
      const cancelRequest: A2A.CancelTaskRequest = {
        jsonrpc: "2.0",
        id: "cancel-req",
        method: "tasks/cancel",
        params: {
          id: "cancel-task",
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(cancelRequest)
      );

      // It's possible the task completes before we can cancel it,
      // in which case we'll get a "task not cancelable" error,
      // but that's also a valid test result
      if (response.body.error) {
        expect(response.body.error.code).toBe(A2A.ErrorCodeTaskNotCancelable);
        expect(response.body.error.message).toBe("Task cannot be canceled");
      } else {
        expect(response.status).toBe(200);
        expect(response.body.result).toBeDefined();
        expect(response.body.result.id).toBe("cancel-task");
        expect(response.body.result.status.state).toBe("canceled");
      }
    });
  });

  describe("Method not found", () => {
    it("returns a method not found error for unknown methods", async () => {
      const unknownMethodRequest = {
        jsonrpc: "2.0",
        id: "unknown-method-req",
        method: "unknown/method",
        params: {},
      };

      const response = await trackRequest(
        request(app).post("/").send(unknownMethodRequest)
      );
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeMethodNotFound);
      expect(response.body.error.message).toBe(
        "Method not found: unknown/method"
      );
    });
  });
});
