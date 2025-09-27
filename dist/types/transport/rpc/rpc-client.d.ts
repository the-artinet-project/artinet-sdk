/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import type { JSONRPCRequest, JSONRPCResponse, A2ARequest } from "../../types/index.js";
/**
 * Creates a JSON-RPC request body with the specified method and parameters.
 *, ErrorCodeParseError
 * @param method The JSON-RPC method name
 * @param params The parameters for the method
 * @param requestId Optional request ID (generates a UUID v4 if not provided)
 * @returns A properly formatted JSON-RPC request object
 */
export declare function createJsonRpcRequest<Req extends A2ARequest>(method: Req["method"], params: Req["params"], requestId?: string | number): JSONRPCRequest;
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
export declare function sendJsonRpcRequest<Req extends A2ARequest>(baseUrl: URL, method: Req["method"], params: Req["params"], headers?: Record<string, string>, acceptHeader?: "application/json" | "text/event-stream"): Promise<Response>;
/**
 * Sends a GET request to the specified endpoint.
 * This is used for non-JSON-RPC calls like agent card retrieval.
 *
 * @param url The endpoint URL
 * @param headers Custom headers to include in the request
 * @returns A Promise resolving to the fetch Response object
 * @throws RpcError if there's a network error
 */
export declare function sendGetRequest(url: URL, headers?: Record<string, string>): Promise<Response>;
/**
 * Processes a standard JSON-RPC response (non-streaming).
 * Parses the response, validates it, and returns the result payload.
 *
 * @param response The fetch Response object
 * @param expectedMethod Optional method name for logging purposes
 * @returns A promise resolving to the result payload
 * @throws RpcError if there's an error in the response
 */
export declare function handleJsonRpcResponse<Res extends JSONRPCResponse>(response: Response, expectedMethod?: string): Promise<NonNullable<Res["result"]>>;
/**
 * Processes a JSON response from a regular GET request.
 * Handles error checking and returns the parsed JSON.
 *
 * @param response The fetch Response object
 * @param endpoint Optional endpoint description for logging purposes
 * @returns A promise resolving to the parsed JSON
 * @throws RpcError if there's a response error
 */
export declare function handleJsonResponse<T>(response: Response, endpoint?: string): Promise<T>;
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
export declare function executeJsonRpcRequest<Req extends A2ARequest, Res extends JSONRPCResponse>(baseUrl: URL, method: Req["method"], params: Req["params"], headers?: Record<string, string>, acceptHeader?: "application/json" | "text/event-stream"): Promise<NonNullable<Res["result"]>>;
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
export declare function executeGetRequest<T>(url: URL, headers?: Record<string, string>, endpoint?: string): Promise<T>;
//# sourceMappingURL=rpc-client.d.ts.map