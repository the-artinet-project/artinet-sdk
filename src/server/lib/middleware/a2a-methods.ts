import {
  TaskState,
  Task,
  SetTaskPushNotificationConfigResponse,
  ExecutionContext,
  SendMessageRequest,
  A2AExecutionContext,
} from "../../../types/index.js";
import { Protocol } from "../../../types/services/protocol.js";
import {
  getCurrentTimestamp,
  validateSendMessageParams,
} from "../../../utils/index.js";
import { logError, logWarn } from "../../../utils/index.js";
import { loadState, processUpdate } from "../state.js";
import {
  INTERNAL_ERROR,
  INVALID_PARAMS,
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
//todo move to the a2a plugin
export const defaultSendTaskMethod: SendTaskMethod = async (
  deps,
  requestParams,
  callback
) => {
  validateSendMessageParams(requestParams);
  const { taskStore, taskHandler, createTaskContext } = deps;
  const { message, configuration, metadata } = requestParams;

  let currentData = await loadState(
    taskStore,
    message,
    metadata,
    message.taskId,
    message.contextId
  );
  const context = createTaskContext(
    currentData.task,
    message,
    currentData.history,
    configuration
  );
  const requestContext: A2AExecutionContext<SendMessageRequest> = {
    id: context.contextId,
    protocol: Protocol.A2A,
    method: "message/send",
    params: requestParams,
    task: currentData.task,
    request: null,
    response: null,
  };
  const executionContext: ExecutionContext<
    A2AExecutionContext<SendMessageRequest>
  > = {
    id: context.contextId,
    protocol: Protocol.A2A,
    getRequestParams: () => requestParams,
    isCancelled: () => deps.activeCancellations.has(context.task.id),
    requestContext: requestContext,
  };
  const generator = taskHandler(executionContext);
  try {
    for await (const update of generator) {
      currentData = await processUpdate(taskStore, {
        context: context,
        current: currentData,
        update: update,
      });
    }
    const task: Task = {
      ...currentData.task,
      kind: "task",
      history: [...(currentData.task.history || []), ...currentData.history],
    };
    return callback(null, task); // Success
  } catch (innerError) {
    const failedUpdate = FAILED_UPDATE(
      currentData.task.id,
      currentData.task.contextId || "unknown",
      "failed-update",
      `Task processing failed: ${innerError instanceof Error ? innerError.message : String(innerError)}`
    );
    // Ensure state is saved before calling callback with error
    await processUpdate(taskStore, {
      context: context,
      current: currentData,
      update: failedUpdate,
    });
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
  const { id: taskId } = requestParams;
  if (!taskId) throw INVALID_PARAMS("Missing task ID");
  const data = await taskStore.load(taskId);
  if (!data) {
    logError("taskGetLogic", "Task not found", { taskId });
    throw TASK_NOT_FOUND("Task Id: " + taskId);
  }
  return callback(null, data.task); // Success
};

export const defaultCancelTaskMethod: CancelTaskMethod = async (
  deps,
  requestParams,
  callback
) => {
  const { taskStore, activeCancellations, closeStreamsForTask } = deps;
  const { id: taskId } = requestParams;
  if (!taskId) throw INVALID_PARAMS("Missing task ID");
  const data = await taskStore.load(taskId);
  if (!data) throw TASK_NOT_FOUND("Task Id: " + taskId);
  if (FINAL_STATES.includes(data.task.status.state)) {
    throw TASK_NOT_CANCELABLE(
      "Task is in a final state: " + data.task.status.state
    );
  }

  activeCancellations.add(taskId);

  const canceledTask: Task = {
    ...data.task,
    status: {
      state: "canceled" as TaskState,
      timestamp: getCurrentTimestamp(),
      message: {
        kind: "message",
        messageId: data.task.status.message?.messageId || "canceled-task",
        role: "agent" as const,
        parts: [{ kind: "text" as const, text: "Task was canceled." }],
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
      "tasks/pushNotificationConfig/set",
      "Push notifications not fully implemented."
    );
    if (!card.capabilities?.pushNotifications) {
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }
    const config = requestParams;
    if (!config.taskId || !config.pushNotificationConfig?.url) {
      throw INVALID_PARAMS("Missing task ID or push notification URL");
    }
    const data = await taskStore.load(config.taskId);
    if (!data) {
      throw TASK_NOT_FOUND("Task Id: " + config.taskId);
    }
    const response: SetTaskPushNotificationConfigResponse = {
      id: config.taskId,
      jsonrpc: "2.0",
      result: config,
    };
    return callback(null, response);
  };

export const defaultGetTaskPushNotificationMethod: GetTaskPushNotificationMethod =
  async (deps, requestParams, callback) => {
    const { taskStore, card } = deps;
    logWarn(
      "tasks/pushNotificationConfig/get",
      "Push notifications not fully implemented."
    );
    if (!card.capabilities?.pushNotifications) {
      throw PUSH_NOTIFICATION_NOT_SUPPORTED("Push notifications not supported");
    }
    const { id: taskId } = requestParams;
    if (!taskId) {
      throw INVALID_PARAMS("Missing task ID");
    }
    const data = await taskStore.load(taskId);
    if (!data) {
      throw TASK_NOT_FOUND("Task Id: " + taskId);
    }
    return callback(null, null);
  };
