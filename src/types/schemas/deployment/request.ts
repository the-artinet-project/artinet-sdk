import { z } from "zod/v4";
import {
  JSONRPCErrorResponseSchema,
  JSONRPCRequestSchema,
  JSONRPCSuccessResponseSchema,
  AgentCardSchema,
} from "../a2a/index.js";

/**
 * @description Represents the parameters for a server deployment request.
 */
export const ServerDeploymentRequestParamsSchema = z
  .object({
    /**
     * @required The name of the server
     */
    name: z.string(),
    /**
     * @required The agent card of the server
     */
    agentCard: AgentCardSchema,
    /**
     * @required The minified code of the server
     */
    code: z.string(),
    /**
     * @optional The NPM dependencies of the server(currently unsupported)
     */
    dependencies: z.array(z.string()).optional(),
  })
  .describe("Represents the parameters for a server deployment request.");

export type ServerDeploymentRequestParams = z.infer<
  typeof ServerDeploymentRequestParamsSchema
>;

/**
 * @description Represents the base parameters for a server deployment response.
 */
export const BaseServerDeploymentResponseParamsSchema = z
  .object({
    /**
     * @required The deployment ID(for full deployments the deployment ID is the same as the agent/registration ID)
     */
    deploymentId: z.string().describe("The deployment ID"),
    /**
     * @required Whether the deployment was successful
     */
    success: z.boolean().describe("Whether the deployment was successful"),
  })
  .describe("Represents the base parameters for a server deployment response.");

export type BaseServerDeploymentResponseParams = z.infer<
  typeof BaseServerDeploymentResponseParamsSchema
>;

/**
 * @description Represents the parameters for a server deployment success response.
 */
export const ServerDeploymentSuccessResponseParamsSchema =
  BaseServerDeploymentResponseParamsSchema.extend({
    /**
     * @required The name of the server
     */
    name: z.string().describe("The name of the server"),
    /**
     * @required The URL of the server
     */
    url: z.url().describe("The URL of the server"),
    /**
     * @required The base path of the server
     */
    basePath: z.string().describe("The base path of the server"),
  }).describe(
    "Represents the parameters for a server deployment success response."
  );

export type ServerDeploymentSuccessResponseParams = z.infer<
  typeof ServerDeploymentSuccessResponseParamsSchema
>;

/**
 * @description Represents the request for a server deployment.
 */
export const ServerDeploymentRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("/deploy").describe("The method name"),
  params: ServerDeploymentRequestParamsSchema.describe(
    "The deployment parameters"
  ),
}).describe("Represents the request for a server deployment.");

export type ServerDeploymentRequest = z.infer<
  typeof ServerDeploymentRequestSchema
>;

/**
 * @description Represents the request for a test server deployment.
 */
export const TestServerDeploymentRequestSchema = JSONRPCRequestSchema.extend({
  method: z.literal("/test/deploy").describe("The method name"),
  params: ServerDeploymentRequestParamsSchema.describe(
    "The test deployment parameters"
  ),
}).describe("Represents the request for a test server deployment.");

export type TestServerDeploymentRequest = z.infer<
  typeof TestServerDeploymentRequestSchema
>;

/**
 * @description Represents the response for a server deployment success request.
 */
export const ServerDeploymentSuccessResponseSchema =
  JSONRPCSuccessResponseSchema.extend({
    result: ServerDeploymentSuccessResponseParamsSchema.describe(
      "The deployment result"
    ),
  }).describe("Represents the response for a server deployment request.");
export type ServerDeploymentSuccessResponse = z.infer<
  typeof ServerDeploymentSuccessResponseSchema
>;

/**
 * @description Represents the response for a server deployment request.
 */
export const ServerDeploymentResponseSchema = z
  .union([ServerDeploymentSuccessResponseSchema, JSONRPCErrorResponseSchema])
  .describe("Represents the response for a server deployment request.");

export type ServerDeploymentResponse = z.infer<
  typeof ServerDeploymentResponseSchema
>;
