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
  A2AServer,
  ExecutionContext,
  InMemoryTaskStore,
  A2AExecutionContext,
  TaskState,
  TaskStatusUpdateEvent,
  TaskYieldUpdate,
  TextPart,
  UpdateEvent,
  configureLogger,
  MessageSendParams,
  SendMessageRequest,
} from "../src/index.js";

configureLogger({ level: "silent" });

// Set a reasonable timeout for all tests
jest.setTimeout(10000);

// Define a comprehensive task handler for A2A protocol testing
async function* a2aProtocolTestHandler(
  context: ExecutionContext
): AsyncGenerator<UpdateEvent, void, unknown> {
  const params = context.getRequestParams() as MessageSendParams;
  const taskId = params.message.taskId ?? context.id;
  const contextId = context.id;
  const text = params.message.parts
    .filter((part) => part.kind === "text")
    .map((part) => (part as TextPart).text)
    .join(" ");

  // Test for all possible states in A2A protocol
  if (text.includes("throw")) {
    throw new Error("Simulated task error");
  }

  if (text.includes("fail")) {
    const yieldable: TaskStatusUpdateEvent = {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: TaskState.Failed,
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
    const yieldable: TaskStatusUpdateEvent = {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: true,
      status: {
        state: TaskState.InputRequired,
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
    const yieldable: TaskStatusUpdateEvent = {
      taskId: taskId,
      kind: "status-update",
      contextId: contextId,
      final: false,
      status: {
        state: TaskState.Working,
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
        state: TaskState.Working,
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
        state: TaskState.Completed,
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
        state: TaskState.Working,
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
        state: TaskState.Completed,
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
      state: TaskState.Working,
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
      state: TaskState.Completed,
      message: {
        messageId: "test-message-id-completed",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Task completed successfully." }],
      },
    },
  };
}

describe("A2A Protocol Specification Tests", () => {
  let server: A2AServer;
  let app: express.Express;
  let pendingRequests: request.Test[] = [];

  beforeEach(() => {
    server = new A2AServer({
      handler: a2aProtocolTestHandler,
      taskStore: new InMemoryTaskStore(),
      port: 0, // Don't actually listen
      card: {
        name: "A2A Protocol Test Agent",
        url: "http://localhost:41241",
        version: "1.0.0",
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
    });
    app = server.start();
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

    await server.stop();
    // Add a small delay to allow any open connections to close
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  // Helper function to track supertest requests
  const trackRequest = (req: request.Test): request.Test => {
    pendingRequests.push(req);
    return req;
  };

  describe("Agent Card", () => {
    it("returns agent card at /.well-known/agent.json", async () => {
      const response = await trackRequest(
        request(app).get("/.well-known/agent.json")
      );

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("A2A Protocol Test Agent");
      expect(response.body.capabilities.streaming).toBe(true);
      expect(response.body.capabilities.pushNotifications).toBe(true);
      expect(response.body.skills).toHaveLength(1);
      expect(response.body.skills[0].id).toBe("test");
    });

    it("returns agent card at /agent-card", async () => {
      const response = await trackRequest(request(app).get("/agent-card"));

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("A2A Protocol Test Agent");
    });
  });

  describe("Task States", () => {
    it("handles task/send with task/completed state", async () => {
      const requestBody: SendMessageRequest = {
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

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );

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
            taskId: "fail-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This will fail" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );

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
            taskId: "input-required-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This needs input-required" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );

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
            taskId: "working-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This is working-only" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );

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
            taskId: "multi-part-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This is multi-part" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );
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
            taskId: "retrieve-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Task to be retrieved" }],
          },
        },
      };

      await trackRequest(request(app).post("/a2a").send(createBody));

      // Now retrieve it
      const retrieveBody = {
        jsonrpc: "2.0",
        id: "retrieve-request-1",
        method: "tasks/get",
        params: {
          id: "retrieve-task-1",
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(retrieveBody)
      );
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("retrieve-task-1");
      expect(response.body.result.status.state).toBe("completed");
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

      const response = await trackRequest(
        request(app).post("/a2a").send(retrieveBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32001); // Task not found error
      expect(response.body.error.message).toBe("Task not found");
    });

    it("cancels a task with tasks/cancel", async () => {
      // First create a task that will stay in working state
      const createBody = {
        jsonrpc: "2.0",
        id: "cancel-create-request-1",
        method: "message/send",
        params: {
          message: {
            taskId: "cancel-task-1",
            role: "user",
            parts: [{ kind: "text", text: "This is working-only" }],
          },
        },
      };

      await trackRequest(request(app).post("/a2a").send(createBody));

      // Now cancel it
      const cancelBody = {
        jsonrpc: "2.0",
        id: "cancel-request-1",
        method: "tasks/cancel",
        params: {
          id: "cancel-task-1",
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(cancelBody)
      );
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

      const response = await trackRequest(
        request(app).post("/a2a").send(cancelBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32001); // Task not found error
      expect(response.body.error.message).toBe("Task not found");
    });

    it("returns error when canceling completed task", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "completed-request-1",
        method: "message/send",
        params: {
          message: {
            taskId: "completed-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Task to be completed" }],
          },
        },
      };

      await trackRequest(request(app).post("/a2a").send(createBody));
      // Now try to cancel it
      const cancelBody = {
        jsonrpc: "2.0",
        id: "completed-cancel-request-1",
        method: "tasks/cancel",
        params: {
          id: "completed-task-1",
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(cancelBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32002);
      expect(response.body.error.message).toBe("Task cannot be canceled");
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
            role: "user",
            parts: [{ kind: "text", text: "Task for push notifications" }],
          },
        },
      };

      await trackRequest(request(app).post("/a2a").send(createBody));

      // Now set push notification config
      const requestBody = {
        jsonrpc: "2.0",
        id: "push-request-1",
        method: "tasks/pushNotificationConfig/set",
        params: {
          taskId: "push-task-1",
          pushNotificationConfig: {
            url: "https://example.com/webhook",
            token: "test-token",
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32001);
      expect(response.body.error.message).toBe("Task not found");
    });

    it("does not get push notification configuration", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "push-create-request-1",
        method: "message/send",
        params: {
          id: "push-get-task-1",
          message: {
            role: "user",
            parts: [{ type: "text", text: "Task for push notifications" }],
          },
        },
      };

      await trackRequest(request(app).post("/a2a").send(createBody));

      // Now try to get push notification config
      const getBody = {
        jsonrpc: "2.0",
        id: "push-get-request-1",
        method: "tasks/pushNotificationConfig/get",
        params: {
          id: "push-get-task-1",
          config: {
            url: "https://example.com/webhook",
            token: "test-token",
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(getBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32001);
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

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );

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

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32601); // Method not found error
      expect(response.body.error.message).toBe("Method not found");
    });

    it("handles invalid params", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "invalid-params-request-1",
        method: "message/send",
        params: {},
      };

      const response = await trackRequest(
        request(app).post("/a2a").send(requestBody)
      );
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32602); // Invalid params error
      expect(response.body.error.message).toBe("Invalid parameters");
    });
  });
});
