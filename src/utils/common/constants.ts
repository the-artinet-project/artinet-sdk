import { TaskState, TaskStatusUpdateEvent } from "../../types/schemas/index.js";
import { getCurrentTimestamp } from "../index.js";
//todo: protocol specific so move to protocol folder

export const WORKING_UPDATE = (
  taskId: string,
  contextId: string,
  timestamp: string = getCurrentTimestamp()
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.working,
      timestamp: timestamp,
    },
    final: false,
  };
};

export const CANCEL_UPDATE = (
  taskId: string,
  contextId: string,
  timestamp: string = getCurrentTimestamp()
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.canceled,
      timestamp: timestamp,
    },
    final: true,
  };
};

export const SUBMITTED_UPDATE = (
  taskId: string,
  contextId: string,
  timestamp: string = getCurrentTimestamp()
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: TaskState.submitted,
      timestamp: timestamp,
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
