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
    acceptedOutputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * @optional The number of most recent messages from the task's history to retrieve in the response.
     */
    historyLength: z.ZodOptional<z.ZodNumber>;
    /**
     * @optional Configuration for the agent to send push notifications for updates after the initial response.
     */
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
    /**
     * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
     */
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
    /**
     * @optional Configuration options for the message send request.
     */
    configuration: z.ZodOptional<z.ZodObject<{
        /**
         * @optional A list of output MIME types the client is prepared to accept in the response.
         */
        acceptedOutputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /**
         * @optional The number of most recent messages from the task's history to retrieve in the response.
         */
        historyLength: z.ZodOptional<z.ZodNumber>;
        /**
         * @optional Configuration for the agent to send push notifications for updates after the initial response.
         */
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
        /**
         * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
         */
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
    /**
     * @optional Additional metadata to be included with the message.
     */
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
        /**
         * @optional Configuration options for the message send request.
         */
        configuration: z.ZodOptional<z.ZodObject<{
            /**
             * @optional A list of output MIME types the client is prepared to accept in the response.
             */
            acceptedOutputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional The number of most recent messages from the task's history to retrieve in the response.
             */
            historyLength: z.ZodOptional<z.ZodNumber>;
            /**
             * @optional Configuration for the agent to send push notifications for updates after the initial response.
             */
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
            /**
             * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
             */
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
        /**
         * @optional Additional metadata to be included with the message.
         */
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
}>;
export type SendMessageRequest = z.infer<typeof SendMessageRequestSchema>;
/**
 * @description The result of a message send request, which can be a Message or the initial Task object.
 */
export declare const SendMessageSuccessResultSchema: z.ZodUnion<[z.ZodObject<{
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
export type SendMessageSuccessResult = z.infer<typeof SendMessageSuccessResultSchema>;
/**
 * @description JSON-RPC success response model for the 'message/send' method.
 */
export declare const SendMessageSuccessResponseSchema: z.ZodObject<{
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
}>;
export type SendMessageSuccessResponse = z.infer<typeof SendMessageSuccessResponseSchema>;
/**
 * @description JSON-RPC response model for the 'message/send' method.
 */
export declare const SendMessageResponseSchema: z.ZodUnion<[z.ZodObject<{
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
        /**
         * @optional Configuration options for the message send request.
         */
        configuration: z.ZodOptional<z.ZodObject<{
            /**
             * @optional A list of output MIME types the client is prepared to accept in the response.
             */
            acceptedOutputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional The number of most recent messages from the task's history to retrieve in the response.
             */
            historyLength: z.ZodOptional<z.ZodNumber>;
            /**
             * @optional Configuration for the agent to send push notifications for updates after the initial response.
             */
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
            /**
             * @optional If true, the client will wait for the task to complete. The server may reject this if the task is long-running.
             */
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
        /**
         * @optional Additional metadata to be included with the message.
         */
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
}>;
export type SendStreamingMessageRequest = z.infer<typeof SendStreamingMessageRequestSchema>;
/**
 * @description The result of a streaming message request, which can be a Message, Task, or a streaming update/artifact event.
 */
export declare const SendStreamingMessageSuccessResultSchema: z.ZodUnion<[z.ZodObject<{
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
export type SendStreamingMessageSuccessResult = z.infer<typeof SendStreamingMessageSuccessResultSchema>;
/**
 * @description Represents a successful JSON-RPC response for the `message/stream` method.
 * The server may send multiple response objects for a single request.
 */
export declare const SendStreamingMessageSuccessResponseSchema: z.ZodObject<{
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
}>;
export type SendStreamingMessageSuccessResponse = z.infer<typeof SendStreamingMessageSuccessResponseSchema>;
/**
 * @description Response to a streaming task operation, either through `message/stream` or a subscription.
 */
export declare const SendStreamingMessageResponseSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type SendStreamingMessageResponse = z.infer<typeof SendStreamingMessageResponseSchema>;
//# sourceMappingURL=message.d.ts.map