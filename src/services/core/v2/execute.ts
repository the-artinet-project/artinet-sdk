/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { UpdateEvent } from "~/types/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";

export const execute = async (
  engine: v2.a2a.Engine<v2.a2a.Context, UpdateEvent>,
  context: v2.a2a.Context
): Promise<void> => {
  try {
    if (context.publisher.onStart) {
      await context.publisher.onStart(context);
    }
    for await (const update of engine(context)) {
      if ((await context.isCancelled()) || context.abortSignal.aborted) {
        await context.publisher.onCancel(update);
        break;
      }
      await context.publisher.onUpdate(update);
    }
  } catch (error) {
    await context.publisher.onError(error);
    throw error;
  } finally {
    await context.publisher.onComplete();
  }
};
