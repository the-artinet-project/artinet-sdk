/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";
import { MessageSchema, ArtifactSchema } from "./parameters.js";
import {
  JSONRPCErrorResponseSchema,
  JSONRPCRequestSchema,
  JSONRPCSuccessResponseSchema,
} from "./rpc.js";
import { KindSchema } from "./kind.js";

/**
 * @description Represents the state of a task within the A2A protocol.
 */
export const TaskStateSchema = z
  .enum([
    "submitted",
    "working",
    "input-required",
    "completed",
    "canceled",
    "failed",
    "rejected",
    "auth-required",
    "unknown",
  ])
  .describe("Defines the lifecycle states of a Task.");

export const TaskState = TaskStateSchema.enum;
export type TaskState = z.infer<typeof TaskStateSchema>;

/**
 * Basic parameters used for task ID operations.
 */
export const TaskIdParamsSchema = z
  .object({
    id: z.string().describe("The ID of the task to query."),
    metadata: z
      .record(z.string(), z.unknown())
      .optional()
      .nullable()
      .describe("Additional metadata to include in the request."),
  })
  .describe("Defines the parameters for a request to get a task.");
export type TaskIdParams = z.infer<typeof TaskIdParamsSchema>;

/**
 * Parameters used for querying task-related information by ID.
 */
export const TaskQueryParamsSchema = TaskIdParamsSchema.extend({
  historyLength: z.number().optional().nullable(),
});
export type TaskQueryParams = z.infer<typeof TaskQueryParamsSchema>;

/**
 * Represents the status of a task at a specific point in time.
 */
export const TaskStatusSchema = z.object({
  state: TaskStateSchema,
  message: MessageSchema.optional().nullable(),
  timestamp: z.string().datetime().optional().nullable(),
});
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

/**
 * Represents a task being processed by an agent.
 */
export const TaskSchema = z.object({
  id: z.string(),
  contextId: z.string(),
  status: TaskStatusSchema,
  history: z.array(MessageSchema).optional().nullable(),
  artifacts: z.array(ArtifactSchema).optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional().nullable(),
  kind: KindSchema.refine((kind) => kind === "task"),
});
export type Task = z.infer<typeof TaskSchema>;

/**
 * Represents a status update event for a task, typically used in streaming scenarios.
 */
export const TaskStatusUpdateEventSchema = z.object({
  taskId: z.string(),
  contextId: z.string(),
  kind: KindSchema.refine((kind) => kind === "status-update"),
  status: TaskStatusSchema,
  final: z.boolean(),
  metadata: z.record(z.string(), z.unknown()).optional().nullable(),
});
export type TaskStatusUpdateEvent = z.infer<typeof TaskStatusUpdateEventSchema>;

/**
 * Represents an artifact update event for a task, typically used in streaming scenarios.
 */
export const TaskArtifactUpdateEventSchema = z.object({
  taskId: z.string(),
  contextId: z.string(),
  kind: KindSchema.refine((kind) => kind === "artifact-update"),
  artifact: ArtifactSchema,
  append: z.boolean().optional().nullable(),
  lastChunk: z.boolean().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional().nullable(),
});
export type TaskArtifactUpdateEvent = z.infer<
  typeof TaskArtifactUpdateEventSchema
>;

/**
 * @description Request to retrieve the current state of a task.
 */
export const GetTaskRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("tasks/get"),
  params: TaskQueryParamsSchema.describe(
    "Defines the parameters for a request to get a task."
  ),
}).describe("Represents a JSON-RPC request for the `tasks/get` method.");
export type GetTaskRequest = z.infer<typeof GetTaskRequestSchema>;

/**
 * @description Represents a successful JSON-RPC response for the `tasks/get` method.
 */
export const GetTaskSuccessResponseSchema = JSONRPCSuccessResponseSchema.extend(
  {
    /**
     * @required The result of the request, which can be a direct reply Message or the initial Task object.
     */
    result: TaskSchema.describe(
      "The result of the request, which can be a direct reply Message or the initial Task object."
    ),
  }
).describe("JSON-RPC success response model for the 'tasks/get' method.");
export type GetTaskSuccessResponse = z.infer<
  typeof GetTaskSuccessResponseSchema
>;

/**
 * @description Represents a JSON-RPC response for the `tasks/get` method.
 */
export const GetTaskResponseSchema = z
  .union([GetTaskSuccessResponseSchema, JSONRPCErrorResponseSchema])
  .describe("Represents a JSON-RPC response for the `tasks/get` method.");
export type GetTaskResponse = z.infer<typeof GetTaskResponseSchema>;

/**
 * @description Request to re-subscribe to a task's updates.
 */
export const TaskResubscriptionRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("tasks/resubscribe"),
  params: TaskIdParamsSchema.describe(
    "Defines the parameters for a request to re-subscribe to a task's updates."
  ),
}).describe(
  "Represents a JSON-RPC request for the `tasks/resubscribe` method."
);
export type TaskResubscriptionRequest = z.infer<
  typeof TaskResubscriptionRequestSchema
>;

/**
 * @description Request to cancel a task.
 */
export const CancelTaskRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("tasks/cancel"),
  params: TaskIdParamsSchema.describe(
    "Defines the parameters for a request to cancel a task."
  ),
}).describe("Represents a JSON-RPC request for the `tasks/cancel` method.");
export type CancelTaskRequest = z.infer<typeof CancelTaskRequestSchema>;

/**
 * @description Represents a successful JSON-RPC response for the `tasks/cancel` method.
 */
export const CancelTaskSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    result: TaskSchema.describe(
      "The result of the request, which can be a direct reply Message or the initial Task object."
    ),
  }).describe("JSON-RPC success response model for the 'tasks/cancel' method.");
export type CancelTaskSuccessResponse = z.infer<
  typeof CancelTaskSuccessResponseSchema
>;

/**
 * @description Represents a JSON-RPC response for the `tasks/cancel` method.
 */
export const CancelTaskResponseSchema = z
  .union([CancelTaskSuccessResponseSchema, JSONRPCErrorResponseSchema])
  .describe("Represents a JSON-RPC response for the `tasks/cancel` method.");
export type CancelTaskResponse = z.infer<typeof CancelTaskResponseSchema>;
