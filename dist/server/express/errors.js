/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { SystemError, INTERNAL_ERROR } from "../../utils/index.js";
import { logError } from "../../utils/logging/index.js";
import escapeHtml from "escape-html";
/**
 * Express error handler middleware.
 */
export const errorHandler = (err, req, res, _) => {
    let headersSent = false;
    if (res.headersSent) {
        headersSent = true;
    }
    logError("errorHandler", JSON.stringify(err), err);
    let reqId = null;
    try {
        if (req.body && typeof req.body === "object" && "id" in req.body) {
            reqId = req.body.id;
        }
    }
    catch (e) {
        logError("A2AServer", "Error extracting request ID", e);
    }
    let jsonRpcError;
    if (err instanceof SystemError) {
        jsonRpcError = { code: err.code, message: err.message, data: err.data };
    }
    else {
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
    }
    else {
        res.write(JSON.stringify(errorResponse));
        res.end();
    }
};
//# sourceMappingURL=errors.js.map