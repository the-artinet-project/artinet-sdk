import { CoreCommand, CoreState, CoreUpdate } from "../context/index.js";
import { ServiceInterface } from "../service.js";
import { ExecutionEngine } from "./engine.js";

export interface ExecutionEnvironment<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  service: ServiceInterface<TCommand, TState, TUpdate>;
  engine?: ExecutionEngine<TCommand, TState, TUpdate>;
}
