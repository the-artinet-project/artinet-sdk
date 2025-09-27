/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { CoreContext, CoreCommand, CoreState, CoreUpdate } from "../context/index.js";
import { ExecutionEngine } from "./engine.js";
export type ExecuteFunction<TCommand extends CoreCommand = CoreCommand, TState extends CoreState = CoreState, TUpdate extends CoreUpdate = CoreUpdate> = (engine: ExecutionEngine<TCommand, TState, TUpdate>, context: CoreContext<TCommand, TState, TUpdate>) => Promise<void>;
//# sourceMappingURL=execute.d.ts.map