/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { type A2A } from "@artinet/types";

/**
 * @deprecated Task now has a history property.
 * Represents a task and its associated message history.
 */
export interface TaskAndHistory {
  /** The task object */
  task: A2A.Task;

  /**
   * @deprecated This property is no longer being updated. Use the task.history property instead.
   * The complete message history associated with the task
   */
  history: A2A.Message[];
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

/**
 * @deprecated This interface will be removed in the future. Use ExecutionContext instead.
 * Context object provided to the TaskHandler.
 * Contains the information needed for the handler to process the task.
 */
export interface TaskContext {
  /**
   * The context ID of the task.
   */
  contextId: string;

  /**
   * The current state of the task when the handler is invoked or resumed.
   * This is a snapshot - the latest state may need to be reloaded during async operations.
   */
  task: A2A.Task;

  /**
   * The specific user message that triggered this handler invocation or resumption.
   */
  userMessage: A2A.Message;

  /**
   * Function to check if cancellation has been requested for this task.
   * Handlers should check this periodically during long-running operations.
   * @returns True if cancellation has been requested, false otherwise.
   */
  isCancelled(): boolean;

  /**
   * The message history associated with the task up to the point the handler is invoked.
   */
  history: A2A.Message[];

  /**
   * @description The latest user message that triggered this handler invocation or resumption.
   * @note It's unclear whether this is necessary as userMessage already exists
   */
  latestUserMessage?: A2A.Message;

  /**
   * The configuration for the task.
   */
  configuration?: A2A.MessageSendConfiguration;
}
