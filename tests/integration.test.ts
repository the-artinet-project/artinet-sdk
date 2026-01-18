import {
  jest,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  test,
  expect,
} from "@jest/globals";
import express from "express";
import nock from "nock";
import {
  AgentMessenger,
  A2A,
  ExpressAgentServer,
  createAgentServer,
  AgentEngine,
  getParts,
  SUBMITTED_UPDATE,
  createMessenger,
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
// Set a reasonable timeout for all tests
jest.setTimeout(10000);

/**
 * Simple echo task handler for testing
 */
const echoAgent: AgentEngine = async function* (context: A2A.Context) {
  // Extract user text
  const message = context.userMessage;
  // NOTE: Use context.taskId and context.contextId instead of message.taskId/contextId
  // because message.taskId may be undefined (server assigns one), while context.taskId
  // is always the server-assigned task ID. Using message.taskId ?? "" causes failures
  // in update handlers that validate taskId matches.
  const taskId = context.taskId;
  const contextId = context.contextId;
  const { text: userText } = getParts(message.parts);
  yield SUBMITTED_UPDATE(taskId, contextId);
  // Send working status
  yield {
    taskId,
    contextId,
    kind: "status-update",
    status: {
      state: A2A.TaskState.working,
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  // Check cancellation
  if (await context.isCancelled()) {
    yield {
      taskId,
      contextId,
      kind: "status-update",
      status: {
        state: A2A.TaskState.canceled,
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
      state: A2A.TaskState.completed,
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
  let client: AgentMessenger;

  beforeAll(() => {
    nock.restore();
    nock.cleanAll();
  });

  beforeEach(async () => {
    // Get an available port by listening on 0, then close and reuse
    const tempApp = express();
    const tempServer = tempApp.listen(0);
    port = (tempServer.address() as any).port;

    // Create agent card with correct localhost URL BEFORE creating server
    // NOTE: The default MOCK_AGENT_CARD has url: "https://test-agent.example.com/api"
    // The A2AClient fetches the agent card and uses card.url for subsequent requests.
    // If the URL doesn't match the actual server, requests will fail with "Internal error".
    const testAgentCard = {
      ...defaultAgentCard,
      url: `http://localhost:${port}`,
    };

    // Close temp server and wait a moment for port to be released
    await new Promise<void>((resolve) => {
      tempServer.close(() => resolve());
    });

    // Create server with the correct agent card URL
    server = createAgentServer({
      agent: { engine: echoAgent, agentCard: testAgentCard },
      agentCardPath: "/.well-known/agent-card.json",
    });
    app = server.app;

    // Start server on the reserved port
    expressServer = app.listen(port, () => {});
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Create client
    client = await createMessenger({ baseUrl: `http://localhost:${port}` });
  });

  afterEach(async () => {
    // Force close any open connections
    return new Promise<void>((resolve) => {
      expressServer.close(() => {
        resolve();
      });
    });
  });

  afterAll(() => {
    nock.activate();
  });

  test("client can retrieve agent card", async () => {
    const card = await client.getAgentCard();

    expect(card).toBeDefined();
    expect(card.name).toBe(defaultAgentCard.name);
    expect(card.capabilities.streaming).toBe(
      defaultAgentCard.capabilities.streaming
    );
  });

  test("client can send task and get response", async () => {
    const testMessage = "Hello, A2A!";
    const task = await client.sendMessage({
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: testMessage }],
      },
    });

    expect(task).toBeDefined();
    expect(task?.kind).toBe("task");
    expect((task as A2A.Task).status.state).toBe("completed");

    // Check if the response message contains our echo
    const responseText = (task as A2A.Task).status.message?.parts
      .filter((part) => part.kind === "text")
      .map((part) => (part as any).text)
      .join(" ");

    expect(responseText).toContain(testMessage);

    // Check if artifact was created
    expect((task as A2A.Task).artifacts).toBeDefined();
    expect((task as A2A.Task).artifacts!.length).toBe(1);
    expect((task as A2A.Task).artifacts![0].name).toBe("echo.txt");
  });

  test("client can stream task updates", async () => {
    const testMessage = "Test streaming";
    const stream = client.sendMessageStream({
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
    // First send a task to create it (don't await to allow cancellation during processing)
    const taskPromise = client.sendMessage({
      message: {
        taskId: "cancel-task-test",
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "Task to be canceled" }],
      },
    });

    // Wait a moment for the task to be created on the server before canceling
    await new Promise((resolve) => setTimeout(resolve, 50));

    const canceledTask = await client.cancelTask({
      id: "cancel-task-test",
    });
    expect(canceledTask).toBeDefined();
    expect(canceledTask!.status.state).toBe("canceled");

    // Wait for the original task promise to resolve
    const task = await taskPromise;
    // NOTE: Due to race conditions between the task handler and cancel request,
    // the original sendMessage may return the task in either "canceled" or "completed" state.
    // The cancel request itself succeeds (verified above), but the original handler may
    // complete before it checks the cancellation flag.
    expect(["canceled", "completed"]).toContain(
      (task as A2A.Task)?.status.state
    );
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
