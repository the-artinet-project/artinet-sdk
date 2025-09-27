/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { StreamManagerInterface, ExecutionEngine, CoreContext, ServiceInterface, CoreCommand, CoreState, CoreUpdate } from "../../../types/index.js";
export declare class StreamManager<TCommand extends CoreCommand = CoreCommand, TState extends CoreState = CoreState, TUpdate extends CoreUpdate = CoreUpdate> implements StreamManagerInterface<TCommand, TState, TUpdate> {
    private contextId;
    private completed;
    private updates;
    private executionContext;
    constructor(executionContext?: CoreContext<TCommand, TState, TUpdate>);
    getContextId(): string;
    addUpdate(update: TUpdate): void;
    getUpdates(): TUpdate[];
    isCompleted(): boolean;
    setCompleted(): void;
    getExecutionContext(): CoreContext<TCommand, TState, TUpdate>;
    setExecutionContext(executionContext: CoreContext<TCommand, TState, TUpdate>): void;
    stream(engine: ExecutionEngine<TCommand, TState, TUpdate>, service?: ServiceInterface<TCommand, TState, TUpdate>): AsyncGenerator<Awaited<NonNullable<TUpdate>>, void, unknown>;
}
//# sourceMappingURL=stream.d.ts.map