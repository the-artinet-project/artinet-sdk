/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventEmitter } from "events";
import {
  CoreCommand,
  CoreState,
  CoreUpdate,
  CoreContext,
} from "../context/index.js";

export interface EventManagerOptions<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  readonly onStart?: (
    context: CoreContext<TCommand, TState, TUpdate>
  ) => Promise<TState>;
  readonly onCancel?: (current: TState, update: TUpdate) => Promise<void>;
  readonly onUpdate?: (current: TState, update: TUpdate) => Promise<TState>;
  readonly onError?: (current: TState, error: any) => Promise<void>;
  readonly onComplete?: (current: TState) => Promise<void>;
  readonly getState?: () => TState; //May be removed soon
}

export interface EventManagerMap<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  start: [TCommand, TState];
  cancel: [TUpdate];
  update: [TState, TUpdate];
  error: [any, TState];
  complete: [TState];
}

export interface EventManagerInterface<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> extends EventEmitter<EventManagerMap<TCommand, TState, TUpdate>> {
  readonly contextId: string;
  readonly onStart?: (
    context: CoreContext<TCommand, TState, TUpdate>
  ) => Promise<TState>;
  readonly onCancel: (update: TUpdate) => Promise<void>;
  readonly onUpdate: (update: TUpdate) => Promise<TState>;
  readonly onError: (error: any) => Promise<void>;
  onComplete: () => Promise<void>;
  readonly getState: () => TState; //May be removed soon
}
