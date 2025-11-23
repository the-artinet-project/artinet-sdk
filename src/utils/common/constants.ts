/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskState, TaskStatusUpdateEvent, Message } from "~/types/index.js";
import { getCurrentTimestamp } from "./utils.js";
//todo: protocol specific so move to a2a folder

export const STATUS_UPDATE = (
  taskId: string,
  contextId: string,
  status: TaskState,
  message?: Message,
  timestamp: string = getCurrentTimestamp(),
  final: boolean = false
): TaskStatusUpdateEvent => {
  return {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: status,
      message: message,
      timestamp: timestamp,
    },
    final: final,
  };
};

export const WORKING_UPDATE = (
  taskId: string,
  contextId: string,
  message?: Message,
  timestamp?: string
): TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    TaskState.working,
    message,
    timestamp
  );
};

export const CANCEL_UPDATE = (
  taskId: string,
  contextId: string,
  message?: Message,
  timestamp?: string
): TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    TaskState.canceled,
    message,
    timestamp,
    true
  );
};

export const SUBMITTED_UPDATE = (
  taskId: string,
  contextId: string,
  message?: Message,
  timestamp?: string
): TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    TaskState.submitted,
    message,
    timestamp
  );
};

export const FAILED_UPDATE_EVENT = (
  taskId: string,
  contextId: string,
  message?: Message,
  timestamp?: string
): TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    TaskState.failed,
    message,
    timestamp,
    true
  );
};
export const FINAL_STATES: TaskState[] = [
  TaskState.completed,
  TaskState.failed,
  TaskState.canceled,
  TaskState.rejected,
];
