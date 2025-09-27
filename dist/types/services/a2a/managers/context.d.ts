/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { Command, State, Update, CoreContext, ContextManagerInterface } from "../../../types/index.js";
export declare class ContextManager<TCommand extends Command = Command, TState extends State = State, TUpdate extends Update = Update> implements ContextManagerInterface<TCommand, TState, TUpdate> {
    private contexts;
    deleteContext(id: string): void;
    setContext(id: string, context: CoreContext<TCommand, TState, TUpdate>): void;
    getContext(id: string): CoreContext<TCommand, TState, TUpdate> | undefined;
}
//# sourceMappingURL=context.d.ts.map