/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { getCurrentTimestamp } from "./utils.js";
//todo: protocol specific so move to a2a folder

export const STATUS_UPDATE = (
  taskId: string,
  contextId: string,
  status: A2A.TaskState,
  message?: A2A.Message,
  timestamp: string = getCurrentTimestamp(),
  final: boolean = false
): A2A.TaskStatusUpdateEvent => {
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
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    A2A.TaskState.working,
    message,
    timestamp
  );
};

export const CANCEL_UPDATE = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    A2A.TaskState.canceled,
    message,
    timestamp,
    true
  );
};

export const SUBMITTED_UPDATE = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    A2A.TaskState.submitted,
    message,
    timestamp
  );
};

export const FAILED_UPDATE_EVENT = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent => {
  return STATUS_UPDATE(
    taskId,
    contextId,
    A2A.TaskState.failed,
    message,
    timestamp,
    true
  );
};
export const FINAL_STATES: A2A.TaskState[] = [
  A2A.TaskState.completed,
  A2A.TaskState.failed,
  A2A.TaskState.canceled,
  A2A.TaskState.rejected,
];
