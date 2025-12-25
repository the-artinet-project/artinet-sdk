/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

//lets stay really granular with the imports
import {
  AgentCard,
  Message,
  Task,
  AgentExtension,
  TaskQueryParams,
  TaskIdParams,
  MessageSendParams,
  SendMessageSuccessResult,
  TaskArtifactUpdateEventSchema,
  MessageSchema,
  TaskSchema,
  TaskStatusUpdateEventSchema,
} from "@artinet/types/a2a";
import { core } from "../core/index.js";
import { z } from "zod/v4";

export type AgentCardParams =
  | (Partial<AgentCard> & Required<Pick<AgentCard, "name">>)
  | string;

export const UpdateSchema = z.discriminatedUnion("kind", [
  MessageSchema,
  TaskSchema,
  TaskStatusUpdateEventSchema,
  TaskArtifactUpdateEventSchema,
]);
export type Update = z.infer<typeof UpdateSchema>;

export type Engine = (
  context: Context
) => AsyncGenerator<Update, void, unknown>;

export interface BaseContext extends core.Context<Task> {
  readonly service: Service;
  readonly publisher: EventPublisher;
}

export interface Context extends BaseContext {
  readonly taskId: string;
  readonly userMessage: Message;
  readonly messages: MessageConsumerProxy;
  extensions?: AgentExtension[];
  references?: Task[];
  getTask: () => Promise<Task>;
}

export type ContextParams = Omit<
  BaseContext,
  "publisher" | "isCancelled" | "getState" | "abortSignal"
> &
  Omit<Partial<Context>, "userMessage"> & {
    messenger: MessageConsumerProxy;
    task?: Task;
    overrides?: Partial<Omit<EventConsumer, "contextId">>;
    abortSignal?: AbortSignal;
  };

export interface Contexts extends core.Contexts<Context> {
  create: (params: ContextParams) => Promise<Context>;
  list: () => Promise<Context[]>;
}

export interface Tasks extends core.Manager<Task> {
  update: (context: Context, update: Update) => Promise<Task>;
  create: (params: Partial<Task>) => Promise<Task>;
  has: (id: string) => Promise<boolean>;
}

export interface Cancellations extends Omit<core.Manager<void>, "get"> {
  has: (id: string) => Promise<boolean>;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Connections extends Omit<core.Manager<void>, "get"> {}

export interface ServiceOptions {
  abortSignal?: AbortSignal;
}
export interface RequestHandler {
  getTask: (
    input: TaskQueryParams,
    context?: Context,
    options?: ServiceOptions
  ) => Promise<Task>;
  cancelTask: (
    input: TaskIdParams,
    context?: Context,
    options?: ServiceOptions
  ) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    context?: Context,
    options?: ServiceOptions
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    context?: Context,
    options?: ServiceOptions
  ) => AsyncGenerator<Update>;
  resubscribe: (
    input: TaskIdParams,
    context?: Context,
    options?: ServiceOptions
  ) => AsyncGenerator<Update>;
  getAgentCard: () => Promise<AgentCard>;
}

export interface ExtendedHandler extends RequestHandler {
  getAuthenticatedExtendedCard: () => Promise<AgentCard>;
}

export interface Stream {
  readonly contextId: string;
  isAlive: boolean;
  kill: () => Promise<void>;
  updates: Update[];
  context: Context;
  run: (params: { service: Service }) => AsyncGenerator<Update>;
  subscribe: () => AsyncGenerator<Update>;
}

export interface Streams extends Omit<core.Manager<Stream>, "set"> {
  create: (
    params: core.Optional<Stream> & { context: Context }
  ) => Promise<Stream>;
  has: (id: string) => Promise<boolean>;
}

export interface Service
  extends core.Service<{
      engine: Engine;
      context: Context;
    }>,
    RequestHandler {
  readonly events?: Events;
  readonly connections: Connections;
  readonly cancellations: Cancellations;
  readonly tasks: Tasks;
  readonly contexts: Contexts;
  readonly streams: Streams;
  engine: Engine;
  agentCard: AgentCard;
}

export interface MessageProducer {
  isOpen: boolean;
  send: (message: MessageSendParams) => Promise<void>;
}

export type MessageMap = {
  message: [MessageSendParams];
  close: [];
};

export interface MessageConsumer
  extends core.Consumer<MessageSendParams, MessageMap> {
  message: MessageSendParams;
  messages: MessageSendParams[];
  close: () => Promise<void>;
  next: () => Promise<IteratorResult<MessageSendParams>>;
  return: (
    value: MessageSendParams
  ) => Promise<IteratorResult<MessageSendParams>>;
}
export type MessageConsumerProxy = MessageConsumer & MessageSendParams;

export interface EventConsumer {
  readonly contextId: string;
  readonly onStart?: (context: Context) => Promise<Task>;
  readonly onCancel: (update: Update, current: Task) => Promise<void>;
  readonly onUpdate: (update: Update, current: Task) => Promise<Task>;
  readonly onError: (error: any, current: Task) => Promise<void>;
  onComplete: (current: Task) => Promise<void>;
}

export type Emissions = {
  start: [MessageSendParams, Task];
  cancel: [Update];
  update: [Task, Update];
  error: [any, Task];
  complete: [Task];
};

export interface EventPublisher
  extends Omit<
      EventConsumer,
      "onComplete" | "onCancel" | "onError" | "onUpdate"
    >,
    core.Publisher<Emissions> {
  readonly onStart?: (context: Context) => Promise<Task>;
  readonly onCancel: (update: Update) => Promise<void>;
  readonly onUpdate: (update: Update) => Promise<Task>;
  readonly onError: (error: any) => Promise<void>;
  onComplete: () => Promise<void>;
}

export interface Events extends core.Manager<EventPublisher> {
  create: (params: core.Optional<EventPublisher>) => Promise<EventPublisher>;
}
export * from "@artinet/types/a2a";
