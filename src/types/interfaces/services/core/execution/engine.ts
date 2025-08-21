import {
  CoreCommand,
  CoreContext,
  CoreState,
  CoreUpdate,
} from "../context/index.js";

/**
 * @description The execution engine.
 * @type {ExecutionEngine<CoreContext>}
 */
export type ExecutionEngine<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> = (
  context: CoreContext<TCommand, TState, TUpdate>
) => AsyncGenerator<TUpdate, void, unknown>;
