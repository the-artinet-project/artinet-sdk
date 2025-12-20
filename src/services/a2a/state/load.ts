/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  getCurrentTimestamp,
  logError,
  validateSchema,
} from "~/utils/index.js";
import { A2A, TaskStore, A2ARuntime } from "~/types/index.js";
import { v4 as uuidv4 } from "uuid";

async function getReferences(
  referenceTaskIds: string[],
  taskStore: TaskStore
): Promise<A2A.Task[]> {
  try {
    const references: (A2ARuntime["state"] | null)[] = await Promise.all(
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
import { v2 } from "~/types/interfaces/services/v2/index.js";
import { logger } from "~/config/index.js";
async function getReferencesV2(
  referenceTaskIds: string[],
  tasks: v2.a2a.Tasks
): Promise<A2A.Task[]> {
  try {
    const references: (A2A.Task | undefined)[] = await Promise.all(
      referenceTaskIds.map((referenceTaskId) => {
        return tasks.get(referenceTaskId).catch((error) => {
          logger.error("getReferencesV2", "failed to load reference", error, {
            referenceTaskId,
          });
          return undefined;
        });
      })
    );
    return references
      .filter((reference) => reference !== undefined)
      .map((reference) => reference);
  } catch (error) {
    logger.error("getReferencesV2", "failed to load references", error, {
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
  message: A2A.Message,
  metadata?: Record<string, unknown> | null,
  taskId?: string | null,
  contextId?: string | null
): Promise<A2ARuntime["state"]> {
  if (taskId) {
    const existingData: A2ARuntime["state"] | null = await taskStore.load(
      taskId
    );
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
  const newTask: A2A.Task = {
    id: taskId ?? uuidv4(),
    contextId: contextId ?? uuidv4(),
    kind: "task",
    status: {
      state: A2A.TaskState.submitted,
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
