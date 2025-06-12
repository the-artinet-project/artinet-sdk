import {
  TaskState,
  TaskStatusUpdateEvent,
} from "../../types/schemas/a2a/index.js";

export const WORKING_UPDATE = (
  taskId: string,
  contextId: string
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.Working,
    },
    final: false,
  };
};

export const CANCEL_UPDATE = (
  taskId: string,
  contextId: string
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.Canceled,
    },
    final: true,
  };
};

export const SUBMITTED_UPDATE = (
  taskId: string,
  contextId: string
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.Submitted,
    },
    final: false,
  };
};

export const FINAL_STATES: TaskState[] = [
  TaskState.Completed,
  TaskState.Failed,
  TaskState.Canceled,
  TaskState.Rejected,
];
