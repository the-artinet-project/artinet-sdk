/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { validateSchema } from "~/utils/schema-validation.js";
import { logger } from "~/config/index.js";
import * as describe from "~/create/describe.js";
import {
  ClientFactory,
  ClientFactoryOptions,
  ClientConfig,
  BeforeArgs,
  CallInterceptor,
  Client,
  Transport,
  RequestOptions,
} from "@a2a-js/sdk/client";

class HeaderInterceptor implements CallInterceptor {
  constructor(private _getCustomHeaders: () => Record<string, string>) {}
  before(args: BeforeArgs): Promise<void> {
    const options = args.options ?? { serviceParameters: {} };
    const serviceParameters = options.serviceParameters;
    options.serviceParameters = {
      ...serviceParameters,
      ...this._getCustomHeaders(),
    };
    args.options = options;
    return Promise.resolve();
  }
  after(): Promise<void> {
    return Promise.resolve();
  }
}

export interface MessengerParams {
  baseUrl: URL | string;
  headers?: Record<string, string>;
  fallbackPath?: string;
  factory?: ClientFactoryOptions;
  config?: ClientConfig;
}
/**
 * Messenger is the main communication client for interacting with Agent2Agent (A2A) protocol-compliant services.
 * It provides methods for sending tasks, retrieving statuses, canceling operations, and handling streaming responses.
 */
class Messenger
  implements
    Omit<
      Transport,
      "getAuthenticatedExtendedAgentCard" | "getExtendedAgentCard"
    >
{
  private _baseUrl: string;
  private _factory: ClientFactory;
  private clientPromise: Promise<Client>;

  constructor(
    baseUrl: URL | string,
    private _headers: Record<string, string> = {},
    private _fallbackPath?: string,
    factory: ClientFactoryOptions = ClientFactoryOptions.default,
    config?: ClientConfig
  ) {
    this._baseUrl = typeof baseUrl === "string" ? baseUrl : baseUrl.toString();

    this._fallbackPath = _fallbackPath ?? "/agent.json";

    this._factory = new ClientFactory(
      ClientFactoryOptions.createFrom(factory, {
        clientConfig: {
          ...config,
          interceptors: [
            ...(config?.interceptors ?? []),
            new HeaderInterceptor(() => this.headers),
          ],
        },
      })
    );

    this.clientPromise = this.reset(this._baseUrl, this._fallbackPath);
  }

  async reset(
    baseUrl: URL | string = this._baseUrl,
    fallbackPath: string | undefined = this._fallbackPath
  ): Promise<Client> {
    this._baseUrl = typeof baseUrl === "string" ? baseUrl : baseUrl.toString();
    this._fallbackPath = fallbackPath ?? "/agent.json";
    this.clientPromise = this._factory
      .createFromUrl(this._baseUrl)
      .catch((error) => {
        if (!this._fallbackPath) {
          logger.error(
            "Messenger: Failed to create client, no fallback path provided",
            { error }
          );
          throw error;
        }
        logger.warn(
          "Messenger: Failed to create client, falling back to fallback path: ",
          { error, fallbackPath: this._fallbackPath }
        );
        return this._factory
          .createFromUrl(this._baseUrl, this._fallbackPath)
          .catch((error) => {
            logger.error(
              "Messenger: Failed to create client, at fallback path: ",
              { error, fallbackPath: this._fallbackPath }
            );
            throw error;
          });
      });
    return this.clientPromise;
  }
  get baseUrl(): string {
    return this._baseUrl;
  }
  get headers(): Record<string, string> {
    return this._headers;
  }
  set headers(headers: Record<string, string>) {
    this._headers = headers;
  }

  protected get _client(): Promise<Client> {
    return this.clientPromise;
  }

  /**
   * Retrieves the AgentCard from the A2A server.
   * @returns A promise resolving to the AgentCard.
   */
  async getAgentCard(requestOptions?: RequestOptions): Promise<A2A.AgentCard> {
    const client = await this._client;
    return await client.getAgentCard(requestOptions);
  }

  sendMessage(
    params: A2A.MessageSendParams,
    options?: RequestOptions
  ): Promise<A2A.SendMessageSuccessResult>;
  sendMessage(
    params: describe.MessageParams,
    options?: RequestOptions
  ): Promise<A2A.SendMessageSuccessResult>;
  sendMessage(
    params: describe.MessageSendParamsParams,
    options?: RequestOptions
  ): Promise<A2A.SendMessageSuccessResult>;

  /**
   * Sends a Message to an agent server.
   * @param params The {@link A2A.MessageSendParams} for the message/send method.
   * @param options The {@link RequestOptions} for the request.
   * @returns A promise resolving to {@link A2A.SendMessageSuccessResult} from the agent server.
   */
  async sendMessage(
    params:
      | A2A.MessageSendParams
      | describe.MessageSendParamsParams
      | describe.MessageParams,
    options?: RequestOptions
  ): Promise<A2A.SendMessageSuccessResult> {
    const client = await this._client;
    return await validateSchema(
      A2A.SendMessageSuccessResultSchema,
      await client.sendMessage(describe.messageSendParams(params), options)
    );
  }

  sendMessageStream(
    params: A2A.MessageSendParams,
    options?: RequestOptions
  ): AsyncGenerator<A2A.Update, void, undefined>;
  sendMessageStream(
    params: describe.MessageSendParamsParams,
    options?: RequestOptions
  ): AsyncGenerator<A2A.Update, void, undefined>;
  sendMessageStream(
    params: describe.MessageParams,
    options?: RequestOptions
  ): AsyncGenerator<A2A.Update, void, undefined>;

  /**
   * Sends a Message and returns a stream of status and artifact updates.
   * @param params Task parameters for the request
   * @returns An AsyncIterable that yields TaskStatusUpdateEvent/TaskArtifactUpdateEvent/Task/Message payloads.
   */
  async *sendMessageStream(
    params:
      | A2A.MessageSendParams
      | describe.MessageSendParamsParams
      | describe.MessageParams,
    options?: RequestOptions
  ): AsyncGenerator<A2A.Update, void, undefined> {
    try {
      const client = await this._client;
      yield* client.sendMessageStream(
        describe.messageSendParams(params),
        options
      );
    } catch (error) {
      logger.error("Messenger: Failed to send message stream", { error });
      throw error;
    }
  }

  /**
   * Retrieves the current state of a task.
   * @param params The parameters for the tasks/get method.
   * @returns A promise resolving to the Task object or null.
   */
  async getTask(
    params: A2A.TaskQueryParams,
    options?: RequestOptions
  ): Promise<A2A.Task> {
    const client = await this._client;
    return await validateSchema(
      A2A.TaskSchema,
      await client.getTask(params, options)
    );
  }

  /**
   * Cancels a currently running task.
   * @param params The parameters for the tasks/cancel method.
   * @returns A promise resolving to the updated Task object (usually canceled state) or null.
   */
  async cancelTask(
    params: A2A.TaskIdParams,
    options?: RequestOptions
  ): Promise<A2A.Task> {
    const client = await this._client;
    return await validateSchema(
      A2A.TaskSchema,
      await client.cancelTask(params, options)
    );
  }

  /**
   * Sets or updates the push notification config for a task.
   * @param params The parameters for the tasks/pushNotificationConfig/set method (which is TaskPushNotificationConfig).
   * @returns A promise resolving to the confirmed TaskPushNotificationConfig or null.
   */
  async setTaskPushNotificationConfig(
    params: A2A.TaskPushNotificationConfig,
    options?: RequestOptions
  ): Promise<A2A.TaskPushNotificationConfig> {
    const client = await this._client;
    return await validateSchema(
      A2A.TaskPushNotificationConfigSchema,
      await client.setTaskPushNotificationConfig(params, options)
    );
  }

  /**
   * Retrieves the currently configured push notification config for a task.
   * @param params The parameters for the tasks/pushNotificationConfig/get method.
   * @returns A promise resolving to the TaskPushNotificationConfig or null.
   */
  async getTaskPushNotificationConfig(
    params: A2A.TaskIdParams,
    options?: RequestOptions
  ): Promise<A2A.TaskPushNotificationConfig> {
    const client = await this._client;
    return await validateSchema(
      A2A.TaskPushNotificationConfigSchema,
      await client.getTaskPushNotificationConfig(params, options)
    );
  }

  async listTaskPushNotificationConfig(
    params: A2A.ListTaskPushNotificationConfigParams,
    options?: RequestOptions
  ): Promise<A2A.ListTaskPushNotificationConfigResult> {
    const client = await this._client;
    return await validateSchema(
      A2A.ListTaskPushNotificationConfigResultSchema,
      await client.listTaskPushNotificationConfig(params, options)
    );
  }

  async deleteTaskPushNotificationConfig(
    params: A2A.DeleteTaskPushNotificationConfigParams,
    options?: RequestOptions
  ): Promise<void> {
    const client = await this._client;
    return client.deleteTaskPushNotificationConfig(params, options);
  }

  /**
   * Resubscribes to an existing task's update stream.
   * @param params Parameters identifying the task to resubscribe to
   * @returns An AsyncIterable that yields TaskStatusUpdateEvent or TaskArtifactUpdateEvent payloads.
   */
  async *resubscribeTask(
    params: A2A.TaskQueryParams,
    options?: RequestOptions
  ): AsyncGenerator<A2A.Update> {
    try {
      const client = await this._client;
      yield* client.resubscribeTask(params, options);
    } catch (error) {
      logger.error("Messenger: Failed to resubscribe task", { error });
      throw error;
    }
  }

  /**
   * Checks if the server supports a specific capability based on the agent card.
   * @param capability The capability to check (e.g., 'streaming', 'pushNotifications').
   * @returns A promise resolving to true if the capability is supported.
   */
  async supports(
    capability:
      | "streaming"
      | "pushNotifications"
      | "stateTransitionHistory"
      | "extentions"
  ): Promise<boolean> {
    const card = await this.getAgentCard();

    if (!card.capabilities) {
      return false;
    }

    switch (capability) {
      case "streaming":
        return !!card.capabilities.streaming;
      case "pushNotifications":
        return !!card.capabilities.pushNotifications;
      case "stateTransitionHistory":
        return !!card.capabilities.stateTransitionHistory;
      case "extentions":
        return !!card.capabilities.extensions;
      default:
        return false;
    }
  }

  /**
   * Adds a single header to be included in all requests.
   * @param name The header name.
   * @param value The header value.
   */
  addHeader(name: string, value: string): void {
    this.headers[name] = value;
  }

  /**
   * Removes a header.
   * @param name The header name to remove.
   */
  removeHeader(name: string): void {
    delete this.headers[name];
  }

  static async create({
    baseUrl,
    headers,
    fallbackPath,
    factory,
    config,
  }: MessengerParams): Promise<Messenger> {
    const messenger = new Messenger(
      baseUrl,
      headers,
      fallbackPath,
      factory,
      config
    );
    const card = await messenger.getAgentCard();
    /**Validate the agent card to ensure the target conforms to the A2A specification */
    await validateSchema(A2A.AgentCardSchema, card).catch((error) => {
      logger.warn("Messenger: Invalid agent card detected", { error });
    });
    return messenger;
  }
}
/**
 * Creates a new Messenger instance.
 * @param baseUrl The base URL for the A2A server.
 * @param headers Optional custom headers to include in all requests.
 * @param fallbackPath Optional fallback path to use if the agent card is not found at the base URL.
 * @example
 * const client = createMessenger("http://localhost:4000/a2a");
 * const card = await client.agentCard();
 * console.log(card);
 * @example
 * const client = createMessenger("http://localhost:4000/a2a", {}, "/agent-card");
 * const card = await client.agentCard();
 * console.log(card);
 */
export const createMessenger = Messenger.create;
export const AgentMessenger = Messenger;
export type AgentMessenger = Messenger;
/**
 * @deprecated Use {@link createMessenger} instead.
 */
export const A2AClient = Messenger;
