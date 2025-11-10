/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";
import {
  JSONRPCErrorResponseSchema,
  JSONRPCRequestSchema,
  JSONRPCSuccessResponseSchema,
} from "./rpc.js";
import { TaskIdParamsSchema } from "./task.js";

/**
 * Defines parameters for fetching a specific push notification configuration for a task.
 */
export const GetTaskPushNotificationConfigParamSchema =
  TaskIdParamsSchema.extend({
    /**
     * @optional The ID of the push notification configuration to retrieve.
     */
    pushNotificationConfigId: z.string().optional(),
  });

export type GetTaskPushNotificationConfigParam = z.infer<
  typeof GetTaskPushNotificationConfigParamSchema
>;

export const GetTaskPushNotificationConfigParamsSchema = z.union([
  GetTaskPushNotificationConfigParamSchema,
  TaskIdParamsSchema,
]);
export type GetTaskPushNotificationConfigParams = z.infer<
  typeof GetTaskPushNotificationConfigParamsSchema
>;

/**
 * Defines parameters for listing all push notification configurations for a task.
 */
export const ListTaskPushNotificationConfigsParamsSchema =
  TaskIdParamsSchema.extend({});

export type ListTaskPushNotificationConfigsParams = z.infer<
  typeof ListTaskPushNotificationConfigsParamsSchema
>;

/**
 * Defines parameters for deleting a specific push notification configuration for a task.
 */
export const DeleteTaskPushNotificationConfigParamsSchema =
  TaskIdParamsSchema.extend({
    /**
     * @required The ID of the push notification configuration to delete.
     */
    pushNotificationConfigId: z.string(),
  });

export type DeleteTaskPushNotificationConfigParams = z.infer<
  typeof DeleteTaskPushNotificationConfigParamsSchema
>;

/**
 * @description Defines authentication details for a push notification endpoint.
 */
export const PushNotificationAuthenticationInfoSchema = z
  .object({
    /**
     * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
     */
    schemes: z
      .array(z.string())
      .describe("The authentication schemes supported by the endpoint."),
    /**
     * @optional Optional credentials required by the push notification endpoint.
     */
    credentials: z.string().optional(),
  })
  .describe("Defines authentication details for a push notification endpoint.");

export type PushNotificationAuthenticationInfo = z.infer<
  typeof PushNotificationAuthenticationInfoSchema
>;

/**
 * @description Defines the configuration for setting up push notifications for task updates.
 */
export const PushNotificationConfigSchema = z
  .object({
    /**
     * @optional A unique ID for the push notification configuration, created by the server
     * to support multiple notification callbacks.
     */
    id: z
      .string()
      .optional()
      .describe(
        "A unique ID for the push notification configuration, created by the server to support multiple notification callbacks."
      ),
    /**
     * @required The callback URL where the agent should send push notifications.
     */
    url: z
      .string()
      .url()
      .describe(
        "The callback URL where the agent should send push notifications."
      ),
    /**
     * @optional A unique token for this task or session to validate incoming push notifications.
     */
    token: z
      .string()
      .optional()
      .describe(
        "A unique token for this task or session to validate incoming push notifications."
      ),
    /**
     * @optional Authentication details for the agent to use when calling the notification URL.
     */
    authentication:
      PushNotificationAuthenticationInfoSchema.optional().describe(
        "Authentication details for the agent to use when calling the notification URL."
      ),
  })
  .describe(
    "Defines the configuration for setting up push notifications for task updates."
  );
export type PushNotificationConfig = z.infer<
  typeof PushNotificationConfigSchema
>;

/**
 * @description A container associating a push notification configuration with a specific task.
 */
export const TaskPushNotificationConfigSchema = z
  .object({
    /**
     * @required The ID of the task to associate with the push notification configuration.
     */
    taskId: z
      .string()
      .describe(
        "The ID of the task to associate with the push notification configuration."
      ),
    /**
     * @required The push notification configuration to associate with the task.
     */
    pushNotificationConfig: PushNotificationConfigSchema.describe(
      "The push notification configuration to associate with the task."
    ),
  })
  .describe(
    "A container associating a push notification configuration with a specific task."
  );
export type TaskPushNotificationConfig = z.infer<
  typeof TaskPushNotificationConfigSchema
>;

/**
 * @description Request to set or update the push notification config for a task.
 */
export const SetTaskPushNotificationConfigRequestSchema =
  JSONRPCRequestSchema.extend({
    method: z.literal("tasks/pushNotificationConfig/set"),
    params: TaskPushNotificationConfigSchema.describe(
      "Defines the parameters for a request to set or update the push notification config for a task."
    ),
  }).describe(
    "Represents a JSON-RPC request for the `tasks/pushNotificationConfig/set` method."
  );
export type SetTaskPushNotificationConfigRequest = z.infer<
  typeof SetTaskPushNotificationConfigRequestSchema
>;

/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/set' method.
 */
export const SetTaskPushNotificationConfigSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result of the request, which can be a direct reply Message or the initial Task object.
     */
    result: TaskPushNotificationConfigSchema.describe(
      "The result of the request, which can be a direct reply Message or the initial Task object."
    ),
  }).describe(
    "JSON-RPC success response model for the 'tasks/pushNotificationConfig/set' method."
  );
export type SetTaskPushNotificationConfigSuccessResponse = z.infer<
  typeof SetTaskPushNotificationConfigSuccessResponseSchema
>;

/**
 * @description Response to a `tasks/pushNotificationConfig/set` request.
 */
export const SetTaskPushNotificationConfigResponseSchema = z
  .union([
    SetTaskPushNotificationConfigSuccessResponseSchema,
    JSONRPCErrorResponseSchema,
  ])
  .describe("Response to a `tasks/pushNotificationConfig/set` request.");
export type SetTaskPushNotificationConfigResponse = z.infer<
  typeof SetTaskPushNotificationConfigResponseSchema
>;

/**
 * @description Request to retrieve the currently configured push notification configuration for a task.
 */
export const GetTaskPushNotificationConfigRequestSchema =
  JSONRPCRequestSchema.extend({
    method: z.literal("tasks/pushNotificationConfig/get"),
    params: GetTaskPushNotificationConfigParamsSchema.describe(
      "Defines the parameters for a request to retrieve the currently configured push notification configuration for a task."
    ),
  }).describe(
    "Represents a JSON-RPC request for the `tasks/pushNotificationConfig/get` method."
  );
export type GetTaskPushNotificationConfigRequest = z.infer<
  typeof GetTaskPushNotificationConfigRequestSchema
>;

/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/get' method.
 */
export const GetTaskPushNotificationConfigSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result, containing the requested push notification configuration.
     */
    result: TaskPushNotificationConfigSchema.describe(
      "The result, containing the requested push notification configuration."
    ),
  }).describe(
    "JSON-RPC success response model for the 'tasks/pushNotificationConfig/get' method."
  );
export type GetTaskPushNotificationConfigSuccessResponse = z.infer<
  typeof GetTaskPushNotificationConfigSuccessResponseSchema
>;

/**
 * @description Response to a `tasks/pushNotificationConfig/get` request.
 */
export const GetTaskPushNotificationConfigResponseSchema = z
  .union([
    GetTaskPushNotificationConfigSuccessResponseSchema,
    JSONRPCErrorResponseSchema,
  ])
  .describe("Response to a `tasks/pushNotificationConfig/get` request.");
export type GetTaskPushNotificationConfigResponse = z.infer<
  typeof GetTaskPushNotificationConfigResponseSchema
>;

/**
 * @description Request to list all push notification configurations for a task.
 */
export const ListTaskPushNotificationConfigRequestSchema =
  JSONRPCRequestSchema.extend({
    method: z.literal("tasks/pushNotificationConfig/list"),
    params: ListTaskPushNotificationConfigsParamsSchema.describe(
      "Defines the parameters for a request to list all push notification configurations for a task."
    ),
  }).describe(
    "Represents a JSON-RPC request for the `tasks/pushNotificationConfig/list` method."
  );
export type ListTaskPushNotificationConfigRequest = z.infer<
  typeof ListTaskPushNotificationConfigRequestSchema
>;

export const ListTaskPushNotificationConfigResultSchema = z
  .array(TaskPushNotificationConfigSchema)
  .describe("The list of push notification configurations.");
export type ListTaskPushNotificationConfigResult = z.infer<
  typeof ListTaskPushNotificationConfigResultSchema
>;

/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/list' method.
 */
export const ListTaskPushNotificationConfigSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result, containing the list of push notification configurations.
     */
    result: ListTaskPushNotificationConfigResultSchema.describe(
      "The result, containing the list of push notification configurations."
    ),
  }).describe(
    "JSON-RPC success response model for the 'tasks/pushNotificationConfig/list' method."
  );
export type ListTaskPushNotificationConfigSuccessResponse = z.infer<
  typeof ListTaskPushNotificationConfigSuccessResponseSchema
>;

/**
 * @description Response to a `tasks/pushNotificationConfig/list` request.
 */
export const ListTaskPushNotificationConfigResponseSchema = z
  .union([
    ListTaskPushNotificationConfigSuccessResponseSchema,
    JSONRPCErrorResponseSchema,
  ])
  .describe("Response to a `tasks/pushNotificationConfig/list` request.");
export type ListTaskPushNotificationConfigResponse = z.infer<
  typeof ListTaskPushNotificationConfigResponseSchema
>;

/**
 * @description Request to delete a specific push notification configuration for a task.
 */
export const DeleteTaskPushNotificationConfigRequestSchema =
  JSONRPCRequestSchema.extend({
    method: z.literal("tasks/pushNotificationConfig/delete"),
    params: DeleteTaskPushNotificationConfigParamsSchema.describe(
      "Defines the parameters for a request to delete a specific push notification configuration for a task."
    ),
  }).describe(
    "Represents a JSON-RPC request for the `tasks/pushNotificationConfig/delete` method."
  );
export type DeleteTaskPushNotificationConfigRequest = z.infer<
  typeof DeleteTaskPushNotificationConfigRequestSchema
>;

/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/delete' method.
 */
export const DeleteTaskPushNotificationConfigSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result is null on successful deletion.
     */
    result: z.null().describe("The result is null on successful deletion."),
  }).describe(
    "JSON-RPC success response model for the 'tasks/pushNotificationConfig/delete' method."
  );
export type DeleteTaskPushNotificationConfigSuccessResponse = z.infer<
  typeof DeleteTaskPushNotificationConfigSuccessResponseSchema
>;

/**
 * @description Response to a `tasks/pushNotificationConfig/delete` request.
 */
export const DeleteTaskPushNotificationConfigResponseSchema = z
  .union([
    DeleteTaskPushNotificationConfigSuccessResponseSchema,
    JSONRPCErrorResponseSchema,
  ])
  .describe("Response to a `tasks/pushNotificationConfig/delete` request.");
export type DeleteTaskPushNotificationConfigResponse = z.infer<
  typeof DeleteTaskPushNotificationConfigResponseSchema
>;
