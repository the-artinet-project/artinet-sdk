/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Task,
  TaskQueryParams,
  MethodParams,
  TaskAndHistory,
} from "~/types/index.js";
import { TASK_NOT_FOUND } from "~/utils/index.js";
import { getLatestHistory } from "../helpers/index.js";

export async function getTask(
  input: TaskQueryParams,
  params: Omit<MethodParams, "engine" | "contextManager" | "signal">
) {
  const { service } = params;
  const state: TaskAndHistory | undefined = await service.getState(input.id);
  const task: Task | undefined = state?.task;
  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  task.history = getLatestHistory(task, input.historyLength);
  return task;
}

export type GetTaskMethod = typeof getTask;
