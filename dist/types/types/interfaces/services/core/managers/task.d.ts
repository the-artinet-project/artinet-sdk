/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export interface TaskManagerInterface<TaskType extends {} = {}> {
    getState(id: string): Promise<TaskType | undefined> | TaskType | undefined;
    setState(id: string, data: TaskType): Promise<void> | void;
    getStates(): Promise<string[]> | string[];
}
//# sourceMappingURL=task.d.ts.map