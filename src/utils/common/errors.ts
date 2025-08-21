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
  JSONParseError,
} from "~/types/index.js";

export class SystemError<T extends JSONRPCError> extends Error {
  message: string;
  code: T["code"];
  data: T["data"];

  constructor(message: string, code: T["code"], data: T["data"]) {
    super(message);
    // this.name = "RpcError";
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
    "Push Notifications is not supported",
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
    state: TaskState.failed,
    message: {
      messageId,
      role: "agent",
      parts: [{ kind: "text", text: errMessage }],
      kind: "message",
    },
  },
});
//todo: move to server function
