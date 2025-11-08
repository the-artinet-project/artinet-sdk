/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import express from "express";
import { Agent, FactoryParams as CreateAgentParams } from "../../types/index.js";
import { CorsOptions } from "cors";
export interface ServerParams {
    app?: express.Express;
    corsOptions?: CorsOptions;
    basePath?: string;
}
export declare function createAgentServer(params: ServerParams & {
    agent: Agent | CreateAgentParams;
    agentCardPath?: string;
    register?: boolean;
}): {
    app: import("express-serve-static-core").Express;
    agent: Agent<{
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
    }, import("../../types/index.js").TaskAndHistory, import("../../types/index.js").UpdateEvent>;
};
export type ExpressAgentServer = ReturnType<typeof createAgentServer>;
