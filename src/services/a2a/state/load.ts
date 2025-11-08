/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { getCurrentTimestamp, logError } from "~/utils/index.js";
import {
  Task,
  Message,
  TaskState,
  TaskAndHistory,
  TaskStore,
} from "~/types/index.js";
import { v4 as uuidv4 } from "uuid";

async function getReferences(
  referenceTaskIds: string[],
  taskStore: TaskStore
): Promise<Task[]> {
  try {
    const references: (TaskAndHistory | null)[] = await Promise.all(
      referenceTaskIds.map((referenceTaskId) => {
        return taskStore.load(referenceTaskId);
      })
    );
    return references
      .filter((reference) => reference !== null)
      .map((reference) => reference?.task);
  } catch (error) {
    logError("getReferences", "failed to load references", error, {
      referenceTaskIds,
    });
    return [];
  }
}
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
  metadata?: Record<string, unknown> | null,
  taskId?: string,
  contextId?: string
): Promise<TaskAndHistory> {
  if (taskId) {
    const existingData: TaskAndHistory | null = await taskStore.load(taskId);
    if (existingData) {
      return {
        ...existingData,
        task: {
          ...existingData.task,
          metadata: {
            //we'll update the metadata to ensure it's the latest
            ...existingData.task.metadata,
            ...metadata,
            //we'll update the referencedTasks we have the latest versions
            referencedTasks: await getReferences(
              message.referenceTaskIds ?? [],
              taskStore
            ),
          },
        },
      };
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
    metadata: {
      ...metadata,
      //we should only need to load referenceTasks once; on the creation of a new task
      //we'll store them in the metadata for now until we're sure they will remain in the A2A spec
      referencedTasks: await getReferences(
        message.referenceTaskIds ?? [],
        taskStore
      ),
    },
    history: [message],
  };

  message.taskId = newTask.id;
  message.contextId = newTask.contextId;
  return { task: newTask, history: [] };
}
