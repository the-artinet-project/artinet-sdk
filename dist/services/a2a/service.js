/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { coreExecute } from "../core/execution/execute.js";
import { createMessageSendParams } from "./helpers/message-builder.js";
export class A2AService {
    agentCard;
    engine;
    connections;
    cancellations;
    tasks;
    contexts;
    methods;
    eventOverrides;
    constructor(agentCard, engine, contexts, connections, cancellations, tasks, methods, eventOverrides) {
        this.engine = engine;
        this.agentCard = agentCard;
        this.contexts = contexts;
        this.connections = connections;
        this.cancellations = cancellations;
        this.tasks = tasks;
        this.methods = methods;
        this.eventOverrides = eventOverrides;
    }
    async execute(engine, context) {
        await coreExecute(engine ?? this.engine, context);
    }
    async stop() {
        const currentTasks = await this.tasks.getStates();
        for (const id of currentTasks) {
            this.addCancellation(id);
        }
        return;
    }
    addConnection(id) {
        this.connections.addConnection(id);
    }
    removeConnection(id) {
        this.connections.removeConnection(id);
    }
    isCancelled(id) {
        return this.cancellations.isCancelled(id);
    }
    addCancellation(id) {
        this.cancellations.addCancellation(id);
    }
    removeCancellation(id) {
        this.cancellations.removeCancellation(id);
    }
    async getState(id) {
        return await this.tasks.getState(id);
    }
    async setState(id, data) {
        await this.tasks.setState(id, data);
    }
    async getTask(input) {
        return await this.methods.getTask(input, { service: this });
    }
    async cancelTask(input) {
        return await this.methods.cancelTask(input, {
            service: this,
            contextManager: this.contexts,
        });
    }
    async sendMessage(message, params) {
        return await this.methods.sendMessage(createMessageSendParams(message), {
            ...params, //we may include additional params in the future that may not need to be handled by the service
            service: this,
            engine: params?.engine ?? this.engine,
            contextManager: this.contexts,
            signal: params?.signal ?? new AbortController().signal,
        });
    }
    async *streamMessage(message, params) {
        yield* this.methods.streamMessage(createMessageSendParams(message), {
            ...params,
            service: this,
            engine: params?.engine ?? this.engine,
            contextManager: this.contexts,
            signal: params?.signal ?? new AbortController().signal,
        });
    }
    async *resubscribe(input, params) {
        yield* this.methods.resubscribe(input, {
            ...params,
            service: this,
            engine: params?.engine ?? this.engine,
            contextManager: this.contexts,
            signal: params?.signal ?? new AbortController().signal,
        });
    }
}
