/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  A2AServiceInterface,
  A2AEngine,
  AgentCard,
  ContextManagerInterface,
  ConnectionManagerInterface,
  CancellationManagerInterface,
  TaskManagerInterface,
  MethodOptions,
  TaskIdParams,
  A2A,
  EventManagerOptions,
  MethodParams,
  TaskQueryParams,
  MessageSendParamsSchema,
  TaskQueryParamsSchema,
  TaskIdParamsSchema,
} from "~/types/index.js";
import { coreExecute } from "~/services/core/execution/execute.js";
import { createMessageSendParams } from "./helpers/message-builder.js";
import { validateSchema } from "../../utils/common/schema-validation.js";

export class A2AService implements A2AServiceInterface {
  readonly agentCard: AgentCard;
  private engine: A2AEngine;
  private connections: ConnectionManagerInterface;
  private cancellations: CancellationManagerInterface;
  private tasks: TaskManagerInterface<A2A["state"]>;
  private contexts: ContextManagerInterface<
    A2A["command"],
    A2A["state"],
    A2A["update"]
  >;
  private methods: MethodOptions;
  readonly eventOverrides:
    | EventManagerOptions<A2A["command"], A2A["state"], A2A["update"]>
    | undefined;
  private enforceParamValidation: boolean = false;

  constructor(
    agentCard: AgentCard,
    engine: A2AEngine,
    contexts: ContextManagerInterface<
      A2A["command"],
      A2A["state"],
      A2A["update"]
    >,
    connections: ConnectionManagerInterface,
    cancellations: CancellationManagerInterface,
    tasks: TaskManagerInterface<A2A["state"]>,
    methods: MethodOptions,
    eventOverrides?: EventManagerOptions<
      A2A["command"],
      A2A["state"],
      A2A["update"]
    >,
    enforceParamValidation: boolean = false
  ) {
    this.engine = engine;
    this.agentCard = agentCard;
    this.contexts = contexts;
    this.connections = connections;
    this.cancellations = cancellations;
    this.tasks = tasks;
    this.methods = methods;
    this.eventOverrides = eventOverrides;
    this.enforceParamValidation = enforceParamValidation;
  }

  async execute(engine: A2AEngine, context: A2A["context"]): Promise<void> {
    await coreExecute(engine ?? this.engine, context);
  }

  async stop(): Promise<void> {
    const currentTasks = await this.tasks.getStates();
    for (const id of currentTasks) {
      this.addCancellation(id);
    }
    return;
  }

  addConnection(id: string): void {
    this.connections.addConnection(id);
  }

  removeConnection(id: string): void {
    this.connections.removeConnection(id);
  }

  isCancelled(id: string): boolean {
    return this.cancellations.isCancelled(id);
  }

  addCancellation(id: string): void {
    this.cancellations.addCancellation(id);
  }

  removeCancellation(id: string): void {
    this.cancellations.removeCancellation(id);
  }

  async getState(id: string): Promise<A2A["state"] | undefined> {
    return await this.tasks.getState(id);
  }

  async setState(id: string, data: A2A["state"]): Promise<void> {
    await this.tasks.setState(id, data);
  }

  async getTask(input: TaskQueryParams) {
    return await this.methods.getTask(
      this.enforceParamValidation
        ? await validateSchema(TaskQueryParamsSchema, input)
        : input,
      { service: this }
    );
  }

  async cancelTask(input: TaskIdParams) {
    return await this.methods.cancelTask(
      this.enforceParamValidation
        ? await validateSchema(TaskIdParamsSchema, input)
        : input,
      {
        service: this,
        contextManager: this.contexts,
      }
    );
  }

  async sendMessage(
    message: A2A["command"] | string,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    return await this.methods.sendMessage(
      this.enforceParamValidation
        ? await validateSchema(MessageSendParamsSchema, message)
        : createMessageSendParams(message),
      {
        ...params, //we may include additional params in the future that may not need to be handled by the service
        service: this,
        engine: params?.engine ?? this.engine,
        contextManager: this.contexts,
        signal: params?.signal ?? new AbortController().signal,
      }
    );
  }

  async *streamMessage(
    message: A2A["command"] | string,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    yield* this.methods.streamMessage(
      this.enforceParamValidation
        ? await validateSchema(MessageSendParamsSchema, message)
        : createMessageSendParams(message),
      {
        ...params,
        service: this,
        engine: params?.engine ?? this.engine,
        contextManager: this.contexts,
        signal: params?.signal ?? new AbortController().signal,
      }
    );
  }

  async *resubscribe(
    input: TaskIdParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    yield* this.methods.resubscribe(
      this.enforceParamValidation
        ? await validateSchema(TaskIdParamsSchema, input)
        : input,
      {
        ...params,
        service: this,
        engine: params?.engine ?? this.engine,
        contextManager: this.contexts,
        signal: params?.signal ?? new AbortController().signal,
      }
    );
  }
}
