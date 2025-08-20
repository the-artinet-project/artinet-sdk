import { Task, TaskIdParams, A2AServiceInterface } from "~/types/index.js";
import { TASK_NOT_FOUND } from "~/utils/index.js";

export async function getTask(
  input: TaskIdParams,
  service: A2AServiceInterface
) {
  const task: Task | undefined = service.getState(input.id)?.task;
  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  return task;
}
export type GetTaskMethod = typeof getTask;
