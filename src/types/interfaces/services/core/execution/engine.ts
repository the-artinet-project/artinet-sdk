import { CoreCommand, CoreUpdate } from "../context/index.js";

/**
 * @description The execution engine.
 * @type {ExecutionEngine<Context>}
 */
export type ExecutionEngine<
  TCommand extends CoreCommand = CoreCommand,
  TUpdate extends CoreUpdate = CoreUpdate,
> = (command: TCommand) => AsyncGenerator<TUpdate, void, unknown>;
