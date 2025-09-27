/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventEmitter } from "events";
import { EventManagerInterface, EventManagerOptions, CoreCommand, CoreState, CoreUpdate, CoreContext, EventManagerMap } from "../../../types/index.js";
export declare class EventManager<TCommand extends CoreCommand = CoreCommand, TState extends CoreState = CoreState, TUpdate extends CoreUpdate = CoreUpdate> extends EventEmitter<EventManagerMap<TCommand, TState, TUpdate>> implements EventManagerInterface<TCommand, TState, TUpdate> {
    readonly contextId: string;
    private currentState;
    private options;
    constructor(contextId: string, options?: EventManagerOptions<TCommand, TState, TUpdate>);
    onStart: (context: CoreContext<TCommand, TState, TUpdate>) => Promise<TState>;
    onCancel: (nextState: TUpdate) => Promise<void>;
    onUpdate: (nextState: TUpdate) => Promise<TState>;
    onError: (error: any) => Promise<void>;
    onComplete: () => Promise<void>;
    getState: () => TState;
}
//# sourceMappingURL=event.d.ts.map