/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const messageRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../trpc.js").A2AExecutionEnvironment<{
        message: {
            role: "user" | "agent";
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
                    bytes?: undefined;
                    mimeType?: string | undefined;
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
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
        };
        metadata?: Record<string, unknown> | null | undefined;
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
    }, import("../../../../../types/index.js").TaskAndHistory, import("../../../../../types/index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    send: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            message: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            };
            metadata?: Record<string, unknown> | null | undefined;
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
        output: {
            role: "user" | "agent";
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
                    bytes?: undefined;
                    mimeType?: string | undefined;
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
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
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
                            name?: string | undefined;
                            mimeType?: string | undefined;
                            uri?: undefined;
                        } | {
                            uri: string;
                            name?: string | undefined;
                            bytes?: undefined;
                            mimeType?: string | undefined;
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
                    extensions?: string[] | undefined;
                    referenceTaskIds?: string[] | undefined;
                    taskId?: string | undefined;
                    contextId?: string | undefined;
                } | undefined;
                timestamp?: string | undefined;
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
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                name?: string | undefined;
                metadata?: Record<string, unknown> | null | undefined;
                description?: string | undefined;
                extension?: string[] | undefined;
            }[] | undefined;
        };
        meta: object;
    }>;
    stream: import("@trpc/server").TRPCSubscriptionProcedure<{
        input: {
            message: {
                role: "user" | "agent";
                kind: "data" | "message" | "file" | "text" | "artifact-update" | "status-update" | "task";
                parts: ({
                    file: {
                        bytes: string;
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                extensions?: string[] | undefined;
                referenceTaskIds?: string[] | undefined;
                taskId?: string | undefined;
                contextId?: string | undefined;
            };
            metadata?: Record<string, unknown> | null | undefined;
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
        output: AsyncIterable<{
            role: "user" | "agent";
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
                    bytes?: undefined;
                    mimeType?: string | undefined;
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
            extensions?: string[] | undefined;
            referenceTaskIds?: string[] | undefined;
            taskId?: string | undefined;
            contextId?: string | undefined;
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
                            name?: string | undefined;
                            mimeType?: string | undefined;
                            uri?: undefined;
                        } | {
                            uri: string;
                            name?: string | undefined;
                            bytes?: undefined;
                            mimeType?: string | undefined;
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
                    extensions?: string[] | undefined;
                    referenceTaskIds?: string[] | undefined;
                    taskId?: string | undefined;
                    contextId?: string | undefined;
                } | undefined;
                timestamp?: string | undefined;
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
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                name?: string | undefined;
                metadata?: Record<string, unknown> | null | undefined;
                description?: string | undefined;
                extension?: string[] | undefined;
            }[] | undefined;
        } | {
            status: {
                state: "failed" | "unknown" | "completed" | "canceled" | "rejected" | "submitted" | "working" | "input-required" | "auth-required";
                message?: {
                    role: "user" | "agent";
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
                            bytes?: undefined;
                            mimeType?: string | undefined;
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
                        name?: string | undefined;
                        mimeType?: string | undefined;
                        uri?: undefined;
                    } | {
                        uri: string;
                        name?: string | undefined;
                        bytes?: undefined;
                        mimeType?: string | undefined;
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
                name?: string | undefined;
                metadata?: Record<string, unknown> | null | undefined;
                description?: string | undefined;
                extension?: string[] | undefined;
            };
            metadata?: Record<string, unknown> | null | undefined;
            append?: boolean | undefined;
            lastChunk?: boolean | undefined;
        }, void, unknown>;
        meta: object;
    }>;
}>>;
