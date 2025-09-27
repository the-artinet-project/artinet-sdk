/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskIdParams, MethodParams } from "../../../types/index.js";
export declare function getTask(input: TaskIdParams, params: Omit<MethodParams, "engine" | "contextManager" | "signal">): Promise<{
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
export type GetTaskMethod = typeof getTask;
//# sourceMappingURL=get-task.d.ts.map