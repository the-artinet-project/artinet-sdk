/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, MCP } from "~/types/index.js";

export class SystemError<T extends MCP.JSONRPCError> extends Error {
  message: string;
  code: T["error"]["code"];
  data: T["error"]["data"];

  constructor(
    message: string,
    code: T["error"]["code"],
    data: T["error"]["data"]
  ) {
    super(message);
    // this.name = "RpcError";
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
// Factory methods for common errors
export const PARSE_ERROR = <T extends A2A.JSONParseError>(
  data: T["error"]["data"]
) => new SystemError<T>("Invalid JSON payload", A2A.ErrorCodeParseError, data);

export const INVALID_REQUEST = <T extends A2A.InvalidRequestError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Request payload validation error",
    A2A.ErrorCodeInvalidRequest,
    data
  );

export const METHOD_NOT_FOUND = <T extends A2A.MethodNotFoundError>(
  data: T["error"]["data"]
) => new SystemError<T>("Method not found", A2A.ErrorCodeMethodNotFound, data);

export const INVALID_PARAMS = <T extends A2A.InvalidParamsError>(
  data: T["error"]["data"]
) => new SystemError<T>("Invalid parameters", A2A.ErrorCodeInvalidParams, data);

export const INTERNAL_ERROR = <T extends A2A.InternalError>(
  data: T["error"]["data"]
) => new SystemError<T>("Internal error", A2A.ErrorCodeInternalError, data);

export const TASK_NOT_FOUND = <T extends A2A.TaskNotFoundError>(
  data: T["error"]["data"]
) => new SystemError<T>("Task not found", A2A.ErrorCodeTaskNotFound, data);

export const TASK_NOT_CANCELABLE = <T extends A2A.TaskNotCancelableError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Task cannot be canceled",
    A2A.ErrorCodeTaskNotCancelable,
    data
  );

export const PUSH_NOTIFICATION_NOT_SUPPORTED = <T extends A2A.A2AError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Push Notifications is not supported",
    A2A.ErrorCodePushNotificationNotSupported,
    data
  );

export const AUTHENTICATED_EXTENDED_CARD_NOT_CONFIGURED = <
  T extends A2A.AuthenticatedExtendedCardNotConfiguredError
>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Authenticated Extended Card is not configured",
    A2A.ErrorCodeAuthenticatedExtendedCardNotConfigured,
    data
  );

export const UNSUPPORTED_OPERATION = <T extends A2A.A2AError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "This operation is not supported",
    A2A.ErrorCodeUnsupportedOperation,
    data
  );

export const CONTENT_TYPE_NOT_SUPPORTED = <
  T extends A2A.ContentTypeNotSupportedError
>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Content type not supported",
    A2A.ErrorCodeContentTypeNotSupported,
    data
  );

export const INVALID_AGENT_RESPONSE = <T extends A2A.InvalidAgentResponseError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Invalid agent response",
    A2A.ErrorCodeInvalidAgentResponse,
    data
  );

export const FAILED_UPDATE = (
  taskId: string,
  contextId: string,
  messageId: string = "failed-update",
  errMessage: string
): A2A.TaskStatusUpdateEvent => ({
  taskId,
  contextId,
  kind: "status-update",
  final: true,
  status: {
    state: A2A.TaskState.failed,
    message: {
      messageId,
      role: "agent",
      parts: [{ kind: "text", text: errMessage }],
      kind: "message",
    },
  },
});
