/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, A2ARuntime, MethodParams } from "~/types/index.js";
import {
  FINAL_STATES,
  TASK_NOT_FOUND,
  TASK_NOT_CANCELABLE,
  INTERNAL_ERROR,
} from "~/utils/index.js";

export async function cancelTask(
  input: A2A.TaskIdParams,
  params: Omit<MethodParams, "engine" | "signal">
): Promise<A2A.Task> {
  const { service, contextManager } = params;
  const originalState: A2ARuntime["state"] | undefined = await service.getState(
    input.id
  );
  const task: A2A.Task | undefined = originalState?.task;

  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }

  if (FINAL_STATES.includes(task.status.state)) {
    throw TASK_NOT_CANCELABLE("Task is in a final state: " + task.status.state);
  }

  service.addCancellation(input.id);

  const cancelledTask: A2A.Task = {
    ...task,
    status: {
      ...task.status,
      state: A2A.TaskState.canceled,
    },
  };

  const context: A2ARuntime["context"] | undefined = contextManager.getContext(
    task.contextId ?? input.id
  );

  if (!context) {
    service.setState(input.id, {
      ...originalState,
      task: {
        ...originalState?.task,
        ...cancelledTask,
      },
      history: [], //deprecating history
    });
    return cancelledTask;
  }

  context.events.on("complete", () => {
    service.removeCancellation(input.id);
    contextManager.deleteContext(context.contextId);
  });

  await context.events.onCancel(cancelledTask);
  return cancelledTask;
}

export type CancelTaskMethod = typeof cancelTask;

import { v2 } from "~/types/interfaces/services/v2/index.js";
//! Make sure not to upsert a Task before calling cancelTask
export const cancelTaskV2: v2.a2a.RequestHandler["cancelTask"] = async (
  { id: taskId }: A2A.TaskIdParams,
  context?: v2.a2a.Context
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

  service.cancellations.set(taskId);

  const cancelledTask: A2A.Task = {
    ...task,
    status: {
      ...task.status,
      state: A2A.TaskState.canceled,
    },
  };

  context.publisher?.on("complete", async () => {
    await service.cancellations.delete(taskId);
    await service.contexts.delete(context.contextId);
  });

  await context.publisher.onCancel(cancelledTask);
  return cancelledTask;
};
