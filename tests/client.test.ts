/**
 * Archiving these tests as they are no longer relevant.
 * Transport has been largely replaced with the @a2a-js/sdk please file an issue with A2A Protocol team if you encounter any bugs.
 */
import {
  test,
  describe,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";

import {
  A2AClient,
  A2A,
  createMessenger,
  AgentMessenger,
  applyDefaults,
} from "../src/index.js";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

applyDefaults();

const MOCK_AGENT_CARD: A2A.AgentCard = {
  protocolVersion: "0.3.0",
  name: "Test Agent",
  description: "A test agent for unit tests",
  url: "https://test-agent.example.com/api",
  version: "1.0.0",
  capabilities: {
    streaming: true,
    pushNotifications: true,
    stateTransitionHistory: false,
  },
  skills: [
    {
      id: "test-skill",
      name: "Test Skill",
      description: "A test skill for unit tests",
      tags: ["test", "skill"],
    },
  ],
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
};

const MOCK_TASK: A2A.Task = {
  id: "test-task-123",
  contextId: "test-context-id",
  kind: "task",
  status: {
    state: A2A.TaskState.completed,
    message: {
      messageId: "test-message-id",
      kind: "message",
      role: "agent",
      parts: [
        {
          kind: "text",
          text: "This is a test response",
        },
      ],
    },
    timestamp: new Date().toISOString(),
  },
  artifacts: [
    {
      artifactId: "test-artifact-id",
      name: "test-artifact",
      parts: [
        {
          kind: "text",
          text: "Artifact content",
        },
      ],
    },
  ],
};

// Task update events for streaming
const STATUS_UPDATE_EVENT: A2A.TaskStatusUpdateEvent = {
  taskId: "test-task-123",
  contextId: "test-context-id",
  kind: "status-update",
  final: false,
  status: {
    state: A2A.TaskState.working,
    timestamp: new Date().toISOString(),
  },
};

const ARTIFACT_UPDATE_EVENT: A2A.TaskArtifactUpdateEvent = {
  taskId: "test-task-123",
  contextId: "test-context-id",
  kind: "artifact-update",
  artifact: {
    artifactId: "test-artifact-id",
    name: "new-artifact",
    parts: [
      {
        kind: "text",
        text: "New artifact content",
      },
    ],
  },
};

const MOCK_NOTIFICATION_CONFIG: A2A.PushNotificationConfig = {
  url: "https://notification-endpoint.example.com",
  token: "test-notification-token",
};

const MOCK_PUSH_NOTIFICATION_CONFIG: A2A.TaskPushNotificationConfig = {
  taskId: "test-task-123",
  pushNotificationConfig: MOCK_NOTIFICATION_CONFIG,
};

// Setup MSW server for mocking HTTP requests
const server = setupServer(
  // Mock agent card endpoint
  http.get("https://test-agent.example.com/.well-known/agent-card.json", () => {
    return HttpResponse.json(MOCK_AGENT_CARD);
  }),

  // Mock fallback agent card endpoint
  http.get("https://test-agent.example.com/agent.json", () => {
    return HttpResponse.json(MOCK_AGENT_CARD);
  }),

  // Mock message/send endpoint
  http.post("https://test-agent.example.com/api", async ({ request }) => {
    const body = (await request.json()) as {
      method: string;
      id: string | number;
      params?: Record<string, any>;
    };

    if (body.method === "message/send") {
      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: MOCK_TASK,
      });
    }

    if (body.method === "tasks/get") {
      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: MOCK_TASK,
      });
    }

    if (body.method === "tasks/cancel") {
      const canceledTask = {
        ...MOCK_TASK,
        status: {
          ...MOCK_TASK.status,
          state: "canceled",
        },
      };
      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: canceledTask,
      });
    }

    if (body.method === "tasks/pushNotificationConfig/set") {
      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: body.params,
      });
    }

    if (body.method === "tasks/pushNotificationConfig/get") {
      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        result: MOCK_PUSH_NOTIFICATION_CONFIG,
      });
    }

    if (
      body.method === "message/stream" ||
      body.method === "tasks/resubscribe"
    ) {
      // For streaming endpoints, create a mock SSE response
      // This is a simplified implementation since MSW doesn't handle SSE natively
      // We'll create a text response with the correct format
      const eventData1 = JSON.stringify({
        jsonrpc: "2.0",
        id: body.id,
        result: STATUS_UPDATE_EVENT,
      });

      const eventData2 = JSON.stringify({
        jsonrpc: "2.0",
        id: body.id,
        result: ARTIFACT_UPDATE_EVENT,
      });

      // Create a text response that mimics SSE format
      const responseText =
        `event: event\ndata: ${eventData1}\n\n` +
        `event: event\ndata: ${eventData2}\n\n`;
      return new HttpResponse(responseText, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    }

    // Default case for unhandled methods
    return HttpResponse.json(
      {
        jsonrpc: "2.0",
        id: body.id,
        error: {
          code: -32601,
          message: "Method not found",
        },
      },
      { status: 400 }
    );
  })
);

describe("A2AClient", () => {
  let messenger: Awaited<ReturnType<typeof createMessenger>>;

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    server.resetHandlers();
    messenger = await createMessenger({
      baseUrl: "https://test-agent.example.com",
    });
  });

  // Test agent card retrieval
  test("should fetch an agent card", async () => {
    const card = await messenger.getAgentCard();
    expect(card).toEqual(MOCK_AGENT_CARD);

    // Test the cached card path (line 51 in messenger.ts)
    // This second call should use the cached card without making a network request

    // Override the server to return a different card,
    // if the cache is used, we'll still get the original
    server.use(
      http.get(
        "https://test-agent.example.com/.well-known/agent-card.json",
        () => {
          return HttpResponse.json({
            ...MOCK_AGENT_CARD,
            version: "2.0.0", // Changed version
          });
        }
      )
    );

    const cachedCard = await messenger.getAgentCard();
    // Verify we got the original card (from cache) not the new one
    expect(cachedCard).toEqual(MOCK_AGENT_CARD);
    expect(cachedCard.version).toBe("1.0.0"); // Original version, not 2.0.0
  });

  // Test agent card refreshing
  test("should refresh an agent card", async () => {
    // First get the card to cache it
    await messenger.getAgentCard();

    // Mock a change to the agent card on the server
    server.use(
      http.get(
        "https://test-agent.example.com/.well-known/agent-card.json",
        () => {
          return HttpResponse.json({
            ...MOCK_AGENT_CARD,
            version: "1.1.0",
          });
        }
      )
    );

    // Refresh the card
    const updatedCard = await (await messenger.reset()).getAgentCard();
    expect(updatedCard.version).toBe("1.1.0");
  });

  // Test fallback to secondary card URL
  test("should fetch agent card from fallback URL when primary fails", async () => {
    server.use(
      http.get("https://test-agent.example.com/.well-known/agent.json", () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const card = await messenger.getAgentCard();
    expect(card).toEqual(MOCK_AGENT_CARD);
  });

  // Test agent card fetching error
  test("should throw when both agent card endpoints fail", async () => {
    server.use(
      http.get(
        "https://test-agent.example.com/.well-known/agent-card.json",
        () => {
          return new HttpResponse("Not found", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          });
        }
      ),
      http.get("https://test-agent.example.com/agent-card", () => {
        return new HttpResponse("Server error", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });
      })
    );
    await expect(messenger.reset(undefined, "agent-card")).rejects.toThrow();
    await server.resetHandlers();
  });

  // Test constructor with string URL and headers
  test("should construct client with string URL and headers", () => {
    const testClient = new A2AClient("https://test-agent.example.com/api", {
      Authorization: "Bearer test-token",
    });

    // Check internal state
    expect(testClient.baseUrl).toBe("https://test-agent.example.com/api");
    expect(testClient.headers["Authorization"]).toBe("Bearer test-token");
  });

  // Test sending a task
  test("should send a task and receive a response", async () => {
    const message: A2A.Message = {
      messageId: "test-message-id",
      kind: "message",
      role: "user",
      parts: [
        {
          kind: "text",
          text: "Hello, this is a test message",
        },
      ],
    };

    const params: A2A.MessageSendParams = {
      message,
    };

    const task = await messenger.sendMessage(params);
    expect(task).toEqual(MOCK_TASK);
  });

  // Test getting a task
  test("should get a task by ID", async () => {
    const task = await messenger.getTask({ id: "test-task-123" });
    expect(task).toEqual(MOCK_TASK);
  });

  // Test canceling a task
  test("should cancel a task", async () => {
    const task = await messenger.cancelTask({ id: "test-task-123" });
    expect(task).toMatchObject({
      id: "test-task-123",
      status: {
        state: "canceled",
      },
    });
  });

  // Test push notification config setting
  test("should set task push notification config", async () => {
    const config: A2A.TaskPushNotificationConfig = {
      taskId: "test-task-123",
      pushNotificationConfig: {
        url: "https://notification-endpoint.example.com",
        token: "test-notification-token",
      },
    };

    const result = await messenger.setTaskPushNotificationConfig(config);
    expect(result).toEqual(config);
  });

  // Test push notification config getting
  test("should get task push notification config", async () => {
    const params: A2A.TaskIdParams = {
      id: "test-task-123",
    };

    const config = await messenger.getTaskPushNotificationConfig(params);
    expect(config).toEqual(MOCK_PUSH_NOTIFICATION_CONFIG);
  });

  // Test streaming task updates
  test("should stream task updates", async () => {
    const message: A2A.Message = {
      messageId: "test-message-id",
      kind: "message",
      role: "user",
      parts: [
        {
          kind: "text",
          text: "Hello, this is a test message",
        },
      ],
    };

    const params: A2A.MessageSendParams = {
      message,
    };

    const events: A2A.Update[] = [];
    const stream = messenger.sendMessageStream(params);
    for await (const event of stream) {
      events.push(event);
    }

    expect(events.length).toBe(2);
    // Check event types without explicit type property references
    expect(events[0]).toHaveProperty("status"); // It's a status update
    expect(events[1]).toHaveProperty("artifact"); // It's an artifact update
  });

  // Test resubscribe task updates
  test("should resubscribe to task updates", async () => {
    const params: A2A.TaskQueryParams = {
      id: "test-task-123",
    };

    const events: A2A.Update[] = [];

    for await (const event of messenger.resubscribeTask(params)) {
      events.push(event);
    }

    expect(events.length).toBe(2);
    // Check event types without explicit type property references
    expect(events[0]).toHaveProperty("status"); // It's a status update
    expect(events[1]).toHaveProperty("artifact"); // It's an artifact update
  });

  // Test error handling - network errors
  test("should handle network errors during HTTP request", async () => {
    // Mock a network error by using a response that forces a fetch error
    server.use(
      http.post("https://test-agent.example.com/api", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(messenger.getTask({ id: "test-task-123" })).rejects.toThrow();
  });

  // Test error handling - invalid JSON response
  test("should handle invalid JSON response", async () => {
    server.use(
      http.post("https://test-agent.example.com/api", () => {
        return new HttpResponse("This is not JSON", {
          headers: { "Content-Type": "text/plain" },
        });
      })
    );

    await expect(messenger.getTask({ id: "test-task-123" })).rejects.toThrow();
  });

  // Test error handling - invalid JSON-RPC structure
  test("should handle invalid JSON-RPC structure", async () => {
    server.use(
      http.post("https://test-agent.example.com/api", () => {
        return HttpResponse.json({ not: "valid-jsonrpc" });
      })
    );
    await expect(messenger.getTask({ id: "test-task-123" })).rejects.toThrow();
  });

  // Test error handling - HTTP error with JSON-RPC error
  test("should handle HTTP error with JSON-RPC error", async () => {
    server.use(
      http.post("https://test-agent.example.com/api", () => {
        return HttpResponse.json(
          {
            jsonrpc: "2.0",
            id: "123",
            error: {
              code: -32000,
              message: "Task not found",
            },
          },
          { status: 400 }
        );
      })
    );

    await expect(messenger.getTask({ id: "test-task-123" })).rejects.toThrow();
  });

  // Test error handling - HTTP error with non-JSON response
  test("should handle HTTP error with non-JSON response", async () => {
    server.use(
      http.post("https://test-agent.example.com/api", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });
      })
    );

    await expect(messenger.getTask({ id: "test-task-123" })).rejects.toThrow();
  });

  // Test error handling for streaming - response not OK
  test("should handle streaming error when response is not OK", async () => {
    server.use(
      http.post("https://test-agent.example.com/api", () => {
        return new HttpResponse("Bad Request", {
          status: 400,
          headers: { "Content-Type": "text/plain" },
        });
      })
    );

    const stream = messenger.sendMessageStream({
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "Test" }],
      },
    });

    await expect(async () => {
      for await (const event of stream) {
        // This should not execute
      }
    }).rejects.toThrow();
  });

  // Test capability check - edge case with no capabilities
  test("should handle agent card with no capabilities", async () => {
    // First ensure the agent card is cached with valid data
    await messenger.getAgentCard();

    server.use(
      http.get(
        "https://test-agent.example.com/.well-known/agent-card.json",
        () => {
          return HttpResponse.json({
            ...MOCK_AGENT_CARD,
            capabilities: undefined,
          });
        }
      )
    );

    // Force refresh to clear the cache
    await (await messenger.reset()).getAgentCard();

    const hasStreaming = await messenger.supports("streaming");
    expect(hasStreaming).toBe(false);
  });

  // Test capability check error handling
  test("should handle error during capability check", async () => {
    server.use(
      http.get(
        "https://invalid-url.example.com/.well-known/agent-card.json",
        () => {
          return new HttpResponse(null, { status: 404 });
        }
      ),
      http.get("https://invalid-url.example.com/agent.json", () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    await expect(
      createMessenger({
        baseUrl: "https://invalid-url.example.com",
      })
    ).rejects.toThrow(
      "Failed to fetch Agent Card from https://invalid-url.example.com/agent.json: 404"
    );
  });

  // Test error handling
  test("should handle JSON-RPC errors", async () => {
    server.use(
      http.post("https://test-agent.example.com", () => {
        return HttpResponse.json({
          jsonrpc: "2.0",
          id: "123",
          error: {
            code: -32000,
            message: "Task not found",
          },
        });
      })
    );

    await expect(messenger.getTask({ id: "nonexistent-task" })).rejects
      .toThrowError;
  });

  // Test capability check
  test("should check if a capability is supported", async () => {
    // First, ensure the agent card is cached
    await messenger.getAgentCard();

    const hasStreaming = await messenger.supports("streaming");
    expect(hasStreaming).toBe(true);

    const hasPushNotifications = await messenger.supports("pushNotifications");
    expect(hasPushNotifications).toBe(true);

    const hasStateTransitionHistory = await messenger.supports(
      "stateTransitionHistory"
    );
    expect(hasStateTransitionHistory).toBe(false);

    // Test the default case in the switch statement for uncovered branch
    const hasUnsupportedCapability = await messenger.supports(
      "unknownCapability" as any
    );
    expect(hasUnsupportedCapability).toBe(false);
  });

  // Test header management
  test("should manage custom headers", () => {
    // Add a header
    messenger.addHeader("Authorization", "Bearer test-token");

    // Check internal state (this is a private test hack, normally wouldn't test private members)
    const headers = messenger.headers;
    expect(headers["Authorization"]).toBe("Bearer test-token");

    // Add another header
    messenger.addHeader("X-Custom-Header", "test-value");
    expect(messenger.headers["X-Custom-Header"]).toBe("test-value");

    // Replace all headers
    messenger.headers = {
      "Content-Type": "application/json",
      "Accept-Language": "en-US",
    };

    const newHeaders = messenger.headers;
    expect(newHeaders["Authorization"]).toBeUndefined();
    expect(newHeaders["Content-Type"]).toBe("application/json");
    expect(newHeaders["Accept-Language"]).toBe("en-US");

    // Remove a header
    messenger.removeHeader("Content-Type");
    expect(messenger.headers["Content-Type"]).toBeUndefined();

    // Clear all headers
    messenger.headers = {};
    expect(Object.keys(messenger.headers).length).toBe(0);
  });
});
