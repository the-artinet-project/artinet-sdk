import { Response } from "express";
import { Artifact, JSONRPCError, JSONRPCResponse } from "../../types/schema.js";
import { TaskEvent } from "../../types/extended-schema.js";
import { updateState } from "../../server/lib/state.js";
import { TaskStore, TaskAndHistory } from "../../server/interfaces/store.js";
import { TaskContext, TaskHandler } from "../../types/context.js";
import { FAILED_UPDATE, INTERNAL_ERROR } from "../../utils/common/errors.js";
import {
  isArtifactUpdate,
  isTaskStatusUpdate,
} from "../../utils/common/utils.js";
import { logError } from "../../utils/logging/log.js";
import { FINAL_STATES } from "../../utils/common/constants.js";

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
    sendSSEEvent(res, initialStatus);
  }
}

/**
 * Sends a Server-Sent Event with task data.
 * @param res The Express Response object
 * @param reqId The request ID
 * @param eventData The event data to send
 */
export function sendSSEEvent(res: Response, update: TaskEvent): void {
  if (!res.writable) {
    return;
  }

  const response: JSONRPCResponse<TaskEvent> = {
    jsonrpc: "2.0",
    id: update.id,
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
export async function processTaskStream(
  taskStore: TaskStore,
  taskHandler: TaskHandler,
  res: Response,
  taskId: string,
  context: TaskContext,
  initialData: TaskAndHistory,
  onCancel: (data: TaskAndHistory, res: Response) => Promise<void>,
  onEnd: (taskId: string, res: Response) => Promise<void>
): Promise<void> {
  let currentData = initialData;

  const generator = taskHandler(context);

  try {
    for await (const yieldValue of generator) {
      if (context.isCancelled()) {
        await onCancel(currentData, res);
        return;
      }

      currentData = await updateState(taskStore, currentData, yieldValue);

      context.task = currentData.task;

      if (isTaskStatusUpdate(yieldValue)) {
        sendSSEEvent(res, {
          id: taskId,
          status: currentData.task.status,
          final: FINAL_STATES.includes(currentData.task.status.state),
        });
      } else if (isArtifactUpdate(yieldValue)) {
        const artifactIndex =
          currentData.task.artifacts?.findIndex(
            (a: Artifact) => a.name && a.name === yieldValue.name
          ) ??
          yieldValue.index ??
          -1;

        if (
          artifactIndex >= 0 &&
          currentData.task.artifacts &&
          artifactIndex < currentData.task.artifacts.length
        ) {
          sendSSEEvent(res, {
            id: taskId,
            artifact: currentData.task.artifacts[artifactIndex],
            final: FINAL_STATES.includes(currentData.task.status.state),
          });
        }
      }
    }
  } catch (error) {
    try {
      const failedUpdate = FAILED_UPDATE(
        error instanceof Error ? error.message : String(error)
      );

      currentData = await updateState(taskStore, currentData, failedUpdate);

      sendSSEEvent(res, {
        id: taskId,
        status: currentData.task.status,
      });
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
