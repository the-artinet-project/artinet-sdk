import {
  Command,
  State,
  Update,
  CoreContext,
  ContextManagerInterface,
} from "~/types/index.js";

export class ContextManager<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
> implements ContextManagerInterface<TCommand, TState, TUpdate>
{
  private contexts: Map<string, CoreContext<TCommand, TState, TUpdate>> =
    new Map();
  deleteContext(id: string) {
    this.contexts.delete(id);
  }
  setContext(id: string, context: CoreContext<TCommand, TState, TUpdate>) {
    this.contexts.set(id, context);
  }
  getContext(id: string) {
    return this.contexts.get(id);
  }
}
