import {
  Artifact,
  ExtendedTaskStatusUpdate,
  TaskYieldUpdate,
  TaskSendParams,
  TaskQueryParams,
} from "../../types/extended-schema.js";

import { INVALID_PARAMS } from "./errors.js";

/**
 * Generates a timestamp in ISO 8601 format.
 * @returns The current timestamp as a string.
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Checks if a value is a plain object (excluding arrays and null).
 * @param value The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Type guard to check if an object is a TaskStatus update (lacks 'parts').
 * Used to differentiate yielded updates from the handler.
 */
export function isTaskStatusUpdate(
  update: TaskYieldUpdate
): update is ExtendedTaskStatusUpdate {
  return isObject(update) && "state" in update && !("parts" in update);
}

/**
 * Type guard to check if an object is an Artifact update (has 'parts').
 * Used to differentiate yielded updates from the handler.
 */
export function isArtifactUpdate(update: TaskYieldUpdate): update is Artifact {
  return isObject(update) && "parts" in update && !("state" in update);
}

export function validateTaskResubscribeParams(
  params: any
): asserts params is TaskQueryParams {
  // Structure validation
  if (!params || typeof params !== "object") {
    throw INVALID_PARAMS();
  }
  if (typeof params.id !== "string" || params.id === "") {
    throw INVALID_PARAMS();
  }
}
/**
 * Validates a task send parameters object.
 * @param params The parameters to validate
 * @throws INVALID_PARAMS if the parameters are invalid
 */
export function validateTaskSendParams(
  params: any
): asserts params is TaskSendParams {
  // Structure validation
  if (!params || typeof params !== "object") {
    throw INVALID_PARAMS();
  }
  if (typeof params.id !== "string" || params.id === "") {
    throw INVALID_PARAMS();
  }

  // Message validation
  if (!params.message || typeof params.message !== "object") {
    throw INVALID_PARAMS();
  }

  // Role validation
  if (params.message.role !== "user") {
    throw INVALID_PARAMS();
  }

  // Parts validation
  if (
    !Array.isArray(params.message.parts) ||
    params.message.parts.length === 0
  ) {
    throw INVALID_PARAMS();
  }
}

export function extractTaskId(id: number | string | null | undefined): string {
  if (!id) {
    throw INVALID_PARAMS("Missing task ID");
  }
  if (typeof id === "number") {
    return id.toString();
  }
  return id;
}
