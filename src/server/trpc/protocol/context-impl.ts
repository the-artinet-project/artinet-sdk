import { Context, ContextManager } from "./context.js";

export class ExecutionContextManager
  implements ContextManager<Context<any, any>>
{
  private contexts: Map<string, Context<any, any>> = new Map();
  deleteContext(id: string) {
    this.contexts.delete(id);
  }
  setContext(id: string, context: Context<any, any>) {
    this.contexts.set(id, context);
  }
  getContext(id: string) {
    return this.contexts.get(id);
  }
}
