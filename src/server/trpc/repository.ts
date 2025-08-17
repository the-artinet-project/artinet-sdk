import {
  A2AServiceInterface,
  ContextManager,
  ExecutionContextManager,
} from "./protocol/index.js";
import { A2AServiceImpl } from "./procs/a2a/service.js";

export class Repository {
  private service: A2AServiceInterface;
  private contextManager: ContextManager;

  constructor() {
    this.contextManager = new ExecutionContextManager();
    this.service = new A2AServiceImpl(this.contextManager);
  }
  getService() {
    return this.service;
  }
  getContextManager() {
    return this.contextManager;
  }
}

export const globalRepository = new Repository();
