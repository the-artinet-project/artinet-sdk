/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const taskRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../../trpc.js").A2AExecutionEnvironment<{
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
    }, import("../../../../../types/index.js").TaskAndHistory, import("../../../../../types/index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    resubscribe: import("@trpc/server").TRPCSubscriptionProcedure<{
        input: {
            id: string;
            metadata?: Record<string, unknown> | null | undefined;
        };
        output: AsyncIterable<{
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
        }, void, unknown>;
        meta: object;
    }>;
    get: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
            metadata?: Record<string, unknown> | null | undefined;
        };
        output: {
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
        meta: object;
    }>;
    cancel: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            metadata?: Record<string, unknown> | null | undefined;
        };
        output: {
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
        meta: object;
    }>;
    pushNotificationConfig: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../../types/index.js").TaskAndHistory, import("../../../../../types/index.js").UpdateEvent>;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        set: import("@trpc/server").TRPCMutationProcedure<{
            input: {
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
            output: {
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
            meta: object;
        }>;
        get: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | null | undefined;
            } | {
                id: string;
                metadata?: Record<string, unknown> | null | undefined;
                pushNotificationConfigId?: string | null | undefined;
            };
            output: {
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
            meta: object;
        }>;
        list: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | null | undefined;
            };
            output: {
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
            meta: object;
        }>;
        delete: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                pushNotificationConfigId: string;
                metadata?: Record<string, unknown> | null | undefined;
            };
            output: null;
            meta: object;
        }>;
    }>>;
}>>;
