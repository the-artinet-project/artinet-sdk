/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import type { AgentCard, MessageSendParams, TaskQueryParams, TaskIdParams, TaskPushNotificationConfig, Task, Message, UpdateEvent } from "../types/index.js";
import type { Client } from "../types/interfaces/client.js";
/**
 * A2AClient is the main client class for interacting with Agent2Agent (A2A) protocol-compliant services.
 * It provides methods for sending tasks, retrieving statuses, canceling operations, and handling streaming responses.
 */
export declare class A2AClient implements Client {
    private baseUrl;
    private cachedAgentCard;
    private customHeaders;
    private fallbackPath;
    /**
     * Creates a new A2AClient instance.
     * @param baseUrl The base URL for the A2A server.
     * @param headers Optional custom headers to include in all requests.
     */
    constructor(baseUrl: URL | string, headers?: Record<string, string>, fallbackPath?: string);
    /**
     * Retrieves the AgentCard from the A2A server.
     * Caches the result after the first successful fetch.
     * @returns A promise resolving to the AgentCard.
     */
    agentCard(): Promise<AgentCard>;
    /**
     * Refreshes the cached AgentCard by fetching it again from the server.
     * @returns A promise resolving to the updated AgentCard.
     */
    refreshAgentCard(): Promise<AgentCard>;
    /**
     * Sends a task request to the agent (non-streaming).
     * @param params The parameters for the message/send method.
     * @returns A promise resolving to the Task object or null.
     */
    sendMessage(params: MessageSendParams): Promise<Message | Task | null>;
    /**
     * @deprecated Use sendMessage instead.
     * Sends a task request to the agent (non-streaming).
     * @param params The parameters for the message/send method.
     * @returns A promise resolving to the Task object or null.
     */
    sendTask(params: MessageSendParams): Promise<Message | Task | null>;
    /**
     * Sends a task and returns a subscription to status and artifact updates.
     * @param params Task parameters for the request
     * @returns An AsyncIterable that yields TaskStatusUpdateEvent or TaskArtifactUpdateEvent payloads.
     */
    sendStreamingMessage(params: MessageSendParams): AsyncIterable<UpdateEvent>;
    /**
     * @deprecated Use sendStreamingMessage instead.
     * Sends a task and returns a subscription to status and artifact updates.
     * @param params Task parameters for the request
     * @returns An AsyncIterable that yields TaskStatusUpdateEvent or TaskArtifactUpdateEvent payloads.
     */
    sendTaskSubscribe(params: MessageSendParams): AsyncIterable<UpdateEvent>;
    /**
     * Retrieves the current state of a task.
     * @param params The parameters for the tasks/get method.
     * @returns A promise resolving to the Task object or null.
     */
    getTask(params: TaskQueryParams): Promise<Task | null>;
    /**
     * Cancels a currently running task.
     * @param params The parameters for the tasks/cancel method.
     * @returns A promise resolving to the updated Task object (usually canceled state) or null.
     */
    cancelTask(params: TaskIdParams): Promise<Task | null>;
    /**
     * Sets or updates the push notification config for a task.
     * @param params The parameters for the tasks/pushNotificationConfig/set method (which is TaskPushNotificationConfig).
     * @returns A promise resolving to the confirmed TaskPushNotificationConfig or null.
     */
    setTaskPushNotification(params: TaskPushNotificationConfig): Promise<TaskPushNotificationConfig | null>;
    /**
     * Retrieves the currently configured push notification config for a task.
     * @param params The parameters for the tasks/pushNotificationConfig/get method.
     * @returns A promise resolving to the TaskPushNotificationConfig or null.
     */
    getTaskPushNotification(params: TaskIdParams): Promise<TaskPushNotificationConfig | null>;
    /**
     * Resubscribes to an existing task's update stream.
     * @param params Parameters identifying the task to resubscribe to
     * @returns An AsyncIterable that yields TaskStatusUpdateEvent or TaskArtifactUpdateEvent payloads.
     */
    resubscribeTask(params: TaskQueryParams): AsyncIterable<UpdateEvent>;
    /**
     * Checks if the server supports a specific capability based on the agent card.
     * @param capability The capability to check (e.g., 'streaming', 'pushNotifications').
     * @returns A promise resolving to true if the capability is supported.
     */
    supports(capability: "streaming" | "pushNotifications" | "stateTransitionHistory"): Promise<boolean>;
    /**
     * Sets custom headers to be included in all requests.
     * @param headers A record of header name/value pairs.
     */
    setHeaders(headers: Record<string, string>): void;
    /**
     * Adds a single custom header to be included in all requests.
     * @param name The header name.
     * @param value The header value.
     */
    addHeader(name: string, value: string): void;
    /**
     * Removes a custom header.
     * @param name The header name to remove.
     */
    removeHeader(name: string): void;
    /**
     * Clears all custom headers.
     */
    clearHeaders(): void;
}
//# sourceMappingURL=a2a-client.d.ts.map