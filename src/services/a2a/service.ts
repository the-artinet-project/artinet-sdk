/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { validateSchema } from "~/utils/common/schema-validation.js";
import * as describe from "~/create/describe.js";
import { INVALID_REQUEST, TASK_NOT_FOUND } from "~/utils/common/errors.js";
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
  _extensions?: string[]
): Promise<A2A.AgentExtension[]> => {
  // logger.warn("getExtensions: not implemented", { extensions });
  return [];
};

/**
 * @note We endeavor to remove all optional parameters from below this class.
 * This will allow the service to act as the boundary to our Hexagonal Architecture.
 */
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

  set contexts(contexts: A2A.Contexts) {
    this._contexts = {
      ...this._contexts,
      ...contexts,
    };
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
        describe.update.canceled({
          contextId: context.contextId,
          taskId: context.taskId,
          message: describe.message("service stopped"),
        })
      );
    }
    return;
  }

  async getTask(
    params: A2A.TaskQueryParams,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): Promise<A2A.Task> {
    const taskParams: A2A.TaskQueryParams = await validateSchema(
      A2A.TaskQueryParamsSchema,
      params
    );

    logger.info(`Service[getTask]:`, { taskId: taskParams.id });

    const task: A2A.Task | undefined = await this.tasks.get(taskParams.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: taskParams.id });
    }

    return await this.methods.getTask(
      taskParams,
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
    options?: A2A.ServiceOptions
  ): Promise<A2A.Task> {
    const taskParams: A2A.TaskIdParams = await validateSchema(
      A2A.TaskIdParamsSchema,
      params
    );

    logger.info(`Service[cancelTask]:`, { taskId: taskParams.id });

    const task: A2A.Task | undefined = await this.tasks.get(taskParams.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: taskParams.id });
    }

    return await this.methods.cancelTask(
      taskParams,
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
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  sendMessage(
    message: string | A2A.MessageSendParams["message"],
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  async sendMessage(
    paramsOrMessage:
      | A2A.MessageSendParams
      | A2A.MessageSendParams["message"]
      | string,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    const params = describe.messageSendParams(paramsOrMessage);
    return await this._sendMessage(params, context, options);
  }

  protected async _sendMessage(
    params: A2A.MessageSendParams,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    const messageParams: A2A.MessageSendParams = await validateSchema(
      A2A.MessageSendParamsSchema,
      params
    );

    logger.info(`Service[sendMessage]:`, {
      messageId: messageParams.message.messageId,
    });

    logger.debug(`Service[sendMessage]:`, {
      taskId: messageParams.message.taskId,
    });

    logger.debug(`Service[sendMessage]:`, {
      contextId: messageParams.message.contextId,
    });

    const task: A2A.Task = await this.tasks.create({
      id: messageParams.message.taskId,
      contextId: messageParams.message.contextId,
      history: [messageParams.message],
      metadata: {
        ...messageParams.metadata,
      },
    });

    return await this.methods.sendMessage(
      messageParams,
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(messageParams),
          references: await getReferences(
            this.tasks,
            messageParams.message.referenceTaskIds
          ),
          extensions: await getExtensions(messageParams.message.extensions),
        }))
    );
  }

  streamMessage(
    params: A2A.MessageSendParams,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update>;

  streamMessage(
    message: string,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update>;

  async *streamMessage(
    paramsOrMessage: A2A.MessageSendParams | string,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    const params = describe.messageSendParams(paramsOrMessage);
    yield* this.sendMessageStream(params, context, options);
  }

  async *sendMessageStream(
    params: A2A.MessageSendParams,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    const messageParams: A2A.MessageSendParams = await validateSchema(
      A2A.MessageSendParamsSchema,
      params
    );

    logger.info("Service[streamMessage]:", {
      taskId: messageParams.message.taskId,
      contextId: messageParams.message.contextId,
    });

    const task: A2A.Task = await this.tasks.create({
      id: messageParams.message.taskId,
      contextId: messageParams.message.contextId,
      history: [messageParams.message],
      metadata: {
        ...messageParams.metadata,
      },
    });

    logger.debug("Service[streamMessage]: task created", {
      taskId: task.id,
      contextId: task.contextId,
    });

    yield* this.methods.streamMessage(
      messageParams,
      context ??
        (await this.contexts.create({
          contextId: task.contextId,
          service: this,
          abortSignal: options?.abortSignal,
          task: task,
          overrides: this.overrides,
          messenger: Messenger.create(messageParams),
          references: await getReferences(
            this.tasks,
            messageParams.message.referenceTaskIds
          ),
          extensions: await getExtensions(messageParams.message.extensions),
        }))
    );
  }

  async *resubscribe(
    params: A2A.TaskIdParams,
    context?: A2A.Context,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    const taskParams: A2A.TaskIdParams = await validateSchema(
      A2A.TaskIdParamsSchema,
      params
    );

    logger.info(`Service[resubscribe]:`, { taskId: taskParams.id });

    const task: A2A.Task | undefined = await this.tasks.get(taskParams.id);
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: taskParams.id });
    }

    logger.debug("Service[resubscribe]:", {
      taskId: task.id,
      contextId: task.contextId,
    });

    yield* this.methods.resubscribe(
      taskParams,
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
