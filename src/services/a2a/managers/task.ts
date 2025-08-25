/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskManagerInterface, TaskAndHistory } from "~/types/index.js";

export class TaskManager<TaskType extends TaskAndHistory>
  implements TaskManagerInterface<TaskType>
{
  private states: Map<string, TaskType> = new Map();
  getState(id: string) {
    return this.states.get(id);
  }
  setState(id: string, data: TaskType) {
    this.states.set(id, data);
  }
  getTasks() {
    return Array.from(this.states.keys());
  }
}
