/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

export class AgentCardBuilder {
  agentCard: A2A.AgentCard;
  constructor(
    agentCard: Partial<A2A.AgentCard> & Required<Pick<A2A.AgentCard, "name">>
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
  valueOf(): A2A.AgentCard {
    return this.agentCard;
  }
}

export function createAgentCard(agentCard: A2A.AgentCardParams): A2A.AgentCard {
  return new AgentCardBuilder(
    typeof agentCard === "string" ? { name: agentCard } : agentCard
  ).valueOf();
}
