import { AgentCard } from "../../src/index.js";

export const MOCK_AGENT_CARD: AgentCard = {
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
  skills: [],
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
  signatures: [],
};
