/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2A } from "~/types/index.js";
import { update_compat, update } from "./task-builder.js";

/**
 * @deprecated Use {@link update.status} instead
 * @since 0.6.0
 */
export const STATUS_UPDATE = (
  taskId: string,
  contextId: string,
  status: A2A.TaskState,
  message?: A2A.Message,
  timestamp?: string,
  final?: boolean
): A2A.TaskStatusUpdateEvent =>
  update_compat(taskId, contextId, status, message, timestamp, final);

/**
 * @deprecated Use {@link update.working} instead
 * @since 0.6.0
 */
export const WORKING_UPDATE = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent =>
  update.working({
    taskId,
    contextId,
    message,
    timestamp,
  });

/**
 * @deprecated Use {@link update.canceled} instead
 * @since 0.6.0
 */
export const CANCEL_UPDATE = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent =>
  update.canceled({
    taskId,
    contextId,
    message,
    timestamp,
  });

/**
 * @deprecated Use {@link update.submitted} instead
 * @since 0.6.0
 */
export const SUBMITTED_UPDATE = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent =>
  update.submitted({
    taskId,
    contextId,
    message,
    timestamp,
  });

/**
 * @deprecated Use {@link update.failed} instead
 * @since 0.6.0
 */
export const FAILED_UPDATE_EVENT = (
  taskId: string,
  contextId: string,
  message?: A2A.Message,
  timestamp?: string
): A2A.TaskStatusUpdateEvent =>
  update.failed({
    taskId,
    contextId,
    message,
    timestamp,
  });
