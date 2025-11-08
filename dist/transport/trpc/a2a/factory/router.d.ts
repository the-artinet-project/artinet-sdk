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
                    required?: boolean | undefined;
                    description?: string | undefined;
                    params?: Record<string, unknown> | null | undefined;
                }[] | undefined;
                streaming?: boolean | undefined;
                pushNotifications?: boolean | undefined;
                stateTransitionHistory?: boolean | undefined;
            };
            defaultInputModes: string[];
            defaultOutputModes: string[];
            skills: {
                name: string;
                id: string;
                description: string;
                tags: string[];
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
                name: string;
                type: "apiKey";
                in: "header" | "query" | "cookie";
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
            }> | null | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | null | undefined;
            }[] | undefined;
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
    tasks: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        pushNotificationConfig: import("@trpc/server").TRPCBuiltRouter<{
            ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
                        id?: string | undefined;
                        token?: string | undefined;
                        authentication?: {
                            schemes: string[];
                            credentials?: string | undefined;
                        } | undefined;
                    };
                };
                output: {
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
                meta: object;
            }>;
            get: import("@trpc/server").TRPCQueryProcedure<{
                input: {
                    id: string;
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    id: string;
                    metadata?: Record<string, unknown> | null | undefined;
                    pushNotificationConfigId?: string | undefined;
                };
                output: {
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
                        id?: string | undefined;
                        token?: string | undefined;
                        authentication?: {
                            schemes: string[];
                            credentials?: string | undefined;
                        } | undefined;
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
                    required?: boolean | undefined;
                    description?: string | undefined;
                    params?: Record<string, unknown> | null | undefined;
                }[] | undefined;
                streaming?: boolean | undefined;
                pushNotifications?: boolean | undefined;
                stateTransitionHistory?: boolean | undefined;
            };
            defaultInputModes: string[];
            defaultOutputModes: string[];
            skills: {
                name: string;
                id: string;
                description: string;
                tags: string[];
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
                name: string;
                type: "apiKey";
                in: "header" | "query" | "cookie";
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
            }> | null | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | null | undefined;
            }[] | undefined;
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
    tasks: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        pushNotificationConfig: import("@trpc/server").TRPCBuiltRouter<{
            ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
                        id?: string | undefined;
                        token?: string | undefined;
                        authentication?: {
                            schemes: string[];
                            credentials?: string | undefined;
                        } | undefined;
                    };
                };
                output: {
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
                meta: object;
            }>;
            get: import("@trpc/server").TRPCQueryProcedure<{
                input: {
                    id: string;
                    metadata?: Record<string, unknown> | null | undefined;
                } | {
                    id: string;
                    metadata?: Record<string, unknown> | null | undefined;
                    pushNotificationConfigId?: string | undefined;
                };
                output: {
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
                        id?: string | undefined;
                        token?: string | undefined;
                        authentication?: {
                            schemes: string[];
                            credentials?: string | undefined;
                        } | undefined;
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
