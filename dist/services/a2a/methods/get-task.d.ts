/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { TaskQueryParams, MethodParams } from "../../../types/index.js";
export declare function getTask(input: TaskQueryParams, params: Omit<MethodParams, "engine" | "contextManager" | "signal">): Promise<{
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
}>;
export type GetTaskMethod = typeof getTask;
