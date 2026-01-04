/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { validateSchema } from "~/utils/schema-validation.js";
import * as describe from "~/create/describe.js";
import { INVALID_REQUEST, TASK_NOT_FOUND } from "~/utils/errors.js";
import { Messenger } from "./messenger.js";
import { execute } from "./execute.js";
import { createService, ServiceParams } from "./factory/service.js";
import { getReferences } from "./helpers/references.js";
import { logger } from "~/config/index.js";

const taskToMessageParams = (task: A2A.Task) => {
  const latestUserMessage: A2A.Message | undefined = task.history
    ?.filter((msg) => msg.role === "user")
    ?.pop();

  if (!latestUserMessage) {
    throw INVALID_REQUEST("No user message found");
  }

  if (
    latestUserMessage.contextId &&
    latestUserMessage.contextId !== task.contextId
  ) {
    throw INVALID_REQUEST(
      "User message context ID does not match task context ID"
    );
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
  _extensions?: string[],
  _forwardExtensions?: A2A.AgentExtension[]
): Promise<A2A.AgentExtension[]> => {
  // logger.warn("getExtensions: not implemented", { extensions });
  return [];
};

/**
 * Binds a notifier to a context
 * @param notifier - The notifier to bind
 * @param context - The context to bind the notifier to
 * @returns A new notifier that is bound to the context
 */
const bindNotifier = async (
  context: A2A.Context,
  taskId: string,
  config: A2A.PushNotificationConfig | undefined,
  notifier?: A2A.Notifier
): Promise<void> => {
  if (!notifier || !config) {
    return;
  }
  context.publisher.on("update", async (task: A2A.Task, update: A2A.Update) => {
    await notifier.notify(task, update, context).catch((error) => {
      logger.error("Error sending push notification: ", { error });
    });
  });

  await notifier.register(taskId, config).catch((error) => {
    logger.error("Error registering push notification: ", { error });
  });
};

/**
 * @note We endeavor to remove all optional parameters from below this class.
 * This will allow the service to act as the boundary to our Hexagonal Architecture.
 */
export class Service implements A2A.Service {
  constructor(
    protected _agentCard: A2A.AgentCard,
    protected _engine: A2A.Engine,
    protected _connections: A2A.Connections,
    protected _cancellations: A2A.Cancellations,
    protected _tasks: A2A.Tasks,
    protected _contexts: A2A.Contexts,
    protected _streams: A2A.Streams,
    protected _handles: A2A.Handles,
    protected _overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>
  ) {}

  get handles(): A2A.Handles {
    return this._handles;
  }

  set handles(handles: Partial<A2A.Handles>) {
    this._handles = {
      ...this._handles,
      ...handles,
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
    options?: A2A.ServiceOptions
  ): Promise<A2A.Task> {
    const taskParams: A2A.TaskQueryParams = await validateSchema(
      A2A.TaskQueryParamsSchema,
      params
    );

    logger.info(`Service[getTask]:`, { taskId: taskParams.id });
    const task: A2A.Task | undefined =
      options?.task ?? (await this.tasks.get(taskParams.id));

    if (!task) {
      throw TASK_NOT_FOUND({ taskId: taskParams.id });
    }

    const userId: string | undefined = options?.userId;
    const messageParams: A2A.MessageSendParams = taskToMessageParams(task);

    const context: A2A.Context = await this.contexts.create({
      contextId: task.contextId,
      service: this,
      abortSignal: options?.signal,
      task: task,
      overrides: this.overrides,
      messenger: Messenger.create(messageParams),
      userId: userId,
    });

    return await this.handles.getTask(taskParams, context);
  }

  async cancelTask(
    params: A2A.TaskIdParams,
    options?: A2A.ServiceOptions
  ): Promise<A2A.Task> {
    const taskParams: A2A.TaskIdParams = await validateSchema(
      A2A.TaskIdParamsSchema,
      params
    );

    logger.info(`Service[cancelTask]:`, { taskId: taskParams.id });

    const task: A2A.Task | undefined =
      options?.task ?? (await this.tasks.get(taskParams.id));
    if (!task) {
      throw TASK_NOT_FOUND({ taskId: taskParams.id });
    }

    const userId: string | undefined = options?.userId;
    const messageParams: A2A.MessageSendParams = taskToMessageParams(task);

    const context: A2A.Context = await this.contexts.create({
      contextId: task.contextId,
      service: this,
      abortSignal: options?.signal,
      task: task,
      overrides: this.overrides,
      messenger: Messenger.create(messageParams),
      userId: userId,
      references: await getReferences(
        this.tasks,
        messageParams.message.referenceTaskIds
      ),
    });

    return await this.handles.cancelTask(taskParams, context);
  }

  sendMessage(
    params: A2A.MessageSendParams,
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  sendMessage(
    message: string | A2A.MessageSendParams["message"],
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  async sendMessage(
    paramsOrMessage:
      | A2A.MessageSendParams
      | A2A.MessageSendParams["message"]
      | string,
    options?: A2A.ServiceOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    const params = describe.messageSendParams(paramsOrMessage);
    return await this._sendMessage(params, options);
  }

  protected async _sendMessage(
    params: A2A.MessageSendParams,
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

    const task: A2A.Task =
      options?.task ??
      (await this.tasks.create({
        id: messageParams.message.taskId,
        contextId: messageParams.message.contextId,
        history: [messageParams.message],
        metadata: {
          ...messageParams.metadata,
        },
      }));

    const userId: string | undefined = options?.userId;

    const extensions: A2A.AgentExtension[] = await getExtensions(
      messageParams.message.extensions,
      options?.extensions
    );

    const context: A2A.Context = await this.contexts.create({
      contextId: task.contextId,
      service: this,
      abortSignal: options?.signal,
      task: task,
      overrides: this.overrides,
      messenger: Messenger.create(messageParams),
      references: await getReferences(
        this.tasks,
        messageParams.message.referenceTaskIds
      ),
      extensions: extensions,
      userId: userId,
    });

    if (options?.notifier) {
      await bindNotifier(
        context,
        task.id,
        messageParams.configuration?.pushNotificationConfig,
        options.notifier
      );
    }

    return await this.handles.sendMessage(messageParams, context);
  }

  sendMessageStream(
    params: A2A.MessageSendParams,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update>;
  sendMessageStream(
    message: string,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update>;
  sendMessageStream(
    params: A2A.MessageSendParams["message"],
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update>;

  async *sendMessageStream(
    _params: A2A.MessageSendParams | string | A2A.MessageSendParams["message"],
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    let params: A2A.MessageSendParams;
    if (
      typeof _params === "string" ||
      (typeof _params === "object" && "parts" in _params)
    ) {
      params = describe.messageSendParams(_params);
    } else {
      params = _params;
    }
    const messageParams: A2A.MessageSendParams = await validateSchema(
      A2A.MessageSendParamsSchema,
      params
    );
    yield* this._sendMessageStream(messageParams, options);
  }

  /**
   * @deprecated Use sendMessageStream instead
   */
  async *streamMessage(
    paramsOrMessage: A2A.MessageSendParams | string,
    options?: A2A.ServiceOptions
  ): AsyncGenerator<A2A.Update> {
    const params = describe.messageSendParams(paramsOrMessage);
    yield* this.sendMessageStream(params, options);
  }

  protected async *_sendMessageStream(
    params: A2A.MessageSendParams,
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

    const task: A2A.Task =
      options?.task ??
      (await this.tasks.create({
        id: messageParams.message.taskId,
        contextId: messageParams.message.contextId,
        history: [messageParams.message],
        metadata: {
          ...messageParams.metadata,
        },
      }));

    logger.debug("Service[streamMessage]: task created", {
      taskId: task.id,
      contextId: task.contextId,
    });

    const userId: string | undefined = options?.userId;

    const extensions: A2A.AgentExtension[] = await getExtensions(
      messageParams.message.extensions,
      options?.extensions
    );

    const context: A2A.Context = await this.contexts.create({
      contextId: task.contextId,
      service: this,
      abortSignal: options?.signal,
      task: task,
      overrides: this.overrides,
      messenger: Messenger.create(messageParams),
      references: await getReferences(
        this.tasks,
        messageParams.message.referenceTaskIds
      ),
      extensions: extensions,
      userId: userId,
    });

    if (options?.notifier) {
      await bindNotifier(
        context,
        task.id,
        messageParams.configuration?.pushNotificationConfig,
        options.notifier
      );
    }

    yield* this.handles.streamMessage(messageParams, context);
  }

  async *resubscribe(
    params: A2A.TaskIdParams,
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

    const messageParams: A2A.MessageSendParams = taskToMessageParams(task);

    const userId: string | undefined = options?.userId;

    const extensions: A2A.AgentExtension[] = await getExtensions(
      messageParams.message.extensions,
      options?.extensions
    );

    const context: A2A.Context = await this.contexts.create({
      contextId: task.contextId,
      service: this,
      abortSignal: options?.signal,
      task: task,
      overrides: this.overrides,
      references: await getReferences(
        this.tasks,
        messageParams.message.referenceTaskIds
      ),
      messenger: Messenger.create(messageParams),
      extensions: extensions,
      userId: userId,
    });

    if (options?.notifier) {
      await bindNotifier(
        context,
        task.id,
        messageParams.configuration?.pushNotificationConfig,
        options.notifier
      );
    }

    yield* this.handles.resubscribe(taskParams, context);
  }

  static create(params: ServiceParams): Service {
    return createService(params);
  }
}
