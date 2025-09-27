/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskState, TaskStatusUpdateEvent } from "../../types/index.js";
export declare const WORKING_UPDATE: (taskId: string, contextId: string, timestamp?: string) => TaskStatusUpdateEvent;
export declare const CANCEL_UPDATE: (taskId: string, contextId: string, timestamp?: string) => TaskStatusUpdateEvent;
export declare const SUBMITTED_UPDATE: (taskId: string, contextId: string, timestamp?: string) => TaskStatusUpdateEvent;
export declare const FINAL_STATES: TaskState[];
//# sourceMappingURL=constants.d.ts.map