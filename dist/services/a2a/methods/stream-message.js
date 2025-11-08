/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { StreamManager } from "../../core/managers/stream.js";
import { createContext } from "../factory/context.js";
export async function* streamMessage(input, params) {
    const { service, engine, contextManager, signal } = params;
    let contextId = input.message.contextId;
    const context = createContext(input, service, contextManager, signal, contextId ?? undefined, service.eventOverrides);
    const stream = new StreamManager(context);
    contextId = stream.getContextId();
    context.events.on("complete", () => {
        contextManager.deleteContext(contextId);
        stream.setCompleted();
    });
    context.events.on("error", () => {
        context.events.onComplete();
    });
    yield* stream.stream(engine, service);
}
