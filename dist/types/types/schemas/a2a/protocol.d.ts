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
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>;
        configuration: z.ZodOptional<z.ZodObject<{
            acceptedOutputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            historyLength: z.ZodOptional<z.ZodNumber>;
            pushNotificationConfig: z.ZodOptional<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodString;
                token: z.ZodOptional<z.ZodString>;
                authentication: z.ZodOptional<z.ZodObject<{
                    schemes: z.ZodArray<z.ZodString, "many">;
                    credentials: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    schemes: string[];
                    credentials?: string | undefined;
                }, {
                    schemes: string[];
                    credentials?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            }, {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            }>>;
            blocking: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        }, {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        }>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        message: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    }, {
        message: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        message: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "message/send";
}, {
    params: {
        message: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "message/send";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"message/stream">;
    params: z.ZodObject<{
        message: z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>;
        configuration: z.ZodOptional<z.ZodObject<{
            acceptedOutputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            historyLength: z.ZodOptional<z.ZodNumber>;
            pushNotificationConfig: z.ZodOptional<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                url: z.ZodString;
                token: z.ZodOptional<z.ZodString>;
                authentication: z.ZodOptional<z.ZodObject<{
                    schemes: z.ZodArray<z.ZodString, "many">;
                    credentials: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    schemes: string[];
                    credentials?: string | undefined;
                }, {
                    schemes: string[];
                    credentials?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            }, {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            }>>;
            blocking: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        }, {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        }>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        message: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    }, {
        message: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        message: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "message/stream";
}, {
    params: {
        message: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        configuration?: {
            historyLength?: number | undefined;
            pushNotificationConfig?: {
                url: string;
                id?: string | undefined;
                token?: string | undefined;
                authentication?: {
                    schemes: string[];
                    credentials?: string | undefined;
                } | undefined;
            } | undefined;
            acceptedOutputModes?: string[] | undefined;
            blocking?: boolean | undefined;
        } | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "message/stream";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/resubscribe">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/resubscribe";
}, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/resubscribe";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/get">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        historyLength: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        historyLength?: number | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        historyLength?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        historyLength?: number | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/get";
}, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        historyLength?: number | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/get";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/cancel">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/cancel";
}, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/cancel";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/set">;
    params: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/set";
}, {
    params: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/set";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/get">;
    params: z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        pushNotificationConfigId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        pushNotificationConfigId?: string | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        pushNotificationConfigId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    } | {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        pushNotificationConfigId?: string | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/get";
}, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    } | {
        id: string;
        metadata?: Record<string, unknown> | undefined;
        pushNotificationConfigId?: string | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/get";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/list">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/list";
}, {
    params: {
        id: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/list";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/delete">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    } & {
        pushNotificationConfigId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | undefined;
    }, {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/delete";
}, {
    params: {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "tasks/pushNotificationConfig/delete";
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"agent/getAuthenticatedExtendedCard">;
    params: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    id: string | number;
    method: "agent/getAuthenticatedExtendedCard";
    params?: undefined;
}, {
    jsonrpc: "2.0";
    id: string | number;
    method: "agent/getAuthenticatedExtendedCard";
    params?: undefined;
}>]>;
/**
 * @description Union of all valid A2A response types defined in the protocol.
 * @description Represents any valid JSON-RPC response defined in the A2A protocol.
 * (This is a helper type, not explicitly defined with `oneOf` in the spec like A2ARequest, but useful).
 */
export declare const A2AResponseSchema: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        }, {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }>, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>]>, "many">;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        messageId: z.ZodString;
        taskId: z.ZodOptional<z.ZodString>;
        contextId: z.ZodOptional<z.ZodString>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }, {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        }, {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }>, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>]>, "many">;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        messageId: z.ZodString;
        taskId: z.ZodOptional<z.ZodString>;
        contextId: z.ZodOptional<z.ZodString>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }, {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "status-update", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        final: z.ZodBoolean;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "artifact-update", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        artifact: z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>;
        append: z.ZodOptional<z.ZodBoolean>;
        lastChunk: z.ZodOptional<z.ZodBoolean>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    }, {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    } | {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    } | {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodArray<z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: null;
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: null;
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        protocolVersion: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
        additionalInterfaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>;
        iconUrl: z.ZodOptional<z.ZodString>;
        provider: z.ZodOptional<z.ZodObject<{
            organization: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>;
        version: z.ZodString;
        documentationUrl: z.ZodOptional<z.ZodString>;
        capabilities: z.ZodObject<{
            streaming: z.ZodOptional<z.ZodBoolean>;
            pushNotifications: z.ZodOptional<z.ZodBoolean>;
            stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                uri: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                required: z.ZodOptional<z.ZodBoolean>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }, {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }, {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }>;
        securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                clientCredentials: z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                implicit: z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                password: z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            }, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            }>;
            oauth2MetadataUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }>]>>>;
        security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        skills: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }, {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }>, "many">;
        supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
        signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
            protected: z.ZodString;
            signature: z.ZodString;
            header: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        name: string;
        url: string;
        protocolVersion: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "mutualTLS";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    }, {
        description: string;
        name: string;
        url: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        description: string;
        name: string;
        url: string;
        protocolVersion: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "mutualTLS";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        description: string;
        name: string;
        url: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>]>;
/**
 * @description Represents a JSON-RPC response object.
 */
export declare const JSONRPCResponseSchema: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        }, {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }>, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>]>, "many">;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        messageId: z.ZodString;
        taskId: z.ZodOptional<z.ZodString>;
        contextId: z.ZodOptional<z.ZodString>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }, {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodUnion<[z.ZodObject<{
        role: z.ZodEnum<["user", "agent"]>;
        parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        }, {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            file: z.ZodUnion<[z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                bytes: z.ZodString;
                uri: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }, {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            }>, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                mimeType: z.ZodOptional<z.ZodString>;
            } & {
                uri: z.ZodString;
                bytes: z.ZodOptional<z.ZodNever>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }, {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        }, {
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>, z.ZodObject<{
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        } & {
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        }, {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        }>]>, "many">;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        messageId: z.ZodString;
        taskId: z.ZodOptional<z.ZodString>;
        contextId: z.ZodOptional<z.ZodString>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }, {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "status-update", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        final: z.ZodBoolean;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    }>, z.ZodObject<{
        taskId: z.ZodString;
        contextId: z.ZodString;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "artifact-update", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        artifact: z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>;
        append: z.ZodOptional<z.ZodBoolean>;
        lastChunk: z.ZodOptional<z.ZodBoolean>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    }, {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        kind: "message";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "file";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "data";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "status-update";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    } | {
        kind: "artifact-update";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        parts: ({
            file: {
                bytes: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                uri?: undefined;
            } | {
                uri: string;
                name?: string | undefined;
                mimeType?: string | undefined;
                bytes?: undefined;
            };
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            text: string;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        } | {
            data: Record<string, unknown>;
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            metadata?: Record<string, unknown> | undefined;
        })[];
        role: "user" | "agent";
        messageId: string;
        metadata?: Record<string, unknown> | undefined;
        extensions?: string[] | undefined;
        referenceTaskIds?: string[] | undefined;
        taskId?: string | undefined;
        contextId?: string | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    } | {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        final: boolean;
        metadata?: Record<string, unknown> | undefined;
    } | {
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        taskId: string;
        contextId: string;
        artifact: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        };
        metadata?: Record<string, unknown> | undefined;
        append?: boolean | undefined;
        lastChunk?: boolean | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        id: z.ZodString;
        contextId: z.ZodOptional<z.ZodString>;
        status: z.ZodObject<{
            state: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
            message: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "agent"]>;
                parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    text: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    file: z.ZodUnion<[z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        bytes: z.ZodString;
                        uri: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }, {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    }>, z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    } & {
                        uri: z.ZodString;
                        bytes: z.ZodOptional<z.ZodNever>;
                    }, "strip", z.ZodTypeAny, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }, {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>, z.ZodObject<{
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                } & {
                    kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
                }, "strip", z.ZodTypeAny, {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                }, {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                }>]>, "many">;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                messageId: z.ZodString;
                taskId: z.ZodOptional<z.ZodString>;
                contextId: z.ZodOptional<z.ZodString>;
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
            }, "strip", z.ZodTypeAny, {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }, {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            }>>;
            timestamp: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }, {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }>;
        history: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "agent"]>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            referenceTaskIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            messageId: z.ZodString;
            taskId: z.ZodOptional<z.ZodString>;
            contextId: z.ZodOptional<z.ZodString>;
            kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "message", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
        }, "strip", z.ZodTypeAny, {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }, {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }>, "many">>;
        artifacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            artifactId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            parts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "text", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                text: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            }, {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "file", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                file: z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    bytes: z.ZodString;
                    uri: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }, {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                }>, z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    mimeType: z.ZodOptional<z.ZodString>;
                } & {
                    uri: z.ZodString;
                    bytes: z.ZodOptional<z.ZodNever>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }, {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            }, {
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>, z.ZodObject<{
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            } & {
                kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "data", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
                data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            }, "strip", z.ZodTypeAny, {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            }, {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            }>]>, "many">;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            extension: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }, {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        kind: z.ZodEffects<z.ZodEnum<["artifact-update", "data", "file", "message", "status-update", "task", "text"]>, "task", "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text">;
    }, "strip", z.ZodTypeAny, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }, {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "message";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "file";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "data";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "task";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "message";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "file";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "data";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        status: {
            state: "unknown" | "submitted" | "working" | "input-required" | "completed" | "canceled" | "failed" | "rejected" | "auth-required";
            message?: {
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        bytes?: undefined;
                    };
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    text: string;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    data: Record<string, unknown>;
                    kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                    metadata?: Record<string, unknown> | undefined;
                })[];
                role: "user" | "agent";
                messageId: string;
                metadata?: Record<string, unknown> | undefined;
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            } | undefined;
            timestamp?: string | undefined;
        };
        id: string;
        kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
        metadata?: Record<string, unknown> | undefined;
        contextId?: string | undefined;
        history?: {
            kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            role: "user" | "agent";
            messageId: string;
            metadata?: Record<string, unknown> | undefined;
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        }[] | undefined;
        artifacts?: {
            artifactId: string;
            parts: ({
                file: {
                    bytes: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    uri?: undefined;
                } | {
                    uri: string;
                    name?: string | undefined;
                    mimeType?: string | undefined;
                    bytes?: undefined;
                };
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                text: string;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            } | {
                data: Record<string, unknown>;
                kind: "artifact-update" | "data" | "file" | "message" | "status-update" | "task" | "text";
                metadata?: Record<string, unknown> | undefined;
            })[];
            description?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            extension?: string[] | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodArray<z.ZodObject<{
        taskId: z.ZodString;
        pushNotificationConfig: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
            authentication: z.ZodOptional<z.ZodObject<{
                schemes: z.ZodArray<z.ZodString, "many">;
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: null;
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: null;
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>, z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        protocolVersion: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
        additionalInterfaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>;
        iconUrl: z.ZodOptional<z.ZodString>;
        provider: z.ZodOptional<z.ZodObject<{
            organization: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>;
        version: z.ZodString;
        documentationUrl: z.ZodOptional<z.ZodString>;
        capabilities: z.ZodObject<{
            streaming: z.ZodOptional<z.ZodBoolean>;
            pushNotifications: z.ZodOptional<z.ZodBoolean>;
            stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                uri: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                required: z.ZodOptional<z.ZodBoolean>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }, {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }, {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }>;
        securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                clientCredentials: z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                implicit: z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                password: z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            }, {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            }>;
            oauth2MetadataUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }>]>>>;
        security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        skills: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }, {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }>, "many">;
        supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
        signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
            protected: z.ZodString;
            signature: z.ZodString;
            header: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        name: string;
        url: string;
        protocolVersion: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "mutualTLS";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    }, {
        description: string;
        name: string;
        url: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        description: string;
        name: string;
        url: string;
        protocolVersion: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "oauth2";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "mutualTLS";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        description: string;
        name: string;
        url: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }[];
        security?: Record<string, string[]>[] | undefined;
        protocolVersion?: string | undefined;
        preferredTransport?: string | undefined;
        additionalInterfaces?: {
            url: string;
            transport: string;
        }[] | undefined;
        iconUrl?: string | undefined;
        provider?: {
            url: string;
            organization: string;
        } | undefined;
        documentationUrl?: string | undefined;
        securitySchemes?: Record<string, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            flows: {
                authorizationCode?: {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                clientCredentials?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                implicit?: {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
                password?: {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                } | undefined;
            };
            description?: string | undefined;
            oauth2MetadataUrl?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>]>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: any;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: any;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    result: z.ZodOptional<z.ZodNever>;
} & {
    error: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
    error?: any;
}, {
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
    error?: any;
}>]>;
export type JSONRPCResponse = z.infer<typeof JSONRPCResponseSchema>;
export type A2ARequest = z.infer<typeof A2ARequestSchema>;
export type A2AResponse = z.infer<typeof A2AResponseSchema>;
//# sourceMappingURL=protocol.d.ts.map