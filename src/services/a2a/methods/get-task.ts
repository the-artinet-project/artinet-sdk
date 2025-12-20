/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, MethodParams, TaskAndHistory } from "~/types/index.js";
import { TASK_NOT_FOUND, INTERNAL_ERROR } from "~/utils/index.js";
import { getLatestHistory } from "../helpers/index.js";

export async function getTask(
  input: A2A.TaskQueryParams,
  params: Omit<MethodParams, "engine" | "contextManager" | "signal">
) {
  const { service } = params;
  const state: TaskAndHistory | undefined = await service.getState(input.id);
  const task: A2A.Task | undefined = state?.task;
  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  task.history = getLatestHistory(task, input.historyLength);
  return task;
}

export type GetTaskMethod = typeof getTask;

import { v2 } from "~/types/interfaces/services/v2/index.js";
//! Make sure not to upsert a Task before calling getTask
export const getTaskV2: v2.a2a.RequestHandler["getTask"] = async (
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
