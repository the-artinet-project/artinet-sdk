/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Base interface for all JSON-RPC messages (Requests and Responses).
 */
export declare const JSONRPCMessageSchema: z.ZodObject<{
    /**
     * @required Specifies the JSON-RPC version. Must be "2.0".
     * @default "2.0"
     * @const "2.0"
     */
    jsonrpc: z.ZodLiteral<"2.0">;
    /**
     * @optional An identifier established by the Client that MUST contain a String, Number.
     * @description Can be a string, number. Responses must have the same ID as the request they relate to.
     * Notifications (requests without an expected response) should omit the ID.
     */
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    id?: string | number | undefined;
}>;
export type JSONRPCMessage = z.infer<typeof JSONRPCMessageSchema>;
/**
 * @description Represents a JSON-RPC request object base structure.
 */
export declare const JSONRPCRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
} & {
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    method: z.ZodString;
    params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: string;
    jsonrpc: "2.0";
    params?: Record<string, unknown> | null | undefined;
}, {
    id: string | number;
    method: string;
    jsonrpc: "2.0";
    params?: Record<string, unknown> | null | undefined;
}>;
export type JSONRPCRequest = z.infer<typeof JSONRPCRequestSchema>;
/**
 * @description Represents a JSON-RPC 2.0 Error object, included in an error response.
 */
export declare const JSONRPCErrorSchema: z.ZodObject<{
    /**
     * @required A number indicating the error type that occurred.
     */
    code: z.ZodNumber;
    /**
     * @required A string providing a short description of the error.
     */
    message: z.ZodString;
    /**
     * @optional A Primitive or Structured value that contains additional information about the error.
     */
    data: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    data?: unknown;
}, {
    code: number;
    message: string;
    data?: unknown;
}>;
export type JSONRPCError = z.infer<typeof JSONRPCErrorSchema>;
/**
 * @description Represents a JSON-RPC 2.0 Success Response object.
 */
export declare const JSONRPCSuccessResponseSchema: z.ZodObject<{
    /**
     * @required Specifies the JSON-RPC version. Must be "2.0".
     * @default "2.0"
     * @const "2.0"
     */
    jsonrpc: z.ZodLiteral<"2.0">;
    /**
     * @optional An identifier established by the Client that MUST contain a String, Number.
     * @description Can be a string, number. Responses must have the same ID as the request they relate to.
     * Notifications (requests without an expected response) should omit the ID.
     */
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    /**
     * @required The result object on success
     * @description The value of this member is determined by the method invoked on the Server.
     */
    result: z.ZodUnknown;
    /**
     * @optional The error object on failure
     * @description Optional 'never' helps enforce exclusivity
     */
    error: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error?: undefined;
    id?: string | number | undefined;
    result?: unknown;
}, {
    jsonrpc: "2.0";
    error?: undefined;
    id?: string | number | undefined;
    result?: unknown;
}>;
export type JSONRPCSuccessResponse = z.infer<typeof JSONRPCSuccessResponseSchema>;
/**
 * @description Represents a JSON-RPC 2.0 Error Response object.
 */
export declare const JSONRPCErrorResponseSchema: z.ZodObject<{
    /**
     * @required Specifies the JSON-RPC version. Must be "2.0".
     * @default "2.0"
     * @const "2.0"
     */
    jsonrpc: z.ZodLiteral<"2.0">;
    /**
     * @optional An identifier established by the Client that MUST contain a String, Number.
     * @description Can be a string, number. Responses must have the same ID as the request they relate to.
     * Notifications (requests without an expected response) should omit the ID.
     */
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    /**
     * @optional The result object on success
     * @description Optional 'never' helps enforce exclusivity
     */
    result: z.ZodOptional<z.ZodNever>;
    /**
     * @required The result object on failure
     */
    error: z.ZodObject<{
        /**
         * @required A number indicating the error type that occurred.
         */
        code: z.ZodNumber;
        /**
         * @required A string providing a short description of the error.
         */
        message: z.ZodString;
        /**
         * @optional A Primitive or Structured value that contains additional information about the error.
         */
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}>;
export type JSONRPCErrorResponse = z.infer<typeof JSONRPCErrorResponseSchema>;
