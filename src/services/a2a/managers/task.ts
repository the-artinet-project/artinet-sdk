/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskManagerInterface, TaskAndHistory } from "~/types/index.js";

export class TaskManager<TaskType extends TaskAndHistory>
  implements TaskManagerInterface<TaskType>
{
  private states: Map<string, TaskType> = new Map();
  getState(id: string): TaskType | Promise<TaskType | undefined> | undefined {
    return this.states.get(id);
  }
  setState(id: string, data: TaskType): Promise<void> | void {
    this.states.set(id, data);
  }
  getStates(): Promise<string[]> | string[] {
    return Array.from(this.states.keys());
  }
}
