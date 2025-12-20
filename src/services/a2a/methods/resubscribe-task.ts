/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, MethodParams, A2ARuntime, UpdateEvent } from "~/types/index.js";
import { createContext } from "../factory/context.js";
import {
  FINAL_STATES,
  INTERNAL_ERROR,
  INVALID_REQUEST,
  TASK_NOT_FOUND,
} from "~/utils/index.js";
import { StreamManager } from "~/services/core/managers/stream.js";

const createMessageParams = (task: A2A.Task) => {
  const latestUserMessage: A2A.Message | undefined = task.history
    ?.filter((msg) => msg.role === "user")
    ?.pop();

  if (!latestUserMessage) {
    throw INVALID_REQUEST("No user message found");
  }

  const messageParams: A2ARuntime["command"] = {
    message: {
      ...latestUserMessage,
      taskId: task.id,
      contextId: latestUserMessage.contextId ?? task.contextId,
    },
    metadata: task.metadata,
  };
  return messageParams;
};

const flushArtifacts = (
  taskId: string,
  contextId: string,
  task: A2A.Task,
  stream: StreamManager<
    A2ARuntime["command"],
    A2ARuntime["state"],
    A2ARuntime["update"]
  >
) => {
  if (task.artifacts && task.artifacts.length > 0) {
    for (const artifact of task.artifacts) {
      const artifactUpdate: A2A.TaskArtifactUpdateEvent = {
        kind: A2A.Kind["artifact-update"],
        taskId,
        contextId,
        artifact,
        lastChunk: task.artifacts.length === 1,
        metadata: task.metadata,
      };
      stream.addUpdate(artifactUpdate);
      task.artifacts.shift();
    }
  }
};
export async function* resubscribe(
  input: A2A.TaskIdParams,
  params: MethodParams
) {
  const { service, engine, contextManager, signal } = params;
  const state: A2ARuntime["state"] | undefined = await service.getState(
    input.id
  );
  if (!state || !((state as A2ARuntime["state"]).task as A2A.Task)) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  const contextId: string | undefined = state.task?.contextId;
  const stream: StreamManager<
    A2ARuntime["command"],
    A2ARuntime["state"],
    A2ARuntime["update"]
  > = new StreamManager();
  const context: A2ARuntime["context"] = createContext(
    createMessageParams((state as A2ARuntime["state"]).task),
    service,
    contextManager,
    signal,
    contextId,
    {
      ...service.eventOverrides,
      onStart: async (
        context: A2ARuntime["context"]
      ): Promise<A2ARuntime["state"]> => {
        const request = context.command;
        const task: A2A.Task = (state as A2ARuntime["state"]).task;
        const taskId: string = request?.message.taskId ?? task.id;
        const contextId: string =
          request?.message.contextId ?? task.contextId ?? stream.getContextId();
        const statusUpdate: A2A.TaskStatusUpdateEvent = {
          kind: "status-update",
          taskId,
          contextId,
          status: task.status,
          final: false,
          metadata: task.metadata,
        };

        stream.addUpdate(statusUpdate);

        if (FINAL_STATES.includes(task.status.state)) {
          flushArtifacts(taskId, contextId, task, stream);
          stream.setCompleted();
        }
        return state;
      },
    }
  );
  context.events.on("error", () => {
    context.events.onComplete();
  });
  stream.setExecutionContext(context);
  yield* stream.stream(engine, service);
}

export type ResubscribeTaskMethod = typeof resubscribe;
import { v2 } from "~/types/interfaces/services/v2/index.js";

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

//! Make sure not to upsert a Task before calling resubscribeTask
export const resubscribeTaskV2: v2.a2a.RequestHandler["resubscribe"] =
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
