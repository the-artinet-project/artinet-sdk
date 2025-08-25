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
  TaskAndHistory,
  TaskIdParams,
  MessageSendParams,
  Command,
  State,
  Update,
  CoreContext,
  EventManagerOptions,
  MethodParams,
} from "~/types/index.js";
import { coreExecute } from "~/services/core/execution/execute.js";

export class A2AService implements A2AServiceInterface {
  private agentInfo: AgentCard;
  private engine: A2AEngine;
  private connections: ConnectionManagerInterface;
  private cancellations: CancellationManagerInterface;
  private tasks: TaskManagerInterface<TaskAndHistory>;
  private contexts: ContextManagerInterface<Command, State, Update>;
  private methods: MethodOptions;
  readonly eventOverrides:
    | EventManagerOptions<Command, State, Update>
    | undefined;

  constructor(
    agentCard: AgentCard,
    engine: A2AEngine,
    contexts: ContextManagerInterface<Command, State, Update>,
    connections: ConnectionManagerInterface,
    cancellations: CancellationManagerInterface,
    tasks: TaskManagerInterface<TaskAndHistory>,
    methods: MethodOptions,
    eventOverrides?: EventManagerOptions<Command, State, Update>
  ) {
    this.engine = engine;
    this.agentInfo = agentCard;
    this.contexts = contexts;
    this.connections = connections;
    this.cancellations = cancellations;
    this.tasks = tasks;
    this.methods = methods;
    this.eventOverrides = eventOverrides;
  }

  async execute(
    engine: A2AEngine,
    context: CoreContext<Command, State, Update>
  ): Promise<void> {
    await coreExecute(engine ?? this.engine, context);
  }

  async stop(): Promise<void> {
    const currentTasks = this.tasks.getTasks();
    for (const id of currentTasks) {
      this.addCancellation(id);
    }
    return;
  }

  get agentCard(): AgentCard {
    return this.agentInfo;
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

  getState(id: string) {
    return this.tasks.getState(id);
  }

  setState(id: string, data: TaskAndHistory): void {
    this.tasks.setState(id, data);
  }

  async getTask(input: TaskIdParams) {
    return await this.methods.getTask(input, { service: this });
  }

  async cancelTask(input: TaskIdParams) {
    return await this.methods.cancelTask(input, {
      service: this,
      contextManager: this.contexts,
    });
  }

  async sendMessage(
    message: MessageSendParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    return await this.methods.sendMessage(message, {
      ...params, //we may include additional params in the future that may not need to be handled by the service
      service: this,
      engine: params?.engine ?? this.engine,
      contextManager: this.contexts,
      signal: params?.signal ?? new AbortController().signal,
    });
  }

  async *streamMessage(
    message: MessageSendParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    yield* this.methods.streamMessage(message, {
      ...params,
      service: this,
      engine: params?.engine ?? this.engine,
      contextManager: this.contexts,
      signal: params?.signal ?? new AbortController().signal,
    });
  }

  async *resubscribe(
    input: TaskIdParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    yield* this.methods.resubscribe(input, {
      ...params,
      service: this,
      engine: params?.engine ?? this.engine,
      contextManager: this.contexts,
      signal: params?.signal ?? new AbortController().signal,
    });
  }
}
