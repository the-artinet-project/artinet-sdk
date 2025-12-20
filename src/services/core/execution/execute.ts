/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExecutionEngine, Core, UpdateEvent, A2A } from "~/types/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";
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

export const v2Execute = async (
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
