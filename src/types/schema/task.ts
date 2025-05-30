import { Message, Artifact } from "./parameters.js";
import {
  JSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCSuccessResponse,
} from "./rpc.js";

/**
 * @description Represents the state of a task within the A2A protocol.
 */
export enum TaskState {
  Submitted = "submitted",
  Working = "working",
  InputRequired = "input-required",
  Completed = "completed",
  Canceled = "canceled",
  Failed = "failed",
  Rejected = "rejected",
  AuthRequired = "auth-required",
  Unknown = "unknown",
}

/**
 * Basic parameters used for task ID operations.
 * Used by: `tasks/cancel`, `tasks/pushNotification/get`.
 */
export interface TaskIdParams {
  /**
   * The unique identifier of the task.
   */
  id: string;

  /**
   * Optional metadata to include with the operation.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Parameters used for querying task-related information by ID.
 * Used by: `tasks/get`, `tasks/getHistory`, `tasks/subscribe`, `tasks/resubscribe`.
 */
export interface TaskQueryParams extends TaskIdParams {
  /**
   * Optional history length to retrieve for the task.
   */
  historyLength?: number;
}

/**
 * Basic parameters used for task ID operations.
 * Used by: `tasks/cancel`, `tasks/pushNotification/get`.
 * @description Basic parameters used for task ID operations.
 * @required id
 * @optional metadata
 */
export interface TaskIdParams {
  /**
   * @required The unique identifier of the task.
   */
  id: string;

  /**
   * @optional metadata to include with the operation.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Parameters used for querying task-related information by ID.
 * @description Parameters used for querying task-related information by ID.
 * @required id
 * @optional historyLength
 */
export interface TaskQueryParams extends TaskIdParams {
  /**
   * @optional Number of recent messages to be retrieved.
   */
  historyLength?: number;
}

/**
 * Represents the status of a task at a specific point in time.
 * @description A task status is a snapshot of the task at a specific point in time.
 * @required state
 * @optional message
 * @optional timestamp
 */
export interface TaskStatus {
  /**
   * @required The current state of the task.
   */
  state: TaskState;

  /**
   * @optional An optional message associated with the current status (e.g., progress update, final response).
   */
  message?: Message;

  /**
   * @optional The timestamp when this status was recorded (ISO 8601 format).
   * @format date-time
   */
  timestamp?: string;
}

/**
 * Represents a task being processed by an agent.
 * @description A task is a unit of work that an agent can perform.
 * @required id
 * @optional contextId
 * @required status
 * @optional history
 * @optional artifacts
 * @optional metadata
 * @required kind
 */
export interface Task {
  /**
   * @required Unique identifier for the task.
   */
  id: string;

  /**
   * @optional identifier for the session this task belongs to.
   */
  contextId?: string;

  /**
   * @required The current status of the task.
   */
  status: TaskStatus;

  /**
   * @optional list of historical messages associated with the task.
   */
  history?: Message[];

  /**
   * @optional list of artifacts associated with the task (e.g., outputs, intermediate files).
   */
  artifacts?: Artifact[];

  /**
   * @optional metadata associated with the task.
   */
  metadata?: Record<string, unknown>;

  /**
   * @required Event type
   */
  kind: "task";
}

/**
 * Represents a status update event for a task, typically used in streaming scenarios.
 * @description A status update event is a snapshot of the task at a specific point in time.
 * @required taskId
 * @required contextId
 * @required kind
 * @required status
 * @optional metadata
 */
export interface TaskStatusUpdateEvent {
  /**
   * @required The ID of the task being updated.
   */
  taskId: string;

  /**
   * @required The context the task is associated with
   */
  contextId: string;

  /**
   * @required Event type
   */
  kind: "status-update";

  /**
   * @required The current status of the task.
   */
  status: TaskStatus;

  /**
   * @required Flag indicating if this is the final update for the task.
   */
  final: boolean;

  /**
   * @optional metadata associated with this update event.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Represents an artifact update event for a task, typically used in streaming scenarios.
 * @description An artifact update event is a snapshot of the task at a specific point in time.
 * @required taskId
 * @required contextId
 * @required kind
 * @required artifact
 * @optional append
 * @optional lastChunk
 * @optional metadata
 */
export interface TaskArtifactUpdateEvent {
  /**
   * @required The ID of the task being updated.
   */
  taskId: string;

  /**
   * @required The context the task is associated with
   */
  contextId: string;

  /**
   * @required Event type
   */
  kind: "artifact-update";

  /**
   * @required The new or updated artifact for the task.
   */
  artifact: Artifact;

  /**
   * @optional Indicates if this artifact appends to a previous one
   */
  append?: boolean;

  /**
   * @optional Indicates if this is the last chunk of the artifact
   */
  lastChunk?: boolean;

  /**
   * @optional metadata associated with this update event.
   */
  metadata?: Record<string, unknown>;
}

/**
 * @description Request to retrieve the current state of a task.
 * @required id
 * @required method
 * @required params
 */
export type GetTaskRequest = JSONRPCRequest<"tasks/get", TaskQueryParams>;

/**
 * @description JSON-RPC success response model for the 'tasks/get' method.
 * @required result
 * @never error
 */
export type GetTaskSuccessResponse = JSONRPCSuccessResponse<Task>;

/**
 * @description Response to a `tasks/get` request. Contains the Task object or an error.
 * @oneOf GetTaskSuccessResponse | JSONRPCErrorResponse
 */
export type GetTaskResponse = GetTaskSuccessResponse | JSONRPCErrorResponse;

/**
 * @description Request to resubscribe to updates for a task after a connection interruption.
 * @required id
 * @required method
 * @required params
 */
export type TaskResubscriptionRequest = JSONRPCRequest<
  "tasks/resubscribe",
  TaskQueryParams
>;

/**
 * @description Request to cancel a currently running task.
 * @required id
 * @required method
 * @required params
 */
export type CancelTaskRequest = JSONRPCRequest<"tasks/cancel", TaskIdParams>;

/**
 * @description JSON-RPC success response model for the 'tasks/cancel' method.
 * @required result
 * @never error
 */
export type CancelTaskSuccessResponse = JSONRPCSuccessResponse<Task>;

/**
 * @description Response to a `tasks/cancel` request. Contains the updated Task object (usually with 'canceled' state) or an error.
 * @oneOf CancelTaskSuccessResponse | JSONRPCErrorResponse
 */
export type CancelTaskResponse =
  | CancelTaskSuccessResponse
  | JSONRPCErrorResponse;
