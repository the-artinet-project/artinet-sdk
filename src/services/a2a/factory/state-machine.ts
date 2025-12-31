/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateMachine } from "~/services/a2a/state-machine.js";
import { A2A } from "~/types/index.js";
import { logger } from "~/config/index.js";
import * as describe from "~/create/describe.js";
import { TASK_NOT_FOUND } from "~/utils/index.js";
import assert from "assert";

export function createStateMachine({
  contextId,
  service,
  task: currentTask,
  overrides,
}: {
  contextId: string;
  service: A2A.Service;
  task: A2A.Task;
  overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>;
}): A2A.EventPublisher {
  const handler: A2A.EventConsumer = {
    contextId: contextId,
    onStart: async (context: A2A.Context): Promise<A2A.Task> => {
      assert(context.contextId === contextId, "context mismatch");
      logger.info(`onStart[ctx:${contextId}]:`, { taskId: context.taskId });

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
      logger.info(`onCancel[ctx:${contextId}]:`, "cancellation triggered");
      logger.debug(`onCancel[ctx:${contextId}]:`, "arguments", update, task);

      await service.cancellations.set(task.id);
      const cancellation: A2A.TaskStatusUpdateEvent = describe.update.canceled({
        taskId: task.id,
        contextId: task.contextId,
        message: (update as A2A.TaskStatusUpdateEvent).status?.message,
      });

      await service.tasks.update(
        (await service.contexts.get(contextId))!,
        cancellation
      );
    },
    onUpdate: async (update: A2A.Update, task: A2A.Task): Promise<A2A.Task> => {
      logger.info(`onUpdate[ctx:${contextId}]:`);
      logger.debug(`onUpdate[ctx:${contextId}]:`, { taskId: task.id });

      if (await service.cancellations.has(task.id)) {
        logger.warn(
          `onUpdate[ctx:${contextId}]:`,
          { taskId: task.id },
          "task is cancelled, no longer processing updates"
        );
        return task;
      }

      return await service.tasks.update(
        (await service.contexts.get(contextId))!,
        update
      );
    },
    onError: async (error: any, task: A2A.Task): Promise<void> => {
      logger.error(`onError[ctx:${contextId}]:`, error);

      if (!task) {
        logger.error(`onError[ctx:${contextId}]:`, new Error("task not found"));
        return;
      }

      const errorUpdate: A2A.TaskStatusUpdateEvent = describe.update.failed({
        taskId: task.id,
        contextId,
        message: describe.message({
          messageId: "failed-update",
          parts: [
            {
              kind: "text",
              text: error instanceof Error ? error.message : String(error),
            },
          ],
        }),
      });

      const context: A2A.Context | undefined = await service.contexts.get(
        contextId
      );

      if (!context) {
        logger.error(
          `onError[ctx:${contextId}]:`,
          new Error("context not found")
        );
        return;
      }

      await service.tasks.update(context, errorUpdate).catch((error) => {
        //we capture errors thrown during error handling to ensure we trigger completion gracefully
        logger.error(`onError: task update error[ctx:${contextId}]:`, error);
      });

      // we trigger completion here to ensure the context is cleaned up
      await context.publisher.onComplete();
    },
    onComplete: async (task: A2A.Task): Promise<void> => {
      assert(task.contextId === contextId, "context mismatch");
      logger.info(`onComplete[ctx:${contextId}]: `, { taskId: task.id });
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
