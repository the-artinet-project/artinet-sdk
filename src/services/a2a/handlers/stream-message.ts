/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { UpdateEvent } from "~/types/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";

export const streamMessage: v2.a2a.RequestHandler["streamMessage"] =
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

export type StreamMessageHandler = typeof streamMessage;

/**
 * @deprecated Use StreamMessageHandler instead
 */
export type StreamMessageMethod = StreamMessageHandler;
