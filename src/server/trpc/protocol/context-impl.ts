import { Context, ContextManager } from "./context.js";

export class ExecutionContextManager<TContext extends Context = Context>
  implements ContextManager<TContext>
{
  private contexts: Map<string, TContext> = new Map();
  deleteContext(id: string) {
    this.contexts.delete(id);
  }
  setContext(id: string, context: TContext) {
    this.contexts.set(id, context);
  }
  getContext(id: string) {
    return this.contexts.get(id);
  }
}
