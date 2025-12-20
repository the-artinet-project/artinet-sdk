/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  A2AServiceInterface,
  A2AEngine,
  ContextManagerInterface,
  ConnectionManagerInterface,
  CancellationManagerInterface,
  TaskManagerInterface,
  MethodOptions,
  A2A,
  A2ARuntime,
  EventManagerOptions,
  MethodParams,
  UpdateEvent,
} from "~/types/index.js";
import { coreExecute, v2Execute } from "~/services/core/execution/execute.js";
import { createMessageSendParams } from "./helpers/message-builder.js";
import { validateSchema } from "../../utils/common/schema-validation.js";
export class A2AService implements A2AServiceInterface {
  readonly agentCard: A2A.AgentCard;
  private engine: A2AEngine;
  private connections: ConnectionManagerInterface;
  private cancellations: CancellationManagerInterface;
  private tasks: TaskManagerInterface<A2ARuntime["state"]>;
  private contexts: ContextManagerInterface<
    A2ARuntime["command"],
    A2ARuntime["state"],
    A2ARuntime["update"]
  >;
  private methods: MethodOptions;
  readonly eventOverrides:
    | EventManagerOptions<
        A2ARuntime["command"],
        A2ARuntime["state"],
        A2ARuntime["update"]
      >
    | undefined;
  private enforceParamValidation: boolean = false;

  constructor(
    agentCard: A2A.AgentCard,
    engine: A2AEngine,
    contexts: ContextManagerInterface<
      A2ARuntime["command"],
      A2ARuntime["state"],
      A2ARuntime["update"]
    >,
    connections: ConnectionManagerInterface,
    cancellations: CancellationManagerInterface,
    tasks: TaskManagerInterface<A2ARuntime["state"]>,
    methods: MethodOptions,
    eventOverrides?: EventManagerOptions<
      A2ARuntime["command"],
      A2ARuntime["state"],
      A2ARuntime["update"]
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

  async execute(
    engine: A2AEngine,
    context: A2ARuntime["context"]
  ): Promise<void> {
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

  async getState(id: string): Promise<A2ARuntime["state"] | undefined> {
    return await this.tasks.getState(id);
  }

  async setState(id: string, data: A2ARuntime["state"]): Promise<void> {
    await this.tasks.setState(id, data);
  }

  async getTask(input: A2A.TaskQueryParams) {
    return await this.methods.getTask(
      this.enforceParamValidation
        ? await validateSchema(A2A.TaskQueryParamsSchema, input)
        : input,
      { service: this }
    );
  }

  async cancelTask(input: A2A.TaskIdParams) {
    return await this.methods.cancelTask(
      this.enforceParamValidation
        ? await validateSchema(A2A.TaskIdParamsSchema, input)
        : input,
      {
        service: this,
        contextManager: this.contexts,
      }
    );
  }

  async sendMessage(
    message: A2ARuntime["command"] | string,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    return await this.methods.sendMessage(
      this.enforceParamValidation
        ? await validateSchema(A2A.MessageSendParamsSchema, message)
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
    message: A2ARuntime["command"] | string,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    yield* this.methods.streamMessage(
      this.enforceParamValidation
        ? await validateSchema(A2A.MessageSendParamsSchema, message)
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
    input: A2A.TaskIdParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) {
    yield* this.methods.resubscribe(
      this.enforceParamValidation
        ? await validateSchema(A2A.TaskIdParamsSchema, input)
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

import { v2 } from "~/types/interfaces/services/v2/index.js";
import { CANCEL_UPDATE } from "~/utils/common/constants.js";
import { v4 as uuidv4 } from "uuid";
import { Messenger } from "../core/v2/messenger.js";
import { INVALID_REQUEST, TASK_NOT_FOUND } from "~/utils/common/errors.js";

export interface ServiceOptions {
  abortSignal?: AbortSignal;
}

export class ServiceV2 implements v2.a2a.A2AServiceInterface {
  constructor(
    private _agentCard: A2A.AgentCard,
    private _engine: v2.a2a.Engine<v2.a2a.Context, UpdateEvent>,
    private _connections: v2.a2a.Connections,
    private _cancellations: v2.a2a.Cancellations,
    private _tasks: v2.a2a.Tasks,
    private _contexts: v2.a2a.Contexts,
    private _streams: v2.a2a.Streams,
    private _methods: Omit<v2.a2a.RequestHandler, "getAgentCard">,
    private _overrides?: Partial<Omit<v2.a2a.EventConsumer, "contextId">>
  ) {}

  get methods(): Omit<v2.a2a.RequestHandler, "getAgentCard"> {
    return this._methods;
  }

  set methods(methods: Partial<Omit<v2.a2a.RequestHandler, "getAgentCard">>) {
    this._methods = {
      ...this._methods,
      ...methods,
    };
  }

  get agentCard(): A2A.AgentCard {
    return this._agentCard;
  }

  get engine(): v2.a2a.Engine<v2.a2a.Context, UpdateEvent> {
    return this._engine;
  }
  set engine(engine: v2.a2a.Engine<v2.a2a.Context, UpdateEvent>) {
    this._engine = engine;
  }

  get connections(): v2.a2a.Connections {
    return this._connections;
  }

  get cancellations(): v2.a2a.Cancellations {
    return this._cancellations;
  }

  get tasks(): v2.a2a.Tasks {
    return this._tasks;
  }

  get contexts(): v2.a2a.Contexts {
    return this._contexts;
  }

  get streams(): v2.a2a.Streams {
    return this._streams;
  }

  get overrides():
    | Partial<Omit<v2.a2a.EventConsumer, "contextId">>
    | undefined {
    return this._overrides;
  }

  set overrides(overrides: Partial<Omit<v2.a2a.EventConsumer, "contextId">>) {
    this._overrides = {
      ...this._overrides,
      ...overrides,
    };
  }

  async execute({
    engine,
    context,
  }: {
    engine: v2.a2a.Engine<v2.a2a.Context, UpdateEvent>;
    context: v2.a2a.Context;
  }): Promise<void> {
    await v2Execute(engine, context);
  }

  async getAgentCard(): Promise<A2A.AgentCard> {
    return this.agentCard;
  }

  async stop(): Promise<void> {
    for (const context of await this.contexts.list()) {
      await context.publisher.onCancel(
        CANCEL_UPDATE(context.taskId, context.contextId, {
          role: "agent",
          parts: [
            {
              kind: "text",
              text: "service stopped",
            },
          ],
          messageId: uuidv4(),
          kind: "message",
          taskId: context.taskId,
          contextId: context.contextId,
        })
      );
    }
    return;
  }

  async getTask(
    params: A2A.TaskQueryParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): Promise<A2A.Task> {
    const task: A2A.Task | undefined = await this.tasks.get(params.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: params.id });
    }
    return await this.methods.getTask(
      await validateSchema(A2A.TaskQueryParamsSchema, params),
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(createMessageParams(task)),
        }))
    );
  }

  async cancelTask(
    params: A2A.TaskIdParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): Promise<A2A.Task> {
    const task: A2A.Task | undefined = await this.tasks.get(params.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: params.id });
    }
    return await this.methods.cancelTask(
      await validateSchema(A2A.TaskIdParamsSchema, params),
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(createMessageParams(task)),
        }))
    );
  }

  sendMessage(
    params: A2A.MessageSendParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  sendMessage(
    message: string,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  async sendMessage(
    paramsOrMessage: A2A.MessageSendParams | string,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    const params =
      typeof paramsOrMessage === "string"
        ? createMessageSendParams(paramsOrMessage)
        : paramsOrMessage;
    return await this._sendMessage(params, context, options);
  }

  async _sendMessage(
    params: A2A.MessageSendParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    const task: A2A.Task = await this.tasks.create({
      id: params.message.taskId,
      contextId: params.message.contextId,
      history: [params.message],
      metadata: {
        ...params.metadata,
      },
    });
    return await this.methods.sendMessage(
      await validateSchema(A2A.MessageSendParamsSchema, params),
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(params),
          references: await getReferences(
            this.tasks,
            params.message.referenceTaskIds
          ),
          extensions: await getExtensions(params.message.extensions),
        }))
    );
  }

  streamMessage(
    params: A2A.MessageSendParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): AsyncGenerator<UpdateEvent>;

  streamMessage(
    message: string,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): AsyncGenerator<UpdateEvent>;

  async *streamMessage(
    paramsOrMessage: A2A.MessageSendParams | string,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): AsyncGenerator<UpdateEvent> {
    const params =
      typeof paramsOrMessage === "string"
        ? createMessageSendParams(paramsOrMessage)
        : paramsOrMessage;
    yield* this._streamMessage(params, context, options);
  }

  async *_streamMessage(
    params: A2A.MessageSendParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): AsyncGenerator<UpdateEvent> {
    const task = await this.tasks.create({
      id: params.message.taskId,
      contextId: params.message.contextId,
      history: [params.message],
      metadata: {
        ...params.metadata,
      },
    });
    yield* this.methods.streamMessage(
      await validateSchema(A2A.MessageSendParamsSchema, params),
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(params),
          references: await getReferences(
            this.tasks,
            params.message.referenceTaskIds
          ),
          extensions: await getExtensions(params.message.extensions),
        }))
    );
  }

  async *resubscribe(
    params: A2A.TaskIdParams,
    context?: v2.a2a.Context,
    options?: ServiceOptions
  ): AsyncGenerator<UpdateEvent> {
    const task: A2A.Task | undefined = await this.tasks.get(params.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: params.id });
    }
    yield* this.methods.resubscribe(
      await validateSchema(A2A.TaskIdParamsSchema, params),
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(createMessageParams(task)),
        }))
    );
  }
}

const upsertTask = async (
  tasks: v2.a2a.Tasks,
  taskId?: string
): Promise<A2A.Task> => {
  throw new Error("Not implemented");
};

const getReferences = async (
  tasks: v2.a2a.Tasks,
  referenceTaskIds?: string[]
): Promise<A2A.Task[]> => {
  throw new Error("Not implemented");
};

const getExtensions = async (
  extensions?: string[]
): Promise<A2A.AgentExtension[]> => {
  throw new Error("Not implemented");
};

const createMessageParams = (task: A2A.Task) => {
  const latestUserMessage: A2A.Message | undefined = task.history
    ?.filter((msg) => msg.role === "user")
    ?.pop();

  if (!latestUserMessage) {
    throw INVALID_REQUEST("No user message found");
  }

  const messageParams: A2ARuntime["command"] = {
    message: {
      ...latestUserMessage,
      taskId: task.id,
      contextId: latestUserMessage.contextId ?? task.contextId,
    },
    metadata: task.metadata,
  };
  return messageParams;
};
