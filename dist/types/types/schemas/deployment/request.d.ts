/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Represents the parameters for a server deployment request.
 */
export declare const ServerDeploymentRequestParamsSchema: z.ZodObject<{
    /**
     * @required The name of the server
     */
    name: z.ZodString;
    /**
     * @required The agent card of the server
     */
    agentCard: z.ZodObject<{
        protocolVersion: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
        additionalInterfaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>;
        iconUrl: z.ZodOptional<z.ZodString>;
        provider: z.ZodOptional<z.ZodObject<{
            organization: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>;
        version: z.ZodString;
        documentationUrl: z.ZodOptional<z.ZodString>;
        capabilities: z.ZodObject<{
            streaming: z.ZodOptional<z.ZodBoolean>;
            pushNotifications: z.ZodOptional<z.ZodBoolean>;
            stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
            extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                uri: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                required: z.ZodOptional<z.ZodBoolean>;
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }, {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }, {
            extensions?: {
                uri: string;
                params?: Record<string, unknown> | undefined;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }>;
        securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "apiKey";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                clientCredentials: z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                implicit: z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
                password: z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodOptional<z.ZodString>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
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
            }, {
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
            }>;
            oauth2MetadataUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }>]>>>;
        security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        skills: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }, {
            description: string;
            name: string;
            id: string;
            tags?: string[] | undefined;
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }>, "many">;
        supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
        signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
            protected: z.ZodString;
            signature: z.ZodString;
            header: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        description: string;
        name: string;
        url: string;
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
        protocolVersion?: string | undefined;
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    }>;
    /**
     * @required The minified code of the server
     */
    code: z.ZodString;
    /**
     * @optional The NPM dependencies of the server(currently unsupported)
     */
    dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    agentCard: {
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
    dependencies?: string[] | undefined;
}, {
    code: string;
    name: string;
    agentCard: {
        description: string;
        name: string;
        url: string;
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
        protocolVersion?: string | undefined;
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "query" | "header" | "cookie";
            name: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | undefined;
            bearerFormat?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | undefined;
        }> | undefined;
        supportsAuthenticatedExtendedCard?: boolean | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | undefined;
        }[] | undefined;
    };
    dependencies?: string[] | undefined;
}>;
export type ServerDeploymentRequestParams = z.infer<typeof ServerDeploymentRequestParamsSchema>;
/**
 * @description Represents the base parameters for a server deployment response.
 */
export declare const BaseServerDeploymentResponseParamsSchema: z.ZodObject<{
    /**
     * @required The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
     */
    deploymentId: z.ZodString;
    /**
     * @required Whether the deployment was successful
     */
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    deploymentId: string;
}, {
    success: boolean;
    deploymentId: string;
}>;
export type BaseServerDeploymentResponseParams = z.infer<typeof BaseServerDeploymentResponseParamsSchema>;
/**
 * @description Represents the parameters for a server deployment success response.
 */
export declare const ServerDeploymentSuccessResponseParamsSchema: z.ZodObject<{
    /**
     * @required The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
     */
    deploymentId: z.ZodString;
    /**
     * @required Whether the deployment was successful
     */
    success: z.ZodBoolean;
} & {
    /**
     * @required The name of the server
     */
    name: z.ZodString;
    /**
     * @required The URL of the server
     */
    url: z.ZodString;
    /**
     * @required The base path of the server
     */
    basePath: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    url: string;
    success: boolean;
    basePath: string;
    deploymentId: string;
}, {
    name: string;
    url: string;
    success: boolean;
    basePath: string;
    deploymentId: string;
}>;
export type ServerDeploymentSuccessResponseParams = z.infer<typeof ServerDeploymentSuccessResponseParamsSchema>;
/**
 * @description Represents the request for a server deployment.
 */
export declare const ServerDeploymentRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"/deploy">;
    params: z.ZodObject<{
        /**
         * @required The name of the server
         */
        name: z.ZodString;
        /**
         * @required The agent card of the server
         */
        agentCard: z.ZodObject<{
            protocolVersion: z.ZodDefault<z.ZodString>;
            name: z.ZodString;
            description: z.ZodString;
            url: z.ZodString;
            preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
            additionalInterfaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
                url: z.ZodString;
                transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                transport: string;
            }, {
                url: string;
                transport: string;
            }>, "many">>;
            iconUrl: z.ZodOptional<z.ZodString>;
            provider: z.ZodOptional<z.ZodObject<{
                organization: z.ZodString;
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                organization: string;
            }, {
                url: string;
                organization: string;
            }>>;
            version: z.ZodString;
            documentationUrl: z.ZodOptional<z.ZodString>;
            capabilities: z.ZodObject<{
                streaming: z.ZodOptional<z.ZodBoolean>;
                pushNotifications: z.ZodOptional<z.ZodBoolean>;
                stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    uri: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    required: z.ZodOptional<z.ZodBoolean>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }, {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                extensions?: {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }[] | undefined;
                streaming?: boolean | undefined;
                pushNotifications?: boolean | undefined;
                stateTransitionHistory?: boolean | undefined;
            }, {
                extensions?: {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }[] | undefined;
                streaming?: boolean | undefined;
                pushNotifications?: boolean | undefined;
                stateTransitionHistory?: boolean | undefined;
            }>;
            securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                in: z.ZodEnum<["query", "header", "cookie"]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "apiKey";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                scheme: z.ZodString;
                bearerFormat: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: "http";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                flows: z.ZodObject<{
                    authorizationCode: z.ZodOptional<z.ZodObject<{
                        authorizationUrl: z.ZodString;
                        tokenUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        authorizationUrl: string;
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        authorizationUrl: string;
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                    clientCredentials: z.ZodOptional<z.ZodObject<{
                        tokenUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                    implicit: z.ZodOptional<z.ZodObject<{
                        authorizationUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        authorizationUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        authorizationUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                    password: z.ZodOptional<z.ZodObject<{
                        tokenUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
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
                }, {
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
                }>;
                oauth2MetadataUrl: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
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
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                openIdConnectUrl: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            }, "strip", z.ZodTypeAny, {
                type: "mutualTLS";
                description?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }>]>>>;
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
            defaultInputModes: z.ZodArray<z.ZodString, "many">;
            defaultOutputModes: z.ZodArray<z.ZodString, "many">;
            skills: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                description: z.ZodString;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                name: string;
                id: string;
                tags?: string[] | undefined;
                examples?: string[] | undefined;
                inputModes?: string[] | undefined;
                outputModes?: string[] | undefined;
                security?: Record<string, string[]>[] | undefined;
            }, {
                description: string;
                name: string;
                id: string;
                tags?: string[] | undefined;
                examples?: string[] | undefined;
                inputModes?: string[] | undefined;
                outputModes?: string[] | undefined;
                security?: Record<string, string[]>[] | undefined;
            }>, "many">;
            supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
            signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
                protected: z.ZodString;
                signature: z.ZodString;
                header: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }, {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            description: string;
            name: string;
            url: string;
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
            protocolVersion?: string | undefined;
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }> | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }[] | undefined;
        }>;
        /**
         * @required The minified code of the server
         */
        code: z.ZodString;
        /**
         * @optional The NPM dependencies of the server(currently unsupported)
         */
        dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        agentCard: {
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
        dependencies?: string[] | undefined;
    }, {
        code: string;
        name: string;
        agentCard: {
            description: string;
            name: string;
            url: string;
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
            protocolVersion?: string | undefined;
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }> | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }[] | undefined;
        };
        dependencies?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        code: string;
        name: string;
        agentCard: {
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
        dependencies?: string[] | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "/deploy";
}, {
    params: {
        code: string;
        name: string;
        agentCard: {
            description: string;
            name: string;
            url: string;
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
            protocolVersion?: string | undefined;
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }> | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }[] | undefined;
        };
        dependencies?: string[] | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "/deploy";
}>;
export type ServerDeploymentRequest = z.infer<typeof ServerDeploymentRequestSchema>;
/**
 * @description Represents the request for a test server deployment.
 */
export declare const TestServerDeploymentRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"/test/deploy">;
    params: z.ZodObject<{
        /**
         * @required The name of the server
         */
        name: z.ZodString;
        /**
         * @required The agent card of the server
         */
        agentCard: z.ZodObject<{
            protocolVersion: z.ZodDefault<z.ZodString>;
            name: z.ZodString;
            description: z.ZodString;
            url: z.ZodString;
            preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
            additionalInterfaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
                url: z.ZodString;
                transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                transport: string;
            }, {
                url: string;
                transport: string;
            }>, "many">>;
            iconUrl: z.ZodOptional<z.ZodString>;
            provider: z.ZodOptional<z.ZodObject<{
                organization: z.ZodString;
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                organization: string;
            }, {
                url: string;
                organization: string;
            }>>;
            version: z.ZodString;
            documentationUrl: z.ZodOptional<z.ZodString>;
            capabilities: z.ZodObject<{
                streaming: z.ZodOptional<z.ZodBoolean>;
                pushNotifications: z.ZodOptional<z.ZodBoolean>;
                stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
                extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    uri: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    required: z.ZodOptional<z.ZodBoolean>;
                    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }, {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                extensions?: {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }[] | undefined;
                streaming?: boolean | undefined;
                pushNotifications?: boolean | undefined;
                stateTransitionHistory?: boolean | undefined;
            }, {
                extensions?: {
                    uri: string;
                    params?: Record<string, unknown> | undefined;
                    description?: string | undefined;
                    required?: boolean | undefined;
                }[] | undefined;
                streaming?: boolean | undefined;
                pushNotifications?: boolean | undefined;
                stateTransitionHistory?: boolean | undefined;
            }>;
            securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                in: z.ZodEnum<["query", "header", "cookie"]>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "apiKey";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                scheme: z.ZodString;
                bearerFormat: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: "http";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                flows: z.ZodObject<{
                    authorizationCode: z.ZodOptional<z.ZodObject<{
                        authorizationUrl: z.ZodString;
                        tokenUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        authorizationUrl: string;
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        authorizationUrl: string;
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                    clientCredentials: z.ZodOptional<z.ZodObject<{
                        tokenUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                    implicit: z.ZodOptional<z.ZodObject<{
                        authorizationUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        authorizationUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        authorizationUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                    password: z.ZodOptional<z.ZodObject<{
                        tokenUrl: z.ZodString;
                        refreshUrl: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }, {
                        tokenUrl: string;
                        scopes: Record<string, string>;
                        refreshUrl?: string | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
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
                }, {
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
                }>;
                oauth2MetadataUrl: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
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
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
                openIdConnectUrl: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            }>, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
            } & {
                type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            }, "strip", z.ZodTypeAny, {
                type: "mutualTLS";
                description?: string | undefined;
            }, {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }>]>>>;
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
            defaultInputModes: z.ZodArray<z.ZodString, "many">;
            defaultOutputModes: z.ZodArray<z.ZodString, "many">;
            skills: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                description: z.ZodString;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                name: string;
                id: string;
                tags?: string[] | undefined;
                examples?: string[] | undefined;
                inputModes?: string[] | undefined;
                outputModes?: string[] | undefined;
                security?: Record<string, string[]>[] | undefined;
            }, {
                description: string;
                name: string;
                id: string;
                tags?: string[] | undefined;
                examples?: string[] | undefined;
                inputModes?: string[] | undefined;
                outputModes?: string[] | undefined;
                security?: Record<string, string[]>[] | undefined;
            }>, "many">;
            supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
            signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
                protected: z.ZodString;
                signature: z.ZodString;
                header: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }, {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            description: string;
            name: string;
            url: string;
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
            protocolVersion?: string | undefined;
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }> | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }[] | undefined;
        }>;
        /**
         * @required The minified code of the server
         */
        code: z.ZodString;
        /**
         * @optional The NPM dependencies of the server(currently unsupported)
         */
        dependencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        agentCard: {
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
        dependencies?: string[] | undefined;
    }, {
        code: string;
        name: string;
        agentCard: {
            description: string;
            name: string;
            url: string;
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
            protocolVersion?: string | undefined;
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }> | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }[] | undefined;
        };
        dependencies?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        code: string;
        name: string;
        agentCard: {
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
        dependencies?: string[] | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "/test/deploy";
}, {
    params: {
        code: string;
        name: string;
        agentCard: {
            description: string;
            name: string;
            url: string;
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
            protocolVersion?: string | undefined;
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                in: "query" | "header" | "cookie";
                name: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                scheme: string;
                description?: string | undefined;
                bearerFormat?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                openIdConnectUrl: string;
                description?: string | undefined;
            } | {
                type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
                description?: string | undefined;
            }> | undefined;
            supportsAuthenticatedExtendedCard?: boolean | undefined;
            signatures?: {
                protected: string;
                signature: string;
                header?: Record<string, unknown> | undefined;
            }[] | undefined;
        };
        dependencies?: string[] | undefined;
    };
    jsonrpc: "2.0";
    id: string | number;
    method: "/test/deploy";
}>;
export type TestServerDeploymentRequest = z.infer<typeof TestServerDeploymentRequestSchema>;
/**
 * @description Represents the response for a server deployment success request.
 */
export declare const ServerDeploymentSuccessResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        /**
         * @required The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
         */
        deploymentId: z.ZodString;
        /**
         * @required Whether the deployment was successful
         */
        success: z.ZodBoolean;
    } & {
        /**
         * @required The name of the server
         */
        name: z.ZodString;
        /**
         * @required The URL of the server
         */
        url: z.ZodString;
        /**
         * @required The base path of the server
         */
        basePath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    }, {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    };
    id?: string | number | undefined;
    error?: undefined;
}>;
export type ServerDeploymentSuccessResponse = z.infer<typeof ServerDeploymentSuccessResponseSchema>;
/**
 * @description Represents the response for a server deployment request.
 */
export declare const ServerDeploymentResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        /**
         * @required The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
         */
        deploymentId: z.ZodString;
        /**
         * @required Whether the deployment was successful
         */
        success: z.ZodBoolean;
    } & {
        /**
         * @required The name of the server
         */
        name: z.ZodString;
        /**
         * @required The URL of the server
         */
        url: z.ZodString;
        /**
         * @required The base path of the server
         */
        basePath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    }, {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    };
    id?: string | number | undefined;
    error?: undefined;
}, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        success: boolean;
        basePath: string;
        deploymentId: string;
    };
    id?: string | number | undefined;
    error?: undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        code: number;
        data?: unknown;
    }, {
        message: string;
        code: number;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}, {
    jsonrpc: "2.0";
    error: {
        message: string;
        code: number;
        data?: unknown;
    };
    id?: string | number | undefined;
    result?: undefined;
}>]>;
export type ServerDeploymentResponse = z.infer<typeof ServerDeploymentResponseSchema>;
//# sourceMappingURL=request.d.ts.map