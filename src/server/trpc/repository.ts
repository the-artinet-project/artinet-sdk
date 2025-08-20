import {
  A2AServiceInterface,
  ContextManagerInterface,
  ExecutionContextManager,
} from "./protocol/index.js";
import { createA2AService } from "./procs/a2a/service.js";
import { AgentCard } from "../../types/index.js";
import { engine as defaultEngine } from "./test-engine.js";

export const defaultAgentCard: AgentCard = {
  protocolVersion: "0.3.0",
  name: "A2A Server",
  description: "A general-purpose A2A protocol server",
  version: "0.1.0",
  url: "http://localhost",
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
    extensions: [],
  },
  skills: [],
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
};

export class Repository {
  private service: A2AServiceInterface;
  private contextManager: ContextManagerInterface;

  constructor() {
    this.contextManager = new ExecutionContextManager();
    this.service = createA2AService({
      agentCard: defaultAgentCard,
      agent: defaultEngine,
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
