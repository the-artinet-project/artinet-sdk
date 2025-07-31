import { getCurrentTimestamp } from "../../utils/common/utils.js";
import {
  Task,
  Artifact,
  Message,
  TaskState,
} from "../../types/extended-schema.js";
import { TaskAndHistory } from "../interfaces/store.js";
import { TaskStore } from "../interfaces/store.js";
import { v4 as uuidv4 } from "uuid";
import { update, UpdateProps } from "./update/base.js";

//todo: move to update.ts
export function updateByIndex(
  append: boolean,
  artifacts: Artifact[],
  index: number,
  artifactUpdate: Artifact
): { artifacts: Artifact[]; replaced: boolean } {
  if (append) {
    const existingArtifact: Artifact = artifacts[index];
    existingArtifact.parts.push(...artifactUpdate.parts);

    if (artifactUpdate.metadata) {
      existingArtifact.metadata = {
        ...(existingArtifact.metadata || {}),
        ...artifactUpdate.metadata,
      };
    }

    if (artifactUpdate.description) {
      existingArtifact.description = artifactUpdate.description;
    }

    if (artifactUpdate.name) {
      existingArtifact.name = artifactUpdate.name;
    }

    artifacts[index] = existingArtifact;
  } else {
    artifacts[index] = { ...artifactUpdate };
  }
  return { artifacts, replaced: true };
}

//todo: move to update.ts
export function processArtifactUpdate(
  append: boolean,
  artifacts: Artifact[],
  artifactUpdate: Artifact
): Artifact[] {
  const existingIndex = artifacts.findIndex(
    (a) => a.artifactId === artifactUpdate.artifactId
  );

  let replaced = false;
  let newArtifacts = artifacts;

  if (existingIndex !== -1) {
    ({ artifacts: newArtifacts, replaced } = updateByIndex(
      append,
      artifacts,
      existingIndex,
      artifactUpdate
    ));
  }
  if (!replaced) {
    newArtifacts.push({ ...artifactUpdate });
  }
  return newArtifacts;
}

export async function processUpdate(
  taskStore: TaskStore,
  updateProps: UpdateProps
): Promise<TaskAndHistory> {
  if (!(await update(updateProps))) {
    throw new Error("processUpdate: Invalid update");
  }
  await taskStore.save(updateProps.current);
  return updateProps.current;
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
  };
  message.taskId = newTask.id;
  message.contextId = newTask.contextId;
  const newHistory: Message[] = [message];
  return { task: newTask, history: newHistory };
}
