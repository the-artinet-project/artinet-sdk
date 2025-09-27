/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { CoreCommand, CoreState, CoreContext, CoreUpdate } from "../context/index.js";
/**
 * @description The context manager interface.
 * @type {ContextManagerInterface<TCommand, TState>}
 * @note This will become an increasingly important part of the system as Context Engineering becomes more important.
 * currently it is used to store & retrieve contexts from storage but greater degrees of control may be needed.
 * ex. forking/merging contexts, forwarding contexts to other services, nesting contexts, etc.
 */
export interface ContextManagerInterface<TCommand extends CoreCommand = CoreCommand, TState extends CoreState = CoreState, TUpdate extends CoreUpdate = CoreUpdate> {
    getContext: (id: string) => CoreContext<TCommand, TState, TUpdate> | undefined;
    setContext: (id: string, context: CoreContext<TCommand, TState, TUpdate>) => void;
    deleteContext: (id: string) => void;
}
//# sourceMappingURL=context.d.ts.map