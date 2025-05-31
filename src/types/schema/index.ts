import { SecurityScheme } from "./auth/auth.js";
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
 * @description An AgentCard conveys key information:
 * - Overall details (version, name, description, uses)
 * - Skills: A set of capabilities the agent can perform
 * - Default modalities/content types supported by the agent.
 * - Authentication requirements
 * @required name
 * @required description
 * @required url
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
 */
export interface AgentCard {
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
   * @required The base URL endpoint for interacting with the agent.
   * @description The URL where the agent is hosted.
   * @example "https://recipe-agent.com"
   */
  url: string;

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
}

export * from "./task.js";
export * from "./message.js";
export * from "./parameters.js";
export * from "./notification.js";
export * from "./auth/index.js";
export * from "./rpc.js";

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
