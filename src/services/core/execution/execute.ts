import {
  ExecutionEngine,
  CoreState,
  CoreUpdate,
  CoreContext,
  CoreCommand,
} from "~/types/index.js";

export const coreExecute = async <
  TCommand extends CoreCommand = CoreCommand,
  TUpdate extends CoreUpdate = CoreUpdate,
  TState extends CoreState = CoreState,
  TContext extends CoreContext<TCommand, TState, TUpdate> = CoreContext<
    TCommand,
    TState,
    TUpdate
  >,
>(
  engine: ExecutionEngine<TCommand, TUpdate>,
  context: TContext
): Promise<void> => {
  try {
    if (context.events.onStart) {
      await context.events.onStart(context.command);
    }
    for await (const update of engine(context.command)) {
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
