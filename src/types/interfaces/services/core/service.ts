import {
  CoreContext,
  CoreCommand,
  CoreState,
  CoreUpdate,
} from "./context/index.js";
import { ExecutionEngine } from "./execution/index.js";

export interface ServiceInterface<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  execute: (
    engine: ExecutionEngine<TCommand, TUpdate>,
    context: CoreContext<TCommand, TState, TUpdate>
  ) => Promise<void>;
  stop: () => Promise<void>;
}
