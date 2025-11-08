/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";
import { PushNotificationConfigSchema } from "./notification.js";
import { MessageSchema } from "./parameters.js";
import {
  TaskArtifactUpdateEventSchema,
  TaskSchema,
  TaskStatusUpdateEventSchema,
} from "./task.js";
import {
  JSONRPCErrorResponseSchema,
  JSONRPCRequestSchema,
  JSONRPCSuccessResponseSchema,
} from "./rpc.js";

/**
 * @description Defines configuration options for a `message/send` or `message/stream` request.
 */
export const MessageSendConfigurationSchema = z
  .object({
    /**
     * @optional A list of output MIME types the client is prepared to accept in the response.
     */
    acceptedOutputModes: z
      .array(z.string())
      .optional()
      .describe(
        "A list of output MIME types the client is prepared to accept in the response."
      ),
    /**
     * @optional The number of most recent messages from the task's history to retrieve in the response.
     */
    historyLength: z
      .number()
      .optional()
      .describe(
        "The number of most recent messages from the task's history to retrieve in the response."
      ),
    /**
     * @optional Configuration for the agent to send push notifications for updates after the initial response.
     */
    pushNotificationConfig: PushNotificationConfigSchema.optional().describe(
      "Configuration for the agent to send push notifications for updates after the initial response."
    ),
    /**
     * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
     */
    blocking: z
      .boolean()
      .optional()
      .describe(
        "If true, the client will wait for the task to complete. The server may reject this if the task is long-running."
      ),
  })
  .describe(
    "Defines configuration options for a `message/send` or `message/stream` request."
  );
export type MessageSendConfiguration = z.infer<
  typeof MessageSendConfigurationSchema
>;

/**
 * @description Defines the parameters for a request to send a message to an agent. This can be used
 * to create a new task, continue an existing one, or restart a task.
 */
export const MessageSendParamsSchema = z
  .object({
    /**
     * @required The message object being sent to the agent.
     */
    message: MessageSchema.describe(
      "The message object being sent to the agent."
    ),
    /**
     * @optional Configuration options for the message send request.
     */
    configuration: MessageSendConfigurationSchema.optional().describe(
      "Configuration options for the message send request."
    ),
    /**
     * @optional Additional metadata to be included with the message.
     */
    metadata: z
      .record(z.string(), z.unknown())
      .optional()
      .nullable()
      .describe("Additional metadata to be included with the message."),
  })
  .describe(
    "Defines the parameters for a request to send a message to an agent. This can be used to create a new task, continue an existing one, or restart a task."
  );
export type MessageSendParams = z.infer<typeof MessageSendParamsSchema>;

/**
 * @description Represents a JSON-RPC request for the `message/send` method.
 */
export const SendMessageRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("message/send"),
  params: MessageSendParamsSchema.describe(
    "Defines the parameters for a request to send a message to an agent. This can be used to create a new task, continue an existing one, or restart a task."
  ),
}).describe("Represents a JSON-RPC request for the `message/send` method.");
export type SendMessageRequest = z.infer<typeof SendMessageRequestSchema>;

/**
 * @description The result of a message send request, which can be a Message or the initial Task object.
 */
export const SendMessageSuccessResultSchema = z
  .union([MessageSchema, TaskSchema])
  .describe(
    "The result of a message send request, which can be a Message or the initial Task object."
  );
export type SendMessageSuccessResult = z.infer<
  typeof SendMessageSuccessResultSchema
>;
/**
 * @description JSON-RPC success response model for the 'message/send' method.
 */
export const SendMessageSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result of the request, which can be a direct reply Message or the initial Task object.
     */
    result: SendMessageSuccessResultSchema.describe(
      "The result of the request, which can be a direct reply Message or the initial Task object."
    ),
  }).describe("JSON-RPC success response model for the 'message/send' method.");
export type SendMessageSuccessResponse = z.infer<
  typeof SendMessageSuccessResponseSchema
>;

/**
 * @description JSON-RPC response model for the 'message/send' method.
 */
export const SendMessageResponseSchema = z.union([
  SendMessageSuccessResponseSchema,
  JSONRPCErrorResponseSchema,
]);
export type SendMessageResponse = z.infer<typeof SendMessageResponseSchema>;

/**
 * @description Request to send a message/initiate a task and subscribe to streaming updates.
 */
export const SendStreamingMessageRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("message/stream"),
  params: MessageSendParamsSchema.describe(
    "Defines the parameters for a request to send a message to an agent. This can be used to create a new task, continue an existing one, or restart a task."
  ),
}).describe(
  "Request to send a message/initiate a task and subscribe to streaming updates."
);
export type SendStreamingMessageRequest = z.infer<
  typeof SendStreamingMessageRequestSchema
>;
/**
 * @description The result of a streaming message request, which can be a Message, Task, or a streaming update/artifact event.
 */
export const SendStreamingMessageSuccessResultSchema = z
  .union([
    MessageSchema,
    TaskSchema,
    TaskStatusUpdateEventSchema,
    TaskArtifactUpdateEventSchema,
  ])
  .describe(
    "The result of a streaming message request, which can be a Message, Task, or a streaming update/artifact event."
  );
export type SendStreamingMessageSuccessResult = z.infer<
  typeof SendStreamingMessageSuccessResultSchema
>;
/**
 * @description Represents a successful JSON-RPC response for the `message/stream` method.
 * The server may send multiple response objects for a single request.
 */
export const SendStreamingMessageSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result, which can be a Message, Task, or a streaming update event.
     */
    result: SendStreamingMessageSuccessResultSchema.describe(
      "The result of a streaming message request, which can be a Message, Task, or a streaming update/artifact event."
    ),
  }).describe(
    "Represents a successful JSON-RPC response for the `message/stream` method. The server may send multiple response objects for a single request."
  );
export type SendStreamingMessageSuccessResponse = z.infer<
  typeof SendStreamingMessageSuccessResponseSchema
>;

/**
 * @description Response to a streaming task operation, either through `message/stream` or a subscription.
 */
export const SendStreamingMessageResponseSchema = z
  .union([
    SendStreamingMessageSuccessResponseSchema,
    JSONRPCErrorResponseSchema,
  ])
  .describe(
    "Response to a streaming task operation, either through `message/stream` or a subscription."
  );
export type SendStreamingMessageResponse = z.infer<
  typeof SendStreamingMessageResponseSchema
>;
