/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskAndHistory, TaskManagerInterface } from "../../types/index.js";
/**
 * File-based implementation of the TaskStore interface.
 * Stores tasks and their history as JSON files on disk.
 */
export declare class FileStore implements TaskManagerInterface<TaskAndHistory> {
    private baseDir;
    /**
     * Creates a new FileStore.
     * @param baseDir The base directory to store task files in.
     */
    constructor(baseDir: string);
    /**
     * Constructs the file path for a task.
     * @param taskId The task ID
     * @returns The full file path for the task JSON file
     */
    private getTaskFilePath;
    /**
     * Constructs the file path for a task's history.
     * @param taskId The task ID
     * @returns The full file path for the history JSON file
     */
    private getHistoryFilePath;
    /**
     * Ensures the base directory exists.
     * @returns A promise that resolves when the directory exists.
     */
    private ensureBaseDir;
    /**
     * Writes data to a JSON file.
     * @param filePath The path to write to
     * @param data The data to write
     * @returns A promise that resolves when the write is complete
     */
    private writeJsonFile;
    /**
     * Reads data from a JSON file.
     * @param filePath The path to read from
     * @returns A promise resolving to the parsed data, or null if the file doesn't exist
     */
    private readJsonFile;
    /**
     * Type guard to validate the structure of history file content.
     * @param content The content to check
     * @returns True if the content is a valid history file content
     */
    private isHistoryFileContent;
    /**
     * Loads a task and its history by task ID.
     * @param taskId The ID of the task to load.
     * @returns A promise resolving to the task and history, or null if not found.
     */
    getState(taskId: string): Promise<TaskAndHistory>;
    /**
     * Saves a task and its history.
     * @param data The task and history to save.
     * @returns A promise that resolves when the save is complete.
     */
    setState(taskId: string, data: TaskAndHistory): Promise<void>;
    getStates(): Promise<string[]>;
}
//# sourceMappingURL=file.d.ts.map