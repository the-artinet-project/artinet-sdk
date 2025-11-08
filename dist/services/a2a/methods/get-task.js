/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TASK_NOT_FOUND } from "../../../utils/index.js";
export async function getTask(input, params) {
    const { service } = params;
    const state = await service.getState(input.id);
    const task = state?.task;
    if (!task) {
        throw TASK_NOT_FOUND({ taskId: input.id });
    }
    return task;
}
