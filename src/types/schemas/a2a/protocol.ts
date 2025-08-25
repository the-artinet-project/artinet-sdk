/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod/v4";
import {
  SendMessageRequestSchema,
  SendMessageResponseSchema,
  SendStreamingMessageRequestSchema,
  SendStreamingMessageResponseSchema,
} from "./message.js";
import {
  GetTaskRequestSchema,
  GetTaskResponseSchema,
  CancelTaskRequestSchema,
  CancelTaskResponseSchema,
  TaskResubscriptionRequestSchema,
} from "./task.js";
import {
  SetTaskPushNotificationConfigRequestSchema,
  SetTaskPushNotificationConfigResponseSchema,
  GetTaskPushNotificationConfigRequestSchema,
  GetTaskPushNotificationConfigResponseSchema,
  DeleteTaskPushNotificationConfigRequestSchema,
  ListTaskPushNotificationConfigRequestSchema,
  DeleteTaskPushNotificationConfigResponseSchema,
  ListTaskPushNotificationConfigResponseSchema,
} from "./notification.js";
import {
  GetAuthenticatedExtendedCardRequestSchema,
  GetAuthenticatedExtendedCardResponseSchema,
} from "./agent.js";
import {
  JSONRPCSuccessResponseSchema,
  JSONRPCErrorResponseSchema,
} from "./rpc.js";

/**
 * @description Union of all valid A2A request types defined in the protocol.
 * @description Represents any valid JSON-RPC request defined in the A2A protocol.
 */
export const A2ARequestSchema = z.union([
  SendMessageRequestSchema,
  SendStreamingMessageRequestSchema,
  TaskResubscriptionRequestSchema,
  GetTaskRequestSchema,
  CancelTaskRequestSchema,
  SetTaskPushNotificationConfigRequestSchema,
  GetTaskPushNotificationConfigRequestSchema,
  ListTaskPushNotificationConfigRequestSchema,
  DeleteTaskPushNotificationConfigRequestSchema,
  GetAuthenticatedExtendedCardRequestSchema,
]);

/**
 * @description Union of all valid A2A response types defined in the protocol.
 * @description Represents any valid JSON-RPC response defined in the A2A protocol.
 * (This is a helper type, not explicitly defined with `oneOf` in the spec like A2ARequest, but useful).
 */
export const A2AResponseSchema = z.union([
  SendMessageResponseSchema,
  SendStreamingMessageResponseSchema,
  GetTaskResponseSchema,
  CancelTaskResponseSchema,
  SetTaskPushNotificationConfigResponseSchema,
  GetTaskPushNotificationConfigResponseSchema,
  ListTaskPushNotificationConfigResponseSchema,
  DeleteTaskPushNotificationConfigResponseSchema,
  GetAuthenticatedExtendedCardResponseSchema,
]);
/**
 * @description Represents a JSON-RPC response object.
 */
export const JSONRPCResponseSchema = z
  .union([
    A2AResponseSchema,
    JSONRPCSuccessResponseSchema.extend({
      result: z.any(),
    }),
    JSONRPCErrorResponseSchema.extend({
      error: z.any(),
    }),
  ])
  .describe("Represents a JSON-RPC response object.");
export type JSONRPCResponse = z.infer<typeof JSONRPCResponseSchema>;

export type A2ARequest = z.infer<typeof A2ARequestSchema>;
export type A2AResponse = z.infer<typeof A2AResponseSchema>;

// // Re-export A2AError from error.js for convenience
// export { A2AErrorSchema } from "./error.js";
// export type { A2AError } from "./error.js";
