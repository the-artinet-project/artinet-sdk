/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { createContext } from "../factory/context.js";
export async function sendMessage(input, params) {
    const { service, engine, contextManager, signal } = params;
    const contextId = input.message.contextId;
    const context = createContext(input, service, contextManager, signal, contextId, service.eventOverrides);
    context.events.on("complete", () => {
        contextManager.deleteContext(context.events.contextId);
    });
    context.events.on("error", () => {
        context.events.onComplete();
    });
    await service.execute(engine, context);
    const state = context.events.getState();
    return state.task ?? state;
}
