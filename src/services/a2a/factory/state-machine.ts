/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateMachine } from "~/services/a2a/state-machine.js";
import { A2A } from "~/types/index.js";
import { logger } from "~/config/index.js";
import { TASK_NOT_FOUND, CANCEL_UPDATE, FAILED_UPDATE } from "~/utils/index.js";
import assert from "assert";

export function createStateMachine({
  contextId,
  service,
  task: currentTask,
  overrides,
}: {
  contextId: string;
  service: A2A.Service;
  task?: A2A.Task;
  overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>;
}): A2A.EventPublisher {
  const handler: A2A.EventConsumer = {
    contextId: contextId,
    onStart: async (context: A2A.Context): Promise<A2A.Task> => {
      assert(context.contextId === contextId, "context mismatch");
      logger.info(`onStart[${contextId}]:`, "starting state machine", context);
      await service.connections.set(context.contextId);
      const task = await service.tasks.get(context.taskId);
      // we now expect the task to be created by the service
      // so if it's not found we throw an error
      if (!task) {
        throw TASK_NOT_FOUND({ taskId: context.taskId, contextId: contextId });
      }
      return task;
    },
    onCancel: async (update: A2A.Update, task: A2A.Task): Promise<void> => {
      logger.debug(
        `onCancel[${contextId}]:`,
        "cancellation triggered",
        update,
        task
      );
      await service.cancellations.set(task.id);
      const cancellation: A2A.TaskStatusUpdateEvent = CANCEL_UPDATE(
        task.id,
        task.contextId,
        (update as A2A.TaskStatusUpdateEvent).status?.message
      );
      await service.tasks.update(
        (await service.contexts.get(contextId))!,
        cancellation
      );
    },
    onUpdate: async (update: A2A.Update, task: A2A.Task): Promise<A2A.Task> => {
      logger.debug(`onUpdate[${contextId}]:`, "update received", update, task);
      if (!(await service.cancellations.has(task.id))) {
        return task;
      }
      return await service.tasks.update(
        (await service.contexts.get(contextId))!,
        update
      );
    },
    onError: async (error: any, task: A2A.Task): Promise<void> => {
      logger.error(`onError[${contextId}]:`, "error detected", error, task);
      if (!task) {
        logger.error(`onError[${contextId}]:`, "task not found", error, task);
        return;
      }
      const errorUpdate: A2A.TaskStatusUpdateEvent = FAILED_UPDATE(
        task.id,
        contextId,
        undefined,
        error instanceof Error ? error.message : String(error)
      );

      await service.tasks
        .update((await service.contexts.get(contextId))!, errorUpdate)
        .catch((error) => {
          //we capture errors thrown during error handling to ensure we trigger completion gracefully
          logger.error(
            `onError[${contextId}]:`,
            "error updating task",
            error,
            errorUpdate
          );
        });
    },
    onComplete: async (task: A2A.Task): Promise<void> => {
      assert(task.contextId === contextId, "context mismatch");
      logger.info(`onComplete[${contextId}]:`, "task completed", task);
      await service.cancellations.delete(task.id);
      await service.connections.delete(task.contextId);
      await service.contexts.delete(task.contextId);
    },
  };
  return new StateMachine(
    contextId,
    {
      ...handler,
      ...overrides,
    },
    currentTask
  );
}
