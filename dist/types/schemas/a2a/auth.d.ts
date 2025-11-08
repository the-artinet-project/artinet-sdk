/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * @description Type of a security scheme.
 */
export declare const SecuritySchemeTypeSchema: z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>;
export declare const SecuritySchemeType: z.Values<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>;
export type SecuritySchemeType = z.infer<typeof SecuritySchemeTypeSchema>;
/**
 * @description Base properties shared by all security schemes.
 */
export declare const SecuritySchemeBaseSchema: z.ZodObject<{
    /**
     * @required Type of the security scheme.
     */
    type: z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>;
    /**
     * @optional Description of this security scheme.
     */
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
    description?: string | null | undefined;
}, {
    type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
    description?: string | null | undefined;
}>;
export type SecuritySchemeBase = z.infer<typeof SecuritySchemeBaseSchema>;
/**
 * @description Defines a security scheme using an API key.
 */
export declare const APIKeySecuritySchemeSchema: z.ZodObject<{
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
}>;
export type APIKeySecurityScheme = z.infer<typeof APIKeySecuritySchemeSchema>;
/**
 * @description HTTP Authentication security scheme.
 */
export declare const HTTPAuthSecuritySchemeSchema: z.ZodObject<{
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
}>;
export type HTTPAuthSecurityScheme = z.infer<typeof HTTPAuthSecuritySchemeSchema>;
/**
 * @description Configuration details for a supported Authorization Code OAuth Flow
 */
export declare const AuthorizationCodeOAuthFlowSchema: z.ZodObject<{
    /**
     * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
     * standard requires the use of TLS
     */
    authorizationUrl: z.ZodString;
    /**
     * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
     * requires the use of TLS.
     */
    tokenUrl: z.ZodString;
    /**
     * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
     * standard requires the use of TLS.
     */
    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
     * description for it. The map MAY be empty.
     */
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
}>;
export type AuthorizationCodeOAuthFlow = z.infer<typeof AuthorizationCodeOAuthFlowSchema>;
/**
 * @description Configuration details for a supported Client Credentials OAuth Flow
 */
export declare const ClientCredentialsOAuthFlowSchema: z.ZodObject<{
    /**
     * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
     * requires the use of TLS.
     */
    tokenUrl: z.ZodString;
    /**
     * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
     * standard requires the use of TLS.
     */
    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
     * description for it. The map MAY be empty.
     */
    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenUrl: string;
    scopes: Record<string, string>;
    refreshUrl?: string | null | undefined;
}, {
    tokenUrl: string;
    scopes: Record<string, string>;
    refreshUrl?: string | null | undefined;
}>;
export type ClientCredentialsOAuthFlow = z.infer<typeof ClientCredentialsOAuthFlowSchema>;
/**
 * @description Configuration details for a supported Implicit OAuth Flow
 */
export declare const ImplicitOAuthFlowSchema: z.ZodObject<{
    /**
     * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
     * standard requires the use of TLS
     */
    authorizationUrl: z.ZodString;
    /**
     * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
     * standard requires the use of TLS.
     */
    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
     * description for it. The map MAY be empty.
     */
    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    authorizationUrl: string;
    scopes: Record<string, string>;
    refreshUrl?: string | null | undefined;
}, {
    authorizationUrl: string;
    scopes: Record<string, string>;
    refreshUrl?: string | null | undefined;
}>;
export type ImplicitOAuthFlow = z.infer<typeof ImplicitOAuthFlowSchema>;
/**
 * @description Configuration details for a supported Password OAuth Flow
 */
export declare const PasswordOAuthFlowSchema: z.ZodObject<{
    /**
     * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
     * requires the use of TLS.
     */
    tokenUrl: z.ZodString;
    /**
     * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
     * standard requires the use of TLS.
     */
    refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    /**
     * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
     * description for it. The map MAY be empty.
     */
    scopes: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tokenUrl: string;
    scopes: Record<string, string>;
    refreshUrl?: string | null | undefined;
}, {
    tokenUrl: string;
    scopes: Record<string, string>;
    refreshUrl?: string | null | undefined;
}>;
export type PasswordOAuthFlow = z.infer<typeof PasswordOAuthFlowSchema>;
/**
 * @description The configuration of supported OAuth Flows
 */
export declare const OAuthFlowsSchema: z.ZodObject<{
    /**
     * @optional Configuration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.
     */
    authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        /**
         * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
         * standard requires the use of TLS
         */
        authorizationUrl: z.ZodString;
        /**
         * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
         * requires the use of TLS.
         */
        tokenUrl: z.ZodString;
        /**
         * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
         * standard requires the use of TLS.
         */
        refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
         * description for it. The map MAY be empty.
         */
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
    /**
     * @optional Configuration for the OAuth Client Credentials flow. Previously called application in OpenAPI 2.0
     */
    clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        /**
         * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
         * requires the use of TLS.
         */
        tokenUrl: z.ZodString;
        /**
         * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
         * standard requires the use of TLS.
         */
        refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
         * description for it. The map MAY be empty.
         */
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
    /**
     * @optional Configuration for the OAuth Implicit flow
     */
    implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        /**
         * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
         * standard requires the use of TLS
         */
        authorizationUrl: z.ZodString;
        /**
         * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
         * standard requires the use of TLS.
         */
        refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
         * description for it. The map MAY be empty.
         */
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
    /**
     * @optional Configuration for the OAuth Resource Owner Password flow
     */
    password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        /**
         * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
         * requires the use of TLS.
         */
        tokenUrl: z.ZodString;
        /**
         * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
         * standard requires the use of TLS.
         */
        refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        /**
         * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
         * description for it. The map MAY be empty.
         */
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
export type OAuthFlows = z.infer<typeof OAuthFlowsSchema>;
/**
 * @description OAuth2 security scheme configuration.
 */
export declare const OAuth2SecuritySchemeSchema: z.ZodObject<{
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
} & {
    type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "oauth2", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
    flows: z.ZodObject<{
        /**
         * @optional Configuration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.
         */
        authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS
             */
            authorizationUrl: z.ZodString;
            /**
             * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
             * requires the use of TLS.
             */
            tokenUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
        /**
         * @optional Configuration for the OAuth Client Credentials flow. Previously called application in OpenAPI 2.0
         */
        clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
             * requires the use of TLS.
             */
            tokenUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
        /**
         * @optional Configuration for the OAuth Implicit flow
         */
        implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS
             */
            authorizationUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
        /**
         * @optional Configuration for the OAuth Resource Owner Password flow
         */
        password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
             * requires the use of TLS.
             */
            tokenUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
}>;
export type OAuth2SecurityScheme = z.infer<typeof OAuth2SecuritySchemeSchema>;
/**
 * @description OpenID Connect security scheme.
 */
export declare const OpenIdConnectSecuritySchemeSchema: z.ZodObject<{
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
}>;
export type OpenIdConnectSecurityScheme = z.infer<typeof OpenIdConnectSecuritySchemeSchema>;
/**
 * @description Mutual TLS (mTLS) security scheme.
 */
export declare const MutualTLSSecuritySchemeSchema: z.ZodObject<{
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
} & {
    type: z.ZodEffects<z.ZodEnum<["apiKey", "http", "mutualTLS", "oauth2", "openIdConnect"]>, "mutualTLS", "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect">;
}, "strip", z.ZodTypeAny, {
    type: "mutualTLS";
    description?: string | null | undefined;
}, {
    type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
    description?: string | null | undefined;
}>;
export type MutualTLSSecurityScheme = z.infer<typeof MutualTLSSecuritySchemeSchema>;
export declare const SecuritySchemeSchema: z.ZodUnion<[z.ZodObject<{
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
        /**
         * @optional Configuration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.
         */
        authorizationCode: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS
             */
            authorizationUrl: z.ZodString;
            /**
             * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
             * requires the use of TLS.
             */
            tokenUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
        /**
         * @optional Configuration for the OAuth Client Credentials flow. Previously called application in OpenAPI 2.0
         */
        clientCredentials: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
             * requires the use of TLS.
             */
            tokenUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
        /**
         * @optional Configuration for the OAuth Implicit flow
         */
        implicit: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS
             */
            authorizationUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
        /**
         * @optional Configuration for the OAuth Resource Owner Password flow
         */
        password: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            /**
             * @required The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard
             * requires the use of TLS.
             */
            tokenUrl: z.ZodString;
            /**
             * @optional The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2
             * standard requires the use of TLS.
             */
            refreshUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            /**
             * @required The available scopes for the OAuth2 security scheme. A map between the scope name and a short
             * description for it. The map MAY be empty.
             */
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
}>]>;
export type SecurityScheme = z.infer<typeof SecuritySchemeSchema>;
