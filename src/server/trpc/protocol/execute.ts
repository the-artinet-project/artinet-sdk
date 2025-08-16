import { Context } from "./context.js";

export async function execute<
  TRequest extends {} = any,
  TState extends {} = any,
>(
  engine: (request: TRequest) => AsyncGenerator<any, void, unknown>,
  context: Context<TRequest, TState>
): Promise<void> {
  if (context.events.onStart) {
    await context.events.onStart(context.command);
  }
  try {
    for await (const update of engine(context.command)) {
      if (context.isCancelled() || context.signal.aborted) {
        await context.events.onCancel(update);
        break;
      }
      await context.events.onUpdate(update);
    }
  } catch (error) {
    context.events.onError(error);
  } finally {
    context.events.onComplete();
  }
}
