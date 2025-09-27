/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskState } from "../../types/index.js";
import { getCurrentTimestamp } from "../index.js";
//todo: protocol specific so move to protocol folder
export const WORKING_UPDATE = (taskId, contextId, timestamp = getCurrentTimestamp()) => {
    return {
        taskId: taskId,
        contextId: contextId,
        kind: "status-update",
        status: {
            state: TaskState.working,
            timestamp: timestamp,
        },
        final: false,
    };
};
export const CANCEL_UPDATE = (taskId, contextId, timestamp = getCurrentTimestamp()) => {
    return {
        taskId: taskId,
        contextId: contextId,
        kind: "status-update",
        status: {
            state: TaskState.canceled,
            timestamp: timestamp,
        },
        final: true,
    };
};
export const SUBMITTED_UPDATE = (taskId, contextId, timestamp = getCurrentTimestamp()) => {
    return {
        taskId: taskId,
        contextId: contextId,
        kind: "status-update",
        status: {
            state: TaskState.submitted,
            timestamp: timestamp,
        },
        final: false,
    };
};
export const FINAL_STATES = [
    TaskState.completed,
    TaskState.failed,
    TaskState.canceled,
    TaskState.rejected,
];
//# sourceMappingURL=constants.js.map