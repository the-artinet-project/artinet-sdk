import { Response } from "express";
import { JSONRPCError, JSONRPCResponse } from "../../types/index.js";
import { TaskEvent, UpdateEvent } from "../../types/extended-schema.js";
import { processUpdate } from "../../server/lib/state.js";
import { TaskStore, TaskAndHistory } from "../../server/interfaces/store.js";
import {
  AgentEngine,
  ExecutionContext,
  TaskContext,
  A2AExecutionContext,
} from "../../types/index.js";
import { FAILED_UPDATE, INTERNAL_ERROR } from "../../utils/common/errors.js";
import { logError } from "../../utils/logging/log.js";
import {
  SendStreamingMessageRequest,
  TaskResubscriptionRequest,
} from "../../types/index.js";

/**
 * Sets up a Server-Sent Events stream with appropriate headers
 * and initializes tracking for the stream.
 *
 * @param res The Express Response object
 * @param taskId The task ID to associate with this stream
 * @param reqId The request ID for acknowledgment
 * @param initialStatus Optional initial status to send
 * @param addStreamMethod Function to add stream to tracking
 * @param sendSseMethod Function to send SSE events
 */
export function setupSseStream(
  res: Response,
  taskId: string,
  initialStatus: TaskEvent,
  addStreamMethod?: (taskId: string, res: Response) => void
): void {
  // Set up SSE stream headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  // Track this stream for potential cancellation if tracking method provided
  if (addStreamMethod) {
    addStreamMethod(taskId, res);
  }
  // Send initial status if provided
  if (initialStatus) {
    sendSSEEvent(res, taskId, initialStatus);
  }
}

/**
 * Sends a Server-Sent Event with task data.
 * @param res The Express Response object
 * @param reqId The request ID
 * @param eventData The event data to send
 */
export function sendSSEEvent(
  res: Response,
  id: string,
  update: UpdateEvent
): void {
  if (!res.writable) {
    return;
  }

  const response: JSONRPCResponse<UpdateEvent> = {
    jsonrpc: "2.0",
    id: id,
    result: update,
  };

  res.write(`data: ${JSON.stringify(response)}\n\n`);
}

/**
 * Sends a Server-Sent Event with error data.
 * @param res The Express Response object
 * @param reqId The request ID
 * @param error The error to send
 */
export function sendSSEError(
  res: Response,
  error: JSONRPCError<any, any>
): void {
  if (!res.writable) {
    return;
  }

  const response: JSONRPCResponse<null, any> = {
    jsonrpc: "2.0",
    error: error,
  };

  res.write(`data: ${JSON.stringify(response)}\n\n`);
}

/**
 * Processes a task stream, handling generator yields and sending SSE events.
 * @param req The request object
 * @param res The response object
 * @param taskId The task ID
 * @param context The task context
 * @param initialData The initial task data
 */
export async function processTaskStream<
  T extends A2AExecutionContext<
    SendStreamingMessageRequest | TaskResubscriptionRequest
  >,
>(
  context: TaskContext,
  taskStore: TaskStore,
  engine: AgentEngine,
  res: Response,
  taskId: string,
  initialData: TaskAndHistory,
  onCancel: (
    context: TaskContext,
    data: TaskAndHistory,
    res: Response
  ) => Promise<void>,
  onEnd: (taskId: string, res: Response) => Promise<void>,
  executionContext: ExecutionContext<T>
): Promise<void> {
  let currentData = initialData;

  const generator = engine(executionContext);

  try {
    for await (const yieldValue of generator) {
      if (context.isCancelled()) {
        await onCancel(context, currentData, res);
        return;
      }

      currentData = await processUpdate(taskStore, {
        context: context,
        current: currentData,
        update: yieldValue,
      });

      context.task = currentData.task;
      sendSSEEvent(res, taskId, yieldValue);
    }
  } catch (error) {
    try {
      const failedUpdate = FAILED_UPDATE(
        taskId,
        context.contextId,
        "failed-update",
        error instanceof Error ? error.message : String(error)
      );

      currentData = await processUpdate(taskStore, {
        context: context,
        current: currentData,
        update: failedUpdate,
      });

      sendSSEEvent(res, taskId, failedUpdate);
    } catch (saveError) {
      logError(
        "A2AServer",
        "Failed to save error state for streaming task",
        saveError,
        { taskId, originalError: error }
      );
    }

    sendSSEError(
      res,
      INTERNAL_ERROR(
        `Task execution error: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    );
  } finally {
    onEnd(taskId, res);
    if (!res.writableEnded) {
      res.write("event: close\ndata: {}\n\n");
      res.end();
    }
  }
}
