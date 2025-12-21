/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Event stream utilities for handling Server-Sent Events (SSE).
 */
import { parseResponse } from "../rpc/parser.js";
import {
  createParser,
  EventSourceMessage,
  ParseError,
} from "eventsource-parser";
import { A2A, MCP } from "~/types/index.js";
import { sendJsonRpcRequest } from "../rpc/rpc-client.js";
import { logger } from "~/config/index.js";

/**
 * Creates an async generator for processing task events from an SSE stream
 *
 * @template T The type of task event to process (TaskStatusUpdateEvent or TaskArtifactUpdateEvent)
 * @param response The fetch Response object containing the event stream
 * @returns An async generator yielding the specified type of task events from StreamingResponse
 */
export async function* handleEventStream<StreamRes extends MCP.JSONRPCResponse>(
  response: Response
): AsyncGenerator<NonNullable<StreamRes["result"]>> {
  if (!response.ok || !response.body) {
    let errorText: string | null = null;
    try {
      errorText = await response.text();
    } catch (_) {}
    const err = new Error(
      `HTTP error [${response.status}:${response.statusText}] - ${errorText}`
    );
    logger.error(
      `handleEventStream: HTTP error [${response.status}:${response.statusText}] - ${errorText}`,
      err
    );
    throw err;
  }
  // Use eventsource-parser to process the SSE stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const events: StreamRes["result"][] = [];

  const parser = createParser({
    onEvent: (event: EventSourceMessage) => {
      if (event.data) {
        if (event.event === "close") {
          logger.debug("handleEventStream", "Stream closed");
          return;
        }
        try {
          const parsedData = parseResponse<StreamRes>(event.data);
          const eventResult = parsedData.result;
          if (eventResult) {
            events.push(eventResult as StreamRes["result"]);
          } else {
            logger.warn(
              "handleEventStream",
              "Failed to parse SSE data",
              parsedData
            );
          }
          // if (parsedData.final && parsedData.final === true) {
          //   logDebug("handleEventStream", "Stream completed");
          //   return;
          // }
        } catch (e) {
          logger.warn("handleEventStream", "Failed to parse SSE data", e);
        }
      }
    },
    onError: (error: ParseError) => {
      logger.error("handleEventStream: Error parsing SSE data", error);
    },
    onRetry: (retry: number) => {
      logger.warn("handleEventStream", "Retrying SSE connection", retry);
    },
  });

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      parser.feed(chunk);

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
  Req extends A2A.A2ARequest,
  StreamRes extends MCP.JSONRPCResponse
>(
  baseUrl: URL,
  method: Req["method"],
  params: Req["params"],
  customHeaders: Record<string, string>
): AsyncIterable<NonNullable<StreamRes["result"]>> {
  logger.debug(
    "executeStreamEvents",
    `Sending streaming request to: ${baseUrl.toString()}, method: ${method}`
  );

  const responsePromise = sendJsonRpcRequest(
    baseUrl,
    method,
    params,
    customHeaders,
    "text/event-stream"
  );
  const response = await responsePromise;
  logger.debug("executeStreamEvents", "Response", response);
  yield* handleEventStream<StreamRes>(response);
}
