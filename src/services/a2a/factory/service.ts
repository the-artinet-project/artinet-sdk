/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryParams, A2ARuntime } from "~/types/index.js";
import { A2AService } from "../service.js";
import {
  ContextManager,
  ConnectionManager,
  CancellationManager,
  TaskManager,
} from "../managers/index.js";
import { createHandler, createMethods } from "./method.js";
import { createAgentCard } from "../helpers/agentcard-builder.js";
export function createService(params: FactoryParams) {
  return new A2AService(
    createAgentCard(params.agentCard),
    params.engine,
    params.contexts ??
      new ContextManager<
        A2ARuntime["command"],
        A2ARuntime["state"],
        A2ARuntime["update"]
      >(),
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

import { A2A, UpdateEvent } from "~/types/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { ServiceV2 } from "../service.js";
import {
  Contexts,
  Streams,
  Connections,
  Cancellations,
  Tasks,
} from "~/services/core/v2/managers.js";
export type AgentCardParams =
  | (Partial<A2A.AgentCard> & Required<Pick<A2A.AgentCard, "name">>)
  | string;

export interface ServiceParams {
  agentCard: AgentCardParams;
  engine: v2.a2a.Engine<v2.a2a.Context, UpdateEvent>;
  contexts?: v2.a2a.Contexts;
  streams?: v2.a2a.Streams;
  connections?: v2.a2a.Connections;
  cancellations?: v2.a2a.Cancellations;
  tasks?: v2.a2a.Tasks;
  methods?: Omit<v2.a2a.RequestHandler, "getAgentCard">;
  overrides?: Partial<Omit<v2.a2a.EventConsumer, "contextId">>;
}
export function createServiceV2(params: ServiceParams) {
  return new ServiceV2(
    createAgentCard(params.agentCard),
    params.engine,
    params.connections ?? new Connections(),
    params.cancellations ?? new Cancellations(),
    params.tasks ?? new Tasks(),
    params.contexts ?? new Contexts(),
    params.streams ?? new Streams(),
    createHandler(params.methods),
    params.overrides
  );
}
