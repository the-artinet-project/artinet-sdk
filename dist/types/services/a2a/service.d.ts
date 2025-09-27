/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2AServiceInterface, A2AEngine, AgentCard, ContextManagerInterface, ConnectionManagerInterface, CancellationManagerInterface, TaskManagerInterface, MethodOptions, TaskAndHistory, TaskIdParams, MessageSendParams, Command, State, Update, CoreContext, EventManagerOptions, MethodParams } from "../../types/index.js";
export declare class A2AService implements A2AServiceInterface {
    readonly agentCard: AgentCard;
    private engine;
    private connections;
    private cancellations;
    private tasks;
    private contexts;
    private methods;
    readonly eventOverrides: EventManagerOptions<Command, State, Update> | undefined;
    constructor(agentCard: AgentCard, engine: A2AEngine, contexts: ContextManagerInterface<Command, State, Update>, connections: ConnectionManagerInterface, cancellations: CancellationManagerInterface, tasks: TaskManagerInterface<TaskAndHistory>, methods: MethodOptions, eventOverrides?: EventManagerOptions<Command, State, Update>);
    execute(engine: A2AEngine, context: CoreContext<Command, State, Update>): Promise<void>;
    stop(): Promise<void>;
    addConnection(id: string): void;
    removeConnection(id: string): void;
    isCancelled(id: string): boolean;
    addCancellation(id: string): void;
    removeCancellation(id: string): void;
    getState(id: string): Promise<TaskAndHistory | undefined>;
    setState(id: string, data: TaskAndHistory): Promise<void>;
    getTask(input: TaskIdParams): Promise<{
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
    }>;
    cancelTask(input: TaskIdParams): Promise<{
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
    }>;
    sendMessage(message: MessageSendParams, params?: Partial<Omit<MethodParams, "service" | "contextManager">>): Promise<{
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
    }>;
    streamMessage(message: MessageSendParams, params?: Partial<Omit<MethodParams, "service" | "contextManager">>): AsyncGenerator<import("../../types/index.js").UpdateEvent, void, any>;
    resubscribe(input: TaskIdParams, params?: Partial<Omit<MethodParams, "service" | "contextManager">>): AsyncGenerator<import("../../types/index.js").UpdateEvent, void, any>;
}
//# sourceMappingURL=service.d.ts.map