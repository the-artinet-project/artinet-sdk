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
  ) {
    const agent = createAgent({
      ...agentParams,
      contexts: this.contextManager,
    });
    this.agents.set(id, agent);
    return agent;
  }
  getAgent(id: string) {
    return this.agents.get(id);
  }
  removeAgent(id: string) {
    this.agents.delete(id);
  }
  getAgents() {
    return Array.from(this.agents.values());
  }
  getAgentCount() {
    return this.agents.size;
  }
  getAgentIds() {
    return Array.from(this.agents.keys());
  }
}
