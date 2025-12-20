/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2ARuntime, UpdateEvent } from "~/types/index.js";
import { StreamManager } from "../../core/managers/stream.js";
import { createContext } from "../factory/context.js";
import { MethodParams } from "~/types/index.js";

export async function* streamMessage(
  input: A2ARuntime["command"],
  params: MethodParams
) {
  const { service, engine, contextManager, signal } = params;
  let contextId: string | null | undefined = input.message.contextId;
  const context: A2ARuntime["context"] = createContext(
    input,
    service,
    contextManager,
    signal,
    contextId ?? undefined,
    service.eventOverrides
  );

  const stream: StreamManager<
    A2ARuntime["command"],
    A2ARuntime["state"],
    A2ARuntime["update"]
  > = new StreamManager(context);
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
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";

export const streamMessageV2: v2.a2a.RequestHandler["streamMessage"] =
  async function* (_, context?: v2.a2a.Context): AsyncGenerator<UpdateEvent> {
    if (!context) {
      throw INTERNAL_ERROR({ error: { message: "Context is required" } });
    }
    const service = context.service;
    if (await service.streams.has(context.contextId)) {
      throw INTERNAL_ERROR({ error: { message: "Stream already exists" } });
    }
    const stream: v2.a2a.Stream = await service.streams.create({
      contextId: context.contextId,
      context,
    });
    yield* stream.run({ service });
  };
