import { describe, it, expect } from "@jest/globals";
import {
  createAgentCard,
  AgentBuilder,
  createAgentServer,
  A2A,
} from "../../src/index.js";

describe("Card Builder Tests", () => {
  it("should create AgentCard", () => {
    const card: A2A.AgentCard = createAgentCard("TestAgent");
    expect(card).toBeDefined();
    expect(card.name).toBe("TestAgent");
    expect(card.description).toBe("An agent that can use the A2A protocol.");
    expect(card.url).toBe("https://localhost:3000/a2a");
    expect(card.version).toBe("0.0.0");
    expect(card.protocolVersion).toBe("0.3.0");
    expect(card.capabilities).toBeDefined();
    expect(card.capabilities?.streaming).toBeUndefined();
    expect(card.capabilities?.extensions).toBeUndefined();
    expect(card.capabilities?.stateTransitionHistory).toBeUndefined();
    expect(card.defaultInputModes).toBeDefined();
    expect(card.defaultInputModes?.length).toBe(0);
    expect(card.defaultOutputModes).toBeDefined();
    expect(card.defaultOutputModes?.length).toBe(0);
    expect(card.skills).toBeDefined();
    expect(card.skills?.length).toBe(0);
  });
  it("should create full AgentCard", () => {
    const card: A2A.AgentCard = createAgentCard({
      name: "TestAgent",
      description: "A test agent for unit tests",
      url: "https://test-agent.example.com/api",
      version: "1.0.0",
      capabilities: {
        pushNotifications: true,
        streaming: true,
        extensions: [
          {
            uri: "test-extension",
            description: "A test extension for unit tests",
            required: true,
          },
        ],
        stateTransitionHistory: true,
      },
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"],
      skills: [
        {
          id: "test-skill",
          name: "Test Skill",
          description: "A test skill for unit tests",
        },
      ],
    });
    expect(card).toBeDefined();
    expect(card.name).toBe("TestAgent");
    expect(card.description).toBe("A test agent for unit tests");
    expect(card.url).toBe("https://test-agent.example.com/api");
    expect(card.version).toBe("1.0.0");
    expect(card.protocolVersion).toBe("0.3.0");
    expect(card.capabilities).toBeDefined();
    expect(card.capabilities?.streaming).toBe(true);
    expect(card.capabilities?.extensions).toEqual([
      {
        uri: "test-extension",
        description: "A test extension for unit tests",
        required: true,
      },
    ]);
    expect(card.capabilities?.extensions?.length).toBe(1);
    expect(card.capabilities?.stateTransitionHistory).toBe(true);
    expect(card.defaultInputModes).toBeDefined();
    expect(card.defaultInputModes?.length).toBe(1);
    expect(card.defaultInputModes?.[0]).toBe("text");
    expect(card.defaultOutputModes).toBeDefined();
    expect(card.defaultOutputModes?.length).toBe(1);
    expect(card.defaultOutputModes?.[0]).toBe("text");
    expect(card.skills).toBeDefined();
    expect(card.skills?.length).toBe(1);
    expect(card.skills?.[0].id).toBe("test-skill");
    expect(card.skills?.[0].name).toBe("Test Skill");
    expect(card.skills?.[0].description).toBe("A test skill for unit tests");
  });
  it("should create AgentServer", () => {
    const server = createAgentServer({
      agent: AgentBuilder()
        .text(() => "hello world!")
        .createAgent({
          agentCard: "TestAgent",
        }),
    });
    expect(server).toBeDefined();
  });
});
