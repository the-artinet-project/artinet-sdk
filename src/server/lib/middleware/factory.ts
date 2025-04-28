import { logError } from "../../../utils/logging/log.js";
import {
  INTERNAL_ERROR,
  INVALID_PARAMS,
  SystemError,
} from "../../../utils/common/errors.js";
import {
  CreateJSONRPCServerParams,
  JSONRPCServer,
  JSONRPCMethodHandler,
  A2AMethodHandler,
  CreateJSONRPCServer,
} from "../../interfaces/params.js";

import {
  defaultSendTaskMethod,
  defaultGetTaskMethod,
  defaultCancelTaskMethod,
  defaultSetTaskPushNotificationMethod,
  defaultGetTaskPushNotificationMethod,
} from "./a2a-methods.js";
import { A2AResponse, RequestParams } from "../../../types/index.js";

/**
 * Creates a JSON-RPC method handler from a function
 * @param deps Dependencies for the method
 * @param funct The function to be used as the method handler
 * @param methodName The name of the method
 * @returns A JSON-RPC method handler
 */
export function createJSONRPCMethod<
  Params extends RequestParams,
  Result extends A2AResponse | null,
>(
  deps: CreateJSONRPCServerParams,
  funct: A2AMethodHandler<Params, Result>,
  methodName: string // Pass method name for logging
): JSONRPCMethodHandler<Params, Result> {
  return async (requestParams, callback) => {
    try {
      if (!requestParams) {
        throw INVALID_PARAMS("Missing request parameters");
      }
      // Execute the specific logic
      await funct(deps, requestParams, callback);
    } catch (error) {
      // Centralized error handling ONLY for exceptions thrown by logic
      logError("createJSONRPCMethod", `Exception executing method`, error);
      if (error instanceof SystemError) {
        return callback({
          message: error.message,
          code: error.code,
          data: error.data,
        });
      } else {
        logError(methodName, `Failed to process Inner Error`, error);
        const internalError = INTERNAL_ERROR(error);
        return callback({
          message: internalError.message,
          code: internalError.code,
          data: internalError.data,
        });
      }
    }
  };
}

export const defaultCreateJSONRPCServer: CreateJSONRPCServer = (params) => {
  // Create handlers using the generic factory and specific logic
  const taskSendMethod = createJSONRPCMethod(
    params,
    defaultSendTaskMethod,
    "tasks/send"
  );
  const taskGetMethod = createJSONRPCMethod(
    params,
    defaultGetTaskMethod,
    "tasks/get"
  );
  const taskCancelMethod = createJSONRPCMethod(
    params,
    defaultCancelTaskMethod,
    "tasks/cancel"
  );
  const taskPushNotificationSetMethod = createJSONRPCMethod(
    params,
    defaultSetTaskPushNotificationMethod,
    "tasks/pushNotification/set"
  );
  const taskPushNotificationGetMethod = createJSONRPCMethod(
    params,
    defaultGetTaskPushNotificationMethod,
    "tasks/pushNotification/get"
  );

  return new JSONRPCServer(
    {
      "tasks/send": taskSendMethod,
      "tasks/get": taskGetMethod,
      "tasks/cancel": taskCancelMethod,
      "tasks/pushNotification/set": taskPushNotificationSetMethod,
      "tasks/pushNotification/get": taskPushNotificationGetMethod,
    },
    { reviver: undefined, replacer: undefined }
  );
};
