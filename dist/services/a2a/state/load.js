/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { getCurrentTimestamp } from "../../../utils/index.js";
import { TaskState, } from "../../../types/index.js";
import { v4 as uuidv4 } from "uuid";
/**
 * Loads or creates a task and its history.
 * @param taskId The task ID
 * @param message The message to process
 * @param contextId Optional context ID
 * @param metadata Optional metadata
 * @returns The task and history
 */
export async function loadState(taskStore, message, metadata, taskId, contextId) {
    if (taskId) {
        const existingData = await taskStore.load(taskId);
        if (existingData) {
            return existingData;
        }
    }
    const timestamp = getCurrentTimestamp();
    const newTask = {
        id: taskId ?? uuidv4(),
        contextId: contextId ?? uuidv4(),
        kind: "task",
        status: {
            state: TaskState.submitted,
            timestamp,
        },
        metadata: metadata,
        history: [message],
    };
    /**
     * This will update the message with the task and context ids
     */
    message.taskId = newTask.id;
    message.contextId = newTask.contextId;
    const newHistory = [message];
    return { task: newTask, history: newHistory };
}
//# sourceMappingURL=load.js.map