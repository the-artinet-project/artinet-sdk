/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TaskManagerInterface<TaskType extends {} = {}> {
  getState(id: string): Promise<TaskType | undefined> | TaskType | undefined;
  setState(id: string, data: TaskType): Promise<void> | void;
  getStates(): Promise<string[]> | string[];
}
