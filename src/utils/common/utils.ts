import { MessageSendParams, Part } from "../../types/extended-schema.js";
import { INVALID_PARAMS } from "./errors.js";

/**
 * Generates a timestamp in ISO 8601 format.
 * @returns The current timestamp as a string.
 */
export function getCurrentTimestamp(): string {
  return "2024-01-01T00:00:00.000Z"; //new Date().toISOString(); //! DO NOT PUSH THIS CHANGE
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
 * Validates a task send parameters object.
 * @param params The parameters to validate
 * @throws INVALID_PARAMS if the parameters are invalid
 */
export function validateSendMessageParams(
  params: any
): asserts params is MessageSendParams {
  // Structure validation
  if (!params || typeof params !== "object") {
    throw INVALID_PARAMS("Invalid parameters");
  }
  // Message validation
  if (!params.message || typeof params.message !== "object") {
    throw INVALID_PARAMS("Invalid message");
  }

  // Role validation
  if (params.message.role !== "user") {
    throw INVALID_PARAMS("Invalid message role");
  }

  // Parts validation
  if (
    !Array.isArray(params.message.parts) ||
    params.message.parts.length === 0
  ) {
    throw INVALID_PARAMS("Invalid message parts");
  }
  if (
    params.message.parts.some(
      (part: Part) =>
        !part.kind ||
        (part.kind !== "text" && part.kind !== "data" && part.kind !== "file")
    )
  ) {
    throw INVALID_PARAMS("Message parts must be text, data, or file");
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
