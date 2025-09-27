/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
import { JSONRPCErrorSchema } from "./rpc.js";
/**
 * @description Error code for JSON Parse Error (-32700). Invalid JSON was received by the server.
 */
export const ErrorCodeParseError = -32700;
export const JSONParseErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeParseError),
    message: z
        .string()
        .describe("The error message.")
        .default("Invalid JSON payload"),
}).describe("Represents a JSON-RPC error for a JSON parse error.");
/**
 * @description Error code for Invalid Request (-32600). The JSON sent is not a valid Request object.
 */
export const ErrorCodeInvalidRequest = -32600;
export const InvalidRequestErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeInvalidRequest),
    message: z
        .string()
        .describe("The error message.")
        .default("Request payload validation error"),
}).describe("Represents a JSON-RPC error for an invalid request.");
/**
 * @description Error code for Method Not Found (-32601). The method does not exist / is not available.
 */
export const ErrorCodeMethodNotFound = -32601;
export const MethodNotFoundErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeMethodNotFound),
    message: z
        .string()
        .describe("The error message.")
        .default("Method not found"),
}).describe("Represents a JSON-RPC error for a method not found.");
/**
 * @description Error code for Invalid Params (-32602). Invalid method parameter(s).
 */
export const ErrorCodeInvalidParams = -32602;
export const InvalidParamsErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeInvalidParams),
    message: z
        .string()
        .describe("The error message.")
        .default("Invalid parameters"),
}).describe("Represents a JSON-RPC error for invalid parameters.");
/**
 * @description Error code for Internal Error (-32603). Internal JSON-RPC error.
 */
export const ErrorCodeInternalError = -32603;
export const InternalErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeInternalError),
    message: z.string().describe("The error message.").default("Internal error"),
}).describe("Represents a JSON-RPC error for an internal error.");
/**
 * @description Error code for Task Not Found (-32001). The specified task was not found.
 */
export const ErrorCodeTaskNotFound = -32001;
export const TaskNotFoundErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeTaskNotFound),
    message: z.string().describe("The error message.").default("Task not found"),
}).describe("Represents a JSON-RPC error for a task not found.");
/**
 * @description Error code for Task Not Cancelable (-32002). The specified task cannot be canceled.
 */
export const ErrorCodeTaskNotCancelable = -32002;
export const TaskNotCancelableErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeTaskNotCancelable),
    message: z
        .string()
        .describe("The error message.")
        .default("Task cannot be canceled"),
}).describe("Represents a JSON-RPC error for a task not cancelable.");
/**
 * @description Error code for Push Notification Not Supported (-32003). Push Notifications are not supported for this operation or agent.
 */
export const ErrorCodePushNotificationNotSupported = -32003;
export const PushNotificationNotSupportedErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodePushNotificationNotSupported),
    message: z
        .string()
        .describe("The error message.")
        .default("Push Notifications is not supported"),
}).describe("Represents a JSON-RPC error for push notifications not supported.");
/**
 * @description Error code for Unsupported Operation (-32004). The requested operation is not supported by the agent.
 */
export const ErrorCodeUnsupportedOperation = -32004;
export const UnsupportedOperationErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeUnsupportedOperation),
    message: z
        .string()
        .describe("The error message.")
        .default("This operation is not supported"),
}).describe("Represents a JSON-RPC error for an unsupported operation.");
/**
 * @description Error code for Content Type Not Supported (-32005). The requested content type is not supported by the agent.
 */
export const ErrorCodeContentTypeNotSupported = -32005;
export const ContentTypeNotSupportedErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeContentTypeNotSupported),
    message: z
        .string()
        .describe("The error message.")
        .default("Incompatible content types"),
}).describe("Represents a JSON-RPC error for a content type not supported.");
/**
 * @description Error code for Invalid Agent Response (-32006). The agent returned an invalid response for the current method.
 */
export const ErrorCodeInvalidAgentResponse = -32006;
export const InvalidAgentResponseErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeInvalidAgentResponse),
    message: z
        .string()
        .describe("The error message.")
        .default("Invalid agent response"),
}).describe("Represents a JSON-RPC error for an invalid agent response. This error is returned when the agent returns an invalid response for the current method.");
/**
 * An A2A-specific error indicating that the agent does not have an Authenticated Extended Card configured
 */
export const ErrorCodeAuthenticatedExtendedCardNotConfigured = -32007;
export const AuthenticatedExtendedCardNotConfiguredErrorSchema = JSONRPCErrorSchema.extend({
    code: z.literal(ErrorCodeAuthenticatedExtendedCardNotConfigured),
    message: z
        .string()
        .describe("The error message.")
        .default("Authenticated Extended Card is not configured."),
}).describe("Represents a JSON-RPC error for an authenticated extended card not configured.");
/**
 * Union of all well-known A2A and standard JSON-RPC error codes defined in this schema.
 */
export const KnownErrorCodeSchema = z.union([
    z.literal(ErrorCodeParseError),
    z.literal(ErrorCodeInvalidRequest),
    z.literal(ErrorCodeMethodNotFound),
    z.literal(ErrorCodeInvalidParams),
    z.literal(ErrorCodeInternalError),
    z.literal(ErrorCodeTaskNotFound),
    z.literal(ErrorCodeTaskNotCancelable),
    z.literal(ErrorCodePushNotificationNotSupported),
    z.literal(ErrorCodeUnsupportedOperation),
    z.literal(ErrorCodeContentTypeNotSupported),
    z.literal(ErrorCodeInvalidAgentResponse),
    z.literal(ErrorCodeAuthenticatedExtendedCardNotConfigured),
]);
export const A2AErrorSchema = z.union([
    JSONParseErrorSchema,
    InvalidRequestErrorSchema,
    MethodNotFoundErrorSchema,
    InvalidParamsErrorSchema,
    InternalErrorSchema,
    TaskNotFoundErrorSchema,
    TaskNotCancelableErrorSchema,
    PushNotificationNotSupportedErrorSchema,
    UnsupportedOperationErrorSchema,
    ContentTypeNotSupportedErrorSchema,
    InvalidAgentResponseErrorSchema,
    AuthenticatedExtendedCardNotConfiguredErrorSchema,
]);
//# sourceMappingURL=error.js.map