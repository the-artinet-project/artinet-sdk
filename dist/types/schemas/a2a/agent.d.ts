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
    description: z.ZodOptional<z.ZodString>;
    /**
     * @optional Whether the client must follow specific requirements of the extension.
     */
    required: z.ZodOptional<z.ZodBoolean>;
    /**
     * @optional Optional configuration for the extension.
     */
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    required?: boolean | undefined;
    description?: string | undefined;
    params?: Record<string, unknown> | undefined;
}, {
    uri: string;
    required?: boolean | undefined;
    description?: string | undefined;
    params?: Record<string, unknown> | undefined;
}>;
export type AgentExtension = z.infer<typeof AgentExtensionSchema>;
/**
 * @description Defines optional capabilities supported by an agent.
 */
export declare const AgentCapabilitiesSchema: z.ZodObject<{
    /**
     * @optional Indicates if the agent supports streaming responses.
     */
    streaming: z.ZodOptional<z.ZodBoolean>;
    /**
     * @optional Indicates if the agent supports push notification mechanisms.
     */
    pushNotifications: z.ZodOptional<z.ZodBoolean>;
    /**
     * @optional Indicates if the agent supports providing state transition history.
     */
    stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
    /**
     * @optional Extensions supported by this agent.
     */
    extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        /**
         * @required The URI of the extension.
         */
        uri: z.ZodString;
        /**
         * @optional A description of how this agent uses this extension.
         */
        description: z.ZodOptional<z.ZodString>;
        /**
         * @optional Whether the client must follow specific requirements of the extension.
         */
        required: z.ZodOptional<z.ZodBoolean>;
        /**
         * @optional Optional configuration for the extension.
         */
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        uri: string;
        required?: boolean | undefined;
        description?: string | undefined;
        params?: Record<string, unknown> | undefined;
    }, {
        uri: string;
        required?: boolean | undefined;
        description?: string | undefined;
        params?: Record<string, unknown> | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    extensions?: {
        uri: string;
        required?: boolean | undefined;
        description?: string | undefined;
        params?: Record<string, unknown> | undefined;
    }[] | undefined;
    streaming?: boolean | undefined;
    pushNotifications?: boolean | undefined;
    stateTransitionHistory?: boolean | undefined;
}, {
    extensions?: {
        uri: string;
        required?: boolean | undefined;
        description?: string | undefined;
        params?: Record<string, unknown> | undefined;
    }[] | undefined;
    streaming?: boolean | undefined;
    pushNotifications?: boolean | undefined;
    stateTransitionHistory?: boolean | undefined;
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
    examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * @optional List of input modes supported by this skill.
     */
    inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * @optional List of output modes supported by this skill.
     */
    outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * @optional Security schemes necessary for the agent to leverage this skill.
     */
    security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    description: string;
    tags: string[];
    examples?: string[] | undefined;
    inputModes?: string[] | undefined;
    outputModes?: string[] | undefined;
    security?: Record<string, string[]>[] | undefined;
}, {
    name: string;
    id: string;
    description: string;
    tags: string[];
    examples?: string[] | undefined;
    inputModes?: string[] | undefined;
    outputModes?: string[] | undefined;
    security?: Record<string, string[]>[] | undefined;
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
    header: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    protected: string;
    signature: string;
    header?: Record<string, unknown> | undefined;
}, {
    protected: string;
    signature: string;
    header?: Record<string, unknown> | undefined;
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
    preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
    /**
     * @optional Additional supported interfaces (transport and URL combinations).
     */
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
    /**
     * @optional The URL of the agent's icon.
     */
    iconUrl: z.ZodOptional<z.ZodString>;
    /**
     * @optional The service provider of the agent.
     */
    provider: z.ZodOptional<z.ZodObject<{
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
    }>>;
    /**
     * @required The version identifier for the agent or its API.
     */
    version: z.ZodString;
    /**
     * @optional An optional URL pointing to the agent's documentation.
     */
    documentationUrl: z.ZodOptional<z.ZodString>;
    /**
     * @required The capabilities supported by the agent.
     */
    capabilities: z.ZodObject<{
        /**
         * @optional Indicates if the agent supports streaming responses.
         */
        streaming: z.ZodOptional<z.ZodBoolean>;
        /**
         * @optional Indicates if the agent supports push notification mechanisms.
         */
        pushNotifications: z.ZodOptional<z.ZodBoolean>;
        /**
         * @optional Indicates if the agent supports providing state transition history.
         */
        stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
        /**
         * @optional Extensions supported by this agent.
         */
        extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            /**
             * @required The URI of the extension.
             */
            uri: z.ZodString;
            /**
             * @optional A description of how this agent uses this extension.
             */
            description: z.ZodOptional<z.ZodString>;
            /**
             * @optional Whether the client must follow specific requirements of the extension.
             */
            required: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Optional configuration for the extension.
             */
            params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            required?: boolean | undefined;
            description?: string | undefined;
            params?: Record<string, unknown> | undefined;
        }, {
            uri: string;
            required?: boolean | undefined;
            description?: string | undefined;
            params?: Record<string, unknown> | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        extensions?: {
            uri: string;
            required?: boolean | undefined;
            description?: string | undefined;
            params?: Record<string, unknown> | undefined;
        }[] | undefined;
        streaming?: boolean | undefined;
        pushNotifications?: boolean | undefined;
        stateTransitionHistory?: boolean | undefined;
    }, {
        extensions?: {
            uri: string;
            required?: boolean | undefined;
            description?: string | undefined;
            params?: Record<string, unknown> | undefined;
        }[] | undefined;
        streaming?: boolean | undefined;
        pushNotifications?: boolean | undefined;
        stateTransitionHistory?: boolean | undefined;
    }>;
    /**
     * @optional Security scheme details used for authenticating with this agent.
     * Maps scheme names to their configurations.
     */
    securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
        in: z.ZodEnum<["query", "header", "cookie"]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "apiKey";
        in: "header" | "query" | "cookie";
        description?: string | undefined;
    }, {
        name: string;
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        in: "header" | "query" | "cookie";
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
    /**
     * @optional Security requirements for contacting the agent.
     * Array of security requirement objects, where each object maps scheme names to scope arrays.
     */
    security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
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
        examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /**
         * @optional List of input modes supported by this skill.
         */
        inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /**
         * @optional List of output modes supported by this skill.
         */
        outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /**
         * @optional Security schemes necessary for the agent to leverage this skill.
         */
        security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        description: string;
        tags: string[];
        examples?: string[] | undefined;
        inputModes?: string[] | undefined;
        outputModes?: string[] | undefined;
        security?: Record<string, string[]>[] | undefined;
    }, {
        name: string;
        id: string;
        description: string;
        tags: string[];
        examples?: string[] | undefined;
        inputModes?: string[] | undefined;
        outputModes?: string[] | undefined;
        security?: Record<string, string[]>[] | undefined;
    }>, "many">;
    /**
     * @optional True if the agent supports providing an extended agent card when the user is authenticated.
     */
    supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
    /**
     * @optional JSON Web Signatures computed for this AgentCard.
     */
    signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    name: string;
    url: string;
    description: string;
    version: string;
    protocolVersion: string;
    capabilities: {
        extensions?: {
            uri: string;
            required?: boolean | undefined;
            description?: string | undefined;
            params?: Record<string, unknown> | undefined;
        }[] | undefined;
        streaming?: boolean | undefined;
        pushNotifications?: boolean | undefined;
        stateTransitionHistory?: boolean | undefined;
    };
    defaultInputModes: string[];
    defaultOutputModes: string[];
    skills: {
        name: string;
        id: string;
        description: string;
        tags: string[];
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
        name: string;
        type: "apiKey";
        in: "header" | "query" | "cookie";
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
    name: string;
    url: string;
    description: string;
    version: string;
    capabilities: {
        extensions?: {
            uri: string;
            required?: boolean | undefined;
            description?: string | undefined;
            params?: Record<string, unknown> | undefined;
        }[] | undefined;
        streaming?: boolean | undefined;
        pushNotifications?: boolean | undefined;
        stateTransitionHistory?: boolean | undefined;
    };
    defaultInputModes: string[];
    defaultOutputModes: string[];
    skills: {
        name: string;
        id: string;
        description: string;
        tags: string[];
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
        name: string;
        type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
        in: "header" | "query" | "cookie";
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
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
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
        preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
        /**
         * @optional Additional supported interfaces (transport and URL combinations).
         */
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
        /**
         * @optional The URL of the agent's icon.
         */
        iconUrl: z.ZodOptional<z.ZodString>;
        /**
         * @optional The service provider of the agent.
         */
        provider: z.ZodOptional<z.ZodObject<{
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
        }>>;
        /**
         * @required The version identifier for the agent or its API.
         */
        version: z.ZodString;
        /**
         * @optional An optional URL pointing to the agent's documentation.
         */
        documentationUrl: z.ZodOptional<z.ZodString>;
        /**
         * @required The capabilities supported by the agent.
         */
        capabilities: z.ZodObject<{
            /**
             * @optional Indicates if the agent supports streaming responses.
             */
            streaming: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Indicates if the agent supports push notification mechanisms.
             */
            pushNotifications: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Indicates if the agent supports providing state transition history.
             */
            stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Extensions supported by this agent.
             */
            extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /**
                 * @required The URI of the extension.
                 */
                uri: z.ZodString;
                /**
                 * @optional A description of how this agent uses this extension.
                 */
                description: z.ZodOptional<z.ZodString>;
                /**
                 * @optional Whether the client must follow specific requirements of the extension.
                 */
                required: z.ZodOptional<z.ZodBoolean>;
                /**
                 * @optional Optional configuration for the extension.
                 */
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }, {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }, {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }>;
        /**
         * @optional Security scheme details used for authenticating with this agent.
         * Maps scheme names to their configurations.
         */
        securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | undefined;
        }, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
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
        /**
         * @optional Security requirements for contacting the agent.
         * Array of security requirement objects, where each object maps scheme names to scope arrays.
         */
        security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
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
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional List of input modes supported by this skill.
             */
            inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional List of output modes supported by this skill.
             */
            outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional Security schemes necessary for the agent to leverage this skill.
             */
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }>, "many">;
        /**
         * @optional True if the agent supports providing an extended agent card when the user is authenticated.
         */
        supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
        /**
         * @optional JSON Web Signatures computed for this AgentCard.
         */
        signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
        name: string;
        url: string;
        description: string;
        version: string;
        protocolVersion: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
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
        name: string;
        url: string;
        description: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
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
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
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
    error?: undefined;
    id?: string | number | undefined;
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
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
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
    error?: undefined;
    id?: string | number | undefined;
}>;
export type GetAuthenticatedExtendedCardSuccessResponse = z.infer<typeof GetAuthenticatedExtendedCardSuccessResponseSchema>;
/**
 * @description Response to a `agent/getAuthenticatedExtendedCard` request.
 */
export declare const GetAuthenticatedExtendedCardResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
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
        preferredTransport: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["JSONRPC", "GRPC", "HTTP+JSON"]>, z.ZodString]>>;
        /**
         * @optional Additional supported interfaces (transport and URL combinations).
         */
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
        /**
         * @optional The URL of the agent's icon.
         */
        iconUrl: z.ZodOptional<z.ZodString>;
        /**
         * @optional The service provider of the agent.
         */
        provider: z.ZodOptional<z.ZodObject<{
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
        }>>;
        /**
         * @required The version identifier for the agent or its API.
         */
        version: z.ZodString;
        /**
         * @optional An optional URL pointing to the agent's documentation.
         */
        documentationUrl: z.ZodOptional<z.ZodString>;
        /**
         * @required The capabilities supported by the agent.
         */
        capabilities: z.ZodObject<{
            /**
             * @optional Indicates if the agent supports streaming responses.
             */
            streaming: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Indicates if the agent supports push notification mechanisms.
             */
            pushNotifications: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Indicates if the agent supports providing state transition history.
             */
            stateTransitionHistory: z.ZodOptional<z.ZodBoolean>;
            /**
             * @optional Extensions supported by this agent.
             */
            extensions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                /**
                 * @required The URI of the extension.
                 */
                uri: z.ZodString;
                /**
                 * @optional A description of how this agent uses this extension.
                 */
                description: z.ZodOptional<z.ZodString>;
                /**
                 * @optional Whether the client must follow specific requirements of the extension.
                 */
                required: z.ZodOptional<z.ZodBoolean>;
                /**
                 * @optional Optional configuration for the extension.
                 */
                params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }, {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }, {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        }>;
        /**
         * @optional Security scheme details used for authenticating with this agent.
         * Maps scheme names to their configurations.
         */
        securitySchemes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "apiKey", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
            in: z.ZodEnum<["query", "header", "cookie"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
            description?: string | undefined;
        }, {
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
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
        /**
         * @optional Security requirements for contacting the agent.
         * Array of security requirement objects, where each object maps scheme names to scope arrays.
         */
        security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
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
            examples: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional List of input modes supported by this skill.
             */
            inputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional List of output modes supported by this skill.
             */
            outputModes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            /**
             * @optional Security schemes necessary for the agent to leverage this skill.
             */
            security: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }, {
            name: string;
            id: string;
            description: string;
            tags: string[];
            examples?: string[] | undefined;
            inputModes?: string[] | undefined;
            outputModes?: string[] | undefined;
            security?: Record<string, string[]>[] | undefined;
        }>, "many">;
        /**
         * @optional True if the agent supports providing an extended agent card when the user is authenticated.
         */
        supportsAuthenticatedExtendedCard: z.ZodOptional<z.ZodBoolean>;
        /**
         * @optional JSON Web Signatures computed for this AgentCard.
         */
        signatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
        name: string;
        url: string;
        description: string;
        version: string;
        protocolVersion: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
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
        name: string;
        url: string;
        description: string;
        version: string;
        capabilities: {
            extensions?: {
                uri: string;
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
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
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey";
            in: "header" | "query" | "cookie";
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
    error?: undefined;
    id?: string | number | undefined;
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
                required?: boolean | undefined;
                description?: string | undefined;
                params?: Record<string, unknown> | undefined;
            }[] | undefined;
            streaming?: boolean | undefined;
            pushNotifications?: boolean | undefined;
            stateTransitionHistory?: boolean | undefined;
        };
        defaultInputModes: string[];
        defaultOutputModes: string[];
        skills: {
            name: string;
            id: string;
            description: string;
            tags: string[];
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
            name: string;
            type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
            in: "header" | "query" | "cookie";
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
    error?: undefined;
    id?: string | number | undefined;
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
    id?: string | number | undefined;
    result?: undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}>]>;
export type GetAuthenticatedExtendedCardResponse = z.infer<typeof GetAuthenticatedExtendedCardResponseSchema>;
