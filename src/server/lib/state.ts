import {
  getCurrentTimestamp,
  isArtifactUpdate,
  isTaskStatusUpdate,
} from "../../utils/common/utils.js";
import {
  Task,
  TaskStatus,
  Artifact,
  Message,
  TaskYieldUpdate,
  TaskState,
} from "../../types/extended-schema.js";
import { TaskAndHistory } from "../interfaces/store.js";
import { INVALID_REQUEST } from "../../utils/common/errors.js";
import { TaskStore } from "../interfaces/store.js";
import { v4 as uuidv4 } from "uuid";

export function updateTaskStatus(
  task: Task,
  update: TaskYieldUpdate
): TaskStatus {
  return { ...task.status, ...update, timestamp: getCurrentTimestamp() };
}

export function checkBounds(index: number, length: number): boolean {
  return index >= 0 && index < length;
}

export function updateByIndex(
  artifacts: Artifact[],
  index: number,
  update: Artifact
): { artifacts: Artifact[]; replaced: boolean } {
  const existingArtifact: Artifact = artifacts[index];
  if (update.append) {
    //deep copy to avoid mutating original
    const appendedArtifact: Artifact = JSON.parse(
      JSON.stringify(existingArtifact)
    );
    appendedArtifact.parts.push(...update.parts);

    if (update.metadata) {
      appendedArtifact.metadata = {
        ...(appendedArtifact.metadata || {}),
        ...update.metadata,
      };
    }

    if (update.lastChunk !== undefined) {
      appendedArtifact.lastChunk = update.lastChunk;
    }

    if (update.description) {
      appendedArtifact.description = update.description;
    }

    artifacts[index] = appendedArtifact;
  } else {
    artifacts[index] = { ...update };
  }
  return { artifacts, replaced: true };
}

export function updateByName(
  artifacts: Artifact[],
  update: Artifact
): { artifacts: Artifact[]; replaced: boolean } {
  const namedIndex = artifacts.findIndex((a) => a.name === update.name);
  if (namedIndex >= 0) {
    artifacts[namedIndex] = { ...update };
    return { artifacts, replaced: true };
  }
  return { artifacts: artifacts, replaced: false };
}

export function processArtifactUpdate(
  artifacts: Artifact[],
  update: Artifact
): { artifacts: Artifact[]; replaced: boolean } {
  const existingIndex = update.index ?? -1;
  let replaced = false;
  let newArtifacts = artifacts;
  if (checkBounds(existingIndex, artifacts.length)) {
    ({ artifacts: newArtifacts, replaced } = updateByIndex(
      artifacts,
      existingIndex,
      update
    ));
  } else if (update.name) {
    ({ artifacts: newArtifacts, replaced } = updateByName(artifacts, update));
  }
  if (!replaced) {
    newArtifacts.push({ ...update });
    if (newArtifacts.some((a) => a.index !== undefined)) {
      newArtifacts.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    }
    replaced = true;
  }
  return { artifacts: newArtifacts, replaced };
}

export async function updateState(
  taskStore: TaskStore,
  current: TaskAndHistory,
  update: TaskYieldUpdate
): Promise<TaskAndHistory> {
  const newTask = { ...current.task };
  const newHistory = [...current.history];

  if (isTaskStatusUpdate(update)) {
    newTask.status = updateTaskStatus(newTask, update);
    if (update.message?.role === "agent") {
      newHistory.push(update.message);
    }
  } else if (isArtifactUpdate(update)) {
    const artifacts = !newTask.artifacts ? [] : [...newTask.artifacts];
    const { artifacts: newArtifacts, replaced } = processArtifactUpdate(
      artifacts,
      update
    );
    if (!replaced) {
      throw INVALID_REQUEST("Invalid artifact update");
    }
    newTask.artifacts = newArtifacts;
  }

  const currentData = { task: newTask, history: newHistory };
  await taskStore.save(currentData);

  return currentData;
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
  taskId: string,
  message: Message,
  contextId?: string,
  metadata?: Record<string, unknown>
): Promise<TaskAndHistory> {
  const existingData: TaskAndHistory | null = await taskStore.load(taskId);
  if (existingData) {
    return existingData;
  }

  const timestamp = getCurrentTimestamp();
  const newTask: Task = {
    id: taskId,
    contextId: contextId ?? uuidv4(),
    kind: "task",
    status: {
      state: TaskState.Submitted,
      timestamp,
    },
    metadata: metadata,
  };
  const newHistory: Message[] = [message];
  return { task: newTask, history: newHistory };
}
