import { AgentCard, AgentCardSchema } from "../../../types/index.js";
import { publicProcedure } from "../transport.js";

const testAgentCard: AgentCard = {
  protocolVersion: "1.0.0",
  name: "Agent",
  description: "Agent",
  url: "https://agent.com",
  version: "1.0.0",
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
    extensions: [],
  },
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
  skills: [],
  signatures: [],
};

export const agentFAQRouter = publicProcedure
  .output(AgentCardSchema)
  .query(() => {
    return testAgentCard;
  });
