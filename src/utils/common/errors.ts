import { NextFunction, Request, Response } from "express";
import { JSONParseError } from "../../types/extended-schema.js";
import { logError } from "../../utils/logging/log.js";
import {
  A2AError,
  ErrorCodeInternalError,
  ErrorCodeInvalidRequest,
  ErrorCodeMethodNotFound,
  ErrorCodeParseError,
  ErrorCodeInvalidParams,
  ErrorCodeTaskNotFound,
  ErrorCodeTaskNotCancelable,
  ErrorCodeUnsupportedOperation,
  ErrorCodePushNotificationNotSupported,
  InvalidParamsError,
  InvalidRequestError,
  JSONRPCError,
  MethodNotFoundError,
  InternalError,
  TaskNotFoundError,
  TaskNotCancelableError,
  ErrorCodeContentTypeNotSupported,
  ContentTypeNotSupportedError,
  InvalidAgentResponseError,
  ErrorCodeInvalidAgentResponse,
  TaskState,
  TaskStatusUpdateEvent,
} from "../../types/schemas/a2a/index.js";

export class SystemError<
  T extends JSONRPCError<number, unknown>,
> extends Error {
  code: T["code"];
  data: T["data"];

  constructor(message: string, code: T["code"], data: T["data"]) {
    super(message);
    this.name = "RpcError";
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
// Factory methods for common errors
export const PARSE_ERROR = <T extends JSONParseError>(data: T["data"]) =>
  new SystemError<T>("Invalid JSON payload", ErrorCodeParseError, data);

export const INVALID_REQUEST = <T extends InvalidRequestError>(
  data: T["data"]
) =>
  new SystemError<T>(
    "Request payload validation error",
    ErrorCodeInvalidRequest,
    data
  );

export const METHOD_NOT_FOUND = <T extends MethodNotFoundError>(
  data: T["data"]
) => new SystemError<T>("Method not found", ErrorCodeMethodNotFound, data);

export const INVALID_PARAMS = <T extends InvalidParamsError>(data: T["data"]) =>
  new SystemError<T>("Invalid parameters", ErrorCodeInvalidParams, data);

export const INTERNAL_ERROR = <T extends InternalError>(data: T["data"]) =>
  new SystemError<T>("Internal error", ErrorCodeInternalError, data);

export const TASK_NOT_FOUND = <T extends TaskNotFoundError>(data: T["data"]) =>
  new SystemError<T>("Task not found", ErrorCodeTaskNotFound, data);

export const TASK_NOT_CANCELABLE = <T extends TaskNotCancelableError>(
  data: T["data"]
) =>
  new SystemError<T>(
    "Task cannot be canceled",
    ErrorCodeTaskNotCancelable,
    data
  );

export const PUSH_NOTIFICATION_NOT_SUPPORTED = <T extends A2AError>(
  data: T["data"]
) =>
  new SystemError<T>(
    "Push Notification is not supported",
    ErrorCodePushNotificationNotSupported,
    data
  );

export const UNSUPPORTED_OPERATION = <T extends A2AError>(data: T["data"]) =>
  new SystemError<T>(
    "This operation is not supported",
    ErrorCodeUnsupportedOperation,
    data
  );

export const CONTENT_TYPE_NOT_SUPPORTED = <
  T extends ContentTypeNotSupportedError,
>(
  data: T["data"]
) =>
  new SystemError<T>(
    "Content type not supported",
    ErrorCodeContentTypeNotSupported,
    data
  );

export const INVALID_AGENT_RESPONSE = <T extends InvalidAgentResponseError>(
  data: T["data"]
) =>
  new SystemError<T>(
    "Invalid agent response",
    ErrorCodeInvalidAgentResponse,
    data
  );

export const FAILED_UPDATE = (
  taskId: string,
  contextId: string,
  messageId: string = "failed-update",
  errMessage: string
): TaskStatusUpdateEvent => ({
  taskId,
  contextId,
  kind: "status-update",
  final: true,
  status: {
    state: TaskState.Failed,
    message: {
      messageId,
      role: "agent",
      parts: [{ kind: "text", text: errMessage }],
      kind: "message",
    },
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

  let jsonRpcError: JSONRPCError<number, unknown>;
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
