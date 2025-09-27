/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const agentInfoRoute: import("@trpc/server").TRPCQueryProcedure<{
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
//# sourceMappingURL=info.d.ts.map