/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreCommand, CoreState, CoreUpdate } from "~/types/index.js";
import { CoreContext } from "../context/index.js";
import { ExecutionEngine } from "../execution/index.js";
import { ServiceInterface } from "../service.js";

export interface StreamManagerInterface<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  getContextId(): string;
  addUpdate(update: TUpdate): void;
  getUpdates(): TUpdate[];
  isCompleted(): boolean;
  setCompleted(): void;
  getExecutionContext(): CoreContext<TCommand, TState, TUpdate>;
  setExecutionContext(
    executionContext: CoreContext<TCommand, TState, TUpdate>
  ): void;
  stream(
    engine: ExecutionEngine<TCommand, TState, TUpdate>,
    service?: ServiceInterface<TCommand, TState, TUpdate>
  ): AsyncGenerator<TUpdate>;
}
