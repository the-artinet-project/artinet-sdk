/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { ErrorCodeInternalError, ErrorCodeInvalidRequest, ErrorCodeMethodNotFound, ErrorCodeParseError, ErrorCodeInvalidParams, ErrorCodeTaskNotFound, ErrorCodeTaskNotCancelable, ErrorCodeUnsupportedOperation, ErrorCodePushNotificationNotSupported, ErrorCodeContentTypeNotSupported, ErrorCodeInvalidAgentResponse, TaskState, } from "../../types/index.js";
export class SystemError extends Error {
    message;
    code;
    data;
    constructor(message, code, data) {
        super(message);
        // this.name = "RpcError";
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
// Factory methods for common errors
export const PARSE_ERROR = (data) => new SystemError("Invalid JSON payload", ErrorCodeParseError, data);
export const INVALID_REQUEST = (data) => new SystemError("Request payload validation error", ErrorCodeInvalidRequest, data);
export const METHOD_NOT_FOUND = (data) => new SystemError("Method not found", ErrorCodeMethodNotFound, data);
export const INVALID_PARAMS = (data) => new SystemError("Invalid parameters", ErrorCodeInvalidParams, data);
export const INTERNAL_ERROR = (data) => new SystemError("Internal error", ErrorCodeInternalError, data);
export const TASK_NOT_FOUND = (data) => new SystemError("Task not found", ErrorCodeTaskNotFound, data);
export const TASK_NOT_CANCELABLE = (data) => new SystemError("Task cannot be canceled", ErrorCodeTaskNotCancelable, data);
export const PUSH_NOTIFICATION_NOT_SUPPORTED = (data) => new SystemError("Push Notifications is not supported", ErrorCodePushNotificationNotSupported, data);
export const UNSUPPORTED_OPERATION = (data) => new SystemError("This operation is not supported", ErrorCodeUnsupportedOperation, data);
export const CONTENT_TYPE_NOT_SUPPORTED = (data) => new SystemError("Content type not supported", ErrorCodeContentTypeNotSupported, data);
export const INVALID_AGENT_RESPONSE = (data) => new SystemError("Invalid agent response", ErrorCodeInvalidAgentResponse, data);
export const FAILED_UPDATE = (taskId, contextId, messageId = "failed-update", errMessage) => ({
    taskId,
    contextId,
    kind: "status-update",
    final: true,
    status: {
        state: TaskState.failed,
        message: {
            messageId,
            role: "agent",
            parts: [{ kind: "text", text: errMessage }],
            kind: "message",
        },
    },
});
//# sourceMappingURL=errors.js.map