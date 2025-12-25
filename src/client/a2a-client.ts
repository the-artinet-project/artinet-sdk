/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";

import {
  executeJsonRpcRequest,
  executeGetRequest,
} from "~/transport/rpc/rpc-client.js";
import { executeStreamEvents } from "~/transport/streaming/event-stream.js";

import { INTERNAL_ERROR } from "~/utils/common/errors.js";
import { logger } from "~/config/index.js";

import type { Client } from "~/types/client.js";
import { createMessageSendParams } from "~/services/a2a/helpers/message-builder.js";

/**
 * A2AClient is the main client class for interacting with Agent2Agent (A2A) protocol-compliant services.
 * It provides methods for sending tasks, retrieving statuses, canceling operations, and handling streaming responses.
 */
export class A2AClient implements Client {
  private baseUrl: URL;
  private cachedAgentCard: A2A.AgentCard | null = null;
  private customHeaders: Record<string, string> = {};
  private fallbackPath: string;
  private agentUrl: URL;
  private mergePath: boolean;
  /**
   * Creates a new A2AClient instance.
   * @param baseUrl The base URL for the A2A server.
   * @param headers Optional custom headers to include in all requests.
   * @param fallbackPath Optional fallback path to use if the agent card is not found at the base URL.
   * @example
   * const client = new A2AClient("http://localhost:4000/a2a");
   * const card = await client.agentCard();
   * console.log(card);
   * @example
   * const client = new A2AClient("http://localhost:4000/a2a", {}, "/agent-card");
   * const card = await client.agentCard();
   * console.log(card);
   */
  constructor(
    baseUrl: URL | string,
    headers: Record<string, string> = {},
    fallbackPath?: string,
    mergePath: boolean = false
  ) {
    this.baseUrl = typeof baseUrl === "string" ? new URL(baseUrl) : baseUrl;
    this.customHeaders = headers;
    this.fallbackPath = fallbackPath ?? "/agent-card";
    this.agentUrl = this.baseUrl;
    this.mergePath = mergePath;
  }

  /**
   * Retrieves the AgentCard from the A2A server.
   * Caches the result after the first successful fetch.
   * @returns A promise resolving to the AgentCard.
   */
  async agentCard(): Promise<A2A.AgentCard> {
    if (this.cachedAgentCard) {
      return this.cachedAgentCard;
    }

    // Standard location for agent cards
    const wellKnownUrl = new URL("/.well-known/agent-card.json", this.baseUrl);
    if (this.mergePath) {
      wellKnownUrl.pathname = this.baseUrl.pathname + wellKnownUrl.pathname;
    }
    try {
      try {
        if (!URL.canParse(wellKnownUrl)) {
          throw new Error("Invalid well-known URL");
        }
        const card: A2A.AgentCard = await executeGetRequest<A2A.AgentCard>(
          wellKnownUrl,
          this.customHeaders,
          "agent card (well-known)"
        );
        if (!card.name || card.name === null || card.name === undefined) {
          throw new Error("No agent card found");
        }

        this.cachedAgentCard = card as A2A.AgentCard;
      } catch (error) {
        logger.error(
          "A2AClient:agentCard: Failed to fetch agent card (well-known):",
          error
        );
        const fallbackUrl = new URL(this.fallbackPath, this.baseUrl);
        if (this.mergePath) {
          fallbackUrl.pathname = this.baseUrl.pathname + fallbackUrl.pathname;
        }
        const fallbackCard: A2A.AgentCard =
          await executeGetRequest<A2A.AgentCard>(
            fallbackUrl,
            this.customHeaders,
            "agent card (fallback)"
          );

        if (
          !fallbackCard.name ||
          fallbackCard.name === null ||
          fallbackCard.name === undefined
        ) {
          throw new Error("No fallback agent card found" + error);
        }
        this.cachedAgentCard = fallbackCard;
      }
    } catch (error) {
      logger.error(
        "A2AClient:agentCard: Failed to fetch or parse agent card:",
        error
      );

      throw INTERNAL_ERROR(error);
    }
    this.agentUrl = new URL(this.cachedAgentCard.url, this.baseUrl);
    return this.cachedAgentCard;
  }

  /**
   * Retrieves the AgentCard from the A2A server.
   * @returns A promise resolving to the AgentCard.
   */
  getAgentCard(): Promise<A2A.AgentCard> {
    return this.agentCard();
  }

  /**
   * Refreshes the cached AgentCard by fetching it again from the server.
   * @returns A promise resolving to the updated AgentCard.
   */
  async refreshAgentCard(): Promise<A2A.AgentCard> {
    this.cachedAgentCard = null;
    return this.agentCard();
  }

  sendMessage(
    params: A2A.MessageSendParams
  ): Promise<A2A.Message | A2A.Task | null>;

  sendMessage(
    params: string | A2A.MessageSendParams["message"]
  ): Promise<A2A.Message | A2A.Task | null>;

  /**
   * Sends a Message to an agent server.
   * @param params The parameters for the message/send method.
   * @returns A promise resolving to Message/Task response from the agent server or null.
   */
  async sendMessage(
    params: A2A.MessageSendParams | string | A2A.MessageSendParams["message"]
  ): Promise<A2A.Message | A2A.Task | null> {
    return await executeJsonRpcRequest<
      A2A.SendMessageRequest,
      A2A.SendMessageSuccessResponse
    >(
      this.agentUrl,
      "message/send",
      typeof params === "string"
        ? createMessageSendParams(params)
        : typeof params === "object" && "message" in params
        ? params
        : createMessageSendParams({ message: params }),
      this.customHeaders
    );
  }

  /**
   * @deprecated Use sendMessage instead.
   * Sends a task request to the agent (non-streaming).
   * @param params The parameters for the message/send method.
   * @returns A promise resolving to the Task object or null.
   */
  async sendTask(
    params: A2A.MessageSendParams
  ): Promise<A2A.Message | A2A.Task | null> {
    return await this.sendMessage(params);
  }

  /**
   * Sends a Message and returns a stream of status and artifact updates.
   * @param params Task parameters for the request
   * @returns An AsyncIterable that yields TaskStatusUpdateEvent/TaskArtifactUpdateEvent/Task/Message payloads.
   */
  sendStreamingMessage(
    params: A2A.MessageSendParams | string
  ): AsyncIterable<A2A.Update> {
    return executeStreamEvents<
      A2A.SendStreamingMessageRequest,
      A2A.SendStreamingMessageSuccessResponse
    >(
      this.agentUrl,
      "message/stream",
      createMessageSendParams(params),
      this.customHeaders
    );
  }

  /**
   * @deprecated Use sendStreamingMessage instead.
   * Sends a task and returns a subscription to status and artifact updates.
   * @param params Task parameters for the request
   * @returns An AsyncIterable that yields TaskStatusUpdateEvent or TaskArtifactUpdateEvent payloads.
   */
  sendTaskSubscribe(params: A2A.MessageSendParams): AsyncIterable<A2A.Update> {
    return this.sendStreamingMessage(params);
  }

  /**
   * Retrieves the current state of a task.
   * @param params The parameters for the tasks/get method.
   * @returns A promise resolving to the Task object or null.
   */
  async getTask(params: A2A.TaskQueryParams): Promise<A2A.Task | null> {
    return await executeJsonRpcRequest<
      A2A.GetTaskRequest,
      A2A.GetTaskSuccessResponse
    >(this.agentUrl, "tasks/get", params, this.customHeaders);
  }

  /**
   * Cancels a currently running task.
   * @param params The parameters for the tasks/cancel method.
   * @returns A promise resolving to the updated Task object (usually canceled state) or null.
   */
  async cancelTask(params: A2A.TaskIdParams): Promise<A2A.Task | null> {
    return await executeJsonRpcRequest<
      A2A.CancelTaskRequest,
      A2A.CancelTaskSuccessResponse
    >(this.agentUrl, "tasks/cancel", params, this.customHeaders);
  }

  /**
   * Sets or updates the push notification config for a task.
   * @param params The parameters for the tasks/pushNotificationConfig/set method (which is TaskPushNotificationConfig).
   * @returns A promise resolving to the confirmed TaskPushNotificationConfig or null.
   */
  async setTaskPushNotification(
    params: A2A.TaskPushNotificationConfig
  ): Promise<A2A.TaskPushNotificationConfig | null> {
    return await executeJsonRpcRequest<
      A2A.SetTaskPushNotificationConfigRequest,
      A2A.SetTaskPushNotificationConfigSuccessResponse
    >(
      this.agentUrl,
      "tasks/pushNotificationConfig/set",
      params,
      this.customHeaders
    );
  }

  /**
   * Retrieves the currently configured push notification config for a task.
   * @param params The parameters for the tasks/pushNotificationConfig/get method.
   * @returns A promise resolving to the TaskPushNotificationConfig or null.
   */
  async getTaskPushNotification(
    params: A2A.TaskIdParams
  ): Promise<A2A.TaskPushNotificationConfig | null> {
    return await executeJsonRpcRequest<
      A2A.GetTaskPushNotificationConfigRequest,
      A2A.GetTaskPushNotificationConfigSuccessResponse
    >(
      this.agentUrl,
      "tasks/pushNotificationConfig/get",
      params,
      this.customHeaders
    );
  }

  /**
   * Resubscribes to an existing task's update stream.
   * @param params Parameters identifying the task to resubscribe to
   * @returns An AsyncIterable that yields TaskStatusUpdateEvent or TaskArtifactUpdateEvent payloads.
   */
  resubscribeTask(params: A2A.TaskQueryParams): AsyncIterable<A2A.Update> {
    return executeStreamEvents<
      A2A.TaskResubscriptionRequest,
      A2A.SendStreamingMessageSuccessResponse
    >(this.agentUrl, "tasks/resubscribe", params, this.customHeaders);
  }

  /**
   * Checks if the server supports a specific capability based on the agent card.
   * @param capability The capability to check (e.g., 'streaming', 'pushNotifications').
   * @returns A promise resolving to true if the capability is supported.
   */
  async supports(
    capability: "streaming" | "pushNotifications" | "stateTransitionHistory"
  ): Promise<boolean> {
    try {
      const card = await this.agentCard();

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
        default:
          return false;
      }
    } catch (error) {
      logger.error(
        `A2AClient:supports: Failed to determine support for capability '${capability}':`,
        error
      );
      return false; // Assume not supported if card fetch fails
    }
  }

  /**
   * Sets custom headers to be included in all requests.
   * @param headers A record of header name/value pairs.
   */
  setHeaders(headers: Record<string, string>): void {
    this.customHeaders = { ...headers };
  }

  /**
   * Adds a single custom header to be included in all requests.
   * @param name The header name.
   * @param value The header value.
   */
  addHeader(name: string, value: string): void {
    this.customHeaders[name] = value;
  }

  /**
   * Removes a custom header.
   * @param name The header name to remove.
   */
  removeHeader(name: string): void {
    delete this.customHeaders[name];
  }

  /**
   * Clears all custom headers.
   */
  clearHeaders(): void {
    this.customHeaders = {};
  }
}
