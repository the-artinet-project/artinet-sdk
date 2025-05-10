import { JSONRPCResponse } from "../../types/extended-schema.js";
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
    const parsed = JSON.parse(data) as Res;
    if (parsed.error) {
      throw new SystemError(
        parsed.error.message,
        parsed.error.code,
        parsed.error.data
      );
    }

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.jsonrpc !== "2.0"
    ) {
      throw PARSE_ERROR<string>("invalid jsonrpc");
    }

    if (parsed.result === undefined) {
      throw PARSE_ERROR("result is undefined");
    }

    return parsed;
  } catch (error) {
    logError("parseResponse", "Error parsing response:", data);
    if (error instanceof SystemError) {
      throw error;
    }
    throw PARSE_ERROR(error);
  }
}
