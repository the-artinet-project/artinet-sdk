/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { v4 as uuidv4 } from "uuid";
import { getCurrentTimestamp } from "~/utils/index.js";
import {
  isMessageParams,
  Message,
  type MessageParams,
  // type BuilderMessageParams,
} from "./message-builder.js";
import { Kindless } from "./base.js";
// ============================================================================
// Artifact
// ============================================================================
/* named intermediate type for artifact params to coax the type system */
export type BaseArtifactParams = Partial<Kindless<A2A.Artifact>>;
export type ArtifactParams = BaseArtifactParams | string;
export const isArtifactParams = (params: any): params is ArtifactParams => {
  return (
    typeof params === "string" ||
    (typeof params === "object" && params !== null && "parts" in params)
  );
};

export class Artifact {
  private readonly _artifact: A2A.Artifact;
  constructor(artifact_params: Partial<A2A.Artifact> = {}) {
    this._artifact = {
      artifactId: uuidv4(),
      parts: [],
      ...artifact_params,
    };
  }
  get artifact(): A2A.Artifact {
    return this._artifact;
  }
  static create(params: ArtifactParams = {}): A2A.Artifact {
    return new Artifact(
      typeof params === "string"
        ? { parts: [{ text: params, kind: "text" }] }
        : params
    ).artifact;
  }
}

export const artifact = Artifact.create;

// ============================================================================
// Task Status
// ============================================================================

export type StatusParams =
  | Partial<Kindless<A2A.TaskStatus>>
  | A2A.TaskState
  | MessageParams;

export const isStatusParams = (params: any): params is StatusParams => {
  return (
    typeof params === "string" ||
    (typeof params === "object" &&
      params !== null &&
      "state" in params &&
      params.state in A2A.TaskState) ||
    (typeof params === "object" &&
      params !== null &&
      "message" in params &&
      isMessageParams(params.message))
  );
};

export class TaskStatus {
  private readonly _status: A2A.TaskStatus;
  constructor(params: Partial<A2A.TaskStatus> = {}) {
    const timestamp = params.timestamp ?? getCurrentTimestamp();
    this._status = {
      ...params,
      state: params.state ?? A2A.TaskState.working,
      timestamp,
    };
  }
  get status(): A2A.TaskStatus {
    return this._status;
  }
  static create(params: StatusParams = {}): A2A.TaskStatus {
    if (typeof params === "string" && params in A2A.TaskState) {
      return new TaskStatus({ state: params as A2A.TaskState }).status;
    } else if (isMessageParams(params)) {
      return new TaskStatus({
        state: A2A.TaskState.working,
        message: Message.create(params),
      }).status;
    }
    return new TaskStatus(params).status;
  }
}

/**
 * Convenience factory function for creating a task status with default parameters.
 *
 * @returns New {@link A2A.TaskStatus} with default parameters
 * @defaults {
 *   state: "working",
 *   timestamp: getCurrentTimestamp(),
 * }
 *
 * @example
 * ```typescript
 * const status = status("working");
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const status = TaskStatus.create;

// ============================================================================
// Task
// ============================================================================

export type TaskParams = Partial<Kindless<A2A.Task>> | StatusParams;

export class Task {
  private readonly _task: A2A.Task;
  constructor(params: Partial<Kindless<A2A.Task>> = {}) {
    const id = params.id ?? uuidv4();
    this._task = {
      ...params,
      id,
      contextId: params.contextId ?? id,
      kind: A2A.Kind.task,
      status: TaskStatus.create(params.status),
    };
  }
  get task(): A2A.Task {
    return this._task;
  }
  static create(params: TaskParams = {}): A2A.Task {
    if (isStatusParams(params)) {
      return new Task({ status: TaskStatus.create(params) }).task;
    }
    return new Task(params).task;
  }
}

/**
 * Convenience factory function for creating a task with default parameters.
 *
 * @returns New {@link A2A.Task} with default parameters
 * @defaults:
 * - `id`: uuidv4()
 * - `contextId`: id
 * - `status`: { state: "working" }
 * @example
 * ```typescript
 * const task = task({ status: { state: "working" } });
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const task = Task.create;

// ============================================================================
// Task Status Update Event
// ============================================================================

export type StatusUpdateParams =
  | (Partial<Kindless<A2A.TaskStatusUpdateEvent>> & {
      status: StatusParams;
    })
  | StatusParams;

export class TaskStatusUpdateEvent {
  private readonly _event: A2A.TaskStatusUpdateEvent;
  constructor(
    params: Partial<Kindless<A2A.TaskStatusUpdateEvent>> &
      Required<Pick<Kindless<A2A.TaskStatusUpdateEvent>, "status">>
  ) {
    const taskId = params.taskId ?? params.status.message?.taskId ?? uuidv4();
    const contextId =
      params.contextId ?? params.status.message?.contextId ?? taskId;
    this._event = {
      ...params,
      taskId,
      contextId,
      kind: A2A.Kind["status-update"],
      final: params.final ?? false,
    };
  }
  get event(): A2A.TaskStatusUpdateEvent {
    return this._event;
  }
  static create(params: StatusUpdateParams): A2A.TaskStatusUpdateEvent {
    if (isStatusParams(params)) {
      return new TaskStatusUpdateEvent({
        /*allows for a mixture of Update & Status Params*/
        ...(typeof params === "object" ? params : {}),
        status: TaskStatus.create(params),
      }).event;
    }
    return new TaskStatusUpdateEvent(params).event;
  }
}

// ============================================================================
// Task Artifact Update Event
// ============================================================================

export type ArtifactUpdateParams =
  | (Partial<Kindless<A2A.TaskArtifactUpdateEvent>> & {
      artifact: ArtifactParams;
    })
  | ArtifactParams;

export class TaskArtifactUpdateEvent {
  private readonly _event: A2A.TaskArtifactUpdateEvent;
  constructor(
    params: Partial<Kindless<A2A.TaskArtifactUpdateEvent>> &
      Required<Pick<Kindless<A2A.TaskArtifactUpdateEvent>, "artifact">>
  ) {
    const taskId = params.taskId ?? uuidv4();
    this._event = {
      ...params,
      taskId,
      contextId: params.contextId ?? taskId,
      kind: A2A.Kind["artifact-update"],
    };
  }

  get event(): A2A.TaskArtifactUpdateEvent {
    return this._event;
  }

  static create(params: ArtifactUpdateParams): A2A.TaskArtifactUpdateEvent {
    if (isArtifactParams(params)) {
      return new TaskArtifactUpdateEvent({
        artifact: Artifact.create(params),
      }).event;
    }
    return new TaskArtifactUpdateEvent({
      ...params,
      artifact: Artifact.create(params.artifact),
    }).event;
  }
}

type StrictUpdateParams = Partial<Kindless<A2A.TaskStatusUpdateEvent>> &
  Required<
    Pick<Kindless<A2A.TaskStatusUpdateEvent>, "taskId" | "contextId" | "status">
  >;

const strict_update = (
  params: StrictUpdateParams
): A2A.TaskStatusUpdateEvent => {
  return TaskStatusUpdateEvent.create(params);
};

export type BuildStatusParams = Omit<StrictUpdateParams, "status"> &
  Omit<A2A.TaskStatus, "state">;

function _buildUpdate(
  state: A2A.TaskState,
  params: BuildStatusParams,
  final?: boolean
): A2A.TaskStatusUpdateEvent {
  return strict_update({
    taskId: params.taskId,
    contextId: params.contextId,
    status: {
      state: state,
      message: params.message,
      timestamp: params.timestamp,
    },
    final: final ?? params.final,
    metadata: params.metadata,
  });
}

function _working(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState.working, params);
}

function _canceled(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState.canceled, params, true);
}

function _submitted(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState.submitted, params);
}

function _failed(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState.failed, params, true);
}

function _completed(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState.completed, params, true);
}

function _inputRequired(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState["input-required"], params);
}

function _rejected(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState.rejected, params);
}

function _authRequired(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState["auth-required"], params);
}

function _unknown(params: BuildStatusParams): A2A.TaskStatusUpdateEvent {
  return _buildUpdate(A2A.TaskState["unknown"], params);
}

/**
 * Convenience factory function for creating a task status and artifact update events with default parameters.
 *
 * @returns New {@link A2A.TaskStatusUpdateEvent} and {@link A2A.TaskArtifactUpdateEvent} with default parameters
 *
 * @example
 * ```typescript
 * const artifactEvent = update.artifact({
 *   artifact: "result"
 * });
 * const statusEvent = update.status({
 *   status: "working"
 * });
 * ```
 *
 * @public
 * @since 0.6.0
 */
export const update = {
  /**
   * Convenience factory function for creating a task artifact update event.
   * @returns New {@link A2A.TaskArtifactUpdateEvent}
   * @example
   * ```typescript
   * const event = update.artifact({
   *   artifact: "result"
   * });
   * ```
   */
  artifact: TaskArtifactUpdateEvent.create,

  /**
   * Convenience factory function for creating a task status update event.
   * @returns New {@link A2A.TaskStatusUpdateEvent}
   * @example
   * ```typescript
   * const event = update.status({
   *   message: "Working on the task"
   * });
   * ```
   */
  status: TaskStatusUpdateEvent.create,

  /**
   * Convenience factory function for creating a task status update event with the working state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.working} state
   * @example
   * ```typescript
   * const event = update.working({
   *   message: "Working on the task"
   * });
   * ```
   */
  working: _working,

  /**
   * Convenience factory function for creating a task status update event with the canceled state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.canceled} state
   * @example
   * ```typescript
   * const event = update.canceled({
   *   message: "Task canceled"
   * });
   * ```
   */
  canceled: _canceled,

  /**
   * Convenience factory function for creating a task status update event with the submitted state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.submitted} state
   * @example
   * ```typescript
   * const event = update.submitted({
   *   message: "Task submitted"
   * });
   * ```
   */
  submitted: _submitted,

  /**
   * Convenience factory function for creating a task status update event with the failed state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.failed} state
   * @example
   * ```typescript
   * const event = update.failed({
   *   message: "Task failed"
   * });
   * ```
   */
  failed: _failed,

  /**
   * Convenience factory function for creating a task status update event with the completed state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.completed} state
   * @example
   * ```typescript
   * const event = update.completed({
   *   message: "Task completed"
   * });
   * ```
   */
  completed: _completed,

  /**
   * Convenience factory function for creating a task status update event with the input required state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState["input-required"]} state
   * @example
   * ```typescript
   * const event = update.inputRequired({
   *   message: "Task input required"
   * });
   * ```
   */
  inputRequired: _inputRequired,

  /**
   * Convenience factory function for creating a task status update event with the rejected state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.rejected} state
   * @example
   * ```typescript
   * const event = update.rejected({
   *   message: "Task rejected"
   * });
   * ```
   */
  rejected: _rejected,

  /**
   * Convenience factory function for creating a task status update event with the auth required state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState["auth-required"]} state
   * @example
   * ```typescript
   * const event = update.authRequired({
   *   message: {
   *   role: "agent"
   *   parts: [
   *     {
   *       text: "Task auth required"
   *     }
   *   ]
   *   kind: "message"
   * });
   * ```
   */
  authRequired: _authRequired,

  /**
   * Convenience factory function for creating a task status update event with the unknown state.
   * @returns New {@link A2A.TaskStatusUpdateEvent} with the {@link A2A.TaskState.unknown} state
   * @example
   * ```typescript
   * const event = update.unknown({
   *   message: "Task unknown"
   * });
   * ```
   */
  unknown: _unknown,
};

/**
 * @description A temporary compatibility function for updating a task status, purely for migration purposes.
 * @deprecated Use {@link update.status} instead
 * @since 0.6.0
 */
export const update_compat = (
  taskId: string,
  contextId: string,
  state: A2A.TaskState,
  message?: A2A.Message,
  timestamp?: string,
  final: boolean = false
): A2A.TaskStatusUpdateEvent => {
  return _buildUpdate(
    state,
    {
      taskId: taskId,
      contextId: contextId,
      message: message,
      timestamp: timestamp,
    },
    final
  );
};
