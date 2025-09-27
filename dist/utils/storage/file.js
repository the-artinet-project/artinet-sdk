/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { logError, logDebug } from "../logging/log.js";
import fs from "fs/promises";
import path from "path";
/**
 * File-based implementation of the TaskStore interface.
 * Stores tasks and their history as JSON files on disk.
 */
export class FileStore {
    baseDir;
    /**
     * Creates a new FileStore.
     * @param baseDir The base directory to store task files in.
     */
    constructor(baseDir) {
        this.baseDir = baseDir;
    }
    /**
     * Constructs the file path for a task.
     * @param taskId The task ID
     * @returns The full file path for the task JSON file
     */
    getTaskFilePath(taskId) {
        return path.join(this.baseDir, `${taskId}.task.json`);
    }
    /**
     * Constructs the file path for a task's history.
     * @param taskId The task ID
     * @returns The full file path for the history JSON file
     */
    getHistoryFilePath(taskId) {
        return path.join(this.baseDir, `${taskId}.history.json`);
    }
    /**
     * Ensures the base directory exists.
     * @returns A promise that resolves when the directory exists.
     */
    async ensureBaseDir() {
        try {
            await fs.mkdir(this.baseDir, { recursive: true });
        }
        catch (error) {
            logError("FileStore", `Failed to create directory: ${this.baseDir}`, error);
            throw error;
        }
    }
    /**
     * Writes data to a JSON file.
     * @param filePath The path to write to
     * @param data The data to write
     * @returns A promise that resolves when the write is complete
     */
    async writeJsonFile(filePath, data) {
        try {
            await this.ensureBaseDir();
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
                encoding: "utf8",
            });
        }
        catch (error) {
            logError("FileStore", `Failed to write file: ${filePath}`, error);
            throw error;
        }
    }
    /**
     * Reads data from a JSON file.
     * @param filePath The path to read from
     * @returns A promise resolving to the parsed data, or null if the file doesn't exist
     */
    async readJsonFile(filePath) {
        try {
            const content = await fs.readFile(filePath, { encoding: "utf8" });
            return JSON.parse(content);
        }
        catch (error) {
            if (error.code === "ENOENT") {
                // File not found - return null rather than throwing
                return null;
            }
            logError("FileStore", `Failed to read file: ${filePath}`, error);
            throw error;
        }
    }
    /**
     * Type guard to validate the structure of history file content.
     * @param content The content to check
     * @returns True if the content is a valid history file content
     */
    isHistoryFileContent(content) {
        return (typeof content === "object" &&
            content !== null &&
            "messageHistory" in content &&
            Array.isArray(content.messageHistory));
    }
    /**
     * Loads a task and its history by task ID.
     * @param taskId The ID of the task to load.
     * @returns A promise resolving to the task and history, or null if not found.
     */
    async getState(taskId) {
        logDebug("FileStore", `Loading task: ${taskId}`);
        const taskFilePath = this.getTaskFilePath(taskId);
        const historyFilePath = this.getHistoryFilePath(taskId);
        // Read task file first - if it doesn't exist, the task doesn't exist.
        const task = await this.readJsonFile(taskFilePath);
        if (!task) {
            throw new Error(`Task not found: ${taskId}`); // Task not found
        }
        // Task exists, now try to read history. It might not exist yet.
        let history = [];
        try {
            const historyContent = await this.readJsonFile(historyFilePath);
            // Validate the structure
            if (this.isHistoryFileContent(historyContent)) {
                history = historyContent.messageHistory;
            }
            else if (historyContent !== null) {
                // Log a warning if the history file exists but is malformed
                logError("FileStore", `Malformed history file found for task ${taskId}`, new Error("Invalid history file format"), { path: historyFilePath });
                // Proceed with empty history
            }
            // If historyContent is null (file not found), history remains []
        }
        catch (error) {
            // Log error reading history but proceed with empty history
            logError("FileStore", `Error reading history file for task ${taskId}`, error, { path: historyFilePath });
            // Proceed with empty history
        }
        return { task, history };
    }
    /**
     * Saves a task and its history.
     * @param data The task and history to save.
     * @returns A promise that resolves when the save is complete.
     */
    async setState(taskId, data) {
        logDebug("FileStore", `Saving task: ${data.task.id}`);
        if (taskId !== data.task.id) {
            throw new Error("Task ID mismatch");
        }
        const taskFilePath = this.getTaskFilePath(taskId);
        const historyFilePath = this.getHistoryFilePath(taskId);
        // For simplicity and atomicity, we'll write each file individually
        // First, write the task file
        await this.writeJsonFile(taskFilePath, data.task);
        // Then, write the history file
        // We'll wrap it in an object to allow for future extensibility
        await this.writeJsonFile(historyFilePath, {
            messageHistory: data.history,
        });
    }
    async getStates() {
        const taskIds = await fs.readdir(this.baseDir);
        return taskIds.map((taskId) => taskId.replace(".task.json", ""));
    }
}
//# sourceMappingURL=file.js.map