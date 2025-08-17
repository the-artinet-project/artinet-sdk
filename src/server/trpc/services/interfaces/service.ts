import { Context } from "../../protocol/context.js";
import { ExecutionEngine } from "../../protocol/execute.js";

export interface ServiceInterface<TContext extends Context = Context> {
  execute: (
    engine: ExecutionEngine<TContext>,
    context: TContext
  ) => Promise<void>;
  stop: () => Promise<void>;
}
