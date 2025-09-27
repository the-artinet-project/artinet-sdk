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
    }, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<A2AExecutionEnvironment<{
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
}, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>, object, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const createA2AEnviroment: (opts: any) => any;
export declare const A2AProcedure: import("@trpc/server").TRPCProcedureBuilder<A2AExecutionEnvironment<{
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
}, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>, object, {
    engine: import("../../../types/index.js").ExecutionEngine<{
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
    }, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent> | undefined;
    service: A2AServiceInterface<{
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
    }, import("../../../types/index.js").TaskAndHistory, import("../../../types/index.js").UpdateEvent>;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
//# sourceMappingURL=trpc.d.ts.map