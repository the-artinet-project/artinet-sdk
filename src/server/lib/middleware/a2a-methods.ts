import { TaskState, TaskYieldUpdate, Task } from "../../../types/index.js";
import { extractTaskId, getCurrentTimestamp } from "../../../utils/index.js";
import { logError, logWarn } from "../../../utils/index.js";
import { loadState, updateState } from "../state.js";
import {
  INTERNAL_ERROR,
  INVALID_PARAMS,
  METHOD_NOT_FOUND,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  TASK_NOT_CANCELABLE,
  TASK_NOT_FOUND,
  FAILED_UPDATE,
  SystemError,
} from "../../../utils/index.js";
import {
  SendTaskMethod,
  GetTaskMethod,
  CancelTaskMethod,
  SetTaskPushNotificationMethod,
  GetTaskPushNotificationMethod,
} from "../../interfaces/params.js";
import { FINAL_STATES } from "../../../utils/index.js";

export const defaultSendTaskMethod: SendTaskMethod = async (
  deps,
  requestParams,
  callback
) => {
  const { taskStore, taskHandler, createTaskContext } = deps;
  const taskId = extractTaskId(requestParams.id);
  const { message, sessionId, metadata } = requestParams;

  let currentData = await loadState(
    taskStore,
    taskId,
    message,
    sessionId,
    metadata
  );
  const context = createTaskContext(
    currentData.task,
    message,
    currentData.history
  );
  const generator = taskHandler(context);
  try {
    for await (const update of generator) {
      currentData = await updateState(taskStore, currentData, update);
    }
    return callback(null, currentData.task); // Success
  } catch (innerError) {
    const failedUpdate: TaskYieldUpdate = FAILED_UPDATE(
      `Task processing failed: ${innerError instanceof Error ? innerError.message : String(innerError)}`
    );
    // Ensure state is saved before calling callback with error
    await updateState(taskStore, currentData, failedUpdate);
    // Throwing here would be caught by createMethod's catch block
    if (innerError instanceof SystemError) {
      throw innerError;
    }
    throw INTERNAL_ERROR(innerError);
  }
};

export const defaultGetTaskMethod: GetTaskMethod = async (
  deps,
  requestParams,
  callback
) => {
  const { taskStore } = deps;
  const taskId = extractTaskId(requestParams.id);
  if (!taskId) throw INVALID_PARAMS("Missing task ID");
  const data = await taskStore.load(taskId);
  if (!data) {
    logError("taskGetLogic", "Task not found", { taskId });
    throw TASK_NOT_FOUND("Task Id: " + taskId);
  }
  callback(null, data.task); // Success
};

export const defaultCancelTaskMethod: CancelTaskMethod = async (
  deps,
  requestParams,
  callback
) => {
  const { taskStore, activeCancellations, closeStreamsForTask } = deps;
  const taskId = extractTaskId(requestParams.id);
  if (!taskId) throw INVALID_PARAMS("Missing task ID");
  const data = await taskStore.load(taskId);
  if (!data) throw TASK_NOT_FOUND("Task Id: " + taskId);
  if (FINAL_STATES.includes(data.task.status.state)) {
    throw TASK_NOT_CANCELABLE();
  }

  activeCancellations.add(taskId);
  const canceledTask: Task = {
    ...data.task,
    status: {
      state: "canceled" as TaskState,
      timestamp: getCurrentTimestamp(),
      message: {
        role: "agent" as const,
        parts: [{ type: "text" as const, text: "Task was canceled." }],
      },
    },
  };
  const updatedData = { task: canceledTask, history: data.history };
  await taskStore.save(updatedData);
  closeStreamsForTask(taskId);
  return callback(null, canceledTask);
};

export const defaultSetTaskPushNotificationMethod: SetTaskPushNotificationMethod =
  async (deps, requestParams, callback) => {
    const { taskStore, card } = deps;
    logWarn(
      "tasks/pushNotification/set",
      "Push notifications not fully implemented."
    );
    if (!card.capabilities?.pushNotifications) {
      throw METHOD_NOT_FOUND();
    }
    const config = requestParams;
    const taskId = extractTaskId(config.id);
    if (!taskId || !config.pushNotificationConfig?.url) {
      throw INVALID_PARAMS();
    }
    const data = await taskStore.load(taskId);
    if (!data) {
      throw TASK_NOT_FOUND();
    }
    return callback(null, config);
  };

export const defaultGetTaskPushNotificationMethod: GetTaskPushNotificationMethod =
  async (deps, requestParams, callback) => {
    const { taskStore, card } = deps;
    logWarn(
      "tasks/pushNotification/get",
      "Push notifications not fully implemented."
    );
    if (!card.capabilities?.pushNotifications) {
      throw PUSH_NOTIFICATION_NOT_SUPPORTED();
    }
    const taskId = extractTaskId(requestParams.id);
    if (!taskId) {
      throw INVALID_PARAMS();
    }
    const data = await taskStore.load(taskId);
    if (!data) {
      throw TASK_NOT_FOUND();
    }
    return callback(null, null);
  };
