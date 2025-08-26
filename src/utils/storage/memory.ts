/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskAndHistory, TaskManagerInterface } from "~/types/index.js";
import { logDebug } from "../logging/log.js";

/**
 * In-memory implementation of the TaskStore interface.
 * Stores tasks and their history in memory. Not persisted between server restarts.
 */
export class InMemoryTaskStore implements TaskManagerInterface<TaskAndHistory> {
  private store: Map<string, TaskAndHistory> = new Map();

  /**
   * Loads a task and its history by task ID.
   * @param taskId The ID of the task to load.
   * @returns A promise resolving to the task and history, or null if not found.
   */
  async getState(taskId: string): Promise<TaskAndHistory | undefined> {
    logDebug("InMemoryTaskStore", `Loading task: ${taskId}`);
    const entry = this.store.get(taskId);

    // Return copies to prevent external mutation
    return entry
      ? {
          task: { ...entry.task },
          history: [...entry.history],
        }
      : undefined;
  }

  /**
   * Saves a task and its history.
   * @param data The task and history to save.
   * @returns A promise that resolves when the save is complete.
   */
  async setState(taskId: string, data: TaskAndHistory): Promise<void> {
    logDebug("InMemoryTaskStore", `Saving task: ${data.task.id}`);
    if (taskId !== data.task.id) {
      throw new Error("Task ID mismatch");
    }
    // Store copies to prevent internal mutation if caller reuses objects
    this.store.set(taskId, {
      task: { ...data.task },
      history: [...data.history],
    });
  }

  async getStates(): Promise<string[]> {
    return Array.from(this.store.keys());
  }
}
