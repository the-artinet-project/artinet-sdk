/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { ExecutionEngine, CoreState, CoreUpdate, CoreContext, CoreCommand } from "../../../types/index.js";
export declare const coreExecute: <TCommand extends CoreCommand = CoreCommand, TUpdate extends CoreUpdate = CoreUpdate, TState extends CoreState = CoreState, TContext extends CoreContext<TCommand, TState, TUpdate> = CoreContext<TCommand, TState, TUpdate>>(engine: ExecutionEngine<TCommand, TState, TUpdate>, context: TContext) => Promise<void>;
