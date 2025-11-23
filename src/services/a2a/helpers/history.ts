import { Message, Task } from "~/types/index.js";

export function getLatestHistory(task: Task, length?: number): Message[] {
  return length ? task.history?.slice(-length) ?? [] : task.history ?? [];
}
