import {
  Context,
  TaskIdParams,
  A2AServiceInterface,
  ContextManagerInterface,
  Task,
  TaskState,
  MessageSendParams,
  TaskAndHistory,
  UpdateEvent,
} from "~/types/index.js";
import {
  FINAL_STATES,
  TASK_NOT_FOUND,
  TASK_NOT_CANCELABLE,
} from "~/utils/index.js";

export async function cancelTask(
  input: TaskIdParams,
  service: A2AServiceInterface,
  contextManager: ContextManagerInterface<
    MessageSendParams,
    TaskAndHistory,
    UpdateEvent
  >
): Promise<Task> {
  const originalState: TaskAndHistory | undefined = service.getState(input.id);
  const task: Task | undefined = originalState?.task;

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

  const context:
    | Context<MessageSendParams, TaskAndHistory, UpdateEvent>
    | undefined = contextManager.getContext(task.contextId ?? input.id);

  if (!context) {
    service.setState(input.id, {
      ...originalState,
      task: {
        ...originalState?.task,
        ...cancelledTask,
      },
      history: Array.from(
        new Set([
          ...(originalState?.history ?? []),
          ...(cancelledTask.history ?? []),
        ])
      ),
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
export type CancelTaskMethod = typeof cancelTask;
