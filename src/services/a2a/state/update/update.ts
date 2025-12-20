/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskContext, UpdateEvent, TaskAndHistory } from "~/types/index.js";
import { getCurrentTimestamp } from "~/utils/index.js";
import { logError } from "~/utils/logging/index.js";
import { processArtifactUpdate } from "./artifact.js";
import { A2A } from "~/types/index.js";
import { v2 } from "~/types/interfaces/services/v2/index.js";
export enum UpdateKind {
  Message = "message",
  Task = "task",
  StatusUpdate = "status-update",
  ArtifactUpdate = "artifact-update",
}

export interface UpdateProps<T extends UpdateEvent = UpdateEvent> {
  context: TaskContext;
  current: TaskAndHistory;
  update: T;
}

type Updater<T extends UpdateEvent> = (
  props: UpdateProps<T>
) => Promise<boolean>;

const isMessageInHistory = (task: A2A.Task, message: A2A.Message) => {
  return task.history?.find((msg) => msg.messageId === message.messageId);
};

const updateHistory = (current: TaskAndHistory, updateMessage: A2A.Message) => {
  if (!isMessageInHistory(current.task, updateMessage)) {
    current.task.history = [...(current.task.history ?? []), updateMessage];
  }
};

export const updateMessage: Updater<A2A.Message> = async (props) => {
  const { context, update } = props;
  if (!update || update.kind !== UpdateKind.Message) {
    logError("updateMessage", "Invalid update", update);
    return false;
  }
  context.latestUserMessage = update;
  return true;
};

export const updateTask: Updater<A2A.Task> = async (props) => {
  const { context, current, update } = props;
  if (!update || update.kind !== UpdateKind.Task) {
    logError("updateTask", "Invalid update kind", update);
    return false;
  }
  current.task = { ...current.task, ...update };
  if (
    context.latestUserMessage &&
    !isMessageInHistory(current.task, context.latestUserMessage)
  ) {
    //todo seems that we can use updateHistory here instead (will change after we deprecate history fully & add update specific tests)
    current.task.history = [
      context.latestUserMessage,
      ...(current.task.history ?? []),
    ];
    // current.history = [context.latestUserMessage, ...(current.history ?? [])]; deprecating history
  }
  return true;
};

export const updateTaskStatusUpdate: Updater<
  A2A.TaskStatusUpdateEvent
> = async (props) => {
  const { current, update } = props;
  if (!update || update.kind !== UpdateKind.StatusUpdate) {
    logError("updateTaskStatusUpdate", "Invalid update kind", update);
    return false;
  }
  if (current.task.id === update.taskId) {
    current.task.status = update.status;
    current.task.status.timestamp = getCurrentTimestamp();
    if (update.status.message) {
      updateHistory(current, update.status.message);
    }
    return true;
  }
  logError("updateTaskStatusUpdate", "Invalid task id", update);
  return false;
};

export const updateTaskArtifactUpdate: Updater<
  A2A.TaskArtifactUpdateEvent
> = async (props) => {
  const { current, update } = props;
  if (!update || update.kind !== UpdateKind.ArtifactUpdate) {
    logError("updateTaskArtifactUpdate", "Invalid update kind", update);
    return false;
  }
  if (current.task.id === update.taskId) {
    current.task.artifacts = processArtifactUpdate(
      update.append ?? false,
      current.task.artifacts ?? [],
      update.artifact
    );
    return true;
  }
  logError("updateTaskArtifactUpdate", "Invalid task id", update); //we should never get here, but just in case
  return true;
};

export const updateState: Updater<UpdateEvent> = async (
  props
): Promise<boolean> => {
  const { context, current, update } = props;
  if (!update || !update.kind) {
    logError("update", "Invalid update", update);
    return false;
  }

  if (!current || !current.task || !current.task.id) {
    logError("update", "Invalid current", current);
    return false;
  }

  if (!context || !context.contextId) {
    logError("update", "Invalid context", context);
    return false;
  }

  switch (update.kind) {
    case UpdateKind.Message:
      return updateMessage({
        context,
        current,
        update: update as A2A.Message,
      });
    case UpdateKind.Task:
      return updateTask({
        context,
        current,
        update: update as A2A.Task,
      });
    case UpdateKind.StatusUpdate:
      return updateTaskStatusUpdate({
        context,
        current,
        update: update as A2A.TaskStatusUpdateEvent,
      });
    case UpdateKind.ArtifactUpdate:
      return updateTaskArtifactUpdate({
        context,
        current,
        update: update as A2A.TaskArtifactUpdateEvent,
      });
    default:
      return false;
  }
};
