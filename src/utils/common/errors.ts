/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, MCP } from "~/types/index.js";
import { describe } from "~/create/index.js";

/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export class SystemError<T extends MCP.JSONRPCErrorResponse> extends Error {
  message: string;
  code: T["error"]["code"];
  data: T["error"]["data"];

  constructor(
    message: string,
    code: T["error"]["code"],
    data: T["error"]["data"]
  ) {
    super(message, { cause: data });
    // this.name = "RpcError";
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const PARSE_ERROR = <T extends A2A.JSONParseError>(
  data: T["error"]["data"]
) => new SystemError<T>("Invalid JSON payload", A2A.ErrorCodeParseError, data);
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const INVALID_REQUEST = <T extends A2A.InvalidRequestError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Request payload validation error",
    A2A.ErrorCodeInvalidRequest,
    data
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const METHOD_NOT_FOUND = <T extends A2A.MethodNotFoundError>(
  data: T["error"]["data"]
) => new SystemError<T>("Method not found", A2A.ErrorCodeMethodNotFound, data);
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const INVALID_PARAMS = <T extends A2A.InvalidParamsError>(
  data: T["error"]["data"]
) => new SystemError<T>("Invalid parameters", A2A.ErrorCodeInvalidParams, data);
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const INTERNAL_ERROR = <T extends A2A.InternalError>(
  data: T["error"]["data"]
) => new SystemError<T>("Internal error", A2A.ErrorCodeInternalError, data);
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const TASK_NOT_FOUND = <T extends A2A.TaskNotFoundError>(
  data: T["error"]["data"]
) => new SystemError<T>("Task not found", A2A.ErrorCodeTaskNotFound, data);
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const TASK_NOT_CANCELABLE = <T extends A2A.TaskNotCancelableError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Task cannot be canceled",
    A2A.ErrorCodeTaskNotCancelable,
    data
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const PUSH_NOTIFICATION_NOT_SUPPORTED = <T extends A2A.A2AError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Push Notifications is not supported",
    A2A.ErrorCodePushNotificationNotSupported,
    data
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
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
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const UNSUPPORTED_OPERATION = <T extends A2A.A2AError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "This operation is not supported",
    A2A.ErrorCodeUnsupportedOperation,
    data
  );
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
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
/**
 * @deprecated Use errors from the `@a2a-js/sdk` package instead
 * @since 0.6.0
 */
export const INVALID_AGENT_RESPONSE = <T extends A2A.InvalidAgentResponseError>(
  data: T["error"]["data"]
) =>
  new SystemError<T>(
    "Invalid agent response",
    A2A.ErrorCodeInvalidAgentResponse,
    data
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
