/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

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
    params.engine,
    params.contexts ?? new ContextManager<Command, State, Update>(),
    params.connections ?? new ConnectionManager(),
    params.cancellations ?? new CancellationManager(),
    params.tasks ?? new TaskManager(),
    createMethods(params.methods),
    params.events
  );
}
export const createAgent = createService;
export type AgentImpl = ReturnType<typeof createAgent>;
