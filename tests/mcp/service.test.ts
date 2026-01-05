import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import {
  A2A,
  AgentEngine,
  getParts,
  MCPAgent,
  createMCPAgent,
  createAgent,
  MCP,
} from "../../src/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { configure } from "../../src/config/index.js";
import { configurePino } from "../../src/extensions/pino.js";
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
const protocolEngine: AgentEngine = async function* (
  context: A2A.Context
): AsyncGenerator<A2A.Update, void, unknown> {
  const message: A2A.Message = context.userMessage;
  const taskId = message.taskId ?? "";
  const contextId = message.contextId ?? "";
  const { text } = getParts(message.parts);

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

describe("MCP Agent Tests", () => {
  let agent: MCPAgent;

  let clientTransport: InMemoryTransport;
  let serverTransport: InMemoryTransport;

  beforeEach(() => {
    [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    agent = createMCPAgent({
      serverInfo: {
        name: "A2A Protocol Test Agent",
        version: "1.0.0",
      },
      agent: createAgent({
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
      }),
      options: {},
    });
  });
  it("should be able to call the agentCard procedure", async () => {
    const result = agent.agentCard;
    expect(result).toEqual({
      name: "A2A Protocol Test Agent",
      url: "http://localhost:41241",
      version: "1.0.0",
      protocolVersion: "0.3.0",
      description: "A2A Protocol Test Agent",
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"],
      preferredTransport: "JSONRPC",
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
    });
  });
  it("should be able to call sendMessage Directly", async () => {
    const result = await agent.sendMessage("hello");
    expect(result).toBeDefined();
    expect(result.status.state).toEqual(A2A.TaskState.completed);
  });
  it("should call server transport when calling mcp", async () => {
    const message: MCP.JSONRPCMessage = {
      jsonrpc: "2.0",
      method: "test",
      id: 1,
    };

    let receivedMessage: MCP.JSONRPCMessage | undefined;
    serverTransport.onmessage = (msg) => {
      receivedMessage = msg;
    };

    await clientTransport.send(message);
    agent.connect(serverTransport);
    expect(receivedMessage).toEqual(message);
  });
  it("should get agentCard through mcp", async () => {
    const client = new Client({
      name: "A2A Protocol Test Agent",
      version: "1.0.0",
    });
    let receivedMessage: MCP.JSONRPCMessage | undefined;
    serverTransport.onmessage = (msg) => {
      receivedMessage = msg;
    };
    await agent.connect(serverTransport);
    await client.connect(clientTransport);
    const result: any = await client.readResource({
      uri: "agent://card",
    });
    expect(result.contents[0].text).toEqual(
      JSON.stringify(agent.agentCard, null, 2)
    );
  });
  it("should call getTask through mcp", async () => {
    const client = new Client({
      name: "A2A Protocol Test Agent",
      version: "1.0.0",
    });
    await agent.connect(serverTransport);
    await client.connect(clientTransport);
    const result: any = await client.callTool({
      name: "get-task",
      arguments: {
        id: "test-task-id",
      },
    });
    expect(result).toBeDefined();
    expect(result.content[0].text).toContain("Task not found");
  });
  it("should call cancelTask through mcp", async () => {
    const client = new Client({
      name: "A2A Protocol Test Agent",
      version: "1.0.0",
    });
    await agent.connect(serverTransport);
    await client.connect(clientTransport);
    const result: any = await client.callTool({
      name: "cancel-task",
      arguments: {
        id: "test-task-id",
      },
    });
    expect(result).toBeDefined();
    expect(result.content[0].text).toContain("Task not found");
  });
  it("should call sendMessage through mcp", async () => {
    const client = new Client({
      name: "A2A Protocol Test Agent",
      version: "1.0.0",
    });
    await agent.connect(serverTransport);
    await client.connect(clientTransport);
    const message: A2A.MessageSendParams = {
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "hello" }],
      },
    };
    const result: any = await client.callTool({
      name: "send-message",
      arguments: message,
    });
    expect(result).toBeDefined();
    expect(result.structuredContent).toBeDefined();
    expect(result.structuredContent.status.state).toEqual(
      A2A.TaskState.completed
    );
  });
});
