import { EventEmitter } from "events";

export interface Service<
  Params extends object = object,
  Result extends unknown = void
> {
  execute: (params: Params) => Promise<Result>;
  stop: () => Promise<void>;
}

export interface Context<State extends object = object> {
  readonly contextId: string;

  readonly isCancelled: () => Promise<boolean>;

  readonly abortSignal: AbortSignal;

  readonly messages?: AsyncIterable<unknown>;

  readonly publisher?: Publisher;

  readonly getState: (args?: string) => Promise<State | undefined>;

  metadata?: Record<string, unknown>;

  readonly hooks?: Record<string, (...args: unknown[]) => Promise<unknown>>;
}

export interface Manager<T = object> {
  get: (id: string) => Promise<T | undefined>;
  set: (id: string, data?: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  has?: (id: string) => Promise<boolean>;
  list?: () => Promise<T[]>;
}

export type Optional<T extends object = object> = Partial<T> & {
  contextId: string;
};

export interface Contexts<T extends Context = Context> extends Manager<T> {}

export interface Publisher<
  EventMap extends Record<string, any[]> = Record<string, any[]>
> extends EventEmitter<EventMap> {}

export interface Consumer<
  Received extends unknown,
  EventMap extends Record<string, any[]> = Record<string, any[]>
> extends AsyncIterable<Received, Received, Received | undefined>,
    Publisher<EventMap> {}
