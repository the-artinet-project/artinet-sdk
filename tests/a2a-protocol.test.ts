import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import express from "express";
import request from "supertest";
import { ExpressAgentServer, createAgentServer } from "../src/server/index.js";
import { A2A, AgentEngine, getParts } from "../src/index.js";
import { applyDefaults } from "../src/config/default.js";
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
// import { A2AError } from "@a2a-js/sdk/server";
// With options
// applyDefaults();
jest.setTimeout(10000);

// Define a comprehensive task handler for A2A protocol testing
const protocolEngine: AgentEngine = async function* (
  context: A2A.Context
): AsyncGenerator<A2A.Update, void, unknown> {
  const message: A2A.Message = context.userMessage;
  const taskId = context.taskId;
  const contextId = context.contextId;
  const { text } = getParts(message.parts);

  const task = context.getTask();
  // Test for all possible states in A2A protocol
  if (text.includes("throw")) {
    throw new Error("Simulated task error");
  }

  if (text.includes("fail")) {
    const yieldable: A2A.TaskStatusUpdateEvent = {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: A2A.TaskState.failed,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Task failed intentionally." }],
        },
      },
    };
    yield yieldable;
    return;
  }

  if (text.includes("input-required")) {
    const yieldable: A2A.TaskStatusUpdateEvent = {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: A2A.TaskState["input-required"],
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "need more information" }],
        },
      },
    };

    yield yieldable;
    return;
  }

  if (text.includes("working-only")) {
    const yieldable: A2A.TaskStatusUpdateEvent = {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: false,
      status: {
        state: A2A.TaskState.working,
        message: {
          messageId: "test-message-id-working-only",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Still working..." }],
        },
      },
    };

    yield yieldable;
    return;
  }
  if (text.includes("multi-part")) {
    yield {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: A2A.TaskState.working,
        message: {
          messageId: "test-message-id-multi-part",
          kind: "message",
          role: "agent",
          parts: [
            { kind: "text", text: "First part" },
            { kind: "data", data: { key: "value" } },
          ],
        },
      },
    };

    yield {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: A2A.TaskState.completed,
        message: {
          messageId: "test-message-id-multi-part",
          kind: "message",
          role: "agent",
          parts: [
            { kind: "text", text: "Task completed with multiple part types." },
            {
              kind: "file",
              file: {
                name: "test.txt",
                mimeType: "text/plain",
                bytes: Buffer.from("test content").toString("base64"),
              },
            },
          ],
        },
      },
    };
    return;
  }

  if (text.includes("streaming")) {
    yield {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: false,
      status: {
        state: A2A.TaskState.working,
        message: {
          messageId: "test-message-id-streaming",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Working..." }],
        },
      },
    };

    yield {
      taskId: taskId,
      kind: "artifact-update",
      contextId: contextId,
      artifact: {
        artifactId: "test-artifact-id",
        name: "partial-artifact",
        parts: [{ kind: "text", text: "Partial " }],
      },
    };

    yield {
      taskId: taskId,
      kind: "artifact-update",
      contextId: contextId,
      artifact: {
        artifactId: "test-artifact-id",
        name: "partial-artifact",
        parts: [{ kind: "text", text: "Partial " }],
      },
      append: true,
      lastChunk: true,
    };

    yield {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: A2A.TaskState.completed,
        message: {
          messageId: "test-message-id-streaming-completed",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Streaming completed!" }],
        },
      },
    };
    return;
  }

  // Default case - normal processing
  yield {
    taskId: taskId,
    kind: "status-update",
    contextId: contextId,
    final: false,
    status: {
      state: A2A.TaskState.working,
      message: {
        messageId: "test-message-id-working",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Working..." }],
      },
    },
  };

  yield {
    taskId: taskId,
    kind: "status-update",
    contextId: contextId,
    final: true,
    status: {
      state: A2A.TaskState.completed,
      message: {
        messageId: "test-message-id-completed",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Task completed successfully." }],
      },
    },
  };
};
describe("A2A Protocol Specification Tests", () => {
  let server: ExpressAgentServer;
  let app: express.Express;
  let pendingRequests: request.Test[] = [];

  beforeEach(async () => {
    const agentServer: ExpressAgentServer = await createAgentServer({
      agentCardPath: "/.well-known/agent-card.json",
      agent: {
        engine: protocolEngine,
        agentCard: {
          name: "A2A Protocol Test Agent",
          url: "http://localhost:41241",
          version: "1.0.0",
          protocolVersion: "0.3.0",
          description: "A2A Protocol Test Agent",
          defaultInputModes: ["text"],
          defaultOutputModes: ["text"],
          capabilities: {
            streaming: true,
            pushNotifications: true,
            stateTransitionHistory: true,
          },
          skills: [
            {
              id: "test",
              name: "test",
              description: "Test Skill Description",
              tags: ["test", "skill"],
            },
          ],
        },
        enforceParamValidation: true,
      },
    });
    app = agentServer.app;
    server = agentServer;
    pendingRequests = [];
  });

  describe("Agent Card", () => {
    it("returns agent card at /.well-known/agent-card.json", async () => {
      const response = await request(app).get("/.well-known/agent-card.json");

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("A2A Protocol Test Agent");
      expect(response.body.capabilities.streaming).toBe(true);
      expect(response.body.capabilities.pushNotifications).toBe(true);
      expect(response.body.skills).toHaveLength(1);
      expect(response.body.skills[0].id).toBe("test");
    });
  });

  describe("Task States", () => {
    it("handles task/send with task/completed state", async () => {
      const requestBody: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "test-request-1",
        method: "message/send",
        params: {
          message: {
            messageId: "test-message-id",
            kind: "message",
            taskId: "test-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Basic test" }],
          },
        },
      };

      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("test-task-1");
      expect(response.body.result.status.state).toBe("completed");
      expect(response.body.result.status.message.parts[0].text).toBe(
        "Task completed successfully."
      );
    });

    it("handles task/send with task/failed state", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "fail-request-1",
        method: "message/send",
        params: {
          id: "fail-task-1",
          message: {
            kind: "message",
            messageId: "fail-message-id-1",
            taskId: "fail-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This will fail" }],
          },
        },
      };

      const response = await request(app).post("/").send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("fail-task-1");
      expect(response.body.result.status.state).toBe("failed");
      expect(response.body.result.status.message.parts[0].text).toBe(
        "Task failed intentionally."
      );
    });

    it("handles task/send with input-required state", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "input-required-request-1",
        method: "message/send",
        params: {
          message: {
            kind: "message",
            messageId: "input-required-message-id-1",
            taskId: "input-required-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This needs input-required" }],
          },
        },
      };

      const response = await request(app).post("/").send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("input-required-task-1");
      expect(response.body.result.status.state).toBe("input-required");
      expect(response.body.result.status.message.parts[0].text).toContain(
        "need more information"
      );
    });

    it("handles task/send with working state", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "working-request-1",
        method: "message/send",
        params: {
          id: "working-task-1",
          message: {
            kind: "message",
            messageId: "working-message-id-1",
            taskId: "working-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This is working-only" }],
          },
        },
      };
      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("working-task-1");
      expect(response.body.result.status.state).toBe("working");
      expect(response.body.result.status.message.parts[0].text).toContain(
        "Still working..."
      );
    });
  });

  describe("Message and Artifact Types", () => {
    it("handles multiple part types and artifacts", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "multi-part-request-1",
        method: "message/send",
        params: {
          id: "multi-part-task-1",
          message: {
            kind: "message",
            messageId: "multi-part-message-id-1",
            taskId: "multi-part-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This is multi-part" }],
          },
        },
      };

      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("multi-part-task-1");
      expect(response.body.result.status.state).toBe("completed");

      // Check multiple parts in message
      expect(response.body.result.status.message.parts).toHaveLength(2);
      expect(response.body.result.status.message.parts[0].kind).toBe("text");
      expect(response.body.result.status.message.parts[1].kind).toBe("file");
      expect(response.body.result.status.message.parts[1].file.name).toBe(
        "test.txt"
      );

      // Check artifacts only if present (implementation may vary)
      if (response.body.result.artifacts) {
        expect(response.body.result.artifacts).toHaveLength(1);
        expect(response.body.result.artifacts[0].name).toBe("test-artifact");
        expect(response.body.result.artifacts[0].description).toBe(
          "Test artifact description"
        );
        expect(response.body.result.artifacts[0].parts[0].text).toBe(
          "Artifact content"
        );
        expect(response.body.result.artifacts[0].metadata.testKey).toBe(
          "testValue"
        );
      }
    });
  });

  describe("Task Management", () => {
    it("retrieves task with tasks/get", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "create-request-1",
        method: "message/send",
        params: {
          id: "retrieve-task-1",
          message: {
            kind: "message",
            messageId: "retrieve-message-id-1",
            taskId: "retrieve-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Task to be retrieved" }],
          },
          configuration: {
            blocking: true,
          },
        },
      };

      const createResponse = await request(app).post("/").send(createBody);

      // Now retrieve it
      const retrieveBody = {
        jsonrpc: "2.0",
        id: "retrieve-request-1",
        method: "tasks/get",
        params: {
          id: "retrieve-task-1",
        },
      };

      const response = await request(app).post("/").send(retrieveBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("retrieve-task-1");
      expect(response.body.result.status.state).toBe(A2A.TaskState.completed);
    });

    it("returns error for non-existent task", async () => {
      const retrieveBody = {
        jsonrpc: "2.0",
        id: "nonexistent-request-1",
        method: "tasks/get",
        params: {
          id: "nonexistent-task-1",
        },
      };

      const response = await request(app).post("/").send(retrieveBody);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeTaskNotFound); // Task not found error
      expect(response.body.error.message).toContain("Task not found");
    });

    it("cancels a task with tasks/cancel", async () => {
      // First create a task that will stay in working state
      const createBody = {
        jsonrpc: "2.0",
        id: "cancel-create-request-1",
        method: "message/send",
        params: {
          message: {
            kind: "message",
            messageId: "cancel-message-id-1",
            taskId: "cancel-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This is working-only" }],
          },
        },
      };

      await request(app).post("/").send(createBody);

      // Now cancel it
      const cancelBody = {
        jsonrpc: "2.0",
        id: "cancel-request-1",
        method: "tasks/cancel",
        params: {
          id: "cancel-task-1",
        },
      };

      const response = await request(app).post("/").send(cancelBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("cancel-task-1");
      expect(response.body.result.status.state).toBe("canceled");
    });

    it("returns error when canceling non-existent task", async () => {
      const cancelBody = {
        jsonrpc: "2.0",
        id: "nonexistent-cancel-request-1",
        method: "tasks/cancel",
        params: {
          id: "nonexistent-task-1",
        },
      };

      const response = await request(app).post("/").send(cancelBody);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeTaskNotFound); // Task not found error
      expect(response.body.error.message).toContain("Task not found");
    });

    it("returns error when canceling completed task", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "completed-request-1",
        method: "message/send",
        params: {
          message: {
            kind: "message",
            messageId: "completed-message-id-1",
            taskId: "completed-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Task to be completed" }],
          },
          configuration: {
            blocking: false,
          },
        },
      };

      const createResponse = await request(app).post("/").send(createBody);
      // Now try to cancel it
      const cancelBody = {
        jsonrpc: "2.0",
        id: "completed-cancel-request-1",
        method: "tasks/cancel",
        params: {
          id: "completed-task-1",
        },
      };

      const response = await request(app).post("/").send(cancelBody);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeTaskNotCancelable);
      expect(response.body.error.message).toContain("Task cannot be canceled");
    });
  });

  describe("Push Notification API", () => {
    it("sets push notification configuration", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "push-create-request-1",
        method: "message/send",
        params: {
          id: "push-task-1",
          message: {
            kind: "message",
            messageId: "push-create-message-id-1",
            role: "user",
            parts: [{ kind: "text", text: "Task for push notifications" }],
          },
        },
      };

      const rep = await request(app).post("/").send(createBody);
      const taskId = rep.body.result.id;
      // Now set push notification config
      const requestBody = {
        jsonrpc: "2.0",
        id: "push-request-1",
        method: "tasks/pushNotificationConfig/set",
        params: {
          taskId: taskId,
          pushNotificationConfig: {
            url: "https://example.com/webhook",
            token: "test-token",
          },
        },
      };

      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.taskId).toBe(taskId);
      expect(response.body.result.pushNotificationConfig.url).toBe(
        "https://example.com/webhook"
      );
      expect(response.body.result.pushNotificationConfig.token).toBe(
        "test-token"
      );
    });

    it("does get push notification configuration", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "push-create-request-1",
        method: "message/send",
        params: {
          id: "push-get-task-1",
          message: {
            kind: "message",
            messageId: "push-get-message-id-1",
            role: "user",
            parts: [{ kind: "text", text: "Task for push notifications" }],
          },
          configuration: {
            blocking: true,
            pushNotificationConfig: {
              id: "push-notification-config-1",
              url: "https://example.com/webhook",
              token: "test-token",
            },
          },
        },
      };

      const rep = await request(app).post("/").send(createBody);
      const taskId = rep.body.result.id;

      // Now try to get push notification config
      const getBody = {
        jsonrpc: "2.0",
        id: "push-get-request-1",
        method: "tasks/pushNotificationConfig/get",
        params: {
          id: taskId,
          pushNotificationConfigId: "push-notification-config-1",
        },
      };

      const response = await request(app).post("/").send(getBody);
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.taskId).toBe(taskId);
      expect(response.body.result.pushNotificationConfig.url).toBe(
        "https://example.com/webhook"
      );
      expect(response.body.result.pushNotificationConfig.token).toBe(
        "test-token"
      );
    });

    it("returns error when setting push notification for non-existent task", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "nonexistent-push-request-1",
        method: "tasks/pushNotificationConfig/set",
        params: {
          taskId: "nonexistent-task-1",
          pushNotificationConfig: {
            url: "https://example.com/webhook",
          },
        },
      };

      const response = await request(app).post("/").send(requestBody);

      expect(response.status).toBe(200);

      // The implementation might return either a task not found error
      // or a method not found error if push notifications aren't implemented
      expect(response.body.error).toBeDefined();
      expect([-32001, -32601, -32003]).toContain(response.body.error.code);
    });
  });

  describe("Invalid Method Handling", () => {
    it("handles non-existent method", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "invalid-method-request-1",
        method: "invalid/method",
        params: {
          id: "invalid-method-task-1",
        },
      };

      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeMethodNotFound); // Method not found error
      expect(response.body.error.message).toBe(
        "Method not found: invalid/method"
      );
    });

    it("handles invalid params", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "invalid-params-request-1",
        method: "message/send",
        params: {},
      };
      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(A2A.ErrorCodeInvalidParams); // Invalid params error
      expect(response.body.error.message).toBe("Params Required");
    });
  });
});
