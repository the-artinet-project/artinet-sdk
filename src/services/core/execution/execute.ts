/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExecutionEngine, Core } from "~/types/index.js";

export const coreExecute = async <
  TCommand extends Core["command"] = Core["command"],
  TUpdate extends Core["update"] = Core["update"],
  TState extends Core["state"] = Core["state"],
  TContext extends Core<TCommand, TState, TUpdate>["context"] = Core<
    TCommand,
    TState,
    TUpdate
  >["context"]
>(
  engine: ExecutionEngine<TCommand, TState, TUpdate>,
  context: TContext
): Promise<void> => {
  try {
    if (context.events.onStart) {
      await context.events.onStart(context);
    }
    for await (const update of engine(context)) {
      if (context.isCancelled() || context.signal.aborted) {
        await context.events.onCancel(update);
        break;
      }
      await context.events.onUpdate(update);
    }
  } catch (error) {
    context.events.onError(error);
    throw error;
  } finally {
    context.events.onComplete();
  }
};
