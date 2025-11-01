import {
  jest,
  describe,
  beforeEach,
  afterEach,
  test,
  expect,
} from "@jest/globals";
import express from "express";
import {
  A2AClient,
  Context,
  Task,
  TaskState,
  ExpressAgentServer,
  createAgentServer,
  A2AEngine as AgentEngine,
  getParts,
  SUBMITTED_UPDATE,
} from "../src/index.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "./utils/info.js";
import { configureLogger } from "../src/utils/logging/index.js";
// Set a reasonable timeout for all tests
jest.setTimeout(10000);
configureLogger({ level: "info" });

/**
 * Simple echo task handler for testing
 */
const echoAgent: AgentEngine = async function* (context: Context) {
  // Extract user text
  const params = context.command;
  const taskId = params.message.taskId ?? "";
  const contextId = params.message.contextId ?? "";
  const { text: userText } = getParts(params.message.parts);
  yield SUBMITTED_UPDATE(taskId, contextId);
  // Send working status
  yield {
    taskId,
    contextId,
    kind: "status-update",
    status: {
      state: TaskState.working,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Processing..." }],
      },
    },
    final: false,
  };
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (userText.includes("Task to be canceled")) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Check cancellation
  if (context.isCancelled()) {
    yield {
      taskId,
      contextId,
      kind: "status-update",
      status: {
        state: TaskState.canceled,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Task was canceled." }],
        },
      },
      final: true,
    };
    return;
  }

  // Create a response
  const response = `You said: "${userText}"`;

  // Create an artifact
  yield {
    taskId,
    contextId,
    kind: "artifact-update",
    artifact: {
      artifactId: "test-artifact-id",
      name: "echo.txt",
      parts: [{ kind: "text", text: response }],
    },
  };

  // Complete the task
  yield {
    id: taskId,
    contextId,
    kind: "task",
    status: {
      state: TaskState.completed,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: response }],
      },
    },
  };
};

describe("Client-Server Integration Tests", () => {
  let server: ExpressAgentServer;
  let app: express.Express;
  let expressServer: any;
  let port: number;
  let client: A2AClient;

  beforeEach(async () => {
    // Create a simple server
    server = createAgentServer({
      agent: { engine: echoAgent, agentCard: defaultAgentCard },
      agentCardPath: "/.well-known/agent-card.json",
    });
    app = server.app;

    // Get the actual port
    expressServer = app.listen(0);
    port = (expressServer.address() as any).port;

    // Create client
    client = new A2AClient(`http://localhost:${port}`);
  });

  afterEach(async () => {
    // Force close any open connections
    return new Promise<void>((resolve) => {
      expressServer.close(() => {
        resolve();
      });
    });
  });

  test("client can retrieve agent card", async () => {
    const card = await client.agentCard();

    expect(card).toBeDefined();
    expect(card.name).toBe(defaultAgentCard.name);
    expect(card.capabilities.streaming).toBe(
      defaultAgentCard.capabilities.streaming
    );
  });

  test("client can send task and get response", async () => {
    const testMessage = "Hello, A2A!";
    const task = await client.sendTask({
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: testMessage }],
      },
    });

    expect(task).toBeDefined();
    expect(task?.kind).toBe("task");
    expect((task as Task).status.state).toBe("completed");

    // Check if the response message contains our echo
    const responseText = (task as Task).status.message?.parts
      .filter((part) => part.kind === "text")
      .map((part) => (part as any).text)
      .join(" ");

    expect(responseText).toContain(testMessage);

    // Check if artifact was created
    expect((task as Task).artifacts).toBeDefined();
    expect((task as Task).artifacts!.length).toBe(1);
    expect((task as Task).artifacts![0].name).toBe("echo.txt");
  });

  test("client can stream task updates", async () => {
    const testMessage = "Test streaming";
    const stream = client.sendStreamingMessage({
      message: {
        taskId: "stream-task-test",
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: testMessage }],
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
      .filter((part: any) => part.kind === "text")
      .map((part: any) => part.text)
      .join(" ");

    expect(responseText).toContain(testMessage);
  });

  test("client can cancel a task", async () => {
    // First send a task to create it
    const task = client.sendMessage({
      message: {
        taskId: "cancel-task-test",
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "Task to be canceled" }],
      },
    });

    const canceledTask = await client.cancelTask({
      id: "cancel-task-test",
    });
    expect(canceledTask).toBeDefined();
    expect(canceledTask!.status.state).toBe("canceled");
    expect(((await task) as Task)?.status.state).toBe("canceled");
  });

  test("client can get task by ID", async () => {
    await client.sendMessage({
      message: {
        taskId: "get-task-test",
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "Task to be retrieved" }],
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
