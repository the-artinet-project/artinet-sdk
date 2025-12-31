/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import {
  FINAL_STATES,
  TASK_NOT_FOUND,
  TASK_NOT_CANCELABLE,
  INTERNAL_ERROR,
} from "~/utils/index.js";

export const cancelTask: A2A.RequestHandler["cancelTask"] = async (
  { id: taskId }: A2A.TaskIdParams,
  context?: A2A.Context
): Promise<A2A.Task> => {
  if (!context) {
    throw INTERNAL_ERROR({ error: { message: "Context is required" } });
  }
  const service = context.service;
  const task: A2A.Task | undefined = await service.tasks.get(taskId);

  if (!task) {
    throw TASK_NOT_FOUND({ taskId });
  }

  if (FINAL_STATES.includes(task.status.state)) {
    throw TASK_NOT_CANCELABLE("Task is in a final state: " + task.status.state);
  }

  /**
   * By triggering onCancel, we're guaranteed that:
   *  - No further updates will be processed other than errors
   *  - The task will be cancelled
   *  - The task will be completed
   *  - The cancellations will be cleaned up
   */
  const cancelledTask: A2A.Task = {
    ...task,
    status: {
      ...task.status,
      state: A2A.TaskState.canceled,
    },
  };

  await context.publisher.onCancel(cancelledTask);
  return cancelledTask;
};
export type CancelTaskHandler = typeof cancelTask;

/**
 * @deprecated Use CancelTaskHandler instead
 */
export type CancelTaskMethod = CancelTaskHandler;
