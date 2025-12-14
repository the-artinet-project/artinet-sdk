/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TaskIdParams,
  Task,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  Message,
  MethodParams,
  Kind,
  A2A,
} from "~/types/index.js";
import { createContext } from "../factory/context.js";
import {
  FINAL_STATES,
  INVALID_REQUEST,
  TASK_NOT_FOUND,
} from "~/utils/index.js";
import { StreamManager } from "~/services/core/managers/stream.js";

const createMessageParams = (task: Task) => {
  const latestUserMessage: Message | undefined = task.history
    ?.filter((msg) => msg.role === "user")
    ?.pop();

  if (!latestUserMessage) {
    throw INVALID_REQUEST("No user message found");
  }

  const messageParams: A2A["command"] = {
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
  task: Task,
  stream: StreamManager<A2A["command"], A2A["state"], A2A["update"]>
) => {
  if (task.artifacts && task.artifacts.length > 0) {
    for (const artifact of task.artifacts) {
      const artifactUpdate: TaskArtifactUpdateEvent = {
        kind: Kind["artifact-update"],
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
export async function* resubscribe(input: TaskIdParams, params: MethodParams) {
  const { service, engine, contextManager, signal } = params;
  const state: A2A["state"] | undefined = await service.getState(input.id);
  if (!state || !((state as A2A["state"]).task as Task)) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  const contextId: string | undefined = state.task?.contextId;
  const stream: StreamManager<A2A["command"], A2A["state"], A2A["update"]> =
    new StreamManager();
  const context: A2A["context"] = createContext(
    createMessageParams((state as A2A["state"]).task),
    service,
    contextManager,
    signal,
    contextId,
    {
      ...service.eventOverrides,
      onStart: async (context: A2A["context"]): Promise<A2A["state"]> => {
        const request = context.command;
        const task: Task = (state as A2A["state"]).task;
        const taskId: string = request?.message.taskId ?? task.id;
        const contextId: string =
          request?.message.contextId ?? task.contextId ?? stream.getContextId();
        const statusUpdate: TaskStatusUpdateEvent = {
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
