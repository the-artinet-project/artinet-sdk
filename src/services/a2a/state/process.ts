import { TaskAndHistory, TaskStore } from "~types/index.js";
import { update, UpdateProps } from "./update/update.js";

export async function processUpdate(
  taskStore: TaskStore,
  updateProps: UpdateProps
): Promise<TaskAndHistory> {
  if (!(await update(updateProps))) {
    console.error("processUpdate: Invalid update", updateProps);
    throw new Error("processUpdate: Invalid update");
  }
  await taskStore.save(updateProps.current);
  return updateProps.current;
}
