/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type Task,
  type Message,
  type MessageSendConfiguration,
} from "~/types/schemas/a2a/index.js";
import { A2AEngine } from "./engine.js";

/**
 * @deprecated Task now has a history property.
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
  task: Task;

  /**
   * The specific user message that triggered this handler invocation or resumption.
   */
  userMessage: Message;

  /**
   * Function to check if cancellation has been requested for this task.
   * Handlers should check this periodically during long-running operations.
   * @returns True if cancellation has been requested, false otherwise.
   */
  isCancelled(): boolean;

  /**
   * The message history associated with the task up to the point the handler is invoked.
   */
  history: Message[];

  /**
   * @description The latest user message that triggered this handler invocation or resumption.
   * @note It's unclear whether this is necessary as userMessage already exists
   */
  latestUserMessage?: Message;

  /**
   * The configuration for the task.
   */
  configuration?: MessageSendConfiguration;
}

/**
 * Defines the signature for a task handler function.
 *
 * Handlers are implemented as async generators. They receive context about the
 * task and the triggering message. They perform work and yield status
 * or artifact updates (TaskYieldUpdate). The server consumes these yields,
 * updates the task state in the store, and streams events if applicable.
 *
 * @param context The TaskContext object containing task details and state.
 * @yields Updates to the task's status or artifacts.
 * @returns Optionally returns the final complete Task object (needed for non-streaming 'message/send').
 *   If void is returned, the server uses the last known state after processing all yields.
 */
export type TaskHandler = A2AEngine;
