import {
  ErrorCodeInternalError,
  ErrorCodeParseError,
  JSONRPCResponse,
} from "../lib/schema.js";
import { RpcError } from "../lib/errors.js";

/**
 * Parses a JSON-RPC response string and validates its structure.
 * If the response contains an error, it is thrown as an RpcError.
 * If the response contains neither a result nor an error, a validation error is thrown.
 *
 * @param data Response data as string
 * @returns The parsed and validated response object
 * @throws RpcError if the response contains an error or is invalid
 */
export function parseResponse<Res extends JSONRPCResponse>(data: string): Res {
  if (!data) {
    throw new RpcError(ErrorCodeParseError, "Empty JSON-RPC response body.");
  }

  try {
    const parsed = JSON.parse(data) as Res;
    // If there's an error, throw it
    if (parsed.error) {
      throw new RpcError(
        parsed.error.code,
        parsed.error.message,
        parsed.error.data
      );
    }

    // Validate the basic JSON-RPC structure
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.jsonrpc !== "2.0"
    ) {
      throw new RpcError(
        ErrorCodeParseError,
        "Invalid JSON-RPC response structure."
      );
    }

    // Ensure we have a result (if not an error)
    if (parsed.result === undefined) {
      throw new RpcError(
        ErrorCodeInternalError,
        "JSON-RPC response contains neither result nor error."
      );
    }

    return parsed;
  } catch (error) {
    if (error instanceof RpcError) {
      throw error;
    }
    throw new RpcError(
      ErrorCodeParseError, // Parse error
      `Failed to parse JSON-RPC response: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error
    );
  }
}
