import { EventManager } from "./events/manager.js";

export interface Context<TRequest extends {} = any, TState extends {} = any> {
  readonly contextId: string;
  command: TRequest;
  readonly isCancelled: () => boolean;
  readonly signal: AbortSignal;
  readonly events: EventManager<TRequest, TState>;
}

export interface ContextManagerInterface<TContext extends {} = any> {
  getContext: (id: string) => TContext | undefined;
  setContext: (id: string, data: TContext) => void;
  deleteContext: (id: string) => void;
}
