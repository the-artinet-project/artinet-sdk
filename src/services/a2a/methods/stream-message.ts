/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { StreamManager } from "../../core/managers/stream.js";
import { createContext } from "../factory/context.js";
import { MethodParams } from "~/types/index.js";

export async function* streamMessage(
  input: A2A["command"],
  params: MethodParams
) {
  const { service, engine, contextManager, signal } = params;
  let contextId: string | null | undefined = input.message.contextId;
  const context: A2A["context"] = createContext(
    input,
    service,
    contextManager,
    signal,
    contextId ?? undefined,
    service.eventOverrides
  );

  const stream: StreamManager<A2A["command"], A2A["state"], A2A["update"]> =
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
