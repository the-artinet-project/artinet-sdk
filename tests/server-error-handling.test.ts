import {
  jest,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import express from "express";
import request from "supertest";
import {
  A2A,
  ExpressAgentServer,
  createAgentServer,
  getParts,
  AgentEngine,
} from "../src/index.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "./utils/info.js";
// Set a reasonable timeout for all tests
jest.setTimeout(10000);
// applyDefaults();
const errorProneEngine: AgentEngine = async function* (context: A2A.Context) {
  const message = context.userMessage;
  const taskId = message.taskId ?? "";
  const contextId = message.contextId ?? "";
  const { text } = getParts(message.parts);

  // If the message contains "throw", we'll simulate an error
  if (text.includes("throw")) {
    throw new Error("Simulated task error");
  }

  // If the message contains "fail", we'll yield a failed state
  if (text.includes("fail")) {
    yield {
      taskId: taskId,
      contextId: contextId,
      kind: "status-update",
      status: {
        state: A2A.TaskState.failed,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Task failed intentionally." }],
        } as A2A.Message,
      },
      final: true,
    };
    return;
  }

  // Otherwise, normal processing
  yield {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: A2A.TaskState.working,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Working..." }],
      },
    },
    final: false,
  };

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
        parts: [{ kind: "text", text: "Task completed successfully." }],
      },
    },
    final: true,
  };
  return;
};

describe("A2AServer Error Handling", () => {
  let server: ExpressAgentServer;
  let app: express.Express;
  let pendingRequests: request.Test[] = [];

  beforeEach(() => {
    server = createAgentServer({
      agent: { engine: errorProneEngine, agentCard: defaultAgentCard },
    });
    app = server.app;
    pendingRequests = [];
  });

  // Helper function to track supertest requests
  const trackRequest = (req: request.Test): request.Test => {
    pendingRequests.push(req);
    return req;
  };

  describe("Task Handler Errors", () => {
    it("handles exceptions thrown by task handler", async () => {
      const requestBody: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "error-request-1",
        method: "message/send",
        params: {
          message: {
            messageId: "error-message-id",
            kind: "message",
            taskId: "error-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This will throw an error" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(requestBody)
      );

      // The server should handle the error and return a failed task
      expect(response.status).toBe(200);
      // When the task handler throws, the server should return an error in the response
      // or a task with failed state
      if (response.body.result) {
        expect(response.body.result.id).toBe("error-task-1");
        expect(response.body.result.status.state).toBe("failed");
      } else if (response.body.error) {
        // Or it might return an internal error
        expect(response.body.error).toBeDefined();
        expect(response.body.error.code).toBe(A2A.ErrorCodeInternalError); // Internal error
        expect(response.body.error.message).toBe("Simulated task error");
      }
    });

    it("correctly handles task failed state", async () => {
      const requestBody: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "fail-request-1",
        method: "message/send",
        params: {
          message: {
            messageId: "fail-message-id",
            kind: "message",
            taskId: "fail-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This will fail" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("fail-task-1");
      expect(response.body.result.status.state).toBe("failed");
      expect(response.body.result.status.message).toBeDefined();
      expect(response.body.result.status.message.parts[0].text).toBe(
        "Task failed intentionally."
      );
    });
  });

  describe("Invalid JSON-RPC Request Handling", () => {
    it("handles invalid JSON in request body", async () => {
      const response = await trackRequest(
        request(app)
          .post("/")
          .set("Content-Type", "application/json")
          .send("this is not valid json")
      );
      // The server might return either a 400 Bad Request or 200 with JSON-RPC error
      expect([400, 200].includes(response.status)).toBe(true);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32700); // JSON parse error
      expect(response.body.error.message).toContain("Invalid JSON payload");
    });

    it("returns error for empty request body", async () => {
      const response = await trackRequest(
        request(app).post("/").set("Content-Type", "application/json").send("")
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      // Should be parse error or invalid request
      expect([-32700, -32600].includes(response.body.error.code)).toBe(true);
    });

    it("returns error when request body is not an object", async () => {
      const response = await trackRequest(request(app).post("/").send("42"));
      // The server might return various status codes for invalid content types
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect([-32700, -32600].includes(response.body.error.code)).toBe(true);
    });
  });

  describe("Content Type Handling", () => {
    it("accepts JSON-RPC requests with application/json content type", async () => {
      const requestBody: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "content-type-test",
        method: "message/send",
        params: {
          message: {
            messageId: "content-type-message-id",
            kind: "message",
            taskId: "content-type-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Testing content type" }],
          },
        },
      };

      const response = await trackRequest(
        request(app)
          .post("/")
          .set("Content-Type", "application/json")
          .send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("content-type-task-1");
    });

    it("accepts JSON-RPC requests with application/json; charset=utf-8", async () => {
      const requestBody: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "charset-test",
        method: "message/send",
        params: {
          message: {
            messageId: "charset-message-id",
            kind: "message",
            taskId: "charset-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Testing charset" }],
          },
        },
      };

      const response = await trackRequest(
        request(app)
          .post("/")
          .set("Content-Type", "application/json; charset=utf-8")
          .send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("charset-task-1");
    });
  });
});
