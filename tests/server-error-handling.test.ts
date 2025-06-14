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
  Message,
  MessageSendParams,
  TaskContext,
  TaskState,
  UpdateEvent,
  configureLogger,
} from "../src/index.js";

// Set a reasonable timeout for all tests
jest.setTimeout(10000);
configureLogger({ level: "silent" });

// Define an error-prone task handler for testing
async function* errorProneTaskHandler(
  context: ExecutionContext
): AsyncGenerator<UpdateEvent, void, unknown> {
  const params = context.getRequestParams() as MessageSendParams;
  const taskId = params.message.taskId ?? context.id;
  const contextId = context.id;
  const text = params.message.parts
    .filter((part) => part.kind === "text")
    .map((part) => (part as any).text)
    .join(" ");

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
        state: TaskState.Failed,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Task failed intentionally." }],
        } as Message,
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
      state: TaskState.Working,
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
      state: TaskState.Completed,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Task completed successfully." }],
      },
    },
    final: true,
  };
}

describe("A2AServer Error Handling", () => {
  let server: A2AServer;
  let app: express.Express;
  let pendingRequests: request.Test[] = [];

  beforeEach(() => {
    server = new A2AServer({
      handler: errorProneTaskHandler,
      taskStore: new InMemoryTaskStore(),
      port: 0, // Don't actually listen
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

  describe("Task Handler Errors", () => {
    it("handles exceptions thrown by task handler", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "error-request-1",
        method: "message/send",
        params: {
          message: {
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
        expect(response.body.error.code).toBe(-32603); // Internal error
        expect(response.body.error.message).toBe("Internal error");
      }
    });

    it("correctly handles task failed state", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "fail-request-1",
        method: "message/send",
        params: {
          message: {
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
    it.skip("handles invalid JSON in request body", async () => {
      const response = await trackRequest(
        request(app)
          .post("/")
          .set("Content-Type", "application/json")
          .send("this is not valid json")
      );

      // The server might return either a 400 Bad Request or 200 with JSON-RPC error

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32700); // JSON parse error
      expect(response.body.error.message).toBe("Invalid JSON payload");
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

    it.skip("returns error when request body is not an object", async () => {
      const response = await trackRequest(request(app).post("/").send("42"));

      // The server might return various status codes for invalid content types
      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect([-32700, -32600].includes(response.body.error.code)).toBe(true);
    });
  });

  describe("Content Type Handling", () => {
    it("accepts JSON-RPC requests with application/json content type", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "content-type-test",
        method: "message/send",
        params: {
          message: {
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
      const requestBody = {
        jsonrpc: "2.0",
        id: "charset-test",
        method: "message/send",
        params: {
          message: {
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
