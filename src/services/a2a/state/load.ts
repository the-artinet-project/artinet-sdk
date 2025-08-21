import { getCurrentTimestamp } from "~/utils/index.js";
import {
  Task,
  Message,
  TaskState,
  TaskAndHistory,
  TaskStore,
} from "~/types/index.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Loads or creates a task and its history.
 * @param taskId The task ID
 * @param message The message to process
 * @param contextId Optional context ID
 * @param metadata Optional metadata
 * @returns The task and history
 */
export async function loadState(
  taskStore: TaskStore,
  message: Message,
  metadata?: Record<string, unknown>,
  taskId?: string,
  contextId?: string
): Promise<TaskAndHistory> {
  if (taskId) {
    const existingData: TaskAndHistory | null = await taskStore.load(taskId);
    if (existingData) {
      return existingData;
    }
  }
  const timestamp = getCurrentTimestamp();
  const newTask: Task = {
    id: taskId ?? uuidv4(),
    contextId: contextId ?? uuidv4(),
    kind: "task",
    status: {
      state: TaskState.submitted,
      timestamp,
    },
    metadata: metadata,
    history: [message],
  };
  message.taskId = newTask.id;
  message.contextId = newTask.contextId;
  const newHistory: Message[] = [message];
  return { task: newTask, history: newHistory };
}
