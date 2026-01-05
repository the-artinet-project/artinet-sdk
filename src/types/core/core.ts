import { EventEmitter } from "eventemitter3";
import { IStore } from "~/types/storage.js";

export interface Service<
  Params extends object = object,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
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
  /**hooks allow consumers to modify context on the fly*/
  readonly hooks?: Record<string, (...args: unknown[]) => Promise<unknown>>;
}

export interface Manager<T = object> extends IStore<T> {
  get: (id: string) => Promise<T | undefined>;
  set: (id: string, data?: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  has?: (id: string) => Promise<boolean>;
  list?: () => Promise<T[]>;
}

export type Optional<T extends object = object> = Partial<T> & {
  contextId: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Contexts<T extends Context = Context> extends Manager<T> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Publisher<
  EventMap extends Record<string, any[]> = Record<string, any[]>
> extends EventEmitter<EventMap> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Consumer<
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  Received extends unknown,
  EventMap extends Record<string, any[]> = Record<string, any[]>
> extends AsyncIterable<Received, Received, Received | undefined>,
    Publisher<EventMap> {}
