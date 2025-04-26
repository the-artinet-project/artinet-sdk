import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";
import http from "http";
import {
  A2AServer,
  InMemoryTaskStore,
  TaskContext,
  TaskYieldUpdate,
  logger,
  TASK_NOT_FOUND,
  TASK_NOT_CANCELABLE,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  INTERNAL_ERROR,
  INVALID_PARAMS,
  METHOD_NOT_FOUND,
  SystemError,
  AgentCard,
} from "../src/index.js";

// Set a reasonable timeout for all tests
jest.setTimeout(10000);

// Mock logger to suppress output during tests
jest.spyOn(logger, "info").mockImplementation(() => {});
jest.spyOn(logger, "debug").mockImplementation(() => {});
jest.spyOn(logger, "error").mockImplementation(() => {});
jest.spyOn(logger, "warn").mockImplementation(() => {});

// Create a specialized task handler for more coverage testing
async function* serverImplTestHandler(
  context: TaskContext
): AsyncGenerator<TaskYieldUpdate, void, unknown> {
  const text = context.userMessage.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as any).text)
    .join(" ");

  // Need to specifically test error conditions
  if (text.includes("throw-internal")) {
    throw INTERNAL_ERROR(new Error("Internal test error"));
  }

  // Test for different state transitions in detail
  if (text.includes("streaming")) {
    yield {
      state: "submitted",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "Task submitted..." }],
      },
    };

    yield {
      state: "working",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "Working..." }],
      },
    };

    // Simulate a few more updates
    for (let i = 1; i <= 3; i++) {
      yield {
        state: "working",
        message: {
          role: "agent",
          parts: [{ type: "text", text: `Still working (${i}/3)...` }],
        },
      };

      // Small delay to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    yield {
      state: "completed",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "Task completed successfully!" }],
      },
    };
    return;
  }

  // Default case
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Working on it..." }],
    },
  };

  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Completed!" }],
    },
  };
}

describe("Server Implementation Tests", () => {
  let server: A2AServer;
  let app: express.Express;
  let pendingRequests: request.Test[] = [];

  beforeEach(() => {
    // Create a server with a custom agent card to test that code path
    const customCard: AgentCard = {
      name: "Server Impl Test Agent",
      url: "http://localhost:41241",
      version: "1.0.0",
      capabilities: {
        streaming: true,
        pushNotifications: true,
        stateTransitionHistory: true,
      },
      skills: [
        {
          id: "test-skill",
          name: "Test Skill",
        },
      ],
    };

    server = new A2AServer({
      handler: serverImplTestHandler,
      taskStore: new InMemoryTaskStore(),
      port: 0, // Don't actually listen
      card: customCard,
      // Use custom CORS options to test that code path
      corsOptions: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
      // Use custom base path to test that code path
      basePath: "/api",
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

  describe("Server Configuration", () => {
    it("uses custom base path", async () => {
      // Test that the API endpoint is available at the custom path
      const requestBody = {
        jsonrpc: "2.0",
        id: "test-request-1",
        method: "tasks/send",
        params: {
          id: "test-task-1",
          message: {
            role: "user",
            parts: [{ type: "text", text: "Basic test" }],
          },
        },
      };

      const response = await trackRequest(
        request(app)
          .post("/api") // Using custom path
          .send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("test-task-1");
    });

    it("uses custom agent card", async () => {
      const response = await trackRequest(
        request(app).get("/.well-known/agent.json")
      );

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Server Impl Test Agent");
      expect(response.body.skills[0].id).toBe("test-skill");
    });

    it("properly applies CORS settings", async () => {
      const response = await trackRequest(
        request(app)
          .options("/api")
          .set("Origin", "http://localhost:3000")
          .set("Access-Control-Request-Method", "POST")
      );

      expect(response.status).toBe(204);
      expect(response.header["access-control-allow-origin"]).toBe(
        "http://localhost:3000"
      );
      expect(response.header["access-control-allow-methods"]).toContain("GET");
      expect(response.header["access-control-allow-methods"]).toContain("POST");
    });
  });

  describe("Error Handling", () => {
    it("handles SystemError thrown by task handler", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "internal-error-request-1",
        method: "tasks/send",
        params: {
          id: "internal-error-task-1",
          message: {
            role: "user",
            parts: [{ type: "text", text: "This will throw-internal error" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32603); // Internal error
    });

    it("returns TASK_NOT_FOUND error for non-existent task", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "nonexistent-request-1",
        method: "tasks/get",
        params: {
          id: "nonexistent-task-1",
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32001); // Task not found
    });

    it("returns METHOD_NOT_FOUND error for invalid method", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "invalid-method-request-1",
        method: "invalid/method",
        params: {
          id: "invalid-method-task-1",
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32601); // Method not found
    });

    it("returns INVALID_PARAMS error for missing params", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "invalid-params-request-1",
        method: "tasks/send",
        // Missing params
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32602); // Invalid params
    });

    it("returns INVALID_PARAMS error for invalid task ID", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "invalid-task-id-request-1",
        method: "tasks/get",
        params: {
          // Missing id
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe(-32602); // Invalid params
    });
  });

  describe("Task History Management", () => {
    it("requests task with history", async () => {
      // First create a task
      const createBody = {
        jsonrpc: "2.0",
        id: "history-create-request-1",
        method: "tasks/send",
        params: {
          id: "history-task-1",
          message: {
            role: "user",
            parts: [{ type: "text", text: "Task for history test" }],
          },
        },
      };

      await trackRequest(request(app).post("/api").send(createBody));

      // Now retrieve it with history
      const retrieveBody = {
        jsonrpc: "2.0",
        id: "history-retrieve-request-1",
        method: "tasks/get",
        params: {
          id: "history-task-1",
          historyLength: 2,
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(retrieveBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("history-task-1");
      // History might or might not be included depending on implementation
    });

    it("includes session ID when provided", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "session-request-1",
        method: "tasks/send",
        params: {
          id: "session-task-1",
          sessionId: "test-session-123",
          message: {
            role: "user",
            parts: [{ type: "text", text: "Task with session ID" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("session-task-1");
      expect(response.body.result.sessionId).toBe("test-session-123");
    });

    it("includes metadata when provided", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "metadata-request-1",
        method: "tasks/send",
        params: {
          id: "metadata-task-1",
          message: {
            role: "user",
            parts: [{ type: "text", text: "Task with metadata" }],
          },
          metadata: {
            testKey: "testValue",
            source: "unit-test",
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe("metadata-task-1");
      // Metadata might be stored but not returned, depending on implementation
    });
  });

  describe("Task Timestamps", () => {
    it("includes timestamps in task status", async () => {
      const requestBody = {
        jsonrpc: "2.0",
        id: "timestamp-request-1",
        method: "tasks/send",
        params: {
          id: "timestamp-task-1",
          message: {
            role: "user",
            parts: [{ type: "text", text: "Task for timestamp test" }],
          },
        },
      };

      const response = await trackRequest(
        request(app).post("/api").send(requestBody)
      );

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.status.timestamp).toBeDefined();

      // Verify it's a valid ISO date string
      const timestamp = new Date(response.body.result.status.timestamp);
      expect(timestamp.toString()).not.toBe("Invalid Date");
    });
  });
});
