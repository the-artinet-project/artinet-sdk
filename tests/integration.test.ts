import { jest } from "@jest/globals";
import express from "express";
import {
  A2AClient,
  A2AServer,
  InMemoryTaskStore,
  TaskContext,
  TaskYieldUpdate,
  logger,
} from "../src/index.js";

// Set a reasonable timeout for all tests
jest.setTimeout(10000);

// // Mock logger to prevent noise during tests
// jest.spyOn(logger, "info").mockImplementation(() => {});
// jest.spyOn(logger, "debug").mockImplementation(() => {});
// jest.spyOn(logger, "error").mockImplementation(() => {});
// jest.spyOn(logger, "warn").mockImplementation(() => {});

/**
 * Simple echo task handler for testing
 */
async function* echoHandler(
  context: TaskContext
): AsyncGenerator<TaskYieldUpdate, void, unknown> {
  // Extract user text
  const userText = context.userMessage.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as any).text)
    .join(" ");

  // Send working status
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Processing..." }],
    },
  };

  // Check cancellation
  if (context.isCancelled()) {
    yield {
      state: "canceled",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "Task was canceled." }],
      },
    };
    return;
  }

  // Create a response
  const response = `You said: "${userText}"`;

  // Create an artifact
  yield {
    name: "echo.txt",
    parts: [{ type: "text", text: response }],
  };

  // Complete the task
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ type: "text", text: response }],
    },
  };
}

describe("Client-Server Integration Tests", () => {
  let server: A2AServer;
  let app: express.Express;
  let expressServer: any;
  let port: number;
  let client: A2AClient;

  beforeEach(async () => {
    // Create a simple server
    server = new A2AServer({
      handler: echoHandler,
      taskStore: new InMemoryTaskStore(),
      port: 0,
    });
    app = server.start();

    // Get the actual port
    expressServer = app.listen(0);
    port = (expressServer.address() as any).port;

    // Create client
    client = new A2AClient(`http://localhost:${port}`);
  });

  afterEach(async () => {
    // Force close any open connections
    return new Promise<void>((resolve) => {
      // Close the express server gracefully
      server.stop().then(() => {
        // Allow some time for connections to fully close
        setTimeout(resolve, 100);
      });
      expressServer.close(() => {
        resolve();
      });
    });
  });

  test("client can retrieve agent card", async () => {
    const card = await client.agentCard();

    expect(card).toBeDefined();
    expect(card.name).toBe("A2A Server");
    expect(card.capabilities.streaming).toBe(true);
  });

  test("client can send task and get response", async () => {
    const testMessage = "Hello, A2A!";
    const task = await client.sendTask({
      id: "test-task-1",
      message: {
        role: "user",
        parts: [{ type: "text", text: testMessage }],
      },
    });

    expect(task).toBeDefined();
    expect(task!.id).toBe("test-task-1");
    expect(task!.status.state).toBe("completed");

    // Check if the response message contains our echo
    const responseText = task!.status.message?.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as any).text)
      .join(" ");

    expect(responseText).toContain(testMessage);

    // Check if artifact was created
    expect(task!.artifacts).toBeDefined();
    expect(task!.artifacts!.length).toBe(1);
    expect(task!.artifacts![0].name).toBe("echo.txt");
  });

  test("client can stream task updates", async () => {
    const testMessage = "Test streaming";
    const stream = client.sendTaskSubscribe({
      id: "test-stream-task",
      message: {
        role: "user",
        parts: [{ type: "text", text: testMessage }],
      },
    });

    const updates: any[] = [];
    for await (const update of stream) {
      updates.push(update);
    }

    // We should have at least 3 updates:
    // 1. "submitted" status (initial state from server)
    // 2. "working" status (from our handler)
    // 3. artifact
    // 4. "completed" status
    expect(updates.length).toBeGreaterThanOrEqual(3);

    // First update should be "submitted" status
    expect(updates[0].status?.state).toBe("submitted");

    // Second update should be "working" status
    if (updates.length > 1) {
      expect(updates[1].status?.state).toBe("working");
    }

    // Check for artifact update
    const artifactUpdate = updates.find((u) => u.artifact);
    expect(artifactUpdate).toBeDefined();
    expect(artifactUpdate.artifact.name).toBe("echo.txt");

    // Last update should be "completed" status
    const lastUpdate = updates[updates.length - 1];
    expect(lastUpdate.status?.state).toBe("completed");

    // Verify response text contains our message
    const responseText = lastUpdate.status.message?.parts
      .filter((part: any) => part.type === "text")
      .map((part: any) => part.text)
      .join(" ");

    expect(responseText).toContain(testMessage);
  });

  test("client can cancel a task", async () => {
    // First send a task to create it
    const task = await client.sendTask({
      id: "cancel-task-test",
      message: {
        role: "user",
        parts: [{ type: "text", text: "Task to be canceled" }],
      },
    });

    try {
      // Now try to cancel it (note: in a real scenario this would need to be a long-running task)
      const canceledTask = await client.cancelTask({
        id: "cancel-task-test",
      });
      console.log("canceledTask", canceledTask);
      expect(canceledTask).toBeDefined();
      // Should be in canceled state
      expect(canceledTask!.status.state).toBe("canceled");
    } catch (error: any) {
      // The task might complete too quickly to be canceled, resulting in a "cannot be canceled" error
      // This is also a valid test scenario

      // The error message should contain the task cannot be canceled text
      // Not checking the exact error code because it may be wrapped in an internal error
      expect(error.code).toBe(-32002);
      expect(error.message).toContain("Task cannot be canceled");
    }
  });

  test("client can get task by ID", async () => {
    // First create a task
    await client.sendTask({
      id: "get-task-test",
      message: {
        role: "user",
        parts: [{ type: "text", text: "Task to be retrieved" }],
      },
    });

    // Now retrieve it
    const task = await client.getTask({
      id: "get-task-test",
    });

    expect(task).toBeDefined();
    expect(task!.id).toBe("get-task-test");
    expect(task!.status.state).toBe("completed");
  });
});
