/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { createMessageSendParams } from "./helpers/message-builder.js";
import { validateSchema } from "~/utils/common/schema-validation.js";
import { CANCEL_UPDATE } from "~/utils/common/constants.js";
import { INVALID_REQUEST, TASK_NOT_FOUND } from "~/utils/common/errors.js";
import { v4 as uuidv4 } from "uuid";
import { Messenger } from "./messenger.js";
import { execute } from "./execute.js";
import { createService, ServiceParams } from "./factory/service.js";
import { getReferences } from "./helpers/references.js";
import { logger } from "~/config/index.js";

const createMessageParams = (task: A2A.Task) => {
  const latestUserMessage: A2A.Message | undefined = task.history
    ?.filter((msg) => msg.role === "user")
    ?.pop();

  if (!latestUserMessage) {
    throw INVALID_REQUEST("No user message found");
  }

  const messageParams: A2A.MessageSendParams = {
    message: {
      ...latestUserMessage,
      taskId: task.id,
      contextId: latestUserMessage.contextId ?? task.contextId,
    },
    metadata: task.metadata,
  };
  return messageParams;
};

/**
 * @note Comprehensive Extension system coming in a future release
 */
const getExtensions = async (
  extensions?: string[]
): Promise<A2A.AgentExtension[]> => {
  logger.warn("getExtensions: not implemented", { extensions });
  return [];
};

export interface ServiceOptions {
  abortSignal?: AbortSignal;
}

export class Service implements A2A.Service {
  constructor(
    private _agentCard: A2A.AgentCard,
    private _engine: A2A.Engine,
    private _connections: A2A.Connections,
    private _cancellations: A2A.Cancellations,
    private _tasks: A2A.Tasks,
    private _contexts: A2A.Contexts,
    private _streams: A2A.Streams,
    private _methods: Omit<A2A.RequestHandler, "getAgentCard">,
    private _overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>
  ) {}

  get methods(): Omit<A2A.RequestHandler, "getAgentCard"> {
    return this._methods;
  }

  set methods(methods: Partial<Omit<A2A.RequestHandler, "getAgentCard">>) {
    this._methods = {
      ...this._methods,
      ...methods,
    };
  }

  get agentCard(): A2A.AgentCard {
    return this._agentCard;
  }

  get engine(): A2A.Engine {
    return this._engine;
  }
  set engine(engine: A2A.Engine) {
    this._engine = engine;
  }

  get connections(): A2A.Connections {
    return this._connections;
  }

  get cancellations(): A2A.Cancellations {
    return this._cancellations;
  }

  get tasks(): A2A.Tasks {
    return this._tasks;
  }

  get contexts(): A2A.Contexts {
    return this._contexts;
  }

  get streams(): A2A.Streams {
    return this._streams;
  }

  get overrides(): Partial<Omit<A2A.EventConsumer, "contextId">> | undefined {
    return this._overrides;
  }

  set overrides(overrides: Partial<Omit<A2A.EventConsumer, "contextId">>) {
    this._overrides = {
      ...this._overrides,
      ...overrides,
    };
  }

  async execute({
    engine,
    context,
  }: {
    engine: A2A.Engine;
    context: A2A.Context;
  }): Promise<void> {
    await execute(engine, context);
  }

  async getAgentCard(): Promise<A2A.AgentCard> {
    return this.agentCard;
  }

  async stop(): Promise<void> {
    logger.info(`Service[stop]`);
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
    context?: A2A.Context,
    options?: ServiceOptions
  ): Promise<A2A.Task> {
    logger.info(`Service[getTask]:`, { taskId: params.id });
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
    context?: A2A.Context,
    options?: ServiceOptions
  ): Promise<A2A.Task> {
    logger.info(`Service[cancelTask]:`, { taskId: params.id });
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
    context?: A2A.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  sendMessage(
    message: string,
    context?: A2A.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  async sendMessage(
    paramsOrMessage: A2A.MessageSendParams | string,
    context?: A2A.Context,
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
    context?: A2A.Context,
    options?: ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    logger.info(`Service[sendMessage]:`, {
      messageId: params.message.messageId,
    });
    logger.debug(`Service[sendMessage]:`, { taskId: params.message.taskId });
    logger.debug(`Service[sendMessage]:`, {
      contextId: params.message.contextId,
    });
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
    context?: A2A.Context,
    options?: ServiceOptions
  ): AsyncGenerator<A2A.Update>;

  streamMessage(
    message: string,
    context?: A2A.Context,
    options?: ServiceOptions
  ): AsyncGenerator<A2A.Update>;

  async *streamMessage(
    paramsOrMessage: A2A.MessageSendParams | string,
    context?: A2A.Context,
    options?: ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    const params =
      typeof paramsOrMessage === "string"
        ? createMessageSendParams(paramsOrMessage)
        : paramsOrMessage;
    yield* this._streamMessage(params, context, options);
  }

  async *_streamMessage(
    params: A2A.MessageSendParams,
    context?: A2A.Context,
    options?: ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    logger.info("Service[streamMessage]:", {
      taskId: params.message.taskId,
      contextId: params.message.contextId,
    });
    const task = await this.tasks.create({
      id: params.message.taskId,
      contextId: params.message.contextId,
      history: [params.message],
      metadata: {
        ...params.metadata,
      },
    });
    logger.debug("Service[streamMessage]: task created", {
      taskId: task.id,
      contextId: task.contextId,
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
    context?: A2A.Context,
    options?: ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    logger.info(`Service[resubscribe]:`, { taskId: params.id });
    const task: A2A.Task | undefined = await this.tasks.get(params.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: params.id });
    }
    logger.debug("Service[resubscribe]:", {
      taskId: task.id,
      contextId: task.contextId,
    });
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

  static create(params: ServiceParams): Service {
    return createService(params);
  }
}
