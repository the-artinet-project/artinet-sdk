/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ConnectionManagerInterface,
  CancellationManagerInterface,
  ContextManagerInterface,
  ServiceInterface,
  TaskManagerInterface,
  EventManagerOptions,
} from "../core/index.js";
import {
  AgentCard,
  MessageSendParams,
  SendMessageSuccessResult,
  Task,
  TaskIdParams,
} from "~/types/schemas/a2a/index.js";
import { UpdateEvent, Command, State, Update } from "./context.js";
import { A2AEngine } from "./engine.js";

export interface FactoryParams {
  agentCard: AgentCard;
  engine: A2AEngine;
  contexts?: ContextManagerInterface<Command, State, Update>;
  connections?: ConnectionManagerInterface;
  cancellations?: CancellationManagerInterface;
  tasks?: TaskManagerInterface<State>;
  methods?: Partial<MethodOptions>;
  events?: EventManagerOptions<Command, State, Update>;
}

export interface MethodParams {
  service: A2AServiceInterface<Command, State, Update>;
  engine: A2AEngine;
  contextManager: ContextManagerInterface<Command, State, Update>;
  signal: AbortSignal;
}

export interface MethodOptions {
  getTask: (
    input: TaskIdParams,
    params: Omit<MethodParams, "engine" | "contextManager" | "signal">
  ) => Promise<Task>;
  cancelTask: (
    input: TaskIdParams,
    params: Omit<MethodParams, "engine" | "signal">
  ) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    params: MethodParams
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    params: MethodParams
  ) => AsyncGenerator<UpdateEvent>;
  resubscribe: (
    input: TaskIdParams,
    params: MethodParams
  ) => AsyncGenerator<UpdateEvent>;
}

export interface MethodsInterface {
  getTask: (input: TaskIdParams) => Promise<Task>;
  cancelTask: (input: TaskIdParams) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) => AsyncGenerator<UpdateEvent>;
  resubscribe: (
    input: TaskIdParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) => AsyncGenerator<UpdateEvent>;
}

export interface A2AServiceInterface<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
> extends ServiceInterface<TCommand, TState, TUpdate>,
    MethodsInterface {
  readonly eventOverrides:
    | EventManagerOptions<TCommand, TState, TUpdate>
    | undefined;
  getAgentCard: () => AgentCard;
  addConnection: (id: string) => void;
  removeConnection: (id: string) => void;
  isCancelled: (id: string) => boolean;
  addCancellation: (id: string) => void;
  removeCancellation: (id: string) => void;
  getState: (id: string) => TState | undefined;
  setState: (id: string, data: TState) => void;
}
