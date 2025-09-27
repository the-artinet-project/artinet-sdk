/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { updateState } from "./update/update.js";
export async function processUpdate(taskStore, updateProps) {
    if (!(await updateState(updateProps))) {
        console.error("processUpdate: Invalid update", updateProps);
        throw new Error("processUpdate: Invalid update");
    }
    await taskStore.save(updateProps.current);
    return updateProps.current;
}
//# sourceMappingURL=process.js.map