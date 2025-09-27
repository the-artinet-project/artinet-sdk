/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const messageRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../trpc.js").A2AExecutionEnvironment<{
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
    }, import("../../../../../types/index.js").TaskAndHistory, import("../../../../../types/index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    send: import("@trpc/server").TRPCMutationProcedure<{
        input: {
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
        output: {
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
        meta: object;
    }>;
    stream: import("@trpc/server").TRPCSubscriptionProcedure<{
        input: {
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
        output: AsyncIterable<{
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
        }, void, unknown>;
        meta: object;
    }>;
}>>;
//# sourceMappingURL=route.d.ts.map