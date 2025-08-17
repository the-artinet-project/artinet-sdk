import { Task, TaskIdParams } from "../../../../../types/index.js";
import { TaskAndHistory } from "../../../../interfaces/store.js";
import { TASK_NOT_FOUND } from "../../../../../utils/index.js";
import { A2AServiceInterface } from "../interfaces/service.js";

export async function getTask(
  input: TaskIdParams,
  service: A2AServiceInterface
) {
  const task: Task = (service.getState(input.id) as TaskAndHistory)?.task;
  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  return task;
}
