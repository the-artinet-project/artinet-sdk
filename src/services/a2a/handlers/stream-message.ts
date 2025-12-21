/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { INTERNAL_ERROR } from "~/utils/index.js";

export const streamMessage: A2A.RequestHandler["streamMessage"] =
  async function* (_, context?: A2A.Context): AsyncGenerator<A2A.Update> {
    if (!context) {
      throw INTERNAL_ERROR({ error: { message: "Context is required" } });
    }
    const service = context.service;
    if (await service.streams.has(context.contextId)) {
      throw INTERNAL_ERROR({ error: { message: "Stream already exists" } });
    }
    const stream: A2A.Stream = await service.streams.create({
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
