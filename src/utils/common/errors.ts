import { NextFunction, Request, Response } from "express";
import {
  A2AErrorType,
  JSONRPCError,
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

export class SystemError<E = unknown | null, C extends number = number>
  extends Error
  implements JSONRPCError<E, C>, A2AErrorType
{
  code: C;
  data?: E;

  constructor(message: string, code: C, data?: E) {
    super(message);
    this.name = "RpcError";
    this.code = code;
    this.data = data;
  }
}
// Factory methods for common errors
export const PARSE_ERROR = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeParseError>(
    "Invalid JSON payload",
    ErrorCodeParseError,
    data
  );

export const METHOD_NOT_FOUND = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeMethodNotFound>(
    "Method not found",
    ErrorCodeMethodNotFound,
    data
  );

export const INVALID_REQUEST = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeInvalidRequest>(
    "Request payload validation error",
    ErrorCodeInvalidRequest,
    data
  );

export const INVALID_PARAMS = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeInvalidParams>(
    "Invalid parameters",
    ErrorCodeInvalidParams,
    data
  );

export const INTERNAL_ERROR = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeInternalError>(
    "Internal error",
    ErrorCodeInternalError,
    data
  );

export const TASK_NOT_FOUND = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeTaskNotFound>(
    "Task not found",
    ErrorCodeTaskNotFound,
    data
  );

export const TASK_NOT_CANCELABLE = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeTaskNotCancelable>(
    "Task cannot be canceled",
    ErrorCodeTaskNotCancelable,
    data
  );

export const UNSUPPORTED_OPERATION = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodeUnsupportedOperation>(
    "This operation is not supported",
    ErrorCodeUnsupportedOperation,
    data
  );

export const PUSH_NOTIFICATION_NOT_SUPPORTED = <E = unknown | null>(data?: E) =>
  new SystemError<E, ErrorCodePushNotificationNotSupported>(
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
    jsonRpcError = err;
  } else {
    jsonRpcError = INTERNAL_ERROR(err.stack);
  }

  const errorResponse = {
    jsonrpc: "2.0",
    id: reqId,
    error: jsonRpcError,
  };

  res.status(200).json(errorResponse);
}
