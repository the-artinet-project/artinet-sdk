import { SecurityScheme } from "./auth/auth.js";
import { TransportProtocol, AgentInterface } from "./transport.js";
/**
 * @description Represents the provider or organization behind an agent.
 */
export interface AgentProvider {
  /**
   * @required The name of the organization providing the agent.
   */
  organization: string;

  /**
   * @required URL associated with the agent provider.
   */
  url: string;
}

/**
 * @description Defines optional capabilities supported by an agent.
 */
export interface AgentCapabilities {
  /**
   * @required Indicates if the agent supports streaming responses.
   */
  streaming?: boolean;

  /**
   * @required Indicates if the agent supports push notification mechanisms.
   */
  pushNotifications?: boolean;

  /**
   * @required Indicates if the agent supports providing state transition history.
   */
  stateTransitionHistory?: boolean;

  /**
   * @optional Extensions supported by this agent.
   */
  extensions?: AgentExtension[];
}

/**
 * @description A declaration of an extension supported by an Agent.
 */
export interface AgentExtension {
  /**
   * @required The URI of the extension.
   */
  uri: string;
  /**
   * @optional A description of how this agent uses this extension.
   */
  description?: string;

  /**
   * @optional Whether the client must follow specific requirements of the extension.
   */
  required?: boolean;

  /**
   * @optional Optional configuration for the extension.
   */
  params?: Record<string, unknown>;
}

/**
 * @description Represents a unit of capability that an agent can perform.
 */
export interface AgentSkill {
  /**
   * @required Unique identifier for the skill.
   */
  id: string;

  /**
   * @required Human-readable name of the skill.
   */
  name: string;

  /**
   * @required description of the skill.
   * @description Description of the skill - will be used by the client or a human
   * as a hint to understand what the skill does.
   */
  description: string;

  /**
   * @required list of tags associated with the skill for categorization.
   * @description Set of tagwords describing classes of capabilities for this specific skill.
   * @example ["cooking", "customer support", "billing"]
   */
  tags: string[];

  /**
   * @optional list of example inputs or use cases for the skill.
   * @description The set of example scenarios that the skill can perform.
   * Will be used by the client as a hint to understand how the skill can be used.
   * @example ["I need a recipe for bread"]
   */
  examples?: string[];

  /**
   * @optional list of input modes supported by this skill.
   * @description The set of interaction modes that the skill supports
   * (if different than the default).
   * Supported mime types for input.
   */
  inputModes?: string[];

  /**
   * @optional list of output modes supported by this skil.
   * @description Supported mime types for output.
   */
  outputModes?: string[];
}

/**
 * @description AgentCardSignature represents a JWS signature of an AgentCard.
 * This follows the JSON format of an RFC 7515 JSON Web Signature (JWS).
 */
export interface AgentCardSignature {
  /**
   * @required The protected JWS header for the signature. This is a Base64url-encoded
   * JSON object, as per RFC 7515.
   */
  protected: string;

  /**
   * @required The computed signature, Base64url-encoded.
   */
  signature: string;

  /**
   * @optional The unprotected JWS header values.
   */
  header?: { [key: string]: any };
}

/**
 * @description An AgentCard conveys key information:
 * - Overall details (version, name, description, uses)
 * - Skills: A set of capabilities the agent can perform
 * - Default modalities/content types supported by the agent.
 * - Authentication requirements
 * @required protocolVersion
 * @required name
 * @required description
 * @required url
 * @optional preferredTransport
 * @optional additionalInterfaces
 * @optional iconUrl
 * @required version
 * @required capabilities
 * @required defaultInputModes
 * @required defaultOutputModes
 * @required skills
 * @optional provider
 * @optional documentationUrl
 * @optional securitySchemes
 * @optional security
 * @optional supportsAuthenticatedExtendedCard
 * @optional signatures
 */
export interface AgentCard {
  /**
   * @required The version of the A2A protocol this agent supports.
   * @default "0.3.0"
   */
  protocolVersion: string;

  /**
   * @required Human readable name of the agent.
   * @example "Recipe Agent"
   */
  name: string;

  /**
   * @required A human-readable description of the agent.
   * @description Used to assist users and other agents in understanding what the agent can do.
   * @example "Agent that helps users with recipes and cooking."
   */
  description: string;

  /**
   * @required The preferred endpoint URL for interacting with the agent.
   * This URL MUST support the transport specified by 'preferredTransport'.
   * @example "https://api.example.com/a2a/v1"
   */
  url: string;

  /**
   * @optional The transport protocol for the preferred endpoint (the main 'url' field).
   * If not specified, defaults to 'JSONRPC'.
   * @default "JSONRPC"
   */
  preferredTransport?: TransportProtocol | string;

  /**
   * @optional A list of additional supported interfaces (transport and URL combinations).
   * This allows agents to expose multiple transports, potentially at different URLs.
   */
  additionalInterfaces?: AgentInterface[];

  /**
   * @optional The URL of the agent's icon.
   * @description The URL of the agent's icon.
   * @example "https://recipe-agent.com/icon.png"
   */
  iconUrl?: string;

  /**
   * @optional the service provider of the agent.
   * @description The organization or entity that provides the agent.
   * @example { organization: "Recipe Inc.", url: "https://recipe-inc.com" }
   */
  provider?: AgentProvider;

  /**
   * @required The version identifier for the agent or its API.
   * @description The version of the agent - format is up to the provider.
   * @example "1.0.0"
   */
  version: string;

  /**
   * @optional An optional URL pointing to the agent's documentation.
   * @description A URL to documentation for the agent.
   * @example "https://recipe-agent.com/docs"
   */
  documentationUrl?: string;

  /**
   * @required The capabilities supported by the agent.
   * @description The capabilities supported by the agent.
   * @example { "streaming": true, "pushNotifications": true, "stateTransitionHistory": true }
   */
  capabilities: AgentCapabilities;

  /**
   * @optional Security scheme details used for authenticating with this agent.
   * @description The security schemes supported by the agent.
   */
  securitySchemes?: Record<string, SecurityScheme>;

  /**
   * @optional Security requirements for contacting the agent.
   * @description The security requirements for contacting the agent.
   */
  security?: Record<string, string[]>[];

  /**
   * @required The default input modes supported by the agent.
   * @description The set of interaction modes that the agent supports across all skills. This can be overridden per-skill.
   * Supported mime types for input.
   */
  defaultInputModes: string[];

  /**
   * @required The default output modes supported by the agent.
   * @description Supported mime types for output.
   */
  defaultOutputModes: string[];

  /**
   * @required List of specific skills offered by the agent.
   * @description The set of skills that the agent can perform.
   * @example [{ "id": "recipe-search", "name": "Recipe Search", "description": "Search for recipes", "tags": ["cooking", "recipes"], "examples": ["I need a recipe for bread"] }]
   */
  skills: AgentSkill[];

  /**
   * @optional true if the agent supports providing an extended agent card when the user is authenticated.
   */
  supportsAuthenticatedExtendedCard?: boolean;

  /**
   * @optional JSON Web Signatures computed for this AgentCard.
   */
  signatures?: AgentCardSignature[];
}

export * from "./task.js";
export * from "./message.js";
export * from "./parameters.js";
export * from "./notification.js";
export * from "./auth/index.js";
export * from "./rpc.js";
export * from "./transport.js";

import {
  SendMessageRequest,
  SendMessageResponse,
  SendStreamingMessageRequest,
  SendStreamingMessageResponse,
} from "./message.js";
import {
  CancelTaskRequest,
  CancelTaskResponse,
  GetTaskRequest,
  GetTaskResponse,
  TaskResubscriptionRequest,
} from "./task.js";
import {
  SetTaskPushNotificationConfigResponse,
  GetTaskPushNotificationConfigResponse,
  SetTaskPushNotificationConfigRequest,
  GetTaskPushNotificationConfigRequest,
} from "./notification.js";

export type A2ARequest =
  | SendMessageRequest
  | GetTaskRequest
  | CancelTaskRequest
  | SetTaskPushNotificationConfigRequest
  | GetTaskPushNotificationConfigRequest
  | TaskResubscriptionRequest
  | SendStreamingMessageRequest;

/**
 * Represents any valid JSON-RPC response defined in the A2A protocol.
 * (This is a helper type, not explicitly defined with `oneOf` in the schema like A2ARequest, but useful).
 */
export type A2AResponse =
  | SendMessageResponse
  | SendStreamingMessageResponse
  | GetTaskResponse
  | CancelTaskResponse
  | SetTaskPushNotificationConfigResponse
  | GetTaskPushNotificationConfigResponse;

export * from "./error.js";

import {
  JSONParseError,
  InvalidRequestError,
  MethodNotFoundError,
  InvalidParamsError,
  InternalError,
  TaskNotFoundError,
  TaskNotCancelableError,
  PushNotificationNotSupportedError,
  UnsupportedOperationError,
  ContentTypeNotSupportedError,
  InvalidAgentResponseError,
} from "./error.js";

export type A2AError =
  | JSONParseError
  | InvalidRequestError
  | MethodNotFoundError
  | InvalidParamsError
  | InternalError
  | TaskNotFoundError
  | TaskNotCancelableError
  | PushNotificationNotSupportedError
  | UnsupportedOperationError
  | ContentTypeNotSupportedError
  | InvalidAgentResponseError;
