/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
/**
 * Our universal executor for {@link A2A.Engine}.
 * @param engine - {@link A2A.Engine} to execute.
 * @param context - {@link A2A.Context} provided to the engine.
 */
export const execute = async (
  engine: A2A.Engine,
  context: A2A.Context
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
    /** onError triggers completion internally */
    await context.publisher.onError(error);
    // throw error;
  } finally {
    await context.publisher.onComplete();
  }
};
