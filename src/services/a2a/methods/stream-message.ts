/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MessageSendParams,
  TaskState,
  CoreContext,
  TaskAndHistory,
  UpdateEvent,
  TaskStatusUpdateEvent,
  Task,
} from "~/types/index.js";
import { StreamManager } from "../../core/managers/stream.js";
import { createContext } from "../factory/context.js";
import {
  SUBMITTED_UPDATE,
  WORKING_UPDATE,
  INVALID_PARAMS,
} from "~/utils/index.js";
import { MethodParams } from "~/types/index.js";

export async function* streamMessage(
  input: MessageSendParams,
  params: MethodParams
) {
  const { service, engine, contextManager, signal } = params;
  let contextId: string = input.message.contextId ?? "";
  const context: CoreContext<MessageSendParams, TaskAndHistory, UpdateEvent> =
    await createContext(
      input,
      service,
      contextManager,
      signal,
      contextId,
      service.eventOverrides
    );

  const stream: StreamManager<MessageSendParams, TaskAndHistory, UpdateEvent> =
    new StreamManager(context);
  contextId = stream.getContextId();

  context.events.on("complete", () => {
    contextManager.deleteContext(contextId);
    stream.setCompleted();
  });

  context.events.on("error", () => {
    context.events.onComplete();
  });

  context.events.on("start", (request: MessageSendParams, currentState) => {
    if (!request.message.taskId && !currentState?.task?.id) {
      throw INVALID_PARAMS("No task id found");
    }
    let update: Task | TaskStatusUpdateEvent =
      currentState?.task ??
      SUBMITTED_UPDATE(
        request.message.taskId ?? currentState?.task?.id,
        contextId
      );
    stream.addUpdate({
      ...update,
      status: {
        ...update.status,
        state: TaskState.submitted,
      },
    });
    stream.addUpdate(
      WORKING_UPDATE(
        request.message.taskId ?? currentState?.task?.id,
        contextId
      )
    ); //don't know why I was sending this working update here
  });

  yield* stream.stream(engine, service);
}

export type StreamMessageMethod = typeof streamMessage;
