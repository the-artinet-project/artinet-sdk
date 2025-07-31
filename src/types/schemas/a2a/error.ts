import { JSONRPCError } from "./rpc.js";

/**
 * @description Error code for JSON Parse Error (-32700). Invalid JSON was received by the server.
 */
export const ErrorCodeParseError = -32700;
export type ErrorCodeParseError = typeof ErrorCodeParseError;

export type JSONParseError<Data = unknown> = JSONRPCError<
  ErrorCodeParseError,
  Data
>;

/**
 * @description Error code for Invalid Request (-32600). The JSON sent is not a valid Request object.
 */
export const ErrorCodeInvalidRequest = -32600;
export type ErrorCodeInvalidRequest = typeof ErrorCodeInvalidRequest;

export type InvalidRequestError<Data = unknown> = JSONRPCError<
  ErrorCodeInvalidRequest,
  Data
>;

/**
 * @description Error code for Method Not Found (-32601). The method does not exist / is not available.
 */
export const ErrorCodeMethodNotFound = -32601;
export type ErrorCodeMethodNotFound = typeof ErrorCodeMethodNotFound;

export type MethodNotFoundError<Data = unknown> = JSONRPCError<
  ErrorCodeMethodNotFound,
  Data
>;

/**
 * @description Error code for Invalid Params (-32602). Invalid method parameter(s).
 */
export const ErrorCodeInvalidParams = -32602;
export type ErrorCodeInvalidParams = typeof ErrorCodeInvalidParams;

export type InvalidParamsError<Data = unknown> = JSONRPCError<
  ErrorCodeInvalidParams,
  Data
>;

/**
 * @description Error code for Internal Error (-32603). Internal JSON-RPC error.
 */
export const ErrorCodeInternalError = -32603;
export type ErrorCodeInternalError = typeof ErrorCodeInternalError;

export type InternalError<Data = unknown> = JSONRPCError<
  ErrorCodeInternalError,
  Data
>;

/**
 * @description Error code for Task Not Found (-32001). The specified task was not found.
 */
export const ErrorCodeTaskNotFound = -32001;
export type ErrorCodeTaskNotFound = typeof ErrorCodeTaskNotFound;

export type TaskNotFoundError<Data = unknown> = JSONRPCError<
  ErrorCodeTaskNotFound,
  Data
>;

/**
 * @description Error code for Task Not Cancelable (-32002). The specified task cannot be canceled.
 */
export const ErrorCodeTaskNotCancelable = -32002;
export type ErrorCodeTaskNotCancelable = typeof ErrorCodeTaskNotCancelable;

export type TaskNotCancelableError<Data = unknown> = JSONRPCError<
  ErrorCodeTaskNotCancelable,
  Data
>;

/**
 * @description Error code for Push Notification Not Supported (-32003). Push Notifications are not supported for this operation or agent.
 */
export const ErrorCodePushNotificationNotSupported = -32003;
export type ErrorCodePushNotificationNotSupported =
  typeof ErrorCodePushNotificationNotSupported;

export type PushNotificationNotSupportedError<Data = unknown> = JSONRPCError<
  ErrorCodePushNotificationNotSupported,
  Data
>;

/**
 * @description Error code for Unsupported Operation (-32004). The requested operation is not supported by the agent.
 */
export const ErrorCodeUnsupportedOperation = -32004;
export type ErrorCodeUnsupportedOperation =
  typeof ErrorCodeUnsupportedOperation;

export type UnsupportedOperationError<Data = unknown> = JSONRPCError<
  ErrorCodeUnsupportedOperation,
  Data
>;

/**
 * @description Error code for Content Type Not Supported (-32005). The requested content type is not supported by the agent.
 */
export const ErrorCodeContentTypeNotSupported = -32005;
export type ErrorCodeContentTypeNotSupported =
  typeof ErrorCodeContentTypeNotSupported;

export type ContentTypeNotSupportedError<Data = unknown> = JSONRPCError<
  ErrorCodeContentTypeNotSupported,
  Data
>;

/**
 * @description Error code for Invalid Agent Response (-32006). The agent returned an invalid response for the current method.
 */
export const ErrorCodeInvalidAgentResponse = -32006;
export type ErrorCodeInvalidAgentResponse =
  typeof ErrorCodeInvalidAgentResponse;

export type InvalidAgentResponseError<Data = unknown> = JSONRPCError<
  ErrorCodeInvalidAgentResponse,
  Data
>;

export const ErrorCodeAuthenticatedExtendedCardNotConfigured = -32007;
export type ErrorCodeAuthenticatedExtendedCardNotConfigured =
  typeof ErrorCodeAuthenticatedExtendedCardNotConfigured;

export type AuthenticatedExtendedCardNotConfiguredError<Data = unknown> =
  JSONRPCError<ErrorCodeAuthenticatedExtendedCardNotConfigured, Data>;

/**
 * Union of all well-known A2A and standard JSON-RPC error codes defined in this schema.
 * Use this type for checking against specific error codes. A server might theoretically
 * use other codes within the valid JSON-RPC ranges.
 */
export type KnownErrorCode =
  | typeof ErrorCodeParseError
  | typeof ErrorCodeInvalidRequest
  | typeof ErrorCodeMethodNotFound
  | typeof ErrorCodeInvalidParams
  | typeof ErrorCodeInternalError
  | typeof ErrorCodeTaskNotFound
  | typeof ErrorCodeTaskNotCancelable
  | typeof ErrorCodePushNotificationNotSupported
  | typeof ErrorCodeUnsupportedOperation
  | typeof ErrorCodeContentTypeNotSupported
  | typeof ErrorCodeInvalidAgentResponse
  | typeof ErrorCodeAuthenticatedExtendedCardNotConfigured;

export type A2AError<Data = unknown> =
  | JSONParseError<Data>
  | InvalidRequestError<Data>
  | MethodNotFoundError<Data>
  | InvalidParamsError<Data>
  | InternalError<Data>
  | TaskNotFoundError<Data>
  | TaskNotCancelableError<Data>
  | PushNotificationNotSupportedError<Data>
  | UnsupportedOperationError<Data>
  | ContentTypeNotSupportedError<Data>
  | InvalidAgentResponseError<Data>
  | AuthenticatedExtendedCardNotConfiguredError<Data>;
