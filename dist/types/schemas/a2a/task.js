/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
import { MessageSchema, ArtifactSchema } from "./parameters.js";
import { JSONRPCErrorResponseSchema, JSONRPCRequestSchema, JSONRPCSuccessResponseSchema, } from "./rpc.js";
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
/**
 * Basic parameters used for task ID operations.
 */
export const TaskIdParamsSchema = z
    .object({
    id: z.string().describe("The ID of the task to query."),
    metadata: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Additional metadata to include in the request."),
})
    .describe("Defines the parameters for a request to get a task.");
/**
 * Parameters used for querying task-related information by ID.
 */
export const TaskQueryParamsSchema = TaskIdParamsSchema.extend({
    historyLength: z.number().optional(),
});
/**
 * Represents the status of a task at a specific point in time.
 */
export const TaskStatusSchema = z.object({
    state: TaskStateSchema,
    message: MessageSchema.optional(),
    timestamp: z.string().datetime().optional(),
});
/**
 * Represents a task being processed by an agent.
 */
export const TaskSchema = z.object({
    id: z.string(),
    contextId: z.string(),
    status: TaskStatusSchema,
    history: z.array(MessageSchema).optional(),
    artifacts: z.array(ArtifactSchema).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    kind: KindSchema.refine((kind) => kind === "task"),
});
/**
 * Represents a status update event for a task, typically used in streaming scenarios.
 */
export const TaskStatusUpdateEventSchema = z.object({
    taskId: z.string(),
    contextId: z.string(),
    kind: KindSchema.refine((kind) => kind === "status-update"),
    status: TaskStatusSchema,
    final: z.boolean(),
    metadata: z.record(z.string(), z.unknown()).optional(),
});
/**
 * Represents an artifact update event for a task, typically used in streaming scenarios.
 */
export const TaskArtifactUpdateEventSchema = z.object({
    taskId: z.string(),
    contextId: z.string(),
    kind: KindSchema.refine((kind) => kind === "artifact-update"),
    artifact: ArtifactSchema,
    append: z.boolean().optional(),
    lastChunk: z.boolean().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
});
/**
 * @description Request to retrieve the current state of a task.
 */
export const GetTaskRequestSchema = JSONRPCRequestSchema.extend({
    method: z.literal("tasks/get"),
    params: TaskQueryParamsSchema.describe("Defines the parameters for a request to get a task."),
}).describe("Represents a JSON-RPC request for the `tasks/get` method.");
/**
 * @description Represents a successful JSON-RPC response for the `tasks/get` method.
 */
export const GetTaskSuccessResponseSchema = JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result of the request, which can be a direct reply Message or the initial Task object.
     */
    result: TaskSchema.describe("The result of the request, which can be a direct reply Message or the initial Task object."),
}).describe("JSON-RPC success response model for the 'tasks/get' method.");
/**
 * @description Represents a JSON-RPC response for the `tasks/get` method.
 */
export const GetTaskResponseSchema = z
    .union([GetTaskSuccessResponseSchema, JSONRPCErrorResponseSchema])
    .describe("Represents a JSON-RPC response for the `tasks/get` method.");
/**
 * @description Request to re-subscribe to a task's updates.
 */
export const TaskResubscriptionRequestSchema = JSONRPCRequestSchema.extend({
    method: z.literal("tasks/resubscribe"),
    params: TaskIdParamsSchema.describe("Defines the parameters for a request to re-subscribe to a task's updates."),
}).describe("Represents a JSON-RPC request for the `tasks/resubscribe` method.");
/**
 * @description Request to cancel a task.
 */
export const CancelTaskRequestSchema = JSONRPCRequestSchema.extend({
    method: z.literal("tasks/cancel"),
    params: TaskIdParamsSchema.describe("Defines the parameters for a request to cancel a task."),
}).describe("Represents a JSON-RPC request for the `tasks/cancel` method.");
/**
 * @description Represents a successful JSON-RPC response for the `tasks/cancel` method.
 */
export const CancelTaskSuccessResponseSchema = JSONRPCSuccessResponseSchema.extend({
    result: TaskSchema.describe("The result of the request, which can be a direct reply Message or the initial Task object."),
}).describe("JSON-RPC success response model for the 'tasks/cancel' method.");
/**
 * @description Represents a JSON-RPC response for the `tasks/cancel` method.
 */
export const CancelTaskResponseSchema = z
    .union([CancelTaskSuccessResponseSchema, JSONRPCErrorResponseSchema])
    .describe("Represents a JSON-RPC response for the `tasks/cancel` method.");
