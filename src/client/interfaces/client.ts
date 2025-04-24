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

export interface Client {
  agentCard(): Promise<AgentCard>;
  refreshAgentCard(): Promise<AgentCard>;
  sendTask(params: TaskSendParams): Promise<Task | null>;
  sendTaskSubscribe(
    params: TaskSendParams
  ): AsyncIterable<TaskStatusUpdateEvent | TaskArtifactUpdateEvent>;
  getTask(params: TaskQueryParams): Promise<Task | null>;
  cancelTask(params: TaskIdParams): Promise<Task | null>;
  setTaskPushNotification(
    params: TaskPushNotificationConfig
  ): Promise<TaskPushNotificationConfig | null>;
  getTaskPushNotification(
    params: TaskIdParams
  ): Promise<TaskPushNotificationConfig | null>;
  resubscribeTask(
    params: TaskQueryParams
  ): AsyncIterable<TaskStatusUpdateEvent | TaskArtifactUpdateEvent>;
  supports(
    capability: "streaming" | "pushNotifications" | "stateTransitionHistory"
  ): Promise<boolean>;
  setHeaders(headers: Record<string, string>): void;
  addHeader(name: string, value: string): void;
  removeHeader(name: string): void;
  clearHeaders(): void;
}
