/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { MCP } from "~/types/index.js";
import { SystemError, INTERNAL_ERROR } from "~/utils/index.js";
import { logger } from "~/config/index.js";
import { type ErrorRequestHandler } from "express";
import escapeHtml from "escape-html";

/**
 * Express error handler middleware.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  let headersSent = false;
  if (res.headersSent) {
    headersSent = true;
  }
  logger.error("errorHandler", err);
  let reqId = null;
  try {
    if (req.body && typeof req.body === "object" && "id" in req.body) {
      reqId = req.body.id;
    }
  } catch (e: unknown) {
    logger.error(
      "errorHandler: Error extracting request ID",
      e instanceof Error ? e : new Error(String(e))
    );
  }

  let jsonRpcError: MCP.JSONRPCError["error"];
  if (err instanceof SystemError) {
    jsonRpcError = { code: err.code, message: err.message, data: err.data };
  } else {
    const internalError = INTERNAL_ERROR(err.stack);
    jsonRpcError = {
      code: internalError.code,
      message: internalError.message,
      data: internalError.data,
    };
  }

  const errorResponse = {
    jsonrpc: "2.0",
    id: escapeHtml(reqId),
    error: jsonRpcError,
  };

  if (!headersSent) {
    res.json(errorResponse);
  } else {
    res.write(JSON.stringify(errorResponse));
    res.end();
  }
};
