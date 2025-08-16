import {
  Task,
  TaskIdParams,
  TaskIdParamsSchema,
  TaskSchema,
} from "../../../../types/index.js";
import { TaskAndHistory } from "../../../interfaces/store.js";
import { TASK_NOT_FOUND } from "../../../../utils/index.js";
import { A2AServiceInterface } from "../../protocol/a2a-service.js";
import { serviceProcedure } from "../../procedures/service.js";

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

export const getTaskRoute = serviceProcedure
  .input(TaskIdParamsSchema)
  .output(TaskSchema)
  .query(async ({ input, ctx }) => {
    return await getTask(input, ctx.service);
  });
