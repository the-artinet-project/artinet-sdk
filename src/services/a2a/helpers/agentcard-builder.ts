import { AgentCard, AgentCardParams } from "~/types/index.js";

export class AgentCardBuilder {
  agentCard: AgentCard;
  constructor(
    agentCard: Partial<AgentCard> & Required<Pick<AgentCard, "name">>
  ) {
    this.agentCard = {
      ...agentCard,
      protocolVersion: agentCard.protocolVersion ?? "0.3.0",
      description:
        agentCard.description ?? "An agent that can use the A2A protocol.",
      url: agentCard.url ?? "https://localhost:3000/a2a",
      version: agentCard.version ?? "0.0.0",
      capabilities: agentCard.capabilities ?? {},
      defaultInputModes: agentCard.defaultInputModes ?? [],
      defaultOutputModes: agentCard.defaultOutputModes ?? [],
      skills: agentCard.skills ?? [],
      preferredTransport: agentCard.preferredTransport ?? "JSONRPC",
    };
  }
  valueOf(): AgentCard {
    return this.agentCard;
  }
}

export function createAgentCard(agentCard: AgentCardParams): AgentCard {
  return new AgentCardBuilder(
    typeof agentCard === "string" ? { name: agentCard } : agentCard
  ).valueOf();
}
