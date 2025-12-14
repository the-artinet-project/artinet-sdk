/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryParams, A2A } from "~/types/index.js";
import { A2AService } from "../service.js";
import {
  ContextManager,
  ConnectionManager,
  CancellationManager,
  TaskManager,
} from "../managers/index.js";
import { createMethods } from "./method.js";
import { createAgentCard } from "../helpers/agentcard-builder.js";
export function createService(params: FactoryParams) {
  return new A2AService(
    createAgentCard(params.agentCard),
    params.engine,
    params.contexts ??
      new ContextManager<A2A["command"], A2A["state"], A2A["update"]>(),
    params.connections ?? new ConnectionManager(),
    params.cancellations ?? new CancellationManager(),
    params.tasks ?? new TaskManager(),
    createMethods(params.methods),
    params.events,
    params.enforceParamValidation ?? false
  );
}
export const createAgent = createService;
export type AgentImpl = ReturnType<typeof createAgent>;
