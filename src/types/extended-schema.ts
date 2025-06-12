/**
 * This file contains Artinet-specific schema definitions separate from the A2A protocol.
 * These are extensions to the standard A2A protocol defined by Google:
 * @see https://github.com/google/A2A/blob/main/samples/js/src/schema.ts
 */

import type {
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  TaskStatus,
  A2ARequest,
  JSONRPCRequest,
  JSONRPCResponse,
  AgentCard,
  FileWithBytes,
  FileWithUri,
  Task,
  Message,
} from "./schemas/a2a/index.js";

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

export type ExtendedTaskStatusUpdate = Omit<TaskStatus, "timestamp">;
export type RequestParams = Required<Pick<A2ARequest, "params">>["params"];

export interface ServerDeploymentRequestParams {
  /**
   * The name of the server
   */
  name: string;
  /**
   * The agent card of the server
   */
  agentCard: AgentCard;
  /**
   * The minified code of the server
   */
  code: string;
  /**
   * The NPM dependencies of the server(currently unsupported)
   */
  dependencies?: string[];
}

export interface BaseServerDeploymentResponseParams {
  /**
   * The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
   */
  deploymentId: string;

  /**
   * Whether the deployment was successful
   */
  success: boolean;
}

export interface ServerDeploymentSuccessResponseParams
  extends BaseServerDeploymentResponseParams {
  /**
   * The name of the server
   */
  name: string;
  /**
   * The URL of the server
   */
  url: string;
  /**
   * The base path of the server
   */
  basePath: string;
}

export interface ServerDeploymentRequest extends JSONRPCRequest {
  /**
   * The method name
   */
  method: "/deploy";
  /**
   * The parameters
   */
  params: ServerDeploymentRequestParams;
}

export interface TestServerDeploymentRequest extends JSONRPCRequest {
  /**
   * The method name
   */
  method: "/test/deploy";
  /**
   * The parameters
   */
  params: ServerDeploymentRequestParams;
}

export type ServerDeploymentResponse =
  JSONRPCResponse<ServerDeploymentSuccessResponseParams>;

export * from "./schemas/a2a/index.js";
export type { A2AError as A2AErrorType } from "./schemas/a2a/index.js";
