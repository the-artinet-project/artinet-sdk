import { FactoryParams, Command, State, Update } from "~/types/index.js";
import { A2AService } from "../service.js";
import {
  ContextManager,
  ConnectionManager,
  CancellationManager,
  TaskManager,
} from "../managers/index.js";
import { createMethods } from "./method.js";

export function createService(params: FactoryParams) {
  return new A2AService(
    params.agentCard,
    params.agent,
    params.contexts ?? new ContextManager<Command, State, Update>(),
    params.connections ?? new ConnectionManager(),
    params.cancellations ?? new CancellationManager(),
    params.tasks ?? new TaskManager(),
    createMethods(params.methods)
  );
}
