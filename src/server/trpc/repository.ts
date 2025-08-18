import {
  A2AServiceInterface,
  ContextManagerInterface,
  ExecutionContextManager,
} from "./protocol/index.js";
import { createA2AService, defaultAgentCard } from "./procs/a2a/service.js";

export class Repository {
  private service: A2AServiceInterface;
  private contextManager: ContextManagerInterface;

  constructor() {
    this.contextManager = new ExecutionContextManager();
    this.service = createA2AService({
      agentCard: defaultAgentCard,
      contexts: this.contextManager,
    });
  }
  getService() {
    return this.service;
  }
  getContextManager() {
    return this.contextManager;
  }
}

export const globalRepository = new Repository();
