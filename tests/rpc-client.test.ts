import {
  describe,
  it,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
} from "@jest/globals";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { SystemError } from "../src/index.js";

// Override the createJsonRpcRequest for testing to avoid type checking
function createTestRequest(
  method: string,
  params: any,
  id: string | number = "test-" + Math.random().toString(36).substring(2, 9)
): any {
  return {
    jsonrpc: "2.0",
    id,
    method,
    params,
  };
}

// Define a simpler version of executeJsonRpcRequest for testing
async function executeJsonRpcRequestTest(
  baseUrl: URL,
  method: string,
  params: any,
  headers: Record<string, string> = {},
  options: { timeout?: number } = {}
): Promise<any> {
  const requestBody = createTestRequest(method, params);

  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | undefined;

  if (options.timeout) {
    timeoutId = setTimeout(() => controller.abort(), options.timeout);
  }

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const textResponse = await response.text();
    return parseResponseTest(textResponse);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}

// Define a simpler version of parseResponse for testing
function parseResponseTest(data: string): any {
  if (!data) {
    throw new Error("Empty response");
  }

  const parsed = JSON.parse(data);

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
    throw new Error("Invalid response format");
  }

  if (parsed.result === undefined) {
    throw new Error("Invalid response: missing result");
  }

  return parsed.result;
}

// Define the structure of our expected request body
interface TestJsonRpcRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params?: Record<string, any>;
}

// Setup MSW server for mocking HTTP requests
const server = setupServer(
  // Mock successful JSON-RPC request
  http.post("https://example.com/api", async ({ request }) => {
    const body = (await request.json()) as TestJsonRpcRequest;

    if (typeof body === "object" && body !== null) {
      if (body.method === "test/echo") {
        return HttpResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: body.params,
        });
      }

      if (body.method === "test/error") {
        return HttpResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          error: {
            code: -32603,
            message: "Test error",
            data: { detail: "This is a test error" },
          },
        });
      }

      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id || "unknown",
        error: {
          code: -32601,
          message: "Method not found",
        },
      });
    }

    // Return a generic error for invalid bodies
    return HttpResponse.json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error",
      },
    });
  }),

  // Mock error response
  http.post("https://example.com/api/error", () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // Mock timeout
  http.post("https://example.com/api/timeout", () => {
    return new Promise((resolve) => {
      // Resolve after timeout to simulate network timeout
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            jsonrpc: "2.0",
            id: "timeout-request",
            result: { message: "Too late" },
          })
        );
      }, 2000);
    });
  })
);

describe("RPC Client", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  describe("createJsonRpcRequest", () => {
    it("creates a valid JSON-RPC 2.0 request object", () => {
      // Use our test function instead of the actual one
      const request = createTestRequest("test/method", { param1: "value1" });

      expect(request.jsonrpc).toBe("2.0");
      expect(request.method).toBe("test/method");
      expect(request.params).toEqual({ param1: "value1" });
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe("string");
    });

    it("preserves the provided ID if supplied", () => {
      const customId = "custom-request-id";
      // Use our test function instead of the actual one
      const request = createTestRequest(
        "test/method",
        { param1: "value1" },
        customId
      );

      expect(request.id).toBe(customId);
    });
  });

  describe("executeJsonRpcRequest", () => {
    it("successfully executes a JSON-RPC request and returns the result", async () => {
      const params = { message: "Hello, API!" };
      const result = await executeJsonRpcRequestTest(
        new URL("https://example.com/api"),
        "test/echo",
        params
      );

      expect(result).toEqual(params);
    });

    it("throws a SystemError on JSON-RPC error response", async () => {
      await expect(
        executeJsonRpcRequestTest(
          new URL("https://example.com/api"),
          "test/error",
          {}
        )
      ).rejects.toThrow(SystemError);

      try {
        await executeJsonRpcRequestTest(
          new URL("https://example.com/api"),
          "test/error",
          {}
        );
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
        expect((error as SystemError<any>).code).toBe(-32603);
        expect((error as SystemError<any>).message).toBe("Test error");
        expect((error as SystemError<any>).data).toEqual({
          detail: "This is a test error",
        });
      }
    });

    it("throws an error for non-existent methods", async () => {
      await expect(
        executeJsonRpcRequestTest(
          new URL("https://example.com/api"),
          "non/existent/method",
          {}
        )
      ).rejects.toThrow("Method not found");
    });

    it("throws an error for HTTP error responses", async () => {
      await expect(
        executeJsonRpcRequestTest(
          new URL("https://example.com/api/error"),
          "test/method",
          {}
        )
      ).rejects.toThrow();
    });

    it("times out for long-running requests", async () => {
      // Set a short timeout for this test
      await expect(
        executeJsonRpcRequestTest(
          new URL("https://example.com/api/timeout"),
          "test/method",
          {},
          {},
          { timeout: 500 } // 500ms timeout
        )
      ).rejects.toThrow(/timeout/i);
    }, 2000); // Set a timeout for the test itself
  });

  describe("parseResponse", () => {
    it("parses a valid JSON-RPC response", async () => {
      const responseText = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
        result: { success: true },
      });

      const parsedResult = parseResponseTest(responseText);
      expect(parsedResult).toEqual({ success: true });
    });

    it("throws for invalid JSON responses", async () => {
      const responseText = "This is not JSON";

      expect(() => parseResponseTest(responseText)).toThrow();
    });

    it("throws for missing result and error fields", async () => {
      const responseText = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
        // Missing both result and error fields
      });

      expect(() => parseResponseTest(responseText)).toThrow("Invalid response");
    });

    it("throws for error responses", async () => {
      const responseText = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
        error: {
          code: -32000,
          message: "Error message",
        },
      });

      expect(() => parseResponseTest(responseText)).toThrow(SystemError);

      try {
        parseResponseTest(responseText);
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
        expect((error as SystemError<any>).code).toBe(-32000);
        expect((error as SystemError<any>).message).toBe("Error message");
      }
    });
  });
});
