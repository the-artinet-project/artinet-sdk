/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TaskManagerInterface<TaskType extends {} = {}> {
  getState(id: string): TaskType | undefined;
  setState(id: string, data: TaskType): void;
  getTasks(): string[];
}
