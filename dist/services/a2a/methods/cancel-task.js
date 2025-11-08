/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskState, } from "../../../types/index.js";
import { FINAL_STATES, TASK_NOT_FOUND, TASK_NOT_CANCELABLE, } from "../../../utils/index.js";
export async function cancelTask(input, params) {
    const { service, contextManager } = params;
    const originalState = await service.getState(input.id);
    const task = originalState?.task;
    if (!task) {
        throw TASK_NOT_FOUND({ taskId: input.id });
    }
    if (FINAL_STATES.includes(task.status.state)) {
        throw TASK_NOT_CANCELABLE("Task is in a final state: " + task.status.state);
    }
    service.addCancellation(input.id);
    const cancelledTask = {
        ...task,
        status: {
            ...task.status,
            state: TaskState.canceled,
        },
    };
    const context = contextManager.getContext(task.contextId ?? input.id);
    if (!context) {
        service.setState(input.id, {
            ...originalState,
            task: {
                ...originalState?.task,
                ...cancelledTask,
            },
            history: [], //deprecating history
        });
        return cancelledTask;
    }
    context.events.on("complete", () => {
        service.removeCancellation(input.id);
        contextManager.deleteContext(context.contextId);
    });
    await context.events.onCancel(cancelledTask);
    return cancelledTask;
}
