/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2AService } from "../service.js";
import { ContextManager, ConnectionManager, CancellationManager, TaskManager, } from "../managers/index.js";
import { createMethods } from "./method.js";
export function createService(params) {
    return new A2AService(params.agentCard, params.engine, params.contexts ?? new ContextManager(), params.connections ?? new ConnectionManager(), params.cancellations ?? new CancellationManager(), params.tasks ?? new TaskManager(), createMethods(params.methods), params.events);
}
export const createAgent = createService;
