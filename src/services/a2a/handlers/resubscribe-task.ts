/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { FINAL_STATES, INTERNAL_ERROR, TASK_NOT_FOUND } from "~/utils/index.js";

const flush = (task: A2A.Task, stream: A2A.Stream) => {
  if (!task.artifacts || task.artifacts.length === 0) return;

  for (const artifact of task.artifacts) {
    const artifactUpdate: A2A.TaskArtifactUpdateEvent = {
      kind: A2A.Kind["artifact-update"],
      taskId: task.id,
      contextId: task.contextId,
      artifact,
      lastChunk: task.artifacts.length === 1,
      metadata: task.metadata,
    };

    stream.updates.push(artifactUpdate);
    task.artifacts.shift();
  }
};

export const subscribeToTask: A2A.RequestHandler["resubscribe"] =
  async function* (
    { id: taskId }: A2A.TaskIdParams,
    context?: A2A.Context
  ): AsyncGenerator<A2A.Update> {
    if (!context) {
      throw INTERNAL_ERROR({ error: { message: "Context is required" } });
    }

    const service = context.service;

    if (!(await service.tasks.has(taskId))) {
      throw TASK_NOT_FOUND({ taskId });
    }

    const stream: A2A.Stream =
      (await service.streams.get(context.contextId)) ??
      (await service.streams.create({
        contextId: context.contextId,
        context,
      }));

    // onStart no longer inserts a new task, so we can safely push the update and continue
    context.publisher.on("start", async (_, task: A2A.Task) => {
      stream.updates.push({
        kind: "status-update",
        taskId: task.id,
        contextId: task.contextId,
        status: task.status,
        final: false,
        metadata: task.metadata,
      });
      if (FINAL_STATES.includes(task.status.state)) {
        /* We create a new task object to avoid mutating the original task */
        flush({ ...task }, stream);
        await stream.kill();
      }
    });

    yield* stream.run({
      service: service,
    });
  };
export type SubscribeToTaskHandler = typeof subscribeToTask;

/**
 * @deprecated Use SubscribeToTaskHandler instead
 */
export const resubscribe = subscribeToTask;

/**
 * @deprecated Use SubscribeToTaskHandler instead
 */
export type TaskResubscribeHandler = typeof resubscribe;

/**
 * @deprecated Use SubscribeToTaskHandler instead
 */
export type ResubscribeTaskMethod = TaskResubscribeHandler;
