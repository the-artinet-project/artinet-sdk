/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

export type AgentCardParams =
  | (Partial<A2A.AgentCard> & Required<Pick<A2A.AgentCard, "name">>)
  | string;

export const isAgentCardParams = (params: any): params is AgentCardParams => {
  return (
    typeof params === "string" ||
    (typeof params === "object" && params !== null && "name" in params)
  );
};

export class AgentCard {
  private readonly _agentCard: A2A.AgentCard;
  constructor(
    params: Partial<A2A.AgentCard> & Required<Pick<A2A.AgentCard, "name">>
  ) {
    this._agentCard = {
      protocolVersion: "0.3.0",
      description: "An agent that can use the A2A protocol.",
      url: "https://localhost:3000/a2a",
      version: "0.0.0",
      capabilities: {},
      defaultInputModes: [],
      defaultOutputModes: [],
      skills: [],
      preferredTransport: "JSONRPC",
      ...params,
    };
  }
  get agentCard(): A2A.AgentCard {
    return this._agentCard;
  }
  static create(params: AgentCardParams): A2A.AgentCard {
    return new AgentCard(typeof params === "string" ? { name: params } : params)
      .agentCard;
  }
}

/**
 * @deprecated Use {@link card} instead
 * @since 0.6.0
 */
export const AgentCardBuilder = AgentCard;

/**
 * Convenience factory function for creating an {@link A2A.AgentCard} with default parameters.
 *
 * @returns New {@link A2A.AgentCard} with default parameters
 * @defaults {
 *   description: "An agent that can use the A2A protocol.",
 *   url: "https://localhost:3000/a2a",
 *   version: "0.0.0",
 *   capabilities: {},
 *   defaultInputModes: [],
 *   defaultOutputModes: [],
 *   skills: [],
 *   preferredTransport: "JSONRPC",
 * }
 *
 * @example
 * ```typescript
 * const agentCard = card("My Agent");
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const card = AgentCard.create;

/**
 * @deprecated Use {@link card} instead
 * @since 0.6.0
 */
export const createAgentCard = AgentCard.create;
