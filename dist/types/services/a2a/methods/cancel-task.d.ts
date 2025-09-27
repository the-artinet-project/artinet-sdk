/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskIdParams, Task, MethodParams } from "../../../types/index.js";
export declare function cancelTask(input: TaskIdParams, params: Omit<MethodParams, "engine" | "signal">): Promise<Task>;
export type CancelTaskMethod = typeof cancelTask;
//# sourceMappingURL=cancel-task.d.ts.map