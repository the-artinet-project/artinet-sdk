/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const agentInfoRoute: import("@trpc/server").TRPCQueryProcedure<{
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
