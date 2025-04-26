/**
 * HTTP JSON-RPC client utilities.
 * Handles the common pattern of sending JSON-RPC requests and processing responses.
 */
import { v4 as uuidv4 } from "uuid";
import { RpcError } from "../lib/errors.js";
import type {
  JSONRPCRequest,
  JSONRPCResponse,
  A2ARequest,
} from "../lib/schema.js";
// Import error codes as values, not types
import { ErrorCodeInternalError, ErrorCodeParseError } from "../lib/schema.js";
import { parseResponse } from "./parser.js";
import { logger } from "../utils/logger.js";

/**
 * Creates a JSON-RPC request body with the specified method and parameters.
 *
 * @param method The JSON-RPC method name
 * @param params The parameters for the method
 * @param requestId Optional request ID (generates a UUID v4 if not provided)
 * @returns A properly formatted JSON-RPC request object
 */
export function createJsonRpcRequest<Req extends A2ARequest>(
  method: Req["method"],
  params: Req["params"],
  requestId: string | number = uuidv4()
): JSONRPCRequest {
  return {
    jsonrpc: "2.0",
    id: requestId,
    method,
    params,
  };
}

/**
 * Sends a JSON-RPC request to the specified endpoint.
 *
 * @param baseUrl The API endpoint URL
 * @param method The JSON-RPC method name
 * @param params The parameters for the method
 * @param headers Custom headers to include in the request
 * @param acceptHeader The desired Accept header ('application/json' or 'text/event-stream')
 * @returns A Promise resolving to the fetch Response object
 * @throws RpcError if there's a network error
 */
export async function sendJsonRpcRequest<Req extends A2ARequest>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  headers: Record<string, string> = {},
  acceptHeader: "application/json" | "text/event-stream" = "application/json"
): Promise<Response> {
  const requestBody = createJsonRpcRequest(method, params);

  try {
    return await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: acceptHeader,
        ...headers,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (networkError) {
    logger.error("Network error during RPC call:", networkError);
    // Wrap network errors into a standard error format
    throw new RpcError(
      -32603, // Internal error
      `Network error: ${
        networkError instanceof Error
          ? networkError.message
          : String(networkError)
      }`,
      networkError
    );
  }
}

/**
 * Sends a GET request to the specified endpoint.
 * This is used for non-JSON-RPC calls like agent card retrieval.
 *
 * @param url The endpoint URL
 * @param headers Custom headers to include in the request
 * @returns A Promise resolving to the fetch Response object
 * @throws RpcError if there's a network error
 */
export async function sendGetRequest(
  url: URL,
  headers: Record<string, string> = {}
): Promise<Response> {
  try {
    return await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...headers,
      },
    });
  } catch (networkError) {
    logger.error("Network error during GET request:", networkError);
    throw new RpcError(
      -32603, // Internal error
      `Network error: ${
        networkError instanceof Error
          ? networkError.message
          : String(networkError)
      }`,
      networkError
    );
  }
}

/**
 * Processes a standard JSON-RPC response (non-streaming).
 * Parses the response, validates it, and returns the result payload.
 *
 * @param response The fetch Response object
 * @param expectedMethod Optional method name for logging purposes
 * @returns A promise resolving to the result payload
 * @throws RpcError if there's an error in the response
 */
export async function handleJsonRpcResponse<Res extends JSONRPCResponse>(
  response: Response,
  expectedMethod?: string
): Promise<NonNullable<Res["result"]>> {
  let responseBody: string | null = null;
  try {
    responseBody = await response.text();
    if (!response.ok) {
      try {
        // Try to parse error as JSON-RPC
        parseResponse<JSONRPCResponse>(responseBody);
        // If we get here, it means there was no error in the response
        // But the HTTP status was not OK, so we throw a generic error
      } catch (parseError) {
        // Just continue to throw the HTTP error
      }

      // Throw a generic HTTP error if we couldn't extract an RPC error
      throw new Error(
        `HTTP error ${response.status}: ${response.statusText}${
          responseBody ? ` - ${responseBody}` : ""
        }`
      );
    }

    // Parse and validate the response
    // If it has an error, parseResponse will throw
    // If it doesn't have a result, parseResponse will also throw
    const jsonResponse = parseResponse<Res>(responseBody);

    // At this point, we know we have a valid result
    // NonNullable is used in the return type to ensure TypeScript knows this
    return jsonResponse.result as NonNullable<Res["result"]>;
  } catch (error) {
    // Re-throw RpcError instances directly, wrap others
    if (error instanceof RpcError) {
      throw error;
    } else {
      throw new RpcError(
        ErrorCodeInternalError, // Internal error
        `Failed to process response [${expectedMethod}]: ${
          error instanceof Error ? error.message : String(error)
        }`,
        error
      );
    }
  }
}

/**
 * Processes a JSON response from a regular GET request.
 * Handles error checking and returns the parsed JSON.
 *
 * @param response The fetch Response object
 * @param endpoint Optional endpoint description for logging purposes
 * @returns A promise resolving to the parsed JSON
 * @throws RpcError if there's a response error
 */
export async function handleJsonResponse<T>(
  response: Response,
  endpoint?: string
): Promise<T> {
  let responseBody: string | null = null;
  try {
    responseBody = await response.text();

    if (!response.ok) {
      throw new Error(
        `HTTP error ${response.status}: ${response.statusText}${
          responseBody ? ` - ${responseBody}` : ""
        }`
      );
    }

    return JSON.parse(responseBody) as T;
  } catch (error) {
    logger.error(
      `Error processing response for ${endpoint || "unknown endpoint"}:`,
      error
    );

    if (error instanceof RpcError) {
      throw error;
    } else {
      throw new RpcError(
        ErrorCodeParseError,
        `Failed to process response: ${
          error instanceof Error ? error.message : String(error)
        }`,
        error
      );
    }
  }
}

/**
 * Sends a JSON-RPC request and processes the response in a single operation.
 * This combines sendJsonRpcRequest and handleJsonRpcResponse into one call.
 *
 * @param baseUrl The API endpoint URL
 * @param method The JSON-RPC method name
 * @param params The parameters for the method
 * @param headers Custom headers to include in the request
 * @param acceptHeader The desired Accept header ('application/json' or 'text/event-stream')
 * @returns A Promise resolving to the result payload
 * @throws RpcError if there's a network error or error in the response
 */
export async function executeJsonRpcRequest<
  Req extends A2ARequest,
  Res extends JSONRPCResponse,
>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  headers: Record<string, string> = {},
  acceptHeader: "application/json" | "text/event-stream" = "application/json"
): Promise<NonNullable<Res["result"]>> {
  const response = await sendJsonRpcRequest(
    baseUrl,
    method,
    params,
    headers,
    acceptHeader
  );

  return handleJsonRpcResponse<Res>(response, method);
}

/**
 * Sends a GET request and processes the JSON response.
 * Helper for non-RPC REST endpoints.
 *
 * @param url The endpoint URL
 * @param headers Custom headers to include in the request
 * @param endpoint Optional endpoint description for logging
 * @returns A Promise resolving to the parsed JSON
 * @throws RpcError if there's a network error or error in the response
 */
export async function executeGetRequest<T>(
  url: URL,
  headers: Record<string, string> = {},
  endpoint?: string
): Promise<T> {
  const response = await sendGetRequest(url, headers);
  return handleJsonResponse<T>(response, endpoint);
}
