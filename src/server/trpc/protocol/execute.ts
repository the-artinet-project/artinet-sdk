import { Context } from "./context.js";

/**
 * @description The execution engine.
 * @type {ExecutionEngine<Context>}
 */
export type ExecutionEngine<TContext extends Context = Context> = (
  command: TContext["command"]
) => AsyncGenerator<TContext["command"], void, undefined>;

export async function execute<TContext extends Context = Context>(
  engine: ExecutionEngine<TContext>,
  context: TContext
): Promise<void> {
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
}
