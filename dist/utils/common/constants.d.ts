/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskState, TaskStatusUpdateEvent, Message } from "../../types/index.js";
export declare const STATUS_UPDATE: (taskId: string, contextId: string, status: TaskState, message?: Message, timestamp?: string, final?: boolean) => TaskStatusUpdateEvent;
export declare const WORKING_UPDATE: (taskId: string, contextId: string, message?: Message, timestamp?: string) => TaskStatusUpdateEvent;
export declare const CANCEL_UPDATE: (taskId: string, contextId: string, message?: Message, timestamp?: string) => TaskStatusUpdateEvent;
export declare const SUBMITTED_UPDATE: (taskId: string, contextId: string, message?: Message, timestamp?: string) => TaskStatusUpdateEvent;
export declare const FAILED_UPDATE_EVENT: (taskId: string, contextId: string, message?: Message, timestamp?: string) => TaskStatusUpdateEvent;
export declare const FINAL_STATES: TaskState[];
