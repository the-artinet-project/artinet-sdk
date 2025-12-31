/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { MCP } from "~/types/index.js";
import { SystemError, PARSE_ERROR } from "~/utils/common/errors.js";
import { logger } from "~/config/index.js";
/**
 * Parses a JSON-RPC response string and validates its structure.
 * If the response contains an error, it is thrown as an A2AError.
 * If the response contains neither a result nor an error, a validation error is thrown.
 *
 * @param data Response data as string
 * @returns The parsed and validated response object
 * @throws A2AError if the response contains an error or is invalid
 */
export function parseResponse<
  Res extends MCP.JSONRPCResponse | MCP.JSONRPCErrorResponse
>(data: string): Res {
  if (!data) {
    throw PARSE_ERROR("Invalid response data");
  }

  try {
    const parsed = JSON.parse(data) as Res; //todo: leverage safe parse
    if ((parsed as MCP.JSONRPCErrorResponse).error) {
      //MCP Error defs may be a wee bit restrictive
      const parsedError = MCP.JSONRPCErrorResponseSchema.safeParse(parsed);
      if (!parsedError.success) {
        throw PARSE_ERROR(parsedError.error);
      }
      throw new SystemError<MCP.JSONRPCErrorResponse>(
        parsedError.data.error.message,
        parsedError.data.error.code,
        parsedError.data.error.data
      );
    }

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.jsonrpc !== "2.0"
    ) {
      throw PARSE_ERROR("invalid jsonrpc");
    }

    if ((parsed as MCP.JSONRPCResultResponse).result === undefined) {
      throw PARSE_ERROR("result is undefined");
    }

    return parsed as Res;
  } catch (error) {
    if (error instanceof SystemError) {
      logger.error("parseResponse: SystemError:", error);
      throw error;
    }
    logger.error("parseResponse: Error parsing response:", error);
    throw PARSE_ERROR(error);
  }
}
