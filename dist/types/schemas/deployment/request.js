/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
import { JSONRPCErrorResponseSchema, JSONRPCRequestSchema, JSONRPCSuccessResponseSchema, AgentCardSchema, } from "../a2a/index.js";
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
/**
 * @description Represents the parameters for a server deployment success response.
 */
export const ServerDeploymentSuccessResponseParamsSchema = BaseServerDeploymentResponseParamsSchema.extend({
    /**
     * @required The name of the server
     */
    name: z.string().describe("The name of the server"),
    /**
     * @required The URL of the server
     */
    url: z.string().url().describe("The URL of the server"),
    /**
     * @required The base path of the server
     */
    basePath: z.string().describe("The base path of the server"),
}).describe("Represents the parameters for a server deployment success response.");
/**
 * @description Represents the request for a server deployment.
 */
export const ServerDeploymentRequestSchema = JSONRPCRequestSchema.extend({
    method: z.literal("/deploy").describe("The method name"),
    params: ServerDeploymentRequestParamsSchema.describe("The deployment parameters"),
}).describe("Represents the request for a server deployment.");
/**
 * @description Represents the request for a test server deployment.
 */
export const TestServerDeploymentRequestSchema = JSONRPCRequestSchema.extend({
    method: z.literal("/test/deploy").describe("The method name"),
    params: ServerDeploymentRequestParamsSchema.describe("The test deployment parameters"),
}).describe("Represents the request for a test server deployment.");
/**
 * @description Represents the response for a server deployment success request.
 */
export const ServerDeploymentSuccessResponseSchema = JSONRPCSuccessResponseSchema.extend({
    result: ServerDeploymentSuccessResponseParamsSchema.describe("The deployment result"),
}).describe("Represents the response for a server deployment request.");
/**
 * @description Represents the response for a server deployment request.
 */
export const ServerDeploymentResponseSchema = z
    .union([ServerDeploymentSuccessResponseSchema, JSONRPCErrorResponseSchema])
    .describe("Represents the response for a server deployment request.");
//# sourceMappingURL=request.js.map