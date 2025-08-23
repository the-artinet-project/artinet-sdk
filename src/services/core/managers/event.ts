/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventEmitter } from "events";
import {
  EventManagerInterface,
  EventManagerOptions,
  CoreCommand,
  CoreState,
  CoreUpdate,
  CoreContext,
  EventManagerMap,
} from "~/types/index.js";

export class EventManager<
    TCommand extends CoreCommand = CoreCommand,
    TState extends CoreState = CoreState,
    TUpdate extends CoreUpdate = CoreUpdate,
  >
  extends EventEmitter<EventManagerMap<TCommand, TState, TUpdate>>
  implements EventManagerInterface<TCommand, TState, TUpdate>
{
  public readonly contextId: string;
  private currentState: TState = {} as TState;
  private options: EventManagerOptions<TCommand, TState, TUpdate>;

  constructor(
    contextId: string,
    options: EventManagerOptions<TCommand, TState, TUpdate> = {}
  ) {
    super();
    this.contextId = contextId;
    this.options = options;
  }

  onStart = async (
    context: CoreContext<TCommand, TState, TUpdate>
  ): Promise<TState> => {
    if (this.options.onStart) {
      this.currentState = await this.options.onStart(context);
    }
    this.emit("start", context.command as TCommand, this.currentState);
    return this.currentState;
  };

  onCancel = async (nextState: TUpdate): Promise<void> => {
    if (this.options.onCancel) {
      await this.options.onCancel(this.currentState, nextState);
    }
    this.emit("cancel", nextState);
  };

  onUpdate = async (nextState: TUpdate): Promise<TState> => {
    if (this.options.onUpdate) {
      this.currentState = await this.options.onUpdate(
        this.currentState,
        nextState
      );
    } else {
      this.currentState = nextState as unknown as TState;
    }
    this.emit("update", this.currentState, nextState);
    return this.currentState;
  };

  onError = async (error: any): Promise<void> => {
    if (this.options.onError) {
      await this.options.onError(this.currentState, error);
    }
    this.emit("error", error, this.currentState);
  };

  onComplete = async (): Promise<void> => {
    if (this.options.onComplete) {
      await this.options.onComplete(this.currentState);
    }
    this.emit("complete", this.currentState);
  };

  getState = (): TState => {
    if (this.options.getState) {
      return this.options.getState();
    }
    return this.currentState;
  };
}
