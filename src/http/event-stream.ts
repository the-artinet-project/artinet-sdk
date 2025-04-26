/**
 * Event stream utilities for handling Server-Sent Events (SSE) from Artinet API.
 */
import { parseResponse } from "./parser.js";
import { createParser } from "eventsource-parser";
import type { JSONRPCResponse, A2ARequest } from "../lib/schema.js";
import { sendJsonRpcRequest } from "./rpc-client.js";
import { logger } from "../utils/logger.js";

/**
 * Creates an async generator for processing task events from an SSE stream
 *
 * @template T The type of task event to process (TaskStatusUpdateEvent or TaskArtifactUpdateEvent)
 * @param response The fetch Response object containing the event stream
 * @param eventType 'status' for status events or 'artifact' for artifact events
 * @returns An async generator yielding the specified type of task events from StreamingResponse
 */
export async function* handleEventStream<StreamRes extends JSONRPCResponse>(
  response: Response,
  eventType: "status" | "artifact"
): AsyncGenerator<NonNullable<StreamRes["result"]>> {
  // Ensure the response is valid for SSE processing
  if (!response.ok || !response.body) {
    let errorText: string | null = null;
    try {
      errorText = await response.text();
    } catch (_) {
      /* Ignore read error */
    }
    logger.error(
      `HTTP error [${response.status}:${response.statusText}] - ${errorText}`
    );
    throw new Error(
      `HTTP error [${response.status}:${response.statusText}] - ${errorText}`
    );
  }
  // Use eventsource-parser to process the SSE stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let events: StreamRes["result"][] = [];

  const parser = createParser((event) => {
    if (event.type === "event" && event.data) {
      try {
        const parsedData = parseResponse<StreamRes>(event.data);
        const eventResult = parsedData.result;
        if (eventResult) {
          events.push(eventResult as StreamRes["result"]);
        } else {
          logger.warn("Failed to parse SSE data[", eventType, "]:", parsedData);
        }
      } catch (e) {
        logger.warn("Failed to parse SSE data[", eventType, "]:", e);
      }
    }
  });

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      parser.feed(chunk);

      // Yield any new events
      while (events.length > 0) {
        yield events.shift()!;
      }
    }
  } finally {
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
export async function* executeStreamEvents<
  Req extends A2ARequest,
  StreamRes extends JSONRPCResponse,
>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  customHeaders: Record<string, string>
): AsyncIterable<NonNullable<StreamRes["result"]>> {
  const responsePromise = sendJsonRpcRequest(
    baseUrl,
    method,
    params,
    customHeaders,
    "text/event-stream"
  );
  const response = await responsePromise;
  yield* handleEventStream<StreamRes>(response, "status");
}
