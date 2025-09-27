/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { A2AError, InvalidParamsError, InvalidRequestError, JSONRPCError, MethodNotFoundError, InternalError, TaskNotFoundError, TaskNotCancelableError, ContentTypeNotSupportedError, InvalidAgentResponseError, TaskStatusUpdateEvent, JSONParseError } from "../../types/index.js";
export declare class SystemError<T extends JSONRPCError> extends Error {
    message: string;
    code: T["code"];
    data: T["data"];
    constructor(message: string, code: T["code"], data: T["data"]);
}
export declare const PARSE_ERROR: <T extends JSONParseError>(data: T["data"]) => SystemError<T>;
export declare const INVALID_REQUEST: <T extends InvalidRequestError>(data: T["data"]) => SystemError<T>;
export declare const METHOD_NOT_FOUND: <T extends MethodNotFoundError>(data: T["data"]) => SystemError<T>;
export declare const INVALID_PARAMS: <T extends InvalidParamsError>(data: T["data"]) => SystemError<T>;
export declare const INTERNAL_ERROR: <T extends InternalError>(data: T["data"]) => SystemError<T>;
export declare const TASK_NOT_FOUND: <T extends TaskNotFoundError>(data: T["data"]) => SystemError<T>;
export declare const TASK_NOT_CANCELABLE: <T extends TaskNotCancelableError>(data: T["data"]) => SystemError<T>;
export declare const PUSH_NOTIFICATION_NOT_SUPPORTED: <T extends A2AError>(data: T["data"]) => SystemError<T>;
export declare const UNSUPPORTED_OPERATION: <T extends A2AError>(data: T["data"]) => SystemError<T>;
export declare const CONTENT_TYPE_NOT_SUPPORTED: <T extends ContentTypeNotSupportedError>(data: T["data"]) => SystemError<T>;
export declare const INVALID_AGENT_RESPONSE: <T extends InvalidAgentResponseError>(data: T["data"]) => SystemError<T>;
export declare const FAILED_UPDATE: (taskId: string, contextId: string, messageId: string | undefined, errMessage: string) => TaskStatusUpdateEvent;
//# sourceMappingURL=errors.d.ts.map