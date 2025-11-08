/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { coreExecute } from "../execution/execute.js";
export class StreamManager {
    contextId = null;
    completed = false;
    updates = [];
    executionContext = null;
    constructor(executionContext) {
        if (executionContext) {
            this.executionContext = executionContext;
            this.contextId = executionContext.events.contextId;
        }
        this.completed = false;
        this.updates = [];
    }
    getContextId() {
        if (!this.contextId) {
            throw new Error("Context id not set");
        }
        return this.contextId;
    }
    addUpdate(update) {
        this.updates.push(update);
    }
    getUpdates() {
        return this.updates;
    }
    isCompleted() {
        return this.completed;
    }
    setCompleted() {
        this.completed = true;
    }
    getExecutionContext() {
        if (!this.executionContext) {
            throw new Error("Execution context not set");
        }
        return this.executionContext;
    }
    setExecutionContext(executionContext) {
        this.executionContext = executionContext;
        this.contextId = executionContext.events.contextId;
    }
    async *stream(engine, service) {
        let executionError = null;
        const context = this.getExecutionContext();
        context.events.on("update", (_, update) => {
            if (!context.isCancelled()) {
                this.addUpdate(update);
            }
        });
        const executePromise = (service ? service.execute(engine, context) : coreExecute(engine, context))
            .catch((error) => {
            executionError = error;
        })
            .finally(() => {
            this.setCompleted();
        });
        while (!this.isCompleted() || this.getUpdates().length > 0) {
            if (executionError) {
                throw executionError;
            }
            if (this.getUpdates().length > 0) {
                yield this.getUpdates().shift();
            }
            await new Promise((resolve) => setTimeout(resolve, 10));
        }
        await executePromise;
        this.setCompleted();
        if (executionError) {
            throw executionError;
        }
    }
}
