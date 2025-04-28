import { NextFunction, Request, Response } from "express";
import {
  A2AErrorType,
  ErrorCodeInvalidParams,
  ErrorCodeInvalidRequest,
  ErrorCodeParseError,
  ErrorCodeInternalError,
  ErrorCodeMethodNotFound,
  ErrorCodeTaskNotFound,
  ErrorCodeUnsupportedOperation,
  ErrorCodeTaskNotCancelable,
  ErrorCodePushNotificationNotSupported,
  TaskYieldUpdate,
} from "../../types/extended-schema.js";
import { logError } from "../../utils/logging/log.js";
import { JSONRPCError } from "../../types/schema.js";

export class SystemError<ErrorData = unknown | null, C extends number = number>
  extends Error
  implements A2AErrorType
{
  code: C;
  data?: ErrorData;

  constructor(message: string, code: C, data?: ErrorData) {
    super(message);
    this.name = "RpcError";
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
// Factory methods for common errors
export const PARSE_ERROR = <ErrorData = unknown | null>(data?: ErrorData) =>
  new SystemError<ErrorData, ErrorCodeParseError>(
    "Invalid JSON payload",
    ErrorCodeParseError,
    data
  );

export const METHOD_NOT_FOUND = <ErrorData = unknown | null>(
  data?: ErrorData
) =>
  new SystemError<ErrorData, ErrorCodeMethodNotFound>(
    "Method not found",
    ErrorCodeMethodNotFound,
    data
  );

export const INVALID_REQUEST = <ErrorData = unknown | null>(data?: ErrorData) =>
  new SystemError<ErrorData, ErrorCodeInvalidRequest>(
    "Request payload validation error",
    ErrorCodeInvalidRequest,
    data
  );

export const INVALID_PARAMS = <ErrorData = unknown | null>(data?: ErrorData) =>
  new SystemError<ErrorData, ErrorCodeInvalidParams>(
    "Invalid parameters",
    ErrorCodeInvalidParams,
    data
  );

export const INTERNAL_ERROR = <ErrorData = unknown | null>(data?: ErrorData) =>
  new SystemError<ErrorData, ErrorCodeInternalError>(
    "Internal error",
    ErrorCodeInternalError,
    data
  );

export const TASK_NOT_FOUND = <ErrorData = unknown | null>(data?: ErrorData) =>
  new SystemError<ErrorData, ErrorCodeTaskNotFound>(
    "Task not found",
    ErrorCodeTaskNotFound,
    data
  );

export const TASK_NOT_CANCELABLE = <ErrorData = unknown | null>(
  data?: ErrorData
) =>
  new SystemError<ErrorData, ErrorCodeTaskNotCancelable>(
    "Task cannot be canceled",
    ErrorCodeTaskNotCancelable,
    data
  );

export const UNSUPPORTED_OPERATION = <ErrorData = unknown | null>(
  data?: ErrorData
) =>
  new SystemError<ErrorData, ErrorCodeUnsupportedOperation>(
    "This operation is not supported",
    ErrorCodeUnsupportedOperation,
    data
  );

export const PUSH_NOTIFICATION_NOT_SUPPORTED = <ErrorData = unknown | null>(
  data?: ErrorData
) =>
  new SystemError<ErrorData, ErrorCodePushNotificationNotSupported>(
    "Push Notification is not supported",
    ErrorCodePushNotificationNotSupported,
    data
  );

export const FAILED_UPDATE = (message: string): TaskYieldUpdate => ({
  state: "failed",
  message: {
    role: "agent" as const,
    parts: [{ type: "text" as const, text: message }],
  },
});

/**
 * Express error handler middleware.
 */
export type ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

/**
 * Express error handler middleware.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    return next(err);
  }
  logError("errorHandler", JSON.stringify(err), err);
  let reqId = null;
  try {
    if (req.body && typeof req.body === "object" && "id" in req.body) {
      reqId = req.body.id;
    }
  } catch (e) {
    logError("A2AServer", "Error extracting request ID", e);
  }

  let jsonRpcError: JSONRPCError<unknown | null, number>;
  if (err instanceof SystemError) {
    jsonRpcError = { code: err.code, message: err.message, data: err.data };
  } else {
    const internalError = INTERNAL_ERROR(err.stack);
    jsonRpcError = {
      code: internalError.code,
      message: internalError.message,
      data: internalError.data,
    };
  }

  const errorResponse = {
    jsonrpc: "2.0",
    id: reqId,
    error: jsonRpcError,
  };

  res.status(200).json(errorResponse);
}
