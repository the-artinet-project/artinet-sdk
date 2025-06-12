import { TaskContext } from "../../../types/index.js";
import {
  Message,
  Task,
  TaskArtifactUpdateEvent,
  TaskStatusUpdateEvent,
  UpdateEvent,
} from "../../../types/extended-schema.js";
import { getCurrentTimestamp } from "../../../utils/common/utils.js";
import { logError } from "../../../utils/logging/log.js";
import { TaskAndHistory } from "../../interfaces/store.js";
import { processArtifactUpdate } from "../state.js";

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

export type Update<T extends UpdateEvent> = (
  props: UpdateProps<T>
) => Promise<boolean>;

const isMessageInHistory = (task: Task, message: Message) => {
  return task.history?.find((msg) => msg.messageId === message.messageId);
};

const updateHistory = (current: TaskAndHistory, updateMessage: Message) => {
  if (!isMessageInHistory(current.task, updateMessage)) {
    current.history = [...(current.history ?? []), updateMessage];
    current.task.history = [...(current.task.history ?? []), updateMessage];
  }
};

export const updateMessage: Update<Message> = async (props) => {
  const { context, update } = props;
  if (!update || update.kind !== UpdateKind.Message) {
    logError("updateMessage", "Invalid update", update);
    return false;
  }
  context.latestUserMessage = update;
  return true;
};

export const updateTask: Update<Task> = async (props) => {
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
    current.task.history = [
      context.latestUserMessage,
      ...(current.task.history ?? []),
    ];
    current.history = [context.latestUserMessage, ...(current.history ?? [])];
  }
  return true;
};

export const updateTaskStatusUpdate: Update<TaskStatusUpdateEvent> = async (
  props
) => {
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

export const updateTaskArtifactUpdate: Update<TaskArtifactUpdateEvent> = async (
  props
) => {
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
  }
  return true;
};

export const update: Update<UpdateEvent> = async (props): Promise<boolean> => {
  const { context, current, update } = props;
  if (!update || !update.kind) {
    logError("update", "Invalid update", update);
    return false;
  }

  switch (update.kind) {
    case UpdateKind.Message:
      return updateMessage({
        context,
        current,
        update: update as Message,
      });
    case UpdateKind.Task:
      return updateTask({
        context,
        current,
        update: update as Task,
      });
    case UpdateKind.StatusUpdate:
      return updateTaskStatusUpdate({
        context,
        current,
        update: update as TaskStatusUpdateEvent,
      });
    case UpdateKind.ArtifactUpdate:
      return updateTaskArtifactUpdate({
        context,
        current,
        update: update as TaskArtifactUpdateEvent,
      });
    default:
      return false;
  }
};
