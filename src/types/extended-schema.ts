/**
 * This file contains Artinet-specific schema definitions separate from the A2A protocol.
 * These are extensions to the standard A2A protocol defined by Google:
 * @see https://github.com/google/A2A/blob/main/samples/js/src/schema.ts
 */

import type {
  JSONRPCMessage,
  JSONRPCError,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  TaskStatus,
  Artifact,
  A2ARequest,
} from "./schema.js";

/**
 * Improved JSON-RPC Response types using discriminated unions
 * These provide better type safety than the standard optional field approach
 */

/**
 * Represents a successful JSON-RPC response with a result.
 */
export interface JSONRPCSuccessResponse<R = any> extends JSONRPCMessage {
  /**
   * The result of the method invocation.
   */
  result: R;

  /**
   * In a success response, error must never be present.
   */
  error?: never;
}

/**
 * Represents an error JSON-RPC response.
 */
export interface JSONRPCErrorResponse<E = any> extends JSONRPCMessage {
  /**
   * The error object.
   */
  error: JSONRPCError<E>;

  /**
   * In an error response, result must never be present.
   */
  result?: never;
}

/**
 * Combined JSON-RPC response type as a discriminated union.
 * This ensures a response is either a success with a result, or an error.
 */
export type ExtendedJSONRPCResponse<R = any, E = any> =
  | JSONRPCSuccessResponse<R>
  | JSONRPCErrorResponse<E>;

export type TaskEvent = TaskStatusUpdateEvent | TaskArtifactUpdateEvent;
/**
 * Represents the possible types of updates a TaskHandler can yield.
 * Either a partial TaskStatus (without the server-managed timestamp)
 * or a complete Artifact object.
 */
export type TaskYieldUpdate = Omit<TaskStatus, "timestamp"> | Artifact;

export type ExtendedTaskStatusUpdate = Omit<TaskStatus, "timestamp">;
export type RequestParams = Required<Pick<A2ARequest, "params">>["params"];

export * from "./schema.js";
export type { A2AError as A2AErrorType } from "./schema.js";
