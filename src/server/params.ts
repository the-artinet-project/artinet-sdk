import { A2A } from "~/types/index.js";
import {
  Agent,
  ServiceParams as CreateAgentParams,
  Service,
  createAgent,
} from "~/services/a2a/index.js";
import { ExtendedAgentCardProvider } from "@a2a-js/sdk/server";
import { UserBuilder } from "@a2a-js/sdk/server/express";

export interface ServerParams {
  basePath?: string;
  port?: number;
  /**
   * Your agentCard must have {@link A2A.AgentCard.supportsAuthenticatedExtendedCard} set to true
   */
  extendedAgentCard?: A2A.AgentCard | ExtendedAgentCardProvider;
  agent: Agent | CreateAgentParams;
  agentCardPath?: string;
  register?: boolean;
  userBuilder?: UserBuilder;
}

export function isCreateAgentParams(
  agentOrParams: Agent | CreateAgentParams
): agentOrParams is CreateAgentParams {
  return (
    agentOrParams &&
    typeof agentOrParams === "object" &&
    "engine" in agentOrParams &&
    typeof agentOrParams.engine === "function" &&
    "agentCard" in agentOrParams &&
    typeof agentOrParams.agentCard === "object"
  );
}

export function ensureAgent(agentOrParams: Agent | CreateAgentParams): Agent {
  if (agentOrParams instanceof Service) {
    return agentOrParams;
  } else if (isCreateAgentParams(agentOrParams)) {
    return createAgent(agentOrParams);
  }
  throw new Error("invalid agent or params");
}

export async function registerAgent(agentCard: A2A.AgentCard) {
  return Promise.resolve(agentCard);
}
