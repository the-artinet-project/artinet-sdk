/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2AServiceInterface, Command, ExecutionEnvironment, State, Update } from "../../../types/index.js";
export interface A2AExecutionEnvironment<TCommand extends Command = Command, TState extends State = State, TUpdate extends Update = Update> extends ExecutionEnvironment<TCommand, TState, TUpdate> {
    /**
     * The service is the main interface for the A2A protocol.
     * It is used to send messages, get tasks, and cancel tasks.
     * In the future, we may want to dynamically change the service based on the path.
     * (e.g. multiple services for different paths/agents. an MCP Service. a factory function. etc.)
     */
    service: A2AServiceInterface<TCommand, TState, TUpdate>;
}
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: A2AExecutionEnvironment<{
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
    }, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<A2AExecutionEnvironment<{
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
}, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>, object, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const createA2AEnviroment: (opts: any) => any;
export declare const A2AProcedure: import("@trpc/server").TRPCProcedureBuilder<A2AExecutionEnvironment<{
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
}, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>, object, {
    engine: import("../../../types/index.js").ExecutionEngine<{
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
    }, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent> | undefined;
    service: A2AServiceInterface<{
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
    }, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
