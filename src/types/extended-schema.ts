/**
 * This file contains Artinet-specific schema definitions separate from the A2A protocol.
 * These are extensions to the standard A2A protocol defined by Google:
 * @see https://github.com/google/A2A/blob/main/samples/js/src/schema.ts
 */

import { z } from "zod/v4";
import type {
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  TaskStatus,
  A2ARequest,
  FileWithBytes,
  FileWithUri,
  Task,
  Message,
  MessageSendConfiguration,
} from "./schemas/index.js";
import {
  AgentCardSchema,
  JSONRPCErrorResponseSchema,
  JSONRPCRequestSchema,
  JSONRPCSuccessResponseSchema,
} from "./schemas/index.js";
import {
  ExecutionContext,
  executionContextConfig,
} from "./services/context.js";

import { Transformed } from "./transform.js";
import { AgentEngine } from "./services/index.js";

/**
 * Represents the content of a file, either as base64 encoded bytes or a URI.
 * @description Ensures that either 'bytes' or 'uri' is provided, but not both. (Note: This constraint is informational in TypeScript types).
 */
export type FileContent = FileWithBytes | FileWithUri;

/**
 * Represents the possible types of events that can be yielded by a TaskHandler.
 * @description Either a partial TaskStatus (without the server-managed timestamp)
 * or a complete Artifact object.
 */
export type TaskEvent = TaskStatusUpdateEvent | TaskArtifactUpdateEvent;

/**
 * Represents the possible types of updates that can be yielded by a TaskHandler.
 * @description Either a Message, Task, TaskStatusUpdateEvent, or TaskArtifactUpdateEvent.
 */
export type UpdateEvent =
  | Message
  | Task
  | TaskStatusUpdateEvent
  | TaskArtifactUpdateEvent;

/**
 * @deprecated use UpdateEvent instead
 * Represents the possible types of updates a TaskHandler can yield.
 * Either a partial TaskStatus (without the server-managed timestamp)
 * or a complete Artifact object.
 */
export type TaskYieldUpdate = UpdateEvent;

/**
 * @deprecated This interface will be removed in the future. Use TaskStatus instead.
 * Represents the possible types of updates that can be yielded by a TaskHandler.
 * Either a partial TaskStatus (without the server-managed timestamp)
 * or a complete Artifact object.
 */
export type ExtendedTaskStatusUpdate = Omit<TaskStatus, "timestamp">;

/**
 * @deprecated This interface will be removed in the future. Use ExecutionContext instead.
 * Context object provided to the TaskHandler.
 * Contains the information needed for the handler to process the task.
 */
export interface TaskContext
  extends Transformed<
    Omit<ExecutionContext, "getRequestParams" | "protocol">,
    typeof executionContextConfig
  > {
  /**
   * The context ID of the task.
   */
  contextId: string;

  /**
   * The current state of the task when the handler is invoked or resumed.
   * This is a snapshot - the latest state may need to be reloaded during async operations.
   */
  task: Task;

  /**
   * The specific user message that triggered this handler invocation or resumption.
   */
  userMessage: Message;

  /**
   * Function to check if cancellation has been requested for this task.
   * Handlers should check this periodically during long-running operations.
   * @returns True if cancellation has been requested, false otherwise.
   */
  isCancelled(): boolean;

  /**
   * The message history associated with the task up to the point the handler is invoked.
   */
  history: Message[];

  /**
   * @description The latest user message that triggered this handler invocation or resumption.
   * @note It's unclear whether this is necessary as userMessage already exists
   */
  latestUserMessage?: Message;

  /**
   * The configuration for the task.
   */
  configuration?: MessageSendConfiguration;
}

/**
 * Defines the signature for a task handler function.
 *
 * Handlers are implemented as async generators. They receive context about the
 * task and the triggering message. They perform work and yield status
 * or artifact updates (TaskYieldUpdate). The server consumes these yields,
 * updates the task state in the store, and streams events if applicable.
 *
 * @param context The TaskContext object containing task details and state.
 * @yields Updates to the task's status or artifacts.
 * @returns Optionally returns the final complete Task object (needed for non-streaming 'message/send').
 *   If void is returned, the server uses the last known state after processing all yields.
 */
export type TaskHandler = AgentEngine;

/**
 * @description This interface will be removed in the future. Use A2AContext instead.
 * Represents the parameters for an A2A request.
 */
export type A2AContext = Pick<A2ARequest, "params">;

/**
 * @description This interface will be removed in the future. Use A2AContext instead.
 * Represents the parameters for an A2A request.
 */
export type RequestParams = Required<A2AContext>;

/**
 * @description Represents the parameters for a server deployment request.
 */
export const ServerDeploymentRequestParamsSchema = z
  .object({
    /**
     * @required The name of the server
     */
    name: z.string(),
    /**
     * @required The agent card of the server
     */
    agentCard: AgentCardSchema,
    /**
     * @required The minified code of the server
     */
    code: z.string(),
    /**
     * @optional The NPM dependencies of the server(currently unsupported)
     */
    dependencies: z.array(z.string()).optional(),
  })
  .describe("Represents the parameters for a server deployment request.");

export type ServerDeploymentRequestParams = z.infer<
  typeof ServerDeploymentRequestParamsSchema
>;

/**
 * @description Represents the base parameters for a server deployment response.
 */
export const BaseServerDeploymentResponseParamsSchema = z
  .object({
    /**
     * @required The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
     */
    deploymentId: z.string().describe("The deployment ID"),
    /**
     * @required Whether the deployment was successful
     */
    success: z.boolean().describe("Whether the deployment was successful"),
  })
  .describe("Represents the base parameters for a server deployment response.");

export type BaseServerDeploymentResponseParams = z.infer<
  typeof BaseServerDeploymentResponseParamsSchema
>;

/**
 * @description Represents the parameters for a server deployment success response.
 */
export const ServerDeploymentSuccessResponseParamsSchema =
  BaseServerDeploymentResponseParamsSchema.extend({
    /**
     * @required The name of the server
     */
    name: z.string().describe("The name of the server"),
    /**
     * @required The URL of the server
     */
    url: z.url().describe("The URL of the server"),
    /**
     * @required The base path of the server
     */
    basePath: z.string().describe("The base path of the server"),
  }).describe(
    "Represents the parameters for a server deployment success response."
  );

export type ServerDeploymentSuccessResponseParams = z.infer<
  typeof ServerDeploymentSuccessResponseParamsSchema
>;

/**
 * @description Represents the request for a server deployment.
 */
export const ServerDeploymentRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("/deploy").describe("The method name"),
  params: ServerDeploymentRequestParamsSchema.describe(
    "The deployment parameters"
  ),
}).describe("Represents the request for a server deployment.");

export type ServerDeploymentRequest = z.infer<
  typeof ServerDeploymentRequestSchema
>;

/**
 * @description Represents the request for a test server deployment.
 */
export const TestServerDeploymentRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("/test/deploy").describe("The method name"),
  params: ServerDeploymentRequestParamsSchema.describe(
    "The test deployment parameters"
  ),
}).describe("Represents the request for a test server deployment.");

export type TestServerDeploymentRequest = z.infer<
  typeof TestServerDeploymentRequestSchema
>;

/**
 * @description Represents the response for a server deployment success request.
 */
export const ServerDeploymentSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    result: ServerDeploymentSuccessResponseParamsSchema.describe(
      "The deployment result"
    ),
  }).describe("Represents the response for a server deployment request.");
export type ServerDeploymentSuccessResponse = z.infer<
  typeof ServerDeploymentSuccessResponseSchema
>;

/**
 * @description Represents the response for a server deployment request.
 */
export const ServerDeploymentResponseSchema = z
  .union([ServerDeploymentSuccessResponseSchema, JSONRPCErrorResponseSchema])
  .describe("Represents the response for a server deployment request.");

export type ServerDeploymentResponse = z.infer<
  typeof ServerDeploymentResponseSchema
>;

export * from "./schemas/index.js";
export type { A2AError as A2AErrorType } from "./schemas/index.js";
