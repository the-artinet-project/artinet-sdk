/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const createA2ARouter: () => import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
    }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    agentCard: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
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
        meta: object;
    }>;
    message: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
    tasks: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        resubscribe: import("@trpc/server").TRPCSubscriptionProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | undefined;
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
        get: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | undefined;
            };
            output: {
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
        cancel: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | undefined;
            };
            output: {
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
        pushNotificationConfig: import("@trpc/server").TRPCBuiltRouter<{
            ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    id: string;
                    metadata?: Record<string, unknown> | undefined;
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
                    metadata?: Record<string, unknown> | undefined;
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
                    metadata?: Record<string, unknown> | undefined;
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
    }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    agentCard: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
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
        meta: object;
    }>;
    message: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
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
    tasks: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
        }, import("../../../../index.js").TaskAndHistory, import("../../../../index.js").UpdateEvent>;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        resubscribe: import("@trpc/server").TRPCSubscriptionProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | undefined;
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
        get: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | undefined;
            };
            output: {
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
        cancel: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: string;
                metadata?: Record<string, unknown> | undefined;
            };
            output: {
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
        pushNotificationConfig: import("@trpc/server").TRPCBuiltRouter<{
            ctx: import("../trpc.js").A2AExecutionEnvironment<{
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
                    metadata?: Record<string, unknown> | undefined;
                } | {
                    id: string;
                    metadata?: Record<string, unknown> | undefined;
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
                    metadata?: Record<string, unknown> | undefined;
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
                    metadata?: Record<string, unknown> | undefined;
                };
                output: null;
                meta: object;
            }>;
        }>>;
    }>>;
}>>;
export type AgentRouter = A2ARouter;
//# sourceMappingURL=router.d.ts.map