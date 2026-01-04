/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, MCP } from "~/types/index.js";
import * as describe from "~/create/describe.js";
/**
 * @since 0.6.0
 */
export class SystemError<T extends MCP.JSONRPCErrorResponse> extends Error {
  code: T["error"]["code"];
  data?: T["error"]["data"];
  taskId?: string;
  message: string;

  constructor(
    message: string,
    code: T["error"]["code"],
    data?: T["error"]["data"],
    taskId?: string
  ) {
    super(message);
    // this.name = "RpcError";
    this.code = code;
    this.data = data;
    this.taskId = taskId;
    this.message = message;
  }
}

/**
 * @since 0.6.0
 */
export const PARSE_ERROR = <T extends A2A.JSONParseError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Invalid JSON payload",
    A2A.ErrorCodeParseError,
    data,
    taskId
  );
/**
 * @since 0.6.0
 */
export const INVALID_REQUEST = <T extends A2A.InvalidRequestError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Request payload validation error",
    A2A.ErrorCodeInvalidRequest,
    data,
    taskId
  );
/**
 * @since 0.6.0
 */
export const METHOD_NOT_FOUND = <T extends A2A.MethodNotFoundError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Method not found",
    A2A.ErrorCodeMethodNotFound,
    data,
    taskId
  );
export const INVALID_PARAMS = <T extends A2A.InvalidParamsError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Invalid parameters",
    A2A.ErrorCodeInvalidParams,
    data,
    taskId
  );
export const INTERNAL_ERROR = <T extends A2A.InternalError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Internal error",
    A2A.ErrorCodeInternalError,
    data,
    taskId
  );
export const TASK_NOT_FOUND = <T extends A2A.TaskNotFoundError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>("Task not found", A2A.ErrorCodeTaskNotFound, data, taskId);
export const TASK_NOT_CANCELABLE = <T extends A2A.TaskNotCancelableError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Task cannot be canceled",
    A2A.ErrorCodeTaskNotCancelable,
    data,
    taskId
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const PUSH_NOTIFICATION_NOT_SUPPORTED = <
  T extends A2A.PushNotificationNotSupportedError
>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Push Notifications is not supported",
    A2A.ErrorCodePushNotificationNotSupported,
    data,
    taskId
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const AUTHENTICATED_EXTENDED_CARD_NOT_CONFIGURED = <
  T extends A2A.AuthenticatedExtendedCardNotConfiguredError
>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Authenticated Extended Card is not configured",
    A2A.ErrorCodeAuthenticatedExtendedCardNotConfigured,
    data,
    taskId
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const UNSUPPORTED_OPERATION = <T extends A2A.A2AError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "This operation is not supported",
    A2A.ErrorCodeUnsupportedOperation,
    data,
    taskId
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const CONTENT_TYPE_NOT_SUPPORTED = <
  T extends A2A.ContentTypeNotSupportedError
>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Content type not supported",
    A2A.ErrorCodeContentTypeNotSupported,
    data,
    taskId
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const INVALID_AGENT_RESPONSE = <T extends A2A.InvalidAgentResponseError>(
  data: T["error"]["data"],
  taskId?: string
) =>
  new SystemError<T>(
    "Invalid agent response",
    A2A.ErrorCodeInvalidAgentResponse,
    data,
    taskId
  );
/**
 * @deprecated Use {@link describe.update.failed} instead
 * @since 0.6.0
 */
export const FAILED_UPDATE = (
  taskId: string,
  contextId: string,
  messageId: string = "failed-update",
  errMessage: string
): A2A.TaskStatusUpdateEvent => {
  return describe.update.failed({
    taskId,
    contextId,
    final: true,
    message: describe.message({
      messageId,
      parts: [{ kind: "text", text: errMessage }],
    }),
  });
};
