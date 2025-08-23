import {
  describe,
  beforeEach,
  afterEach,
  it,
  expect,
  jest,
} from "@jest/globals";
import express from "express";
import request from "supertest";
import {
  InMemoryTaskStore,
  TaskStore,
  TaskState,
  MessageSendParams,
  ExpressAgentServer,
  createAgentServer,
  A2AEngine as AgentEngine,
  Context,
  AgentRegistry,
  Task,
  TextPart,
} from "../../src/index.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "../utils/info.js";
import { configureLogger } from "../../src/utils/logging/index.js";
import { apiConnect } from "../utils/apiConnect.js";
// Set a reasonable timeout for all tests
jest.setTimeout(100000);
configureLogger({ level: "silent" });
const registry: AgentRegistry = new AgentRegistry();
let nestedCalls = 0;
const MAX_NESTED_CALLS = 10;
let responses: string[] = [];
let responseTimes: number[] = [];
const telephoneAgent: AgentEngine = async function* (context: Context) {
  const nestedCall = nestedCalls++;
  console.log("telephoneAgent called[", nestedCall, "]");
  const params = context.command;
  const taskId = params.message.taskId ?? "";
  const contextId = params.message.contextId ?? "";
  const userMessage = params.message.parts[0].text;
  const systemMessage = `You are a telephone agent. You are talking to a user. Create a response to forward to the next person in the call. The user said: ${userMessage} Only respond with a single sentence and nothing else.`;
  const start = performance.now();
  const agentResponse = await apiConnect({
    identifier:
      "0x73dc2295a5421ba1c54b5248926fc119f83c37c288e8b235daef071b5a3e0cb7",
    preferredEndpoint: "hf-inference",
    session: [
      {
        role: "system",
        content: systemMessage,
      },
    ],
    options: {
      isAuthRequired: false,
      isFallbackAllowed: false,
    },
  });
  const end = performance.now();
  responseTimes.push(end - start);
  responses.push(agentResponse);
  console.log("agentResponse[", nestedCall, "]", agentResponse);
  console.log("telephoneAgent took", responseTimes[nestedCall], "ms");
  if (nestedCall < MAX_NESTED_CALLS) {
    const request = registry.getRandomAgent();
    if (!request) throw new Error("No agent found");
    const { agent, id } = request;
    if (agent) {
      const message: MessageSendParams = {
        message: {
          taskId: taskId,
          role: "agent",
          parts: [{ kind: "text", text: agentResponse }],
          messageId: "test-message-id",
          kind: "message",
        },
      };
      console.log("forwarding to agent", id);
      const forwardedResponse = await agent.sendMessage(message);
      // console.log("forwardedResponse[", nestedCall, "]", forwardedResponse);
      yield forwardedResponse;
    }
  }
  // Check if task already has status, if not, use "working"
  const response: Task = {
    id: taskId,
    contextId: contextId,
    kind: "task",
    status: {
      state: TaskState.working,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: agentResponse }],
      },
    },
  };
  console.log(
    "Agent[",
    nestedCall,
    "] response",
    (response.status?.message?.parts[0] as TextPart).text
  );
  yield response;
};

describe("AgentRegistry", () => {
  beforeEach(() => {});
  it("should create an agent", () => {
    const agent = registry.createAgent("test-agent", {
      agentCard: defaultAgentCard,
      engine: telephoneAgent,
    });
    expect(agent).toBeDefined();
    console.log(agent.getAgentCard());
  });
  it("should get an agent", () => {
    const agent = registry.getAgent("test-agent");
    expect(agent).toBeDefined();
    console.log(agent?.getAgentCard());
  });
  it("should get all agents", () => {
    const agents = registry.getAgents();
    expect(agents).toBeDefined();
    console.log(agents);
  });
  it("should get agent count", () => {
    const count = registry.getAgentCount();
    expect(count).toBeDefined();
    console.log(count);
  });
  it("should get agent ids", () => {
    const ids = registry.getAgentIds();
    expect(ids).toBeDefined();
    console.log(ids);
  });
  it("should get agent by id", () => {
    const agent = registry.getAgent("test-agent");
    expect(agent).toBeDefined();
    console.log(agent?.getAgentCard());
  });
  it("should get random agent", () => {
    const agent = registry.getRandomAgent();
    expect(agent).toBeDefined();
    console.log(agent?.getAgentCard());
  });
  it("should remove an agent", () => {
    registry.removeAgent("test-agent");
    const agent = registry.getAgent("test-agent");
    expect(agent).toBeUndefined();
  });
  it("should create 10 agents", () => {
    for (let i = 0; i < 10; i++) {
      const agent = registry.createAgent(`test-agent-${i}`, {
        agentCard: defaultAgentCard,
        engine: telephoneAgent,
      });
      expect(agent).toBeDefined();
    }
    const agents = registry.getAgents();
    expect(agents).toBeDefined();
    expect(agents.length).toBe(10);
  });
  it("should play telephone", async () => {
    for (let i = 0; i < 10; i++) {
      registry.createAgent(`test-agent-${i}`, {
        agentCard: defaultAgentCard,
        engine: telephoneAgent,
      });
    }
    const agents = registry.getAgents();
    expect(agents).toBeDefined();
    expect(agents.length).toBe(10);
    const agent = agents[0];
    const message: MessageSendParams = {
      message: {
        role: "user",
        parts: [{ kind: "text", text: "The meaning of life is..." }],
        messageId: "test-message-id",
        kind: "message",
      },
    };
    const start = performance.now();
    const response = await agent.sendMessage(message);
    const end = performance.now();
    // console.log(response);
    console.log("telephone took", end - start, "ms");
    expect(responses.length).toBe(MAX_NESTED_CALLS + 1);
    console.log("responses", responses);
    console.log("responseTimes", responseTimes);
  });
});
