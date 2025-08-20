import { EventEmitter } from "events";
import { CoreCommand, CoreState, CoreUpdate } from "../context/types.js";

export interface EventManagerOptions<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  readonly onStart?: (request?: TCommand) => Promise<TState>;
  readonly onCancel?: (current: TState, update: TUpdate) => Promise<void>;
  readonly onUpdate?: (current: TState, update: TUpdate) => Promise<TState>;
  readonly onError?: (current: TState, error: any) => Promise<void>;
  readonly onComplete?: (current: TState) => Promise<void>;
  readonly getState?: () => TState; //May be removed soon
}

export interface EventManagerInterface<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> extends EventEmitter {
  readonly contextId: string;
  readonly onStart?: (request?: TCommand) => Promise<TState>;
  readonly onCancel: (update: TUpdate) => Promise<void>;
  readonly onUpdate: (update: TUpdate) => Promise<TState>;
  readonly onError: (error: any) => Promise<void>;
  onComplete: () => Promise<void>;
  readonly getState: () => TState; //May be removed soon
}
