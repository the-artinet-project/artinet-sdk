/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskAndHistory, TaskManagerInterface } from "../../types/index.js";
/**
 * In-memory implementation of the TaskStore interface.
 * Stores tasks and their history in memory. Not persisted between server restarts.
 */
export declare class InMemoryTaskStore implements TaskManagerInterface<TaskAndHistory> {
    private store;
    /**
     * Loads a task and its history by task ID.
     * @param taskId The ID of the task to load.
     * @returns A promise resolving to the task and history, or null if not found.
     */
    getState(taskId: string): Promise<TaskAndHistory | undefined>;
    /**
     * Saves a task and its history.
     * @param data The task and history to save.
     * @returns A promise that resolves when the save is complete.
     */
    setState(taskId: string, data: TaskAndHistory): Promise<void>;
    getStates(): Promise<string[]>;
}
//# sourceMappingURL=memory.d.ts.map