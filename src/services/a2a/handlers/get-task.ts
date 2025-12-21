/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2A } from "~/types/index.js";
import { TASK_NOT_FOUND, INTERNAL_ERROR } from "~/utils/index.js";
import { getLatestHistory } from "../helpers/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";

export const getTask: v2.a2a.RequestHandler["getTask"] = async (
  { id: taskId, historyLength }: A2A.TaskQueryParams,
  context?: v2.a2a.Context
): Promise<A2A.Task> => {
  if (!context) {
    throw INTERNAL_ERROR({ error: { message: "Context is required" } });
  }
  const task: A2A.Task | undefined = await context.service.tasks.get(taskId);
  if (!task) {
    throw TASK_NOT_FOUND({ taskId });
  }
  task.history = getLatestHistory(task, historyLength);
  return task;
};
export type GetTaskHandler = typeof getTask;

/**
 * @deprecated Use GetTaskHandler instead
 */
export type GetTaskMethod = GetTaskHandler;
