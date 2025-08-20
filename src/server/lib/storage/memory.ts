import {
  TaskAndHistory,
  TaskStore,
} from "../../../types/interfaces/storage.js";
import { logDebug } from "../../../utils/logging/log.js";

/**
 * In-memory implementation of the TaskStore interface.
 * Stores tasks and their history in memory. Not persisted between server restarts.
 */
export class InMemoryTaskStore implements TaskStore {
  private store: Map<string, TaskAndHistory> = new Map();

  /**
   * Loads a task and its history by task ID.
   * @param taskId The ID of the task to load.
   * @returns A promise resolving to the task and history, or null if not found.
   */
  async load(taskId: string): Promise<TaskAndHistory | null> {
    logDebug("InMemoryTaskStore", `Loading task: ${taskId}`);
    const entry = this.store.get(taskId);

    // Return copies to prevent external mutation
    return entry
      ? {
          task: { ...entry.task },
          history: [...entry.history],
        }
      : null;
  }

  /**
   * Saves a task and its history.
   * @param data The task and history to save.
   * @returns A promise that resolves when the save is complete.
   */
  async save(data: TaskAndHistory): Promise<void> {
    logDebug("InMemoryTaskStore", `Saving task: ${data.task.id}`);
    // Store copies to prevent internal mutation if caller reuses objects
    this.store.set(data.task.id, {
      task: { ...data.task },
      history: [...data.history],
    });
  }
}
