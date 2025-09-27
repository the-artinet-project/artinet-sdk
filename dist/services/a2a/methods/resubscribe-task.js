/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { createContext } from "../factory/context.js";
import { FINAL_STATES, INVALID_REQUEST, TASK_NOT_FOUND, } from "../../../utils/index.js";
import { StreamManager } from "../../core/managers/stream.js";
const createMessageParams = (task) => {
    const latestUserMessage = task.history
        ?.filter((msg) => msg.role === "user")
        ?.pop();
    if (!latestUserMessage) {
        throw INVALID_REQUEST("No user message found");
    }
    const messageParams = {
        message: {
            ...latestUserMessage,
            taskId: task.id,
            contextId: latestUserMessage.contextId ?? task.contextId,
        },
        metadata: task.metadata,
    };
    return messageParams;
};
export async function* resubscribe(input, params) {
    const { service, engine, contextManager, signal } = params;
    const state = await service.getState(input.id);
    if (!state || !state.task) {
        throw TASK_NOT_FOUND({ taskId: input.id });
    }
    const contextId = state.task?.contextId;
    const stream = new StreamManager();
    const context = createContext(createMessageParams(state.task), service, contextManager, signal, contextId, {
        ...service.eventOverrides,
        onStart: async (context) => {
            const request = context.command;
            const task = state.task;
            const statusUpdate = {
                kind: "status-update",
                taskId: request?.message.taskId ?? task.id,
                contextId: request?.message.contextId ??
                    task.contextId ??
                    stream.getContextId(),
                status: task.status,
                final: false,
                metadata: task.metadata,
            };
            stream.addUpdate(statusUpdate);
            if (FINAL_STATES.includes(task.status.state)) {
                if (task.artifacts && task.artifacts.length > 0) {
                    for (const artifact of task.artifacts) {
                        const artifactUpdate = {
                            kind: "artifact-update",
                            taskId: request?.message.taskId ?? task.id,
                            contextId: request?.message.contextId ??
                                task.contextId ??
                                stream.getContextId(),
                            artifact,
                            lastChunk: task.artifacts.length === 1,
                            metadata: task.metadata,
                        };
                        stream.addUpdate(artifactUpdate);
                        task.artifacts.shift();
                    }
                }
                stream.setCompleted();
            }
            return state;
        },
    });
    context.events.on("error", () => {
        context.events.onComplete();
    });
    stream.setExecutionContext(context);
    yield* stream.stream(engine, service);
}
//# sourceMappingURL=resubscribe-task.js.map