/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, UpdateEvent } from "~/types/index.js";
import { FINAL_STATES, INTERNAL_ERROR, TASK_NOT_FOUND } from "~/utils/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";

// const createMessageParams = (task: A2A.Task) => {
//   const latestUserMessage: A2A.Message | undefined = task.history
//     ?.filter((msg) => msg.role === "user")
//     ?.pop();

//   if (!latestUserMessage) {
//     throw INVALID_REQUEST("No user message found");
//   }

//   const messageParams: A2ARuntime["command"] = {
//     message: {
//       ...latestUserMessage,
//       taskId: task.id,
//       contextId: latestUserMessage.contextId ?? task.contextId,
//     },
//     metadata: task.metadata,
//   };
//   return messageParams;
// };

const flush = (task: A2A.Task, stream: v2.a2a.Stream) => {
  if (task.artifacts && task.artifacts.length > 0) {
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
  }
};

export const resubscribe: v2.a2a.RequestHandler["resubscribe"] =
  async function* (
    { id: taskId }: A2A.TaskIdParams,
    context?: v2.a2a.Context
  ): AsyncGenerator<UpdateEvent> {
    if (!context) {
      throw INTERNAL_ERROR({ error: { message: "Context is required" } });
    }

    const service = context.service;

    if (!(await service.tasks.has(taskId))) {
      throw TASK_NOT_FOUND({ taskId });
    }

    const stream: v2.a2a.Stream =
      (await service.streams.get(context.contextId)) ??
      (await service.streams.create({
        contextId: context.contextId,
        context,
      }));

    // since we already checked if the task exists
    // then we dont care about the upsert in onStart
    // so we can just push the update and continue
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
        flush(task, stream);
        await stream.kill();
      }
    });

    yield* stream.run({
      service: service,
    });
  };
export type TaskResubscribeHandler = typeof resubscribe;

/**
 * @deprecated Use ResubscribeTaskHandler instead
 */
export type ResubscribeTaskMethod = TaskResubscribeHandler;
