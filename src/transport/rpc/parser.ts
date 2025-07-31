import {
  JSONRPCError,
  JSONRPCResponse,
  JSONRPCErrorSchema,
  JSONRPCResponseSchema,
} from "../../types/extended-schema.js";
import { SystemError, PARSE_ERROR } from "../../utils/common/errors.js";
import { logError } from "../../utils/logging/log.js";

/**
 * Parses a JSON-RPC response string and validates its structure.
 * If the response contains an error, it is thrown as an A2AError.
 * If the response contains neither a result nor an error, a validation error is thrown.
 *
 * @param data Response data as string
 * @returns The parsed and validated response object
 * @throws A2AError if the response contains an error or is invalid
 */
export function parseResponse<Res extends JSONRPCResponse>(data: string): Res {
  if (!data) {
    throw PARSE_ERROR("Invalid response data");
  }

  try {
    const parsed = JSON.parse(data) as Res; //todo: leverage safe parse
    if (parsed.error) {
      const parsedError = JSONRPCErrorSchema.safeParse(parsed.error);
      if (!parsedError.success) {
        throw PARSE_ERROR(parsedError.error);
      }
      throw new SystemError<JSONRPCError>(
        parsedError.data.message,
        parsedError.data.code,
        parsedError.data.data
      );
    }

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.jsonrpc !== "2.0"
    ) {
      throw PARSE_ERROR("invalid jsonrpc");
    }

    if (parsed.result === undefined) {
      throw PARSE_ERROR("result is undefined");
    }

    return parsed as Res;
  } catch (error) {
    if (error instanceof SystemError) {
      logError("parseResponse", "SystemError:", error.message);
      throw error;
    }
    logError("parseResponse", "Error parsing response:", data);
    throw PARSE_ERROR(error);
  }
}
