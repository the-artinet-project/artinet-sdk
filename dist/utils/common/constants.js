/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskState } from "../../types/index.js";
import { getCurrentTimestamp } from "../index.js";
//todo: protocol specific so move to a2a folder
export const STATUS_UPDATE = (taskId, contextId, status, message, timestamp = getCurrentTimestamp(), final = false) => {
    return {
        taskId: taskId,
        contextId: contextId,
        kind: "status-update",
        status: {
            state: status,
            message: message,
            timestamp: timestamp,
        },
        final: final,
    };
};
export const WORKING_UPDATE = (taskId, contextId, message, timestamp) => {
    return STATUS_UPDATE(taskId, contextId, TaskState.working, message, timestamp);
};
export const CANCEL_UPDATE = (taskId, contextId, message, timestamp) => {
    return STATUS_UPDATE(taskId, contextId, TaskState.canceled, message, timestamp, true);
};
export const SUBMITTED_UPDATE = (taskId, contextId, message, timestamp) => {
    return STATUS_UPDATE(taskId, contextId, TaskState.submitted, message, timestamp);
};
export const FAILED_UPDATE_EVENT = (taskId, contextId, message, timestamp) => {
    return STATUS_UPDATE(taskId, contextId, TaskState.failed, message, timestamp, true);
};
export const FINAL_STATES = [
    TaskState.completed,
    TaskState.failed,
    TaskState.canceled,
    TaskState.rejected,
];
