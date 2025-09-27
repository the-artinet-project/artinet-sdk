/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Represents the state of a task within the A2A protocol.
 */
export declare const TaskStateSchema: z.ZodEnum<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
export declare const TaskState: z.Values<["submitted", "working", "input-required", "completed", "canceled", "failed", "rejected", "auth-required", "unknown"]>;
export type TaskState = z.infer<typeof TaskStateSchema>;
/**
 * Basic parameters used for task ID operations.
 */
export declare const TaskIdParamsSchema: z.ZodObject<{
    id: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    id: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export type TaskIdParams = z.infer<typeof TaskIdParamsSchema>;
/**
 * Parameters used for querying task-related information by ID.
 */
export declare const TaskQueryParamsSchema: z.ZodObject<{
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
export type TaskQueryParams = z.infer<typeof TaskQueryParamsSchema>;
/**
 * Represents the status of a task at a specific point in time.
 */
export declare const TaskStatusSchema: z.ZodObject<{
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
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
/**
 * Represents a task being processed by an agent.
 */
export declare const TaskSchema: z.ZodObject<{
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
export type Task = z.infer<typeof TaskSchema>;
/**
 * Represents a status update event for a task, typically used in streaming scenarios.
 */
export declare const TaskStatusUpdateEventSchema: z.ZodObject<{
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
}>;
export type TaskStatusUpdateEvent = z.infer<typeof TaskStatusUpdateEventSchema>;
/**
 * Represents an artifact update event for a task, typically used in streaming scenarios.
 */
export declare const TaskArtifactUpdateEventSchema: z.ZodObject<{
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
}>;
export type TaskArtifactUpdateEvent = z.infer<typeof TaskArtifactUpdateEventSchema>;
/**
 * @description Request to retrieve the current state of a task.
 */
export declare const GetTaskRequestSchema: z.ZodObject<{
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
}>;
export type GetTaskRequest = z.infer<typeof GetTaskRequestSchema>;
/**
 * @description Represents a successful JSON-RPC response for the `tasks/get` method.
 */
export declare const GetTaskSuccessResponseSchema: z.ZodObject<{
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
}>;
export type GetTaskSuccessResponse = z.infer<typeof GetTaskSuccessResponseSchema>;
/**
 * @description Represents a JSON-RPC response for the `tasks/get` method.
 */
export declare const GetTaskResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type GetTaskResponse = z.infer<typeof GetTaskResponseSchema>;
/**
 * @description Request to re-subscribe to a task's updates.
 */
export declare const TaskResubscriptionRequestSchema: z.ZodObject<{
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
}>;
export type TaskResubscriptionRequest = z.infer<typeof TaskResubscriptionRequestSchema>;
/**
 * @description Request to cancel a task.
 */
export declare const CancelTaskRequestSchema: z.ZodObject<{
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
}>;
export type CancelTaskRequest = z.infer<typeof CancelTaskRequestSchema>;
/**
 * @description Represents a successful JSON-RPC response for the `tasks/cancel` method.
 */
export declare const CancelTaskSuccessResponseSchema: z.ZodObject<{
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
}>;
export type CancelTaskSuccessResponse = z.infer<typeof CancelTaskSuccessResponseSchema>;
/**
 * @description Represents a JSON-RPC response for the `tasks/cancel` method.
 */
export declare const CancelTaskResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type CancelTaskResponse = z.infer<typeof CancelTaskResponseSchema>;
//# sourceMappingURL=task.d.ts.map