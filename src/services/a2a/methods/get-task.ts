import { Task, TaskIdParams, MethodParams } from "~/types/index.js";
import { TASK_NOT_FOUND } from "~/utils/index.js";

export async function getTask(
  input: TaskIdParams,
  params: Omit<MethodParams, "agent" | "contextManager" | "signal">
) {
  const { service } = params;
  const task: Task | undefined = service.getState(input.id)?.task;
  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  return task;
}
export type GetTaskMethod = typeof getTask;
