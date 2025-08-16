import {
  TaskIdParams,
  TaskIdParamsSchema,
  TaskSchema,
} from "../../../../types/index.js";
import { A2AServiceInterface, ContextManager } from "../../protocol/index.js";
import {
  globalRepository,
  serviceProcedure,
} from "../../procedures/service.js";
import { Task } from "../../../../types/index.js";
import { TaskState } from "../../../../types/index.js";
import { FINAL_STATES, TASK_NOT_FOUND } from "../../../../utils/index.js";
import { TASK_NOT_CANCELABLE } from "../../../../utils/index.js";

export async function cancelTask(
  input: TaskIdParams,
  service: A2AServiceInterface,
  contextManager: ContextManager
) {
  const originalState = service.getState(input.id);
  const task: Task = (originalState as any)?.task;

  if (!task) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }

  if (FINAL_STATES.includes(task.status.state)) {
    throw TASK_NOT_CANCELABLE("Task is in a final state: " + task.status.state);
  }

  service.addCancellation(input.id);

  const cancelledTask: Task = {
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
      task: cancelledTask,
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

export const cancelTaskRoute = serviceProcedure
  .input(TaskIdParamsSchema)
  .output(TaskSchema)
  .mutation(async ({ input, ctx }) => {
    return await cancelTask(
      input,
      ctx.service,
      globalRepository.getContextManager()
    );
  });
