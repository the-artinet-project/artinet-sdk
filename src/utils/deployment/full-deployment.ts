import {
  ServerDeploymentRequestParams,
  ServerDeploymentResponse,
  A2AExecutionContext,
  ServerDeploymentRequest,
} from "../../types/index.js";
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
 * @description The type of the full deployment request.
 */
type FullDeploymentRequest = A2AExecutionContext | ServerDeploymentRequest;

/**
 * Sends a full deployment request to the server.
 * @param baseUrl The base URL of the server.
 * @param method The method to call.
 * @param params The parameters to pass to the method.
 * @param headers The headers to send with the request.
 * @param acceptHeader The accept header to send with the request.
 * @returns The response from the server.
 */
const executeFullDeploymentRequest = executeJsonRpcRequest as <
  Req extends FullDeploymentRequest,
>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  headers: Record<string, string>,
  acceptHeader: "application/json"
) => Promise<ServerDeploymentResponse>;

/**
 * Sends a full deployment request to the server.
 * @param params The parameters to pass to the method.
 * @returns The response from the server.
 */
export async function fullDeployment(params: ServerDeploymentRequestParams) {
  if (!API_KEY) {
    throw new Error("ARTINET_API_KEY is not set");
  }

  return await executeFullDeploymentRequest(
    FULL_DEPLOYMENT_URL,
    "/deploy",
    params,
    { Authorization: `Bearer ${API_KEY}` },
    "application/json"
  );
}
