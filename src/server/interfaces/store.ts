import type { Task, Message } from "../../types/extended-schema.js";

/**
 * Represents a task and its associated message history.
 */
export interface TaskAndHistory {
  /** The task object */
  task: Task;

  /** The complete message history associated with the task */
  history: Message[];
}

/**
 * @deprecated Use the Store interface instead.
 * @description Interface for task storage providers.
 * Abstracts the storage mechanism for tasks and their message history.
 */
export interface TaskStore {
  /**
   * Saves a task and its associated message history.
   * Overwrites existing data if the task ID exists.
   * @param data An object containing the task and its history.
   * @returns A promise resolving when the save operation is complete.
   */
  save(data: TaskAndHistory): Promise<void>;

  /**
   * Loads a task and its history by task ID.
   * @param taskId The ID of the task to load.
   * @returns A promise resolving to an object containing the Task and its history, or null if not found.
   */
  load(taskId: string): Promise<TaskAndHistory | null>;
}

export interface Store<T> {
  set(data: T, id?: string): Promise<void>;
  get(id: string): Promise<T | null>;
}

// type newTaskStore = Transformed<
//   Store<TaskAndHistory>,
//   {
//     set: "save";
//     get: "load";
//   }
// >;

// const newTaskStoreTest: newTaskStore = {
//   save: async (data, id) => {
//     console.log("save", data, id);
//   },
//   load: async (id) => {
//     console.log("load", id);
//     return null;
//   },
// };
