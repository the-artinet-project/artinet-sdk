import jayson from "jayson";
import { TaskState, TaskYieldUpdate } from "../../types/extended-schema.js";
import { getCurrentTimestamp } from "../../utils/common/utils.js";
import { logError, logWarn } from "../../utils/logging/log.js";
import { loadState, updateState } from "../lib/state.js";
import {
  INTERNAL_ERROR,
  INVALID_PARAMS,
  METHOD_NOT_FOUND,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  TASK_NOT_CANCELABLE,
  TASK_NOT_FOUND,
  FAILED_UPDATE,
  SystemError,
} from "../../utils/common/errors.js";
import {
  CreateJSONRPCServerParams,
  JSONRPCCallback,
  JSONRPCServerType,
  JSONRPCServer,
} from "../interfaces/params.js";

type JSONRPCError = jayson.JSONRPCError;
function toJaysonError(error: SystemError): JSONRPCError {
  return {
    code: error.code,
    message: error.message,
    data: error.data as any,
  };
}

/**
 * Default implementation of createJSONRPCServer
 * This implementation is used by the Artinet API server
 * It provides a basic JSON-RPC server with methods for task creation, retrieval, and cancellation
 * Creates and initializes a Jayson server with A2A methods
 * @param params Object containing all required parameters for server initialization
 * @returns A configured Jayson server instance
 */

/**
 * Default implementation of createJSONRPCServer
 * This implementation is used by the Artinet API server
 * It provides a basic JSON-RPC server with methods for task creation, retrieval, and cancellation
 * Creates and initializes a Jayson server with A2A methods
 * @param params Object containing all required parameters for server initialization
 * @returns A configured Jayson server instance
 */
export function defaultCreateJSONRPCServer(
  params: CreateJSONRPCServerParams
): JSONRPCServerType {
  const {
    taskStore,
    card,
    taskHandler,
    activeCancellations,
    createTaskContext,
    closeStreamsForTask,
  } = params;
  return new JSONRPCServer(
    {
      "tasks/send": async (params: any, callback: JSONRPCCallback) => {
        try {
          // Validate params
          if (!params || !params.id || !params.message) {
            return callback(toJaysonError(INVALID_PARAMS()));
          }

          const { id: taskId, message, sessionId, metadata } = params;

          // Load or create task
          let currentData = await loadState(
            taskStore,
            taskId,
            message,
            sessionId,
            metadata
          );

          // Create task context
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
            return callback(null, currentData.task);
          } catch (error) {
            const failedUpdate: TaskYieldUpdate = FAILED_UPDATE(
              `Task processing failed: ${error instanceof Error ? error.message : String(error)}`
            );

            currentData = await updateState(
              taskStore,
              currentData,
              failedUpdate
            );
            return callback(toJaysonError(INTERNAL_ERROR(error)));
          }
        } catch (error) {
          logError("tasks/send", "Error in tasks/send", error);
          return callback(toJaysonError(INTERNAL_ERROR(error)));
        }
      },

      "tasks/get": async (params: any, callback: JSONRPCCallback) => {
        try {
          const { id: taskId } = params;
          if (!taskId) {
            return callback(toJaysonError(INVALID_PARAMS()));
          }

          // Load the task
          const data = await taskStore.load(taskId);
          if (!data) {
            return callback(toJaysonError(TASK_NOT_FOUND()));
          }
          return callback(null, data.task);
        } catch (error) {
          logError("tasks/get", "Error in tasks/get", error);
          return callback(toJaysonError(INTERNAL_ERROR(error)));
        }
      },

      "tasks/cancel": async (params: any, callback: JSONRPCCallback) => {
        try {
          const { id: taskId } = params;
          if (!taskId) {
            return callback(toJaysonError(INVALID_PARAMS()));
          }

          // Load the task
          const data = await taskStore.load(taskId);
          if (!data) {
            return callback(toJaysonError(TASK_NOT_FOUND()));
          }

          // Check if task is already in a final state
          const finalStates: TaskState[] = ["completed", "failed", "canceled"];
          if (finalStates.includes(data.task.status.state)) {
            return callback(toJaysonError(TASK_NOT_CANCELABLE()));
          }

          // Mark as cancelled
          activeCancellations.add(taskId);

          // Create updated task with canceled status
          const canceledTask = {
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

          const updatedData = {
            task: canceledTask,
            history: data.history,
          };
          await taskStore.save(updatedData);
          closeStreamsForTask(taskId);
          return callback(null, canceledTask);
        } catch (error) {
          logError("tasks/cancel", "Error in tasks/cancel", error);
          callback(toJaysonError(INTERNAL_ERROR(error)));
        }
      },

      "tasks/pushNotification/set": async (
        params: any,
        callback: JSONRPCCallback
      ) => {
        try {
          logWarn(
            "tasks/pushNotification/set",
            "Push notifications are not fully implemented."
          );
          if (!card.capabilities?.pushNotifications) {
            return callback(toJaysonError(METHOD_NOT_FOUND()));
          }

          const config = params;

          // Basic validation
          if (!config.id) {
            return callback(toJaysonError(INVALID_PARAMS()));
          }

          if (!config.pushNotificationConfig?.url) {
            return callback(toJaysonError(INVALID_PARAMS()));
          }

          // Verify the task exists
          const data = await taskStore.load(config.id);
          if (!data) {
            return callback(toJaysonError(TASK_NOT_FOUND()));
          }
          // In a real implementation, we'd store this config
          // For now, we'll just return it
          return callback(null, config);
        } catch (error) {
          logError(
            "tasks/pushNotification/set",
            "Error in tasks/pushNotification/set",
            error
          );
          return callback(toJaysonError(INTERNAL_ERROR(error)));
        }
      },

      "tasks/pushNotification/get": async (
        params: any,
        callback: JSONRPCCallback
      ) => {
        try {
          logWarn(
            "tasks/pushNotification/get",
            "Push notifications are not fully implemented."
          );
          if (!card.capabilities?.pushNotifications) {
            return callback(toJaysonError(PUSH_NOTIFICATION_NOT_SUPPORTED()));
          }

          const { id: taskId } = params;
          if (!taskId) {
            return callback(toJaysonError(INVALID_PARAMS()));
          }

          // Verify the task exists
          const data = await taskStore.load(taskId);
          if (!data) {
            return callback(toJaysonError(TASK_NOT_FOUND()));
          }
          // In a real implementation, we'd retrieve a stored config
          // For now, return null (no push notification config)
          return callback(null, null);
        } catch (error) {
          logError(
            "tasks/pushNotification/get",
            "Error in tasks/pushNotification/get",
            error
          );
          return callback(toJaysonError(INTERNAL_ERROR(error)));
        }
      },
    },
    {
      //server options
      reviver: undefined,
      replacer: undefined,
    }
  );
}
