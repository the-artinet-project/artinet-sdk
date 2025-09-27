/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import type { JSONRPCResponse, A2ARequest } from "../../types/index.js";
/**
 * Creates an async generator for processing task events from an SSE stream
 *
 * @template T The type of task event to process (TaskStatusUpdateEvent or TaskArtifactUpdateEvent)
 * @param response The fetch Response object containing the event stream
 * @returns An async generator yielding the specified type of task events from StreamingResponse
 */
export declare function handleEventStream<StreamRes extends JSONRPCResponse>(response: Response): AsyncGenerator<NonNullable<StreamRes["result"]>>;
/**
 * Executes a streaming JSON-RPC request and yields events as they arrive
 *
 * @template Req The type of request being made
 * @template StreamRes The type of streaming response expected
 * @param baseUrl The base URL for the API
 * @param method The JSON-RPC method to call
 * @param params The parameters for the method
 * @param customHeaders Any custom headers to include in the request
 * @returns An AsyncIterable yielding events from the stream
 */
export declare function executeStreamEvents<Req extends A2ARequest, StreamRes extends JSONRPCResponse>(baseUrl: URL, method: Req["method"], params: Req["params"], customHeaders: Record<string, string>): AsyncIterable<NonNullable<StreamRes["result"]>>;
//# sourceMappingURL=event-stream.d.ts.map