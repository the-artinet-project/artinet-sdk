/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventEmitter } from "events";
export class EventManager extends EventEmitter {
    contextId;
    currentState = {};
    options;
    constructor(contextId, options = {}) {
        super();
        this.contextId = contextId;
        this.options = options;
    }
    onStart = async (context) => {
        if (this.options.onStart) {
            this.currentState = await this.options.onStart(context);
        }
        this.emit("start", context.command, this.currentState);
        return this.currentState;
    };
    onCancel = async (nextState) => {
        if (this.options.onCancel) {
            await this.options.onCancel(this.currentState, nextState);
        }
        this.emit("cancel", nextState);
    };
    onUpdate = async (nextState) => {
        if (this.options.onUpdate) {
            this.currentState = await this.options.onUpdate(this.currentState, nextState);
        }
        else {
            this.currentState = nextState;
        }
        this.emit("update", this.currentState, nextState);
        return this.currentState;
    };
    onError = async (error) => {
        if (this.options.onError) {
            await this.options.onError(this.currentState, error);
        }
        this.emit("error", error, this.currentState);
    };
    onComplete = async () => {
        if (this.options.onComplete) {
            await this.options.onComplete(this.currentState);
        }
        this.emit("complete", this.currentState);
    };
    getState = () => {
        if (this.options.getState) {
            return this.options.getState();
        }
        return this.currentState;
    };
}
//# sourceMappingURL=event.js.map