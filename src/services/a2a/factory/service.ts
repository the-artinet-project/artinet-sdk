/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { createHandler } from "./handler.js";
import { createAgentCard } from "../helpers/agentcard-builder.js";

import { A2A } from "~/types/index.js";
import { Service } from "../service.js";
import {
  Contexts,
  Streams,
  Connections,
  Cancellations,
  Tasks,
} from "../managers.js";
export type AgentCardParams =
  | (Partial<A2A.AgentCard> & Required<Pick<A2A.AgentCard, "name">>)
  | string;

export interface ServiceParams {
  agentCard: AgentCardParams;
  engine: A2A.Engine;
  contexts?: A2A.Contexts;
  streams?: A2A.Streams;
  connections?: A2A.Connections;
  cancellations?: A2A.Cancellations;
  tasks?: A2A.Tasks;
  methods?: Omit<A2A.RequestHandler, "getAgentCard">;
  overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>;
}
export type CreateAgentParams = ServiceParams;

export function createService(params: ServiceParams) {
  return new Service(
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
export const createAgent = createService;
export type AgentHandler = ReturnType<typeof createService>;
/**
 * @deprecated Use AgentHandler instead
 */
export type AgentImpl = AgentHandler;
