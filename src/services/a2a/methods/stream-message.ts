/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MessageSendParams,
  CoreContext,
  TaskAndHistory,
  UpdateEvent,
} from "~/types/index.js";
import { StreamManager } from "../../core/managers/stream.js";
import { createContext } from "../factory/context.js";
import { MethodParams } from "~/types/index.js";

export async function* streamMessage(
  input: MessageSendParams,
  params: MethodParams
) {
  const { service, engine, contextManager, signal } = params;
  let contextId: string | undefined = input.message.contextId;
  const context: CoreContext<MessageSendParams, TaskAndHistory, UpdateEvent> =
    createContext(
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

  yield* stream.stream(engine, service);
}

export type StreamMessageMethod = typeof streamMessage;
