/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Error code for JSON Parse Error (-32700). Invalid JSON was received by the server.
 */
export declare const ErrorCodeParseError = -32700;
export declare const JSONParseErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32700>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32700;
    message: string;
    data?: unknown;
}, {
    code: -32700;
    data?: unknown;
    message?: string | undefined;
}>;
export type JSONParseError = z.infer<typeof JSONParseErrorSchema>;
/**
 * @description Error code for Invalid Request (-32600). The JSON sent is not a valid Request object.
 */
export declare const ErrorCodeInvalidRequest = -32600;
export declare const InvalidRequestErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32600>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32600;
    message: string;
    data?: unknown;
}, {
    code: -32600;
    data?: unknown;
    message?: string | undefined;
}>;
export type InvalidRequestError = z.infer<typeof InvalidRequestErrorSchema>;
/**
 * @description Error code for Method Not Found (-32601). The method does not exist / is not available.
 */
export declare const ErrorCodeMethodNotFound = -32601;
export declare const MethodNotFoundErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32601>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32601;
    message: string;
    data?: unknown;
}, {
    code: -32601;
    data?: unknown;
    message?: string | undefined;
}>;
export type MethodNotFoundError = z.infer<typeof MethodNotFoundErrorSchema>;
/**
 * @description Error code for Invalid Params (-32602). Invalid method parameter(s).
 */
export declare const ErrorCodeInvalidParams = -32602;
export declare const InvalidParamsErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32602>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32602;
    message: string;
    data?: unknown;
}, {
    code: -32602;
    data?: unknown;
    message?: string | undefined;
}>;
export type InvalidParamsError = z.infer<typeof InvalidParamsErrorSchema>;
/**
 * @description Error code for Internal Error (-32603). Internal JSON-RPC error.
 */
export declare const ErrorCodeInternalError = -32603;
export declare const InternalErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32603>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32603;
    message: string;
    data?: unknown;
}, {
    code: -32603;
    data?: unknown;
    message?: string | undefined;
}>;
export type InternalError = z.infer<typeof InternalErrorSchema>;
/**
 * @description Error code for Task Not Found (-32001). The specified task was not found.
 */
export declare const ErrorCodeTaskNotFound = -32001;
export declare const TaskNotFoundErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32001>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32001;
    message: string;
    data?: unknown;
}, {
    code: -32001;
    data?: unknown;
    message?: string | undefined;
}>;
export type TaskNotFoundError = z.infer<typeof TaskNotFoundErrorSchema>;
/**
 * @description Error code for Task Not Cancelable (-32002). The specified task cannot be canceled.
 */
export declare const ErrorCodeTaskNotCancelable = -32002;
export declare const TaskNotCancelableErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32002>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32002;
    message: string;
    data?: unknown;
}, {
    code: -32002;
    data?: unknown;
    message?: string | undefined;
}>;
export type TaskNotCancelableError = z.infer<typeof TaskNotCancelableErrorSchema>;
/**
 * @description Error code for Push Notification Not Supported (-32003). Push Notifications are not supported for this operation or agent.
 */
export declare const ErrorCodePushNotificationNotSupported = -32003;
export declare const PushNotificationNotSupportedErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32003>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32003;
    message: string;
    data?: unknown;
}, {
    code: -32003;
    data?: unknown;
    message?: string | undefined;
}>;
export type PushNotificationNotSupportedError = z.infer<typeof PushNotificationNotSupportedErrorSchema>;
/**
 * @description Error code for Unsupported Operation (-32004). The requested operation is not supported by the agent.
 */
export declare const ErrorCodeUnsupportedOperation = -32004;
export declare const UnsupportedOperationErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32004>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32004;
    message: string;
    data?: unknown;
}, {
    code: -32004;
    data?: unknown;
    message?: string | undefined;
}>;
export type UnsupportedOperationError = z.infer<typeof UnsupportedOperationErrorSchema>;
/**
 * @description Error code for Content Type Not Supported (-32005). The requested content type is not supported by the agent.
 */
export declare const ErrorCodeContentTypeNotSupported = -32005;
export declare const ContentTypeNotSupportedErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32005>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32005;
    message: string;
    data?: unknown;
}, {
    code: -32005;
    data?: unknown;
    message?: string | undefined;
}>;
export type ContentTypeNotSupportedError = z.infer<typeof ContentTypeNotSupportedErrorSchema>;
/**
 * @description Error code for Invalid Agent Response (-32006). The agent returned an invalid response for the current method.
 */
export declare const ErrorCodeInvalidAgentResponse = -32006;
export declare const InvalidAgentResponseErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32006>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32006;
    message: string;
    data?: unknown;
}, {
    code: -32006;
    data?: unknown;
    message?: string | undefined;
}>;
export type InvalidAgentResponseError = z.infer<typeof InvalidAgentResponseErrorSchema>;
/**
 * An A2A-specific error indicating that the agent does not have an Authenticated Extended Card configured
 */
export declare const ErrorCodeAuthenticatedExtendedCardNotConfigured = -32007;
export declare const AuthenticatedExtendedCardNotConfiguredErrorSchema: z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32007>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32007;
    message: string;
    data?: unknown;
}, {
    code: -32007;
    data?: unknown;
    message?: string | undefined;
}>;
export type AuthenticatedExtendedCardNotConfiguredError = z.infer<typeof AuthenticatedExtendedCardNotConfiguredErrorSchema>;
/**
 * Union of all well-known A2A and standard JSON-RPC error codes defined in this schema.
 */
export declare const KnownErrorCodeSchema: z.ZodUnion<[z.ZodLiteral<-32700>, z.ZodLiteral<-32600>, z.ZodLiteral<-32601>, z.ZodLiteral<-32602>, z.ZodLiteral<-32603>, z.ZodLiteral<-32001>, z.ZodLiteral<-32002>, z.ZodLiteral<-32003>, z.ZodLiteral<-32004>, z.ZodLiteral<-32005>, z.ZodLiteral<-32006>, z.ZodLiteral<-32007>]>;
export type KnownErrorCode = z.infer<typeof KnownErrorCodeSchema>;
export declare const A2AErrorSchema: z.ZodUnion<[z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32700>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32700;
    message: string;
    data?: unknown;
}, {
    code: -32700;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32600>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32600;
    message: string;
    data?: unknown;
}, {
    code: -32600;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32601>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32601;
    message: string;
    data?: unknown;
}, {
    code: -32601;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32602>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32602;
    message: string;
    data?: unknown;
}, {
    code: -32602;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32603>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32603;
    message: string;
    data?: unknown;
}, {
    code: -32603;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32001>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32001;
    message: string;
    data?: unknown;
}, {
    code: -32001;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32002>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32002;
    message: string;
    data?: unknown;
}, {
    code: -32002;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32003>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32003;
    message: string;
    data?: unknown;
}, {
    code: -32003;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32004>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32004;
    message: string;
    data?: unknown;
}, {
    code: -32004;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32005>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32005;
    message: string;
    data?: unknown;
}, {
    code: -32005;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32006>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32006;
    message: string;
    data?: unknown;
}, {
    code: -32006;
    data?: unknown;
    message?: string | undefined;
}>, z.ZodObject<{
    data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
} & {
    code: z.ZodLiteral<-32007>;
    message: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: -32007;
    message: string;
    data?: unknown;
}, {
    code: -32007;
    data?: unknown;
    message?: string | undefined;
}>]>;
export type A2AError = z.infer<typeof A2AErrorSchema>;
