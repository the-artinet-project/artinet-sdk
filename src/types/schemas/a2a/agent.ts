/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";
import { SecuritySchemeSchema } from "./auth.js";
import { TransportProtocolSchema, AgentInterfaceSchema } from "./transport.js";
import {
  JSONRPCRequestSchema,
  JSONRPCSuccessResponseSchema,
  JSONRPCErrorResponseSchema,
} from "./rpc.js";

/**
 * @description Represents the provider or organization behind an agent.
 */
export const AgentProviderSchema = z
  .object({
    /**
     * @required The name of the organization providing the agent.
     */
    organization: z
      .string()
      .describe("The name of the organization providing the agent."),

    /**
     * @required URL associated with the agent provider.
     */
    url: z.string().url().describe("URL associated with the agent provider."),
  })
  .describe("The provider or organization behind an agent.");

export type AgentProvider = z.infer<typeof AgentProviderSchema>;

/**
 * @description A declaration of an extension supported by an Agent.
 */
export const AgentExtensionSchema = z
  .object({
    /**
     * @required The URI of the extension.
     */
    uri: z.string().describe("The URI of the extension."),

    /**
     * @optional A description of how this agent uses this extension.
     */
    description: z
      .string()
      .optional()
      .nullable()
      .describe("A description of how this agent uses this extension."),

    /**
     * @optional Whether the client must follow specific requirements of the extension.
     */
    required: z
      .boolean()
      .optional()
      .nullable()
      .describe(
        "Whether the client must follow specific requirements of the extension."
      ),

    /**
     * @optional Optional configuration for the extension.
     */
    params: z
      .record(z.string(), z.unknown())
      .optional()
      .nullable()
      .describe("Optional configuration for the extension."),
  })
  .describe("A declaration of an extension supported by an Agent.");

export type AgentExtension = z.infer<typeof AgentExtensionSchema>;

/**
 * @description Defines optional capabilities supported by an agent.
 */
export const AgentCapabilitiesSchema = z
  .object({
    /**
     * @optional Indicates if the agent supports streaming responses.
     */
    streaming: z
      .boolean()
      .optional()
      .nullable()
      .describe("Indicates if the agent supports streaming responses."),

    /**
     * @optional Indicates if the agent supports push notification mechanisms.
     */
    pushNotifications: z
      .boolean()
      .optional()
      .nullable()
      .describe(
        "Indicates if the agent supports push notification mechanisms."
      ),

    /**
     * @optional Indicates if the agent supports providing state transition history.
     */
    stateTransitionHistory: z
      .boolean()
      .optional()
      .nullable()
      .describe(
        "Indicates if the agent supports providing state transition history."
      ),

    /**
     * @optional Extensions supported by this agent.
     */
    extensions: z
      .array(AgentExtensionSchema)
      .optional()
      .nullable()
      .describe("Extensions supported by this agent."),
  })
  .describe("Defines optional capabilities supported by an agent.");

export type AgentCapabilities = z.infer<typeof AgentCapabilitiesSchema>;

/**
 * @description Represents a unit of capability that an agent can perform.
 */
export const AgentSkillSchema = z
  .object({
    /**
     * @required Unique identifier for the skill.
     */
    id: z.string().describe("Unique identifier for the skill."),

    /**
     * @required Human-readable name of the skill.
     */
    name: z.string().describe("Human-readable name of the skill."),

    /**
     * @required Description of the skill.
     */
    description: z.string().describe("Description of the skill."),

    /**
     * @required List of tags associated with the skill for categorization.
     */
    tags: z
      .array(z.string())
      .describe("List of tags associated with the skill for categorization."),

    /**
     * @optional List of example inputs or use cases for the skill.
     */
    examples: z
      .array(z.string())
      .optional()
      .nullable()
      .describe("List of example inputs or use cases for the skill."),

    /**
     * @optional List of input modes supported by this skill.
     */
    inputModes: z
      .array(z.string())
      .optional()
      .nullable()
      .describe("List of input modes supported by this skill."),

    /**
     * @optional List of output modes supported by this skill.
     */
    outputModes: z
      .array(z.string())
      .optional()
      .nullable()
      .describe("List of output modes supported by this skill."),

    /**
     * @optional Security schemes necessary for the agent to leverage this skill.
     */
    security: z
      .array(z.record(z.string(), z.array(z.string())))
      .optional()
      .nullable()
      .describe(
        "Security schemes necessary for the agent to leverage this skill."
      ),
  })
  .describe("A unit of capability that an agent can perform.");

export type AgentSkill = z.infer<typeof AgentSkillSchema>;

/**
 * @description AgentCardSignature represents a JWS signature of an AgentCard.
 */
export const AgentCardSignatureSchema = z
  .object({
    /**
     * @required The protected JWS header for the signature.
     */
    protected: z
      .string()
      .describe("The protected JWS header for the signature."),

    /**
     * @required The computed signature, Base64url-encoded.
     */
    signature: z
      .string()
      .describe("The computed signature, Base64url-encoded."),

    /**
     * @optional The unprotected JWS header values.
     */
    header: z
      .record(z.string(), z.unknown())
      .optional()
      .nullable()
      .describe("The unprotected JWS header values."),
  })
  .describe("A JWS signature of an AgentCard.");

export type AgentCardSignature = z.infer<typeof AgentCardSignatureSchema>;

/**
 * @description An AgentCard conveys key information about an agent's identity,
 * capabilities, skills, authentication requirements, and communication modalities.
 */
export const AgentCardSchema = z
  .object({
    /**
     * @required The version of the A2A protocol this agent supports.
     */
    protocolVersion: z
      .string()
      .default("0.3.0")
      .describe("The version of the A2A protocol this agent supports."),

    /**
     * @required Human readable name of the agent.
     */
    name: z.string().describe("Human readable name of the agent."),

    /**
     * @required A human-readable description of the agent.
     */
    description: z
      .string()
      .describe("A human-readable description of the agent."),

    /**
     * @required The preferred endpoint URL for interacting with the agent.
     */
    url: z
      .string()
      .url()
      .describe("The preferred endpoint URL for interacting with the agent."),

    /**
     * @optional The transport protocol for the preferred endpoint.
     */
    preferredTransport: z
      .union([TransportProtocolSchema, z.string()])
      .optional()
      .nullable()
      .describe("The preferred transport protocol for the agent."),

    /**
     * @optional Additional supported interfaces (transport and URL combinations).
     */
    additionalInterfaces: z
      .array(AgentInterfaceSchema)
      .optional()
      .nullable()
      .describe(
        "Additional supported interfaces (transport and URL combinations)."
      ),

    /**
     * @optional The URL of the agent's icon.
     */
    iconUrl: z
      .string()
      .url()
      .optional()
      .nullable()
      .describe("The URL of the agent's icon."),

    /**
     * @optional The service provider of the agent.
     */
    provider: AgentProviderSchema.optional()
      .nullable()
      .describe("The service provider of the agent."),

    /**
     * @required The version identifier for the agent or its API.
     */
    version: z
      .string()
      .describe("The version identifier for the agent or its API."),

    /**
     * @optional An optional URL pointing to the agent's documentation.
     */
    documentationUrl: z
      .string()
      .url()
      .optional()
      .nullable()
      .describe("An optional URL pointing to the agent's documentation."),

    /**
     * @required The capabilities supported by the agent.
     */
    capabilities: AgentCapabilitiesSchema.describe(
      "The capabilities supported by the agent."
    ),

    /**
     * @optional Security scheme details used for authenticating with this agent.
     * Maps scheme names to their configurations.
     */
    securitySchemes: z
      .record(z.string(), SecuritySchemeSchema)
      .optional()
      .nullable()
      .describe(
        "Security scheme details used for authenticating with this agent. Maps scheme names to their configurations."
      ),

    /**
     * @optional Security requirements for contacting the agent.
     * Array of security requirement objects, where each object maps scheme names to scope arrays.
     */
    security: z
      .array(z.record(z.string(), z.array(z.string())))
      .optional()
      .nullable()
      .describe(
        "Security requirements for contacting the agent. Array of security requirement objects, where each object maps scheme names to scope arrays."
      ),

    /**
     * @required The default input modes supported by the agent.
     */
    defaultInputModes: z
      .array(z.string())
      .describe("The default input modes supported by the agent."),

    /**
     * @required The default output modes supported by the agent.
     */
    defaultOutputModes: z
      .array(z.string())
      .describe("The default output modes supported by the agent."),

    /**
     * @required List of specific skills offered by the agent.
     */
    skills: z
      .array(AgentSkillSchema)
      .describe("List of specific skills offered by the agent."),

    /**
     * @optional True if the agent supports providing an extended agent card when the user is authenticated.
     */
    supportsAuthenticatedExtendedCard: z
      .boolean()
      .optional()
      .nullable()
      .describe(
        "True if the agent supports providing an extended agent card when the user is authenticated."
      ),

    /**
     * @optional JSON Web Signatures computed for this AgentCard.
     */
    signatures: z
      .array(AgentCardSignatureSchema)
      .optional()
      .nullable()
      .describe("JSON Web Signatures computed for this AgentCard."),
  })
  .describe(
    "An AgentCard conveys key information about an agent's identity, capabilities, skills, authentication requirements, and communication modalities."
  );

export type AgentCard = z.infer<typeof AgentCardSchema>;

/**
 * @description Request to get an authenticated extended card.
 */
export const GetAuthenticatedExtendedCardRequestSchema =
  JSONRPCRequestSchema.extend({
    method: z.literal("agent/getAuthenticatedExtendedCard"),
    params: z
      .never()
      .optional()
      .describe(
        "Defines the parameters for a request to get an authenticated extended card."
      ),
  }).describe(
    "Represents a JSON-RPC request for the `agent/getAuthenticatedExtendedCard` method."
  );
export type GetAuthenticatedExtendedCardRequest = z.infer<
  typeof GetAuthenticatedExtendedCardRequestSchema
>;

/**
 * @description JSON-RPC success response model for the 'agent/getAuthenticatedExtendedCard' method.
 */
export const GetAuthenticatedExtendedCardSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    /**
     * @required The result is an Agent Card object.
     */
    result: AgentCardSchema.describe("The result is an Agent Card object"),
  }).describe(
    "JSON-RPC success response model for the 'agent/getAuthenticatedExtendedCard' method."
  );
export type GetAuthenticatedExtendedCardSuccessResponse = z.infer<
  typeof GetAuthenticatedExtendedCardSuccessResponseSchema
>;

/**
 * @description Response to a `agent/getAuthenticatedExtendedCard` request.
 */
export const GetAuthenticatedExtendedCardResponseSchema = z
  .union([
    GetAuthenticatedExtendedCardSuccessResponseSchema,
    JSONRPCErrorResponseSchema,
  ])
  .describe("Response to a `agent/getAuthenticatedExtendedCard` request.");
export type GetAuthenticatedExtendedCardResponse = z.infer<
  typeof GetAuthenticatedExtendedCardResponseSchema
>;
