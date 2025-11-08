/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Defines configuration options for a `message/send` or `message/stream` request.
 */
export declare const MessageSendConfigurationSchema: z.ZodObject<{
    /**
     * @optional A list of output MIME types the client is prepared to accept in the response.
     */
    acceptedOutputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    /**
     * @optional The number of most recent messages from the task's history to retrieve in the response.
     */
    historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    /**
     * @optional Configuration for the agent to send push notifications for updates after the initial response.
     */
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
    /**
     * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
     */
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
}>;
export type MessageSendConfiguration = z.infer<typeof MessageSendConfigurationSchema>;
/**
 * @description Defines the parameters for a request to send a message to an agent. This can be used
 * to create a new task, continue an existing one, or restart a task.
 */
export declare const MessageSendParamsSchema: z.ZodObject<{
    /**
     * @required The message object being sent to the agent.
     */
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
    /**
     * @optional Configuration options for the message send request.
     */
    configuration: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        /**
         * @optional A list of output MIME types the client is prepared to accept in the response.
         */
        acceptedOutputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        /**
         * @optional The number of most recent messages from the task's history to retrieve in the response.
         */
        historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        /**
         * @optional Configuration for the agent to send push notifications for updates after the initial response.
         */
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
        /**
         * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
         */
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
    /**
     * @optional Additional metadata to be included with the message.
     */
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
export type MessageSendParams = z.infer<typeof MessageSendParamsSchema>;
/**
 * @description Represents a JSON-RPC request for the `message/send` method.
 */
export declare const SendMessageRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"message/send">;
    params: z.ZodObject<{
        /**
         * @required The message object being sent to the agent.
         */
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
        /**
         * @optional Configuration options for the message send request.
         */
        configuration: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @optional A list of output MIME types the client is prepared to accept in the response.
             */
            acceptedOutputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional The number of most recent messages from the task's history to retrieve in the response.
             */
            historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            /**
             * @optional Configuration for the agent to send push notifications for updates after the initial response.
             */
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
            /**
             * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
             */
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
        /**
         * @optional Additional metadata to be included with the message.
         */
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
}>;
export type SendMessageRequest = z.infer<typeof SendMessageRequestSchema>;
/**
 * @description The result of a message send request, which can be a Message or the initial Task object.
 */
export declare const SendMessageSuccessResultSchema: z.ZodUnion<[z.ZodObject<{
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
export type SendMessageSuccessResult = z.infer<typeof SendMessageSuccessResultSchema>;
/**
 * @description JSON-RPC success response model for the 'message/send' method.
 */
export declare const SendMessageSuccessResponseSchema: z.ZodObject<{
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
}>;
export type SendMessageSuccessResponse = z.infer<typeof SendMessageSuccessResponseSchema>;
/**
 * @description JSON-RPC response model for the 'message/send' method.
 */
export declare const SendMessageResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type SendMessageResponse = z.infer<typeof SendMessageResponseSchema>;
/**
 * @description Request to send a message/initiate a task and subscribe to streaming updates.
 */
export declare const SendStreamingMessageRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"message/stream">;
    params: z.ZodObject<{
        /**
         * @required The message object being sent to the agent.
         */
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
        /**
         * @optional Configuration options for the message send request.
         */
        configuration: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @optional A list of output MIME types the client is prepared to accept in the response.
             */
            acceptedOutputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional The number of most recent messages from the task's history to retrieve in the response.
             */
            historyLength: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            /**
             * @optional Configuration for the agent to send push notifications for updates after the initial response.
             */
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
            /**
             * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
             */
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
        /**
         * @optional Additional metadata to be included with the message.
         */
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
}>;
export type SendStreamingMessageRequest = z.infer<typeof SendStreamingMessageRequestSchema>;
/**
 * @description The result of a streaming message request, which can be a Message, Task, or a streaming update/artifact event.
 */
export declare const SendStreamingMessageSuccessResultSchema: z.ZodUnion<[z.ZodObject<{
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
export type SendStreamingMessageSuccessResult = z.infer<typeof SendStreamingMessageSuccessResultSchema>;
/**
 * @description Represents a successful JSON-RPC response for the `message/stream` method.
 * The server may send multiple response objects for a single request.
 */
export declare const SendStreamingMessageSuccessResponseSchema: z.ZodObject<{
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
}>;
export type SendStreamingMessageSuccessResponse = z.infer<typeof SendStreamingMessageSuccessResponseSchema>;
/**
 * @description Response to a streaming task operation, either through `message/stream` or a subscription.
 */
export declare const SendStreamingMessageResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type SendStreamingMessageResponse = z.infer<typeof SendStreamingMessageResponseSchema>;
