/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const createA2ARouter: () => import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
    }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    agentCard: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
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
        meta: object;
    }>;
    message: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
                            name?: string | null | undefined;
                            mimeType?: string | null | undefined;
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
            output: {
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
                            name?: string | null | undefined;
                            mimeType?: string | null | undefined;
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
    }>>;
    tasks: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
            ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
            }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
}>>;
export type A2ARouter = Awaited<ReturnType<typeof createA2ARouter>>;
export declare const createAgentRouter: () => import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
    }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    agentCard: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
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
        meta: object;
    }>;
    message: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
                            name?: string | null | undefined;
                            mimeType?: string | null | undefined;
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
            output: {
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
                            name?: string | null | undefined;
                            mimeType?: string | null | undefined;
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
    }>>;
    tasks: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
            ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
            }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
}>>;
export type AgentRouter = A2ARouter;
