import { EventEmitter } from "events";

export interface EventManagerOptions<TRequest, TState> {
  readonly onStart?: (request?: TRequest) => Promise<TState>;
  readonly onCancel?: (nextState: TState) => Promise<void>;
  readonly onUpdate?: (current: TState, nextState: TState) => Promise<TState>;
  readonly onError?: (current: TState, error: any) => Promise<void>;
  readonly onComplete?: (current: TState) => Promise<void>;
  readonly getState?: () => TState;
}

export interface EventManager<TRequest, TState> extends EventEmitter {
  readonly contextId: string;
  readonly onStart?: (request?: TRequest) => Promise<TState>;
  readonly onCancel: (nextState: TState) => Promise<void>;
  readonly onUpdate: (nextState: TState) => Promise<TState>;
  readonly onError: (error: any) => Promise<void>;
  onComplete: () => Promise<void>;
  readonly getState: () => TState;
}
