/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Represents the provider or organization behind an agent.
 */
export declare const AgentProviderSchema: z.ZodObject<{
    /**
     * @required The name of the organization providing the agent.
     */
    organization: z.ZodString;
    /**
     * @required URL associated with the agent provider.
     */
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    organization: string;
}, {
    url: string;
    organization: string;
}>;
export type AgentProvider = z.infer<typeof AgentProviderSchema>;
/**
 * @description A declaration of an extension supported by an Agent.
 */
export declare const AgentExtensionSchema: z.ZodObject<{
    /**
     * @required The URI of the extension.
     */
    uri: z.ZodString;
    /**
     * @optional A description of how this agent uses this extension.
     */
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @optional Whether the client must follow specific requirements of the extension.
     */
    required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    /**
     * @optional Optional configuration for the extension.
     */
    params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    required?: boolean | null | undefined;
    description?: string | null | undefined;
    params?: Record<string, unknown> | null | undefined;
}, {
    uri: string;
    required?: boolean | null | undefined;
    description?: string | null | undefined;
    params?: Record<string, unknown> | null | undefined;
}>;
export type AgentExtension = z.infer<typeof AgentExtensionSchema>;
/**
 * @description Defines optional capabilities supported by an agent.
 */
export declare const AgentCapabilitiesSchema: z.ZodObject<{
    /**
     * @optional Indicates if the agent supports streaming responses.
     */
    streaming: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    /**
     * @optional Indicates if the agent supports push notification mechanisms.
     */
    pushNotifications: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    /**
     * @optional Indicates if the agent supports providing state transition history.
     */
    stateTransitionHistory: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    /**
     * @optional Extensions supported by this agent.
     */
    extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        /**
         * @required The URI of the extension.
         */
        uri: z.ZodString;
        /**
         * @optional A description of how this agent uses this extension.
         */
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @optional Whether the client must follow specific requirements of the extension.
         */
        required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @optional Optional configuration for the extension.
         */
        params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        uri: string;
        required?: boolean | null | undefined;
        description?: string | null | undefined;
        params?: Record<string, unknown> | null | undefined;
    }, {
        uri: string;
        required?: boolean | null | undefined;
        description?: string | null | undefined;
        params?: Record<string, unknown> | null | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    extensions?: {
        uri: string;
        required?: boolean | null | undefined;
        description?: string | null | undefined;
        params?: Record<string, unknown> | null | undefined;
    }[] | null | undefined;
    streaming?: boolean | null | undefined;
    pushNotifications?: boolean | null | undefined;
    stateTransitionHistory?: boolean | null | undefined;
}, {
    extensions?: {
        uri: string;
        required?: boolean | null | undefined;
        description?: string | null | undefined;
        params?: Record<string, unknown> | null | undefined;
    }[] | null | undefined;
    streaming?: boolean | null | undefined;
    pushNotifications?: boolean | null | undefined;
    stateTransitionHistory?: boolean | null | undefined;
}>;
export type AgentCapabilities = z.infer<typeof AgentCapabilitiesSchema>;
/**
 * @description Represents a unit of capability that an agent can perform.
 */
export declare const AgentSkillSchema: z.ZodObject<{
    /**
     * @required Unique identifier for the skill.
     */
    id: z.ZodString;
    /**
     * @required Human-readable name of the skill.
     */
    name: z.ZodString;
    /**
     * @required Description of the skill.
     */
    description: z.ZodString;
    /**
     * @required List of tags associated with the skill for categorization.
     */
    tags: z.ZodArray<z.ZodString, "many">;
    /**
     * @optional List of example inputs or use cases for the skill.
     */
    examples: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    /**
     * @optional List of input modes supported by this skill.
     */
    inputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    /**
     * @optional List of output modes supported by this skill.
     */
    outputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    /**
     * @optional Security schemes necessary for the agent to leverage this skill.
     */
    security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    description: string;
    tags: string[];
    examples?: string[] | null | undefined;
    inputModes?: string[] | null | undefined;
    outputModes?: string[] | null | undefined;
    security?: Record<string, string[]>[] | null | undefined;
}, {
    name: string;
    id: string;
    description: string;
    tags: string[];
    examples?: string[] | null | undefined;
    inputModes?: string[] | null | undefined;
    outputModes?: string[] | null | undefined;
    security?: Record<string, string[]>[] | null | undefined;
}>;
export type AgentSkill = z.infer<typeof AgentSkillSchema>;
/**
 * @description AgentCardSignature represents a JWS signature of an AgentCard.
 */
export declare const AgentCardSignatureSchema: z.ZodObject<{
    /**
     * @required The protected JWS header for the signature.
     */
    protected: z.ZodString;
    /**
     * @required The computed signature, Base64url-encoded.
     */
    signature: z.ZodString;
    /**
     * @optional The unprotected JWS header values.
     */
    header: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    protected: string;
    signature: string;
    header?: Record<string, unknown> | null | undefined;
}, {
    protected: string;
    signature: string;
    header?: Record<string, unknown> | null | undefined;
}>;
export type AgentCardSignature = z.infer<typeof AgentCardSignatureSchema>;
/**
 * @description An AgentCard conveys key information about an agent's identity,
 * capabilities, skills, authentication requirements, and communication modalities.
 */
export declare const AgentCardSchema: z.ZodObject<{
    /**
     * @required The version of the A2A protocol this agent supports.
     */
    protocolVersion: z.ZodDefault<z.ZodString>;
    /**
     * @required Human readable name of the agent.
     */
    name: z.ZodString;
    /**
     * @required A human-readable description of the agent.
     */
    description: z.ZodString;
    /**
     * @required The preferred endpoint URL for interacting with the agent.
     */
    url: z.ZodString;
    /**
     * @optional The transport protocol for the preferred endpoint.
     */
    preferredTransport: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>>;
    /**
     * @optional Additional supported interfaces (transport and URL combinations).
     */
    additionalInterfaces: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        transport: string;
    }, {
        url: string;
        transport: string;
    }>, "many">>>;
    /**
     * @optional The URL of the agent's icon.
     */
    iconUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @optional The service provider of the agent.
     */
    provider: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        /**
         * @required The name of the organization providing the agent.
         */
        organization: z.ZodString;
        /**
         * @required URL associated with the agent provider.
         */
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        organization: string;
    }, {
        url: string;
        organization: string;
    }>>>;
    /**
     * @required The version identifier for the agent or its API.
     */
    version: z.ZodString;
    /**
     * @optional An optional URL pointing to the agent's documentation.
     */
    documentationUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @required The capabilities supported by the agent.
     */
    capabilities: z.ZodObject<{
        /**
         * @optional Indicates if the agent supports streaming responses.
         */
        streaming: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @optional Indicates if the agent supports push notification mechanisms.
         */
        pushNotifications: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @optional Indicates if the agent supports providing state transition history.
         */
        stateTransitionHistory: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @optional Extensions supported by this agent.
         */
        extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            /**
             * @required The URI of the extension.
             */
            uri: z.ZodString;
            /**
             * @optional A description of how this agent uses this extension.
             */
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @optional Whether the client must follow specific requirements of the extension.
             */
            required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Optional configuration for the extension.
             */
            params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            required?: boolean | null | undefined;
            description?: string | null | undefined;
            params?: Record<string, unknown> | null | undefined;
        }, {
            uri: string;
            required?: boolean | null | undefined;
            description?: string | null | undefined;
            params?: Record<string, unknown> | null | undefined;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        extensions?: {
            uri: string;
            required?: boolean | null | undefined;
            description?: string | null | undefined;
            params?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
        streaming?: boolean | null | undefined;
        pushNotifications?: boolean | null | undefined;
        stateTransitionHistory?: boolean | null | undefined;
    }, {
        extensions?: {
            uri: string;
            required?: boolean | null | undefined;
            description?: string | null | undefined;
            params?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
        streaming?: boolean | null | undefined;
        pushNotifications?: boolean | null | undefined;
        stateTransitionHistory?: boolean | null | undefined;
    }>;
    /**
     * @optional Security scheme details used for authenticating with this agent.
     * Maps scheme names to their configurations.
     */
    securitySchemes: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    } & {
        type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        in: z.ZodEnum<["query", "header", "cookie"]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "apiKey";
        in: "header" | "query" | "cookie";
        description?: string | null | undefined;
    }, {
        name: string;
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        in: "header" | "query" | "cookie";
        description?: string | null | undefined;
    }>, z.ZodObject<{
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    } & {
        type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        scheme: z.ZodString;
        bearerFormat: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: "http";
        scheme: string;
        description?: string | null | undefined;
        bearerFormat?: string | null | undefined;
    }, {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        scheme: string;
        description?: string | null | undefined;
        bearerFormat?: string | null | undefined;
    }>, z.ZodObject<{
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    } & {
        type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        flows: z.ZodObject<{
            authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                authorizationUrl: z.ZodString;
                tokenUrl: z.ZodString;
                refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                scopes: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                authorizationUrl: string;
                tokenUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }, {
                authorizationUrl: string;
                tokenUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }>>>;
            clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                tokenUrl: z.ZodString;
                refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                scopes: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tokenUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }, {
                tokenUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }>>>;
            implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                authorizationUrl: z.ZodString;
                refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                scopes: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                authorizationUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }, {
                authorizationUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }>>>;
            password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                tokenUrl: z.ZodString;
                refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                scopes: z.ZodRecord<z.ZodString, z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tokenUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }, {
                tokenUrl: string;
                scopes: Record<string, string>;
                refreshUrl?: string | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>;
        oauth2MetadataUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
    }>, z.ZodObject<{
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    } & {
        type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        openIdConnectUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "openIdConnect";
        openIdConnectUrl: string;
        description?: string | null | undefined;
    }, {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        openIdConnectUrl: string;
        description?: string | null | undefined;
    }>, z.ZodObject<{
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    } & {
        type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
    }, "strip", z.ZodTypeAny, {
        type: "mutualTLS";
        description?: string | null | undefined;
    }, {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        description?: string | null | undefined;
    }>]>>>>;
    /**
     * @optional Security requirements for contacting the agent.
     * Array of security requirement objects, where each object maps scheme names to scope arrays.
     */
    security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
    /**
     * @required The default input modes supported by the agent.
     */
    defaultInputModes: z.ZodArray<z.ZodString, "many">;
    /**
     * @required The default output modes supported by the agent.
     */
    defaultOutputModes: z.ZodArray<z.ZodString, "many">;
    /**
     * @required List of specific skills offered by the agent.
     */
    skills: z.ZodArray<z.ZodObject<{
        /**
         * @required Unique identifier for the skill.
         */
        id: z.ZodString;
        /**
         * @required Human-readable name of the skill.
         */
        name: z.ZodString;
        /**
         * @required Description of the skill.
         */
        description: z.ZodString;
        /**
         * @required List of tags associated with the skill for categorization.
         */
        tags: z.ZodArray<z.ZodString, "many">;
        /**
         * @optional List of example inputs or use cases for the skill.
         */
        examples: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        /**
         * @optional List of input modes supported by this skill.
         */
        inputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        /**
         * @optional List of output modes supported by this skill.
         */
        outputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        /**
         * @optional Security schemes necessary for the agent to leverage this skill.
         */
        security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        description: string;
        tags: string[];
        examples?: string[] | null | undefined;
        inputModes?: string[] | null | undefined;
        outputModes?: string[] | null | undefined;
        security?: Record<string, string[]>[] | null | undefined;
    }, {
        name: string;
        id: string;
        description: string;
        tags: string[];
        examples?: string[] | null | undefined;
        inputModes?: string[] | null | undefined;
        outputModes?: string[] | null | undefined;
        security?: Record<string, string[]>[] | null | undefined;
    }>, "many">;
    /**
     * @optional True if the agent supports providing an extended agent card when the user is authenticated.
     */
    supportsAuthenticatedExtendedCard: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    /**
     * @optional JSON Web Signatures computed for this AgentCard.
     */
    signatures: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        /**
         * @required The protected JWS header for the signature.
         */
        protected: z.ZodString;
        /**
         * @required The computed signature, Base64url-encoded.
         */
        signature: z.ZodString;
        /**
         * @optional The unprotected JWS header values.
         */
        header: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        protected: string;
        signature: string;
        header?: Record<string, unknown> | null | undefined;
    }, {
        protected: string;
        signature: string;
        header?: Record<string, unknown> | null | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
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
}, {
    name: string;
    url: string;
    description: string;
    version: string;
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
    protocolVersion?: string | undefined;
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
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        in: "header" | "query" | "cookie";
        description?: string | null | undefined;
    } | {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        scheme: string;
        description?: string | null | undefined;
        bearerFormat?: string | null | undefined;
    } | {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        openIdConnectUrl: string;
        description?: string | null | undefined;
    } | {
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        description?: string | null | undefined;
    }> | null | undefined;
    supportsAuthenticatedExtendedCard?: boolean | null | undefined;
    signatures?: {
        protected: string;
        signature: string;
        header?: Record<string, unknown> | null | undefined;
    }[] | null | undefined;
}>;
export type AgentCard = z.infer<typeof AgentCardSchema>;
/**
 * @description Request to get an authenticated extended card.
 */
export declare const GetAuthenticatedExtendedCardRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"agent/getAuthenticatedExtendedCard">;
    params: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "agent/getAuthenticatedExtendedCard";
    jsonrpc: "2.0";
    params?: undefined;
}, {
    id: string | number;
    method: "agent/getAuthenticatedExtendedCard";
    jsonrpc: "2.0";
    params?: undefined;
}>;
export type GetAuthenticatedExtendedCardRequest = z.infer<typeof GetAuthenticatedExtendedCardRequestSchema>;
/**
 * @description JSON-RPC success response model for the 'agent/getAuthenticatedExtendedCard' method.
 */
export declare const GetAuthenticatedExtendedCardSuccessResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        /**
         * @required The version of the A2A protocol this agent supports.
         */
        protocolVersion: z.ZodDefault<z.ZodString>;
        /**
         * @required Human readable name of the agent.
         */
        name: z.ZodString;
        /**
         * @required A human-readable description of the agent.
         */
        description: z.ZodString;
        /**
         * @required The preferred endpoint URL for interacting with the agent.
         */
        url: z.ZodString;
        /**
         * @optional The transport protocol for the preferred endpoint.
         */
        preferredTransport: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>>;
        /**
         * @optional Additional supported interfaces (transport and URL combinations).
         */
        additionalInterfaces: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>>;
        /**
         * @optional The URL of the agent's icon.
         */
        iconUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @optional The service provider of the agent.
         */
        provider: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The name of the organization providing the agent.
             */
            organization: z.ZodString;
            /**
             * @required URL associated with the agent provider.
             */
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>>;
        /**
         * @required The version identifier for the agent or its API.
         */
        version: z.ZodString;
        /**
         * @optional An optional URL pointing to the agent's documentation.
         */
        documentationUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @required The capabilities supported by the agent.
         */
        capabilities: z.ZodObject<{
            /**
             * @optional Indicates if the agent supports streaming responses.
             */
            streaming: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Indicates if the agent supports push notification mechanisms.
             */
            pushNotifications: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Indicates if the agent supports providing state transition history.
             */
            stateTransitionHistory: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Extensions supported by this agent.
             */
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
                /**
                 * @required The URI of the extension.
                 */
                uri: z.ZodString;
                /**
                 * @optional A description of how this agent uses this extension.
                 */
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                /**
                 * @optional Whether the client must follow specific requirements of the extension.
                 */
                required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
                /**
                 * @optional Optional configuration for the extension.
                 */
                params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }>;
        /**
         * @optional Security scheme details used for authenticating with this agent.
         * Maps scheme names to their configurations.
         */
        securitySchemes: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
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
            }, {
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
            }>;
            oauth2MetadataUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }>]>>>>;
        /**
         * @optional Security requirements for contacting the agent.
         * Array of security requirement objects, where each object maps scheme names to scope arrays.
         */
        security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        /**
         * @required The default input modes supported by the agent.
         */
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        /**
         * @required The default output modes supported by the agent.
         */
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        /**
         * @required List of specific skills offered by the agent.
         */
        skills: z.ZodArray<z.ZodObject<{
            /**
             * @required Unique identifier for the skill.
             */
            id: z.ZodString;
            /**
             * @required Human-readable name of the skill.
             */
            name: z.ZodString;
            /**
             * @required Description of the skill.
             */
            description: z.ZodString;
            /**
             * @required List of tags associated with the skill for categorization.
             */
            tags: z.ZodArray<z.ZodString, "many">;
            /**
             * @optional List of example inputs or use cases for the skill.
             */
            examples: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional List of input modes supported by this skill.
             */
            inputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional List of output modes supported by this skill.
             */
            outputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional Security schemes necessary for the agent to leverage this skill.
             */
            security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }>, "many">;
        /**
         * @optional True if the agent supports providing an extended agent card when the user is authenticated.
         */
        supportsAuthenticatedExtendedCard: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @optional JSON Web Signatures computed for this AgentCard.
         */
        signatures: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            /**
             * @required The protected JWS header for the signature.
             */
            protected: z.ZodString;
            /**
             * @required The computed signature, Base64url-encoded.
             */
            signature: z.ZodString;
            /**
             * @optional The unprotected JWS header values.
             */
            header: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        name: string;
        url: string;
        description: string;
        version: string;
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
        protocolVersion?: string | undefined;
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
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
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        description: string;
        version: string;
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
        protocolVersion?: string | undefined;
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>;
export type GetAuthenticatedExtendedCardSuccessResponse = z.infer<typeof GetAuthenticatedExtendedCardSuccessResponseSchema>;
/**
 * @description Response to a `agent/getAuthenticatedExtendedCard` request.
 */
export declare const GetAuthenticatedExtendedCardResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    error: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
} & {
    result: z.ZodObject<{
        /**
         * @required The version of the A2A protocol this agent supports.
         */
        protocolVersion: z.ZodDefault<z.ZodString>;
        /**
         * @required Human readable name of the agent.
         */
        name: z.ZodString;
        /**
         * @required A human-readable description of the agent.
         */
        description: z.ZodString;
        /**
         * @required The preferred endpoint URL for interacting with the agent.
         */
        url: z.ZodString;
        /**
         * @optional The transport protocol for the preferred endpoint.
         */
        preferredTransport: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>>;
        /**
         * @optional Additional supported interfaces (transport and URL combinations).
         */
        additionalInterfaces: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            transport: z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            transport: string;
        }, {
            url: string;
            transport: string;
        }>, "many">>>;
        /**
         * @optional The URL of the agent's icon.
         */
        iconUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @optional The service provider of the agent.
         */
        provider: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The name of the organization providing the agent.
             */
            organization: z.ZodString;
            /**
             * @required URL associated with the agent provider.
             */
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            organization: string;
        }, {
            url: string;
            organization: string;
        }>>>;
        /**
         * @required The version identifier for the agent or its API.
         */
        version: z.ZodString;
        /**
         * @optional An optional URL pointing to the agent's documentation.
         */
        documentationUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @required The capabilities supported by the agent.
         */
        capabilities: z.ZodObject<{
            /**
             * @optional Indicates if the agent supports streaming responses.
             */
            streaming: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Indicates if the agent supports push notification mechanisms.
             */
            pushNotifications: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Indicates if the agent supports providing state transition history.
             */
            stateTransitionHistory: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            /**
             * @optional Extensions supported by this agent.
             */
            extensions: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
                /**
                 * @required The URI of the extension.
                 */
                uri: z.ZodString;
                /**
                 * @optional A description of how this agent uses this extension.
                 */
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                /**
                 * @optional Whether the client must follow specific requirements of the extension.
                 */
                required: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
                /**
                 * @optional Optional configuration for the extension.
                 */
                params: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }, {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }, {
            extensions?: {
                uri: string;
                required?: boolean | null | undefined;
                description?: string | null | undefined;
                params?: Record<string, unknown> | null | undefined;
            }[] | null | undefined;
            streaming?: boolean | null | undefined;
            pushNotifications?: boolean | null | undefined;
            stateTransitionHistory?: boolean | null | undefined;
        }>;
        /**
         * @optional Security scheme details used for authenticating with this agent.
         * Maps scheme names to their configurations.
         */
        securitySchemes: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "http", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            scheme: z.ZodString;
            bearerFormat: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            type: "http";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            flows: z.ZodObject<{
                authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    authorizationUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    authorizationUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
                password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    tokenUrl: z.ZodString;
                    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }, {
                    tokenUrl: string;
                    scopes: Record<string, string>;
                    refreshUrl?: string | null | undefined;
                }>>>;
            }, "strip", z.ZodTypeAny, {
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
            }, {
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
            }>;
            oauth2MetadataUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "openIdConnect", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            openIdConnectUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        }>, z.ZodObject<{
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        }, "strip", z.ZodTypeAny, {
            type: "mutualTLS";
            description?: string | null | undefined;
        }, {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }>]>>>>;
        /**
         * @optional Security requirements for contacting the agent.
         * Array of security requirement objects, where each object maps scheme names to scope arrays.
         */
        security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        /**
         * @required The default input modes supported by the agent.
         */
        defaultInputModes: z.ZodArray<z.ZodString, "many">;
        /**
         * @required The default output modes supported by the agent.
         */
        defaultOutputModes: z.ZodArray<z.ZodString, "many">;
        /**
         * @required List of specific skills offered by the agent.
         */
        skills: z.ZodArray<z.ZodObject<{
            /**
             * @required Unique identifier for the skill.
             */
            id: z.ZodString;
            /**
             * @required Human-readable name of the skill.
             */
            name: z.ZodString;
            /**
             * @required Description of the skill.
             */
            description: z.ZodString;
            /**
             * @required List of tags associated with the skill for categorization.
             */
            tags: z.ZodArray<z.ZodString, "many">;
            /**
             * @optional List of example inputs or use cases for the skill.
             */
            examples: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional List of input modes supported by this skill.
             */
            inputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional List of output modes supported by this skill.
             */
            outputModes: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            /**
             * @optional Security schemes necessary for the agent to leverage this skill.
             */
            security: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | null | undefined;
            inputModes?: string[] | null | undefined;
            outputModes?: string[] | null | undefined;
            security?: Record<string, string[]>[] | null | undefined;
        }>, "many">;
        /**
         * @optional True if the agent supports providing an extended agent card when the user is authenticated.
         */
        supportsAuthenticatedExtendedCard: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        /**
         * @optional JSON Web Signatures computed for this AgentCard.
         */
        signatures: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            /**
             * @required The protected JWS header for the signature.
             */
            protected: z.ZodString;
            /**
             * @required The computed signature, Base64url-encoded.
             */
            signature: z.ZodString;
            /**
             * @optional The unprotected JWS header values.
             */
            header: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        }, "strip", z.ZodTypeAny, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }, {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        name: string;
        url: string;
        description: string;
        version: string;
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
        protocolVersion?: string | undefined;
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
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
    error?: null | undefined;
    id?: string | number | null | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        name: string;
        url: string;
        description: string;
        version: string;
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
        protocolVersion?: string | undefined;
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            scheme: string;
            description?: string | null | undefined;
            bearerFormat?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
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
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            openIdConnectUrl: string;
            description?: string | null | undefined;
        } | {
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            description?: string | null | undefined;
        }> | null | undefined;
        supportsAuthenticatedExtendedCard?: boolean | null | undefined;
        signatures?: {
            protected: string;
            signature: string;
            header?: Record<string, unknown> | null | undefined;
        }[] | null | undefined;
    };
    error?: null | undefined;
    id?: string | number | null | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
} & {
    result: z.ZodNullable<z.ZodOptional<z.ZodNever>>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodNullable<z.ZodOptional<z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | null | undefined;
    result?: null | undefined;
}>]>;
export type GetAuthenticatedExtendedCardResponse = z.infer<typeof GetAuthenticatedExtendedCardResponseSchema>;
