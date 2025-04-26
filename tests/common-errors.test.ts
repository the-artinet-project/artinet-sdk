import { jest } from "@jest/globals";
import {
  SystemError,
  PARSE_ERROR,
  METHOD_NOT_FOUND,
  INVALID_REQUEST,
  INVALID_PARAMS,
  INTERNAL_ERROR,
  TASK_NOT_FOUND,
  TASK_NOT_CANCELABLE,
  UNSUPPORTED_OPERATION,
  PUSH_NOTIFICATION_NOT_SUPPORTED,
  FAILED_UPDATE,
  errorHandler,
} from "../src/utils/common/errors.js";
import {
  ErrorCodeParseError,
  ErrorCodeInvalidParams,
  ErrorCodeInternalError,
  ErrorCodeInvalidRequest,
  ErrorCodeMethodNotFound,
  ErrorCodeTaskNotFound,
  ErrorCodeTaskNotCancelable,
  ErrorCodeUnsupportedOperation,
  ErrorCodePushNotificationNotSupported,
  TaskYieldUpdate,
} from "../src/types/extended-schema.js";

describe("Error Handling Utilities", () => {
  describe("SystemError", () => {
    it("should create a SystemError with proper attributes", () => {
      const error = new SystemError("System operation failed", -12345);
      expect(error.name).toBe("RpcError");
      expect(error.message).toBe("System operation failed");
      expect(error.code).toBe(-12345);
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(SystemError);
    });

    it("should include optional data in error object", () => {
      const data = { detail: "Additional error information" };
      const error = new SystemError("Error with data", -32000, data);
      expect(error.data).toEqual(data);
    });
  });

  describe("Error Factories", () => {
    it("should create Parse Error", () => {
      const error = PARSE_ERROR();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeParseError);
      expect(error.message).toBe("Invalid JSON payload");
    });

    it("should create Invalid Request Error", () => {
      const error = INVALID_REQUEST();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeInvalidRequest);
      expect(error.message).toBe("Request payload validation error");
    });

    it("should create Method Not Found Error", () => {
      const error = METHOD_NOT_FOUND();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeMethodNotFound);
      expect(error.message).toBe("Method not found");
    });

    it("should create Invalid Params Error", () => {
      const error = INVALID_PARAMS();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeInvalidParams);
      expect(error.message).toBe("Invalid parameters");
    });

    it("should create Internal Error", () => {
      const error = INTERNAL_ERROR();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeInternalError);
      expect(error.message).toBe("Internal error");
    });

    it("should create Task Not Found Error", () => {
      const error = TASK_NOT_FOUND();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeTaskNotFound);
      expect(error.message).toBe("Task not found");
    });

    it("should create Task Not Cancelable Error", () => {
      const error = TASK_NOT_CANCELABLE();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeTaskNotCancelable);
      expect(error.message).toBe("Task cannot be canceled");
    });

    it("should create Unsupported Operation Error", () => {
      const error = UNSUPPORTED_OPERATION();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodeUnsupportedOperation);
      expect(error.message).toBe("This operation is not supported");
    });

    it("should create Push Notification Not Supported Error", () => {
      const error = PUSH_NOTIFICATION_NOT_SUPPORTED();
      expect(error).toBeInstanceOf(SystemError);
      expect(error.code).toBe(ErrorCodePushNotificationNotSupported);
      expect(error.message).toBe("Push Notification is not supported");
    });

    it("should include data in created error", () => {
      const data = { field: "taskId", reason: "not found" };
      const error = TASK_NOT_FOUND(data);
      expect(error.data).toEqual(data);
    });
  });

  describe("FAILED_UPDATE", () => {
    it("should create a failed task update", () => {
      const message = "Task execution failed";
      const update = FAILED_UPDATE(message);

      // Test the structure without relying on specific type
      const failedUpdate = update as any;
      expect(failedUpdate.state).toBe("failed");
      expect(failedUpdate.message).toBeDefined();
      expect(failedUpdate.message.role).toBe("agent");
      expect(Array.isArray(failedUpdate.message.parts)).toBe(true);
      expect(failedUpdate.message.parts).toHaveLength(1);
      expect(failedUpdate.message.parts[0].type).toBe("text");
      expect(failedUpdate.message.parts[0].text).toBe(message);
    });
  });

  describe("Error Constants", () => {
    it("should have the correct error code values", () => {
      expect(ErrorCodeParseError).toBe(-32700);
      expect(ErrorCodeInvalidParams).toBe(-32602);
      expect(ErrorCodeInternalError).toBe(-32603);
      expect(ErrorCodeInvalidRequest).toBe(-32600);
      expect(ErrorCodeMethodNotFound).toBe(-32601);
      expect(ErrorCodeTaskNotFound).toBe(-32001);
      expect(ErrorCodeTaskNotCancelable).toBe(-32002);
      expect(ErrorCodeUnsupportedOperation).toBe(-32004);
      expect(ErrorCodePushNotificationNotSupported).toBe(-32003);
    });
  });
});
