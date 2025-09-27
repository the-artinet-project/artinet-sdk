/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { executeJsonRpcRequest } from "../../transport/index.js";
/**
 * @description The base URL of the deployment server.
 */
const FULL_DEPLOYMENT_URL = new URL("https://agents.artinet.io/deploy");
/**
 * @description The API key to use for the deployment.
 */
const API_KEY = process.env.ARTINET_API_KEY;
/**
 * Sends a full deployment request to the server.
 * @param baseUrl The base URL of the server.
 * @param method The method to call.
 * @param params The parameters to pass to the method.
 * @param headers The headers to send with the request.
 * @param acceptHeader The accept header to send with the request.
 * @returns The response from the server.
 */
const executeFullDeploymentRequest = executeJsonRpcRequest;
/**
 * Sends a full deployment request to the server.
 * @param params The parameters to pass to the method.
 * @returns The response from the server.
 */
export async function fullDeployment(params) {
    if (!API_KEY && !process.env.ARTINET_API_KEY) {
        throw new Error("ARTINET_API_KEY is not set");
    }
    return await executeFullDeploymentRequest(FULL_DEPLOYMENT_URL, "/deploy", params, { Authorization: `Bearer ${process.env.ARTINET_API_KEY}` }, "application/json");
}
//# sourceMappingURL=full-deployment.js.map