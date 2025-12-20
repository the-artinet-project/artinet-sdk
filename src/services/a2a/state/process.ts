/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2ARuntime, TaskStore, UpdateEvent } from "~/types/index.js";
import { updateState, UpdateProps } from "./update/update.js";

export async function processUpdate(
  taskStore: TaskStore,
  updateProps: UpdateProps
): Promise<A2ARuntime["state"]> {
  if (!(await updateState(updateProps))) {
    console.error("processUpdate: Invalid update", updateProps);
    throw new Error("processUpdate: Invalid update");
  }
  await taskStore.save(updateProps.current);
  return updateProps.current;
}
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { A2A } from "~/types/index.js";
export async function processUpdateV2(
  tasks: v2.a2a.Tasks,
  context: v2.a2a.Context,
  update: UpdateEvent
): Promise<A2A.Task> {
  const task = await updateTask(update);
  await tasks.set(task.id, task);
  return task;
}

const updateTask = (update: UpdateEvent): Promise<A2A.Task> => {
  throw new Error("Not implemented");
};
