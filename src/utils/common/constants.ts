import { TaskState, TaskStatusUpdateEvent } from "../../types/schemas/index.js";

export const WORKING_UPDATE = (
  taskId: string,
  contextId: string
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.working,
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
      state: TaskState.canceled,
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
      state: TaskState.submitted,
    },
    final: false,
  };
};

export const FINAL_STATES: TaskState[] = [
  TaskState.completed,
  TaskState.failed,
  TaskState.canceled,
  TaskState.rejected,
];
