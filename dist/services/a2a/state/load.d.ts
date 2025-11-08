/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { Message, TaskAndHistory, TaskStore } from "../../../types/index.js";
/**
 * Loads or creates a task and its history.
 * @param taskId The task ID
 * @param message The message to process
 * @param contextId Optional context ID
 * @param metadata Optional metadata
 * @returns The task and history
 */
export declare function loadState(taskStore: TaskStore, message: Message, metadata?: Record<string, unknown> | null, taskId?: string, contextId?: string): Promise<TaskAndHistory>;
