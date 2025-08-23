/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  A2AServiceInterface as Agent,
  Command,
  ContextManagerInterface,
  FactoryParams as CreateAgentParams,
  State,
  Update,
} from "~/types/index.js";
import { createAgent } from "~/services/index.js";
import { v4 as uuidv4 } from "uuid";
import { ContextManager } from "~/services/index.js";

/**
 * A registry for agents allowing them to share a common context manager.
 */
export class AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  private contextManager: ContextManagerInterface<Command, State, Update>;
  constructor(
    contextManager: ContextManagerInterface<
      Command,
      State,
      Update
    > = new ContextManager()
  ) {
    this.contextManager = contextManager;
  }
  createAgent(
    id: string = uuidv4(),
    agentParams: Omit<CreateAgentParams, "contexts">
  ): Agent {
    const agent = createAgent({
      ...agentParams,
      contexts: this.contextManager,
    });
    this.agents.set(id, agent);
    return agent;
  }
  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }
  removeAgent(id: string): void {
    this.agents.delete(id);
  }
  getAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
  getAgentCount(): number {
    return this.agents.size;
  }
  getAgentIds(): string[] {
    return Array.from(this.agents.keys());
  }
  getRandomAgent(
    currentAgentid?: string
  ): { agent: Agent | undefined; id: string } | undefined {
    const agentIds = this.getAgentIds();
    const randomIndex = Math.floor(Math.random() * agentIds.length);
    const randomAgentId = agentIds[randomIndex];
    if (randomAgentId === currentAgentid) {
      return this.getRandomAgent(currentAgentid);
    }
    return { agent: this.getAgent(randomAgentId), id: randomAgentId };
  }
}
