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
    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
}, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
}>;
export type TaskIdParams = z.infer<typeof TaskIdParamsSchema>;
/**
 * Parameters used for querying task-related information by ID.
 */
export declare const TaskQueryParamsSchema: z.ZodObject<{
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
export type TaskQueryParams = z.infer<typeof TaskQueryParamsSchema>;
/**
 * Represents the status of a task at a specific point in time.
 */
export declare const TaskStatusSchema: z.ZodObject<{
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
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
/**
 * Represents a task being processed by an agent.
 */
export declare const TaskSchema: z.ZodObject<{
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
export type Task = z.infer<typeof TaskSchema>;
/**
 * Represents a status update event for a task, typically used in streaming scenarios.
 */
export declare const TaskStatusUpdateEventSchema: z.ZodObject<{
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
}>;
export type TaskStatusUpdateEvent = z.infer<typeof TaskStatusUpdateEventSchema>;
/**
 * Represents an artifact update event for a task, typically used in streaming scenarios.
 */
export declare const TaskArtifactUpdateEventSchema: z.ZodObject<{
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
}>;
export type GetTaskRequest = z.infer<typeof GetTaskRequestSchema>;
/**
 * @description Represents a successful JSON-RPC response for the `tasks/get` method.
 */
export declare const GetTaskSuccessResponseSchema: z.ZodObject<{
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
}>;
export type GetTaskSuccessResponse = z.infer<typeof GetTaskSuccessResponseSchema>;
/**
 * @description Represents a JSON-RPC response for the `tasks/get` method.
 */
export declare const GetTaskResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>;
export type CancelTaskRequest = z.infer<typeof CancelTaskRequestSchema>;
/**
 * @description Represents a successful JSON-RPC response for the `tasks/cancel` method.
 */
export declare const CancelTaskSuccessResponseSchema: z.ZodObject<{
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
}>;
export type CancelTaskSuccessResponse = z.infer<typeof CancelTaskSuccessResponseSchema>;
/**
 * @description Represents a JSON-RPC response for the `tasks/cancel` method.
 */
export declare const CancelTaskResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type CancelTaskResponse = z.infer<typeof CancelTaskResponseSchema>;
