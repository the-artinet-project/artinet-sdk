/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Union of all valid A2A request types defined in the protocol.
 * @description Represents any valid JSON-RPC request defined in the A2A protocol.
 */
export declare const A2ARequestSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"message/send">;
    params: z.ZodObject<{
        message: z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>;
        configuration: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            acceptedOutputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            pushNotificationConfig: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                url: z.ZodString;
                token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    schemes: z.ZodArray<z.ZodString, "many">;
                    credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    schemes: string[];
                    credentials?: string | null | undefined;
                }, {
                    schemes: string[];
                    credentials?: string | null | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            }, {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            }>>>;
            blocking: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        }, {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        }>>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        message: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    }, {
        message: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "message/send";
    params: {
        message: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "message/send";
    params: {
        message: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"message/stream">;
    params: z.ZodObject<{
        message: z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>;
        configuration: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            acceptedOutputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            pushNotificationConfig: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                url: z.ZodString;
                token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    schemes: z.ZodArray<z.ZodString, "many">;
                    credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                }, "strip", z.ZodTypeAny, {
                    schemes: string[];
                    credentials?: string | null | undefined;
                }, {
                    schemes: string[];
                    credentials?: string | null | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            }, {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            }>>>;
            blocking: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        }, {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        }>>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        message: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    }, {
        message: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "message/stream";
    params: {
        message: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "message/stream";
    params: {
        message: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        configuration?: {
            historyLength?: number | null | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | null | undefined;
                token?: string | null | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | null | undefined;
                } | null | undefined;
            } | null | undefined;
            acceptedOutputModes?: string[] | null | undefined;
            blocking?: boolean | null | undefined;
        } | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/resubscribe">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/resubscribe";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/resubscribe";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/get">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    } & {
        historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        historyLength?: number | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        historyLength?: number | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/get";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        historyLength?: number | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/get";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        historyLength?: number | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/cancel">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/cancel";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/cancel";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/set">;
    params: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/set";
    params: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/set";
    params: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/get">;
    params: z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    } & {
        pushNotificationConfigId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/get";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/get";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/list">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/list";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/list";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/delete">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    } & {
        pushNotificationConfigId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/delete";
    params: {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/delete";
    params: {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"agent/getAuthenticatedExtendedCard">;
    params: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "agent/getAuthenticatedExtendedCard";
    jsonrpc: "2.0";
    params?: undefined;
}, {
    id: string | number;
    method: "agent/getAuthenticatedExtendedCard";
    jsonrpc: "2.0";
    params?: undefined;
}>]>;
/**
 * @description Union of all valid A2A response types defined in the protocol.
 * @description Represents any valid JSON-RPC response defined in the A2A protocol.
 * (This is a helper type, not explicitly defined with `oneOf` in the spec like A2ARequest, but useful).
 */
export declare const A2AResponseSchema: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }>, z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>]>, "many">;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        messageId: z.ZodString;
        taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }, {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }>, z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>]>, "many">;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        messageId: z.ZodString;
        taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }, {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "status-update", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        final: z.ZodBoolean;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "artifact-update", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        artifact: z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>;
        append: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        lastChunk: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    }, {
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    } | {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    } | {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodArray<z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }[];
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }[];
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: null;
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: null;
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        protocolVersion: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        preferredTransport: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>>;
        additionalInterfaces: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>>;
        iconUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        provider: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            organization: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>>;
        version: z.ZodString;
        documentationUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        capabilities: z.ZodObject<{
            streaming: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            pushNotifications: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            stateTransitionHistory: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
                uri: z.ZodString;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
                params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }>;
        securitySchemes: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            }, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            }>;
            oauth2MetadataUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }>]>>>>;
        security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        skills: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            tags: z.ZodArray<z.ZodString, "many">;
            examples: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            inputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            outputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }>, "many">;
        supportsAuthenticatedExtendedCard: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        signatures: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            protected: z.ZodString;
            signature: z.ZodString;
            header: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        description: string;
        version: string;
        protocolVersion: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "mutualTLS";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    }, {
        name: string;
        url: string;
        description: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        description: string;
        version: string;
        protocolVersion: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "mutualTLS";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        description: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>]>;
/**
 * @description Represents a JSON-RPC response object.
 */
export declare const JSONRPCResponseSchema: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }>, z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>]>, "many">;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        messageId: z.ZodString;
        taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }, {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }, {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            }>, z.ZodObject<{
                name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        }>]>, "many">;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        messageId: z.ZodString;
        taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }, {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "status-update", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        final: z.ZodBoolean;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "artifact-update", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        artifact: z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>;
        append: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        lastChunk: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    }, {
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    } | {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        role: "user" | "agent";
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        parts: ({
            file: {
                bytes: string;
                name?: string | null | undefined;
                mimeType?: string | null | undefined;
                uri?: null | undefined;
            } | {
                uri: string;
                name?: string | null | undefined;
                bytes?: null | undefined;
                mimeType?: string | null | undefined;
            };
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            text: string;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            metadata?: Record<string, unknown> | null | undefined;
        })[];
        messageId: string;
        metadata?: Record<string, unknown> | null | undefined;
        extensions?: string[] | null | undefined;
        referenceTaskIds?: string[] | null | undefined;
        taskId?: string | null | undefined;
        contextId?: string | null | undefined;
    } | {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    } | {
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
        append?: boolean | null | undefined;
        lastChunk?: boolean | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodString;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }, {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    }>, z.ZodObject<{
                        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }, {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                }>]>, "many">;
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
                extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
                messageId: z.ZodString;
                taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }, {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            }>>>;
            timestamp: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }, {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        }>;
        history: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            referenceTaskIds: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            messageId: z.ZodString;
            taskId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            contextId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
        }, "strip", z.ZodTypeAny, {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }, {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }>, "many">>>;
        artifacts: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }, {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                }>, z.ZodObject<{
                    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            }>]>, "many">;
            metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            extension: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }>, "many">>>;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }, {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        id: string;
        status: {
            state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
            message?: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | null | undefined;
                        mimeType?: string | null | undefined;
                        uri?: null | undefined;
                    } | {
                        uri: string;
                        name?: string | null | undefined;
                        bytes?: null | undefined;
                        mimeType?: string | null | undefined;
                    };
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    text: string;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                    metadata?: Record<string, unknown> | null | undefined;
                })[];
                messageId: string;
                metadata?: Record<string, unknown> | null | undefined;
                extensions?: string[] | null | undefined;
                referenceTaskIds?: string[] | null | undefined;
                taskId?: string | null | undefined;
                contextId?: string | null | undefined;
            } | null | undefined;
            timestamp?: string | null | undefined;
        };
        kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
        contextId: string;
        metadata?: Record<string, unknown> | null | undefined;
        history?: {
            role: "user" | "agent";
            kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            messageId: string;
            metadata?: Record<string, unknown> | null | undefined;
            extensions?: string[] | null | undefined;
            referenceTaskIds?: string[] | null | undefined;
            taskId?: string | null | undefined;
            contextId?: string | null | undefined;
        }[] | null | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | null | undefined;
                    mimeType?: string | null | undefined;
                    uri?: null | undefined;
                } | {
                    uri: string;
                    name?: string | null | undefined;
                    bytes?: null | undefined;
                    mimeType?: string | null | undefined;
                };
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                text: string;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                metadata?: Record<string, unknown> | null | undefined;
            })[];
            name?: string | null | undefined;
            metadata?: Record<string, unknown> | null | undefined;
            description?: string | null | undefined;
            extension?: string[] | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodArray<z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            url: z.ZodString;
            token: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            authentication: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | null | undefined;
            }, {
                schemes: string[];
                credentials?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }, {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }[];
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | null | undefined;
            token?: string | null | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | null | undefined;
            } | null | undefined;
        };
    }[];
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: null;
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: null;
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        protocolVersion: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        preferredTransport: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>>;
        additionalInterfaces: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>>;
        iconUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        provider: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            organization: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>>;
        version: z.ZodString;
        documentationUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        capabilities: z.ZodObject<{
            streaming: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            pushNotifications: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            stateTransitionHistory: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
                uri: z.ZodString;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
                params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }>;
        securitySchemes: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            }, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            }>;
            oauth2MetadataUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }>]>>>>;
        security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        skills: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            tags: z.ZodArray<z.ZodString, "many">;
            examples: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            inputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            outputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }>, "many">;
        supportsAuthenticatedExtendedCard: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        signatures: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            protected: z.ZodString;
            signature: z.ZodString;
            header: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        description: string;
        version: string;
        protocolVersion: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "mutualTLS";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    }, {
        name: string;
        url: string;
        description: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        description: string;
        version: string;
        protocolVersion: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "mutualTLS";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        description: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }[];
        security?: Record<string, string[]>[] | null | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | null | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | null | undefined;
        iconUrl?: string | null | undefined;
        provider?: {
            url: string;
            organization: string;
        } | null | undefined;
        documentationUrl?: string | null | undefined;
        securitySchemes?: Record<string, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                } | null | undefined;
            };
            description?: string | null | undefined;
            oauth2MetadataUrl?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
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
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>]>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error?: null | undefined;
    id?: string | number | null | undefined;
    result?: any;
}, {
    jsonrpc: "2.0";
    error?: null | undefined;
    id?: string | number | null | undefined;
    result?: any;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    error: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error?: any;
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    jsonrpc: "2.0";
    error?: any;
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>;
export type JSONRPCResponse = z.infer<typeof JSONRPCResponseSchema>;
export type A2ARequest = z.infer<typeof A2ARequestSchema>;
export type A2AResponse = z.infer<typeof A2AResponseSchema>;
