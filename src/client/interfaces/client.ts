import {
  TaskPushNotificationConfig,
  TaskArtifactUpdateEvent,
  TaskIdParams,
  Task,
} from "../../types/extended-schema.js";
import type {
  AgentCard,
  TaskQueryParams,
  TaskSendParams,
  TaskStatusUpdateEvent,
} from "../../types/extended-schema.js";

/**
 * @interface Client
 * @description Defines the standard contract for an A2A (Agent-to-Agent) client implementation.
 * This interface allows consumers to create custom client solutions while ensuring
 * compatibility with the A2A protocol. It outlines the core functionalities
 * required for interacting with an A2A agent server, including task management,
 * capability discovery, and communication configuration.
 */
export interface Client {
  /**
   * @description Fetches the agent's metadata (AgentCard) from a well-known path or a fallback path.
   * The AgentCard contains essential information about the agent, such as its capabilities and endpoints.
   * @param {string} wellKnownPath The standard path (e.g., "/.well-known/a2a") to look for the AgentCard.
   * @param {string} fallbackPath An alternative path to check if the well-known path fails.
   * @returns {Promise<AgentCard>} A promise that resolves with the AgentCard object.
   * @async
   */
  agentCard(): Promise<AgentCard>;

  /**
   * @description Refreshes the cached AgentCard information by re-fetching it from the server.
   * Useful when the agent's capabilities or configuration might have changed.
   * @returns {Promise<AgentCard>} A promise that resolves with the updated AgentCard object.
   * @async
   */
  refreshAgentCard(): Promise<AgentCard>;

  /**
   * @description Sends a task request to the agent server.
   * @param {TaskSendParams} params Parameters required to send the task, including the task definition and metadata.
   * @returns {Promise<Task | null>} A promise that resolves with the initial Task object representing the submitted task, or null if the submission failed.
   * @async
   */
  sendTask(params: TaskSendParams): Promise<Task | null>;

  /**
   * @description Sends a task request and subscribes to real-time updates (status changes, artifact updates) for that task.
   * This uses a streaming connection if available.
   * @param {TaskSendParams} params Parameters required to send the task.
   * @returns {AsyncIterable<TaskStatusUpdateEvent | TaskArtifactUpdateEvent>} An async iterable that yields task status and artifact updates.
   * @async
   */
  sendTaskSubscribe(
    params: TaskSendParams
  ): AsyncIterable<TaskStatusUpdateEvent | TaskArtifactUpdateEvent>;

  /**
   * @description Retrieves the current state of a specific task by its ID.
   * @param {TaskQueryParams} params Parameters containing the task ID to query.
   * @returns {Promise<Task | null>} A promise that resolves with the Task object, or null if the task is not found.
   * @async
   */
  getTask(params: TaskQueryParams): Promise<Task | null>;

  /**
   * @description Sends a request to cancel an ongoing task.
   * @param {TaskIdParams} params Parameters containing the ID of the task to cancel.
   * @returns {Promise<Task | null>} A promise that resolves with the final state of the cancelled Task object, or null if cancellation failed or the task wasn't found.
   * @async
   */
  cancelTask(params: TaskIdParams): Promise<Task | null>;

  /**
   * @description Configures push notifications for a specific task. This allows the client
   * to receive updates asynchronously via a specified webhook URL.
   * Requires the agent to support the 'pushNotifications' capability.
   * @param {TaskPushNotificationConfig} params The configuration details for the push notification, including the task ID and webhook URL.
   * @returns {Promise<TaskPushNotificationConfig | null>} A promise that resolves with the applied configuration, or null if the configuration failed.
   * @async
   */
  setTaskPushNotification(
    params: TaskPushNotificationConfig
  ): Promise<TaskPushNotificationConfig | null>;

  /**
   * @description Retrieves the current push notification configuration for a specific task.
   * @param {TaskIdParams} params Parameters containing the task ID.
   * @returns {Promise<TaskPushNotificationConfig | null>} A promise that resolves with the push notification configuration, or null if not configured or not found.
   * @async
   */
  getTaskPushNotification(
    params: TaskIdParams
  ): Promise<TaskPushNotificationConfig | null>;

  /**
   * @description Resubscribes to updates for an existing task, potentially after a connection drop or client restart.
   * This allows resuming the stream of status and artifact updates.
   * @param {TaskQueryParams} params Parameters containing the task ID to resubscribe to.
   * @returns {AsyncIterable<TaskStatusUpdateEvent | TaskArtifactUpdateEvent>} An async iterable that yields task status and artifact updates.
   * @async
   */
  resubscribeTask(
    params: TaskQueryParams
  ): AsyncIterable<TaskStatusUpdateEvent | TaskArtifactUpdateEvent>;

  /**
   * @description Checks if the agent server supports a specific capability.
   * @param {"streaming" | "pushNotifications" | "stateTransitionHistory"} capability The capability to check for.
   * @returns {Promise<boolean>} A promise that resolves to true if the capability is supported, false otherwise.
   * @async
   */
  supports(
    capability: "streaming" | "pushNotifications" | "stateTransitionHistory"
  ): Promise<boolean>;

  /**
   * @description Sets multiple HTTP headers to be included in all subsequent requests made by the client instance.
   * Replaces any previously set headers.
   * @param {Record<string, string>} headers An object containing header names and values.
   * @returns {void}
   */
  setHeaders(headers: Record<string, string>): void;

  /**
   * @description Adds or updates a single HTTP header for subsequent requests.
   * @param {string} name The name of the header.
   * @param {string} value The value of the header.
   * @returns {void}
   */
  addHeader(name: string, value: string): void;

  /**
   * @description Removes a specific HTTP header from subsequent requests.
   * @param {string} name The name of the header to remove.
   * @returns {void}
   */
  removeHeader(name: string): void;

  /**
   * @description Clears all custom HTTP headers previously set on the client instance.
   * @returns {void}
   */
  clearHeaders(): void;
}
