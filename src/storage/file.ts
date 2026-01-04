/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import fs from "fs/promises";
import path from "path";
import { logger } from "~/config/index.js";
import { Tasks } from "~/services/a2a/managers.js";
import { formatJson, safeParseSchema } from "~/utils/index.js";
/**
 * File-based implementation of the TaskStore interface.
 * Stores tasks and their history as JSON files on disk.
 */
export class Files extends Tasks {
  private baseDir: string;

  /**
   * Creates a new FileStore.
   * @param baseDir The base directory to store task files in.
   */
  constructor(baseDir: string) {
    super(new Map());
    this.baseDir = baseDir;
    logger.info(`FileStore[init]: baseDir`, { baseDir });
  }

  /**
   * Constructs the file path for a task.
   * @param taskId The task ID
   * @returns The full file path for the task JSON file
   */
  private getTaskFilePath(taskId: string): string {
    return path.join(this.baseDir, `${taskId}.task.json`);
  }

  /**
   * Ensures the base directory exists.
   * @returns A promise that resolves when the directory exists.
   */
  private async ensureBaseDir(): Promise<void> {
    try {
      await fs.mkdir(this.baseDir, { recursive: true });
    } catch (error) {
      logger.warn(`FileStore[ensureBaseDir]: ${this.baseDir}`, error);
      throw error;
    }
  }

  /**
   * Writes data to a JSON file.
   * @param filePath The path to write to
   * @param data The data to write
   * @returns A promise that resolves when the write is complete
   */
  private async writeJsonFile(filePath: string, task: A2A.Task): Promise<void> {
    try {
      await this.ensureBaseDir();
      await fs.writeFile(filePath, formatJson(task), {
        encoding: "utf8",
      });
    } catch (error) {
      logger.warn(`FileStore[writeJsonFile]: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Reads data from a JSON file.
   * @param filePath The path to read from
   * @returns A promise resolving to the parsed data, or null if the file doesn't exist
   */
  private async readJsonFile(filePath: string): Promise<A2A.Task | null> {
    try {
      const content = await fs.readFile(filePath, { encoding: "utf8" });
      return await safeParseSchema(content, A2A.TaskSchema);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        logger.warn(`FileStore[readJsonFile]: ${filePath} not found`);
        return null;
      }
      throw error;
    }
  }

  /**
   * Loads a task and its history by task ID.
   * @param taskId The ID of the task to load.
   * @returns A promise resolving to the task and history, or null if not found.
   */
  override async get(taskId: string): Promise<A2A.Task | undefined> {
    const task =
      (await super.get(taskId)) ??
      (await this.readJsonFile(this.getTaskFilePath(taskId)).catch(
        () => undefined
      ));
    return task ?? undefined;
  }

  /**
   * Saves a task and its history.
   * @param data The task and history to save.
   * @returns A promise that resolves when the save is complete.
   */
  override async set(taskId: string, task?: A2A.Task): Promise<void> {
    logger.debug(`FileStore[set]: ${taskId}`);
    if (!task) {
      return;
    }
    if (task && taskId !== task.id) {
      logger.warn("FileStore", `Task ID mismatch: ${taskId} !== ${task.id}`);
      throw new Error("Task ID mismatch");
    }
    const taskFilePath = this.getTaskFilePath(taskId);
    await this.writeJsonFile(taskFilePath, task);
    await super.set(taskId, task);
  }

  override async delete(taskId: string): Promise<void> {
    logger.debug(`FileStore[delete]: ${taskId}`);
    const taskFilePath = this.getTaskFilePath(taskId);
    await fs.unlink(taskFilePath);
    await super.delete(taskId);
  }

  override async has(taskId: string): Promise<boolean> {
    if (await super.has(taskId)) {
      return true;
    }
    const taskFilePath = this.getTaskFilePath(taskId);
    return fs
      .access(taskFilePath)
      .then(() => true)
      .catch(() => false);
  }

  override async list(): Promise<A2A.Task[]> {
    const taskIds = await fs.readdir(this.baseDir);
    return Promise.all(
      taskIds.map((taskId) => this.get(taskId).catch(() => undefined))
    ).then((tasks) => tasks.filter((task) => task !== undefined));
  }
}
