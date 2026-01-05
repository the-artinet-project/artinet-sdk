/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  A2ARequestHandler,
  ServerCallContext,
  A2AError,
  ExtendedAgentCardProvider,
  PushNotificationSender,
  PushNotificationStore,
  DefaultPushNotificationSender,
} from "@a2a-js/sdk/server";
import { A2A } from "~/types/index.js";
import { PushNotifications } from "./notifications.js";
import { logger } from "~/config/index.js";
import { SystemError, validateSchema } from "~/utils/index.js";
import { z } from "zod/v4";
/**We want to avoid pulling @a2a-js/sdk logic into our business logic. */
const toServiceOptions = (
  context?: ServerCallContext,
  notify?: A2A.Notifier
): A2A.ServiceOptions => {
  return {
    userId: context?.user?.userName,
    extensions:
      context?.activatedExtensions?.map((extension) => ({
        uri: extension,
      })) ?? [],
    notifier: notify,
  };
};

const toA2AError = (error: Error): Error => {
  if (error instanceof A2AError) {
    return error;
  }

  if (error instanceof SystemError) {
    return new A2AError(error.code, error.message, error.data, error.taskId);
  }
  return error;
};

const isGetTaskPushNotificationConfigParam = (
  params: A2A.GetTaskPushNotificationConfigParams
): params is A2A.GetTaskPushNotificationConfigParam => {
  return A2A.GetTaskPushNotificationConfigParamSchema.safeParse(params).success;
};

const paramsRequired = (params: unknown): void => {
  if (!params || Object.keys(params).length === 0) {
    throw A2AError.invalidParams("Params Required");
  }
};
const validateParams = async <T extends z.ZodSchema>(
  schema: T,
  params: unknown
): Promise<z.output<T>> => {
  paramsRequired(params);
  return await validateSchema(schema, params);
};

export class Native implements A2ARequestHandler {
  constructor(
    protected _service: A2A.Service,
    protected _pushNotifications?: PushNotifications,
    protected _extendAgentCard?: A2A.AgentCard | ExtendedAgentCardProvider
  ) {}

  get service(): A2A.Service {
    return this._service;
  }

  async getAgentCard() {
    return await this.service.getAgentCard();
  }

  async getTask(params: A2A.TaskQueryParams, context?: ServerCallContext) {
    if (!params || Object.keys(params).length === 0) {
      throw A2AError.invalidParams("Params Required");
    }
    return await this.service
      .getTask(params, toServiceOptions(context))
      .catch((error) => {
        throw toA2AError(error);
      });
  }

  async cancelTask(params: A2A.TaskIdParams, context?: ServerCallContext) {
    paramsRequired(params);
    return await this.service
      .cancelTask(params, toServiceOptions(context))
      .catch((error) => {
        throw toA2AError(error);
      });
  }

  async sendMessage(
    params: A2A.MessageSendParams,
    context?: ServerCallContext
  ) {
    paramsRequired(params);
    return await this.service
      .sendMessage(
        params,
        toServiceOptions(context, {
          notify: this.notify,
          register: this.registerConfig,
        })
      )
      .catch((error) => {
        throw toA2AError(error);
      });
  }

  async *sendMessageStream(
    params: A2A.MessageSendParams,
    context?: ServerCallContext
  ) {
    paramsRequired(params);
    try {
      yield* this.service.sendMessageStream(
        params,
        toServiceOptions(context, {
          notify: this.notify,
          register: this.registerConfig,
        })
      );
    } catch (error) {
      throw toA2AError(error as Error);
    }
  }

  async *resubscribe(params: A2A.TaskIdParams, context?: ServerCallContext) {
    paramsRequired(params);
    try {
      yield* this.service.resubscribe(
        params,
        toServiceOptions(context, {
          notify: this.notify,
          register: this.registerConfig,
        })
      ) as AsyncGenerator<
        A2A.Task | A2A.TaskStatusUpdateEvent | A2A.TaskArtifactUpdateEvent
      >;
    } catch (error) {
      throw toA2AError(error as Error);
    }
  }

  get pushNotifications(): PushNotifications | undefined {
    return this._pushNotifications;
  }

  protected async pushNotificationsEnabled(taskId?: string): Promise<void> {
    if (
      !(await this._service.getAgentCard())?.capabilities?.pushNotifications ||
      !this.pushNotifications
    ) {
      throw A2AError.pushNotificationNotSupported();
    }
    if (taskId && !(await this._service.tasks.has(taskId))) {
      throw A2AError.taskNotFound(taskId ?? "Unknown task");
    }
    return;
  }

  async setTaskPushNotificationConfig(
    _params: A2A.TaskPushNotificationConfig,
    _context?: ServerCallContext
  ): Promise<A2A.TaskPushNotificationConfig> {
    const params: A2A.TaskPushNotificationConfig = await validateParams(
      A2A.TaskPushNotificationConfigSchema,
      _params
    );
    await this.pushNotificationsEnabled(params.taskId);
    const { taskId, pushNotificationConfig } = params;

    pushNotificationConfig.id = pushNotificationConfig.id ?? taskId;
    await this.pushNotifications!.save(taskId, pushNotificationConfig);
    logger.debug("Setting push notification config for task: ", {
      taskId,
      pushNotificationConfigId: pushNotificationConfig.id,
    });
    return {
      taskId,
      pushNotificationConfig,
    };
  }

  async getTaskPushNotificationConfig(
    _params: A2A.GetTaskPushNotificationConfigParams,
    _context?: ServerCallContext
  ): Promise<A2A.TaskPushNotificationConfig> {
    const params: A2A.GetTaskPushNotificationConfigParams =
      await validateParams(
        A2A.GetTaskPushNotificationConfigParamsSchema,
        _params
      );
    await this.pushNotificationsEnabled(params.id);

    const { id: taskId } = params;
    const configs: A2A.PushNotificationConfig[] | undefined =
      await this.pushNotifications!.load(taskId);
    if (!configs) {
      throw A2AError.internalError(
        `Push notification config not found for task: ${taskId}`
      );
    }

    let configId: string = taskId;
    if (
      isGetTaskPushNotificationConfigParam(params) &&
      params.pushNotificationConfigId
    ) {
      configId = params.pushNotificationConfigId;
    }

    const pushNotificationConfig: A2A.PushNotificationConfig | undefined =
      configs.find((config) => config.id === configId);
    if (!pushNotificationConfig) {
      throw A2AError.internalError(
        `Push notification config not found for task: ${taskId} and config: ${configId}`
      );
    }

    return {
      taskId,
      pushNotificationConfig,
    };
  }

  async listTaskPushNotificationConfigs(
    _params: A2A.ListTaskPushNotificationConfigParams,
    _context?: ServerCallContext
  ): Promise<A2A.TaskPushNotificationConfig[]> {
    const params: A2A.ListTaskPushNotificationConfigParams =
      await validateParams(
        A2A.ListTaskPushNotificationConfigParamsSchema,
        _params
      );
    await this.pushNotificationsEnabled(params.id);
    const { id: taskId } = params;
    const configs: A2A.PushNotificationConfig[] | undefined =
      await this.pushNotifications!.load(taskId);
    if (!configs) {
      return [];
    }

    return configs.map((pushNotificationConfig) => ({
      taskId,
      pushNotificationConfig,
    }));
  }

  async deleteTaskPushNotificationConfig(
    _params: A2A.DeleteTaskPushNotificationConfigParams,
    _context?: ServerCallContext
  ): Promise<void> {
    const params: A2A.DeleteTaskPushNotificationConfigParams =
      await validateParams(
        A2A.DeleteTaskPushNotificationConfigParamsSchema,
        _params
      );
    await this.pushNotificationsEnabled(params.id);
    const { id: taskId } = params;
    await this.pushNotifications!.delete(taskId);
  }

  protected registerConfig = async (
    taskId: string,
    config: A2A.PushNotificationConfig
  ): Promise<void> => {
    await this.pushNotificationsEnabled(taskId);
    await this.pushNotifications?.save(taskId, config);
  };

  protected notify = async (
    task: A2A.Task,
    _update: A2A.Update,
    _context?: A2A.Context
  ): Promise<void> => {
    const enabled: boolean = await this.pushNotificationsEnabled(task.id)
      .then(() => true)
      .catch(() => {
        logger.warn("Push notifications not enabled for task: ", {
          taskId: task.id,
        });
        return false;
      });

    if (!enabled) {
      return;
    }
    return await this.pushNotifications!.send(task);
  };

  async getAuthenticatedExtendedAgentCard(
    context?: ServerCallContext
  ): Promise<A2A.AgentCard> {
    if (!(await this.getAgentCard()).supportsAuthenticatedExtendedCard) {
      throw A2AError.unsupportedOperation(
        "Agent does not support authenticated extended card."
      );
    }

    if (!this._extendAgentCard) {
      throw A2AError.authenticatedExtendedCardNotConfigured();
    }

    if (typeof this._extendAgentCard === "function") {
      return await this._extendAgentCard(context);
    }

    if (context?.user?.isAuthenticated) {
      return this._extendAgentCard;
    }

    return await this.getAgentCard();
  }

  static create(
    service: A2A.Service,
    _pushNotifications?:
      | {
          store?: PushNotificationStore;
          sender?: PushNotificationSender;
        }
      | PushNotifications,
    extendAgentCard?: A2A.AgentCard | ExtendedAgentCardProvider
  ): A2ARequestHandler {
    if (!_pushNotifications) {
      const pushNotifications = new PushNotifications();
      pushNotifications.sender = new DefaultPushNotificationSender(
        pushNotifications
      );
      return new Native(service, pushNotifications, extendAgentCard);
    }

    if (_pushNotifications instanceof PushNotifications) {
      return new Native(service, _pushNotifications, extendAgentCard);
    }

    const pushNotifications = new PushNotifications(_pushNotifications?.store);
    pushNotifications.sender =
      _pushNotifications?.sender ??
      new DefaultPushNotificationSender(pushNotifications);
    return new Native(service, pushNotifications, extendAgentCard);
  }
}

/**
 * native adapter for `@a2a-js/sdk`
 * @param service - The service to wrap
 * @param pushNotifications - (optional) arguments for creating {@link PushNotifications}
 * @param extendAgentCard - (optional) The extend agent card/provider to use
 * @returns A {@link A2ARequestHandler} instance
 * @example
 * ```typescript
 * const agent = cr8("Custom Agent")
 *   .text("Hello!")
 *   .agent;
 * const nativeAdapter = native(agent, pushNotifications, extendAgentCard);
 * ```
 */
export const native = Native.create;
