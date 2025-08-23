/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskAndHistory, TaskStore } from "~/types/index.js";
import { updateState, UpdateProps } from "./update/update.js";

export async function processUpdate(
  taskStore: TaskStore,
  updateProps: UpdateProps
): Promise<TaskAndHistory> {
  if (!(await updateState(updateProps))) {
    console.error("processUpdate: Invalid update", updateProps);
    throw new Error("processUpdate: Invalid update");
  }
  await taskStore.save(updateProps.current);
  return updateProps.current;
}
