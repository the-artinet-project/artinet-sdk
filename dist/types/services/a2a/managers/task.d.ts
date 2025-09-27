/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskManagerInterface, TaskAndHistory } from "../../../types/index.js";
export declare class TaskManager<TaskType extends TaskAndHistory> implements TaskManagerInterface<TaskType> {
    private states;
    getState(id: string): TaskType | Promise<TaskType | undefined> | undefined;
    setState(id: string, data: TaskType): Promise<void> | void;
    getStates(): Promise<string[]> | string[];
}
//# sourceMappingURL=task.d.ts.map