/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Event stream utilities for handling Server-Sent Events (SSE).
 */
import { parseResponse } from "../rpc/parser.js";
import { createParser, } from "eventsource-parser";
import { sendJsonRpcRequest } from "../rpc/rpc-client.js";
import { logError, logWarn, logDebug } from "../../utils/logging/index.js";
/**
 * Creates an async generator for processing task events from an SSE stream
 *
 * @template T The type of task event to process (TaskStatusUpdateEvent or TaskArtifactUpdateEvent)
 * @param response The fetch Response object containing the event stream
 * @returns An async generator yielding the specified type of task events from StreamingResponse
 */
export async function* handleEventStream(response) {
    if (!response.ok || !response.body) {
        let errorText = null;
        try {
            errorText = await response.text();
        }
        catch (_) { }
        logError("handleEventStream", `HTTP error [${response.status}:${response.statusText}] - ${errorText}`, new Error(`HTTP error [${response.status}:${response.statusText}] - ${errorText}`));
        throw new Error(`HTTP error [${response.status}:${response.statusText}] - ${errorText}`);
    }
    // Use eventsource-parser to process the SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const events = [];
    const parser = createParser({
        onEvent: (event) => {
            if (event.data) {
                if (event.event === "close") {
                    logDebug("handleEventStream", "Stream closed");
                    return;
                }
                try {
                    const parsedData = parseResponse(event.data);
                    const eventResult = parsedData.result;
                    if (eventResult) {
                        events.push(eventResult);
                    }
                    else {
                        logWarn("handleEventStream", "Failed to parse SSE data", parsedData);
                    }
                    // if (parsedData.final && parsedData.final === true) {
                    //   logDebug("handleEventStream", "Stream completed");
                    //   return;
                    // }
                }
                catch (e) {
                    logWarn("handleEventStream", "Failed to parse SSE data", e);
                }
            }
        },
        onError: (error) => {
            logError("handleEventStream", "Error parsing SSE data", error);
        },
        onRetry: (retry) => {
            logWarn("handleEventStream", "Retrying SSE connection", retry);
        },
    });
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            const chunk = decoder.decode(value, { stream: true });
            parser.feed(chunk);
            while (events.length > 0) {
                yield events.shift();
            }
        }
    }
    finally {
        reader.releaseLock();
    }
}
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
export async function* executeStreamEvents(baseUrl, method, params, customHeaders) {
    logDebug("executeStreamEvents", `Sending streaming request to: ${baseUrl.toString()}, method: ${method}`);
    const responsePromise = sendJsonRpcRequest(baseUrl, method, params, customHeaders, "text/event-stream");
    const response = await responsePromise;
    logDebug("executeStreamEvents", "Response", response);
    yield* handleEventStream(response);
}
