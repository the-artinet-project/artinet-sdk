import {
  JSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCSuccessResponse,
} from "./rpc.js";
import { TaskIdParams } from "./task.js";

/**
 * @description Information required for setting up push notifications.
 * @required schemes
 * @optional credentials
 */
export interface PushNotificationAuthenticationInfo {
  /**
   * @required Supported authentication schemes - e.g. Basic, Bearer */
  schemes: string[];

  /**
   * @optional credentials
   */
  credentials?: string;
}

/**
 * @description Configuration for setting up push notifications for task updates.
 * @required url
 * @optional token
 * @optional authentication
 */
export interface PushNotificationConfig {
  /**
   * @required The URL endpoint where the agent should send notifications.
   */
  url: string;

  /**
   * @optional A token to be included in push notification requests for verification/authentication.
   */
  token?: string;

  /**
   * @optional authentication details needed by the agent to call the notification URL.
   */
  authentication?: PushNotificationAuthenticationInfo;
}

/**
 * @description Represents the push notification information associated with a specific task ID.
 * Used as parameters for `tasks/pushNotification/set` and as a result type.
 * @required taskId
 * @required pushNotificationConfig
 */
export interface TaskPushNotificationConfig {
  /**
   * @required The ID of the task the notification config is associated with.
   */
  taskId: string;
  /**
   * @required The push notification configuration details.
   */
  pushNotificationConfig: PushNotificationConfig;
}

/**
 * @description Request to set or update the push notification config for a task.
 * @required TaskPushNotificationConfig
 */
export type SetTaskPushNotificationConfigRequest = JSONRPCRequest<
  "tasks/pushNotification/set",
  TaskPushNotificationConfig
>;

/**
 * @description JSON-RPC success response model for the 'tasks/pushNotification/set' method.
 * @required TaskPushNotificationConfig
 */
export type SetTaskPushNotificationConfigSuccessResponse =
  JSONRPCSuccessResponse<TaskPushNotificationConfig>;

/**
 * @description Response to a `tasks/pushNotification/set` request. Contains the confirmed TaskPushNotificationConfig or an error.
 * @oneOf SetTaskPushNotificationConfigSuccessResponse | JSONRPCErrorResponse
 */
export type SetTaskPushNotificationConfigResponse =
  | SetTaskPushNotificationConfigSuccessResponse
  | JSONRPCErrorResponse;

/**
 * @description Request to retrieve the currently configured push notification configuration for a task.
 * @required TaskIdParams
 */
export type GetTaskPushNotificationConfigRequest = JSONRPCRequest<
  "tasks/pushNotificationConfig/get",
  TaskIdParams
>;

/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/get' method.
 * @required TaskPushNotificationConfig
 */
export type GetTaskPushNotificationConfigSuccessResponse =
  JSONRPCSuccessResponse<TaskPushNotificationConfig>;

/**
 * @description Response to a `tasks/pushNotification/get` request. Contains the TaskPushNotificationConfig or an error.
 * @oneOf GetTaskPushNotificationConfigSuccessResponse | JSONRPCErrorResponse
 */
export type GetTaskPushNotificationConfigResponse =
  | GetTaskPushNotificationConfigSuccessResponse
  | JSONRPCErrorResponse;
