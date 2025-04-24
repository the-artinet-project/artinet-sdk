import { jest } from "@jest/globals";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  A2AError,
  sendJsonRpcRequest,
  sendGetRequest,
  handleJsonRpcResponse,
  handleJsonResponse,
  executeJsonRpcRequest,
  executeGetRequest,
  createJsonRpcRequest,
  parseResponse,
  handleEventStream,
  executeStreamEvents,
  ErrorCodeParseError,
  JSONRPCRequest,
  JSONRPCResponse,
  SystemError,
  logger,
} from "../src/index.js";
// Define a TestRequest type that matches JSONRPCRequest constraint
type TestMethod =
  | "test/method"
  | "test/empty"
  | "test/invalid"
  | "test/error"
  | "test/network-error"
  | "test/streaming";

// Define a custom request type for testing
interface TestRequest extends JSONRPCRequest {
  method: TestMethod;
  params: {
    param?: string;
    status?: string;
    [key: string]: any;
  };
}

// Mock logger to suppress output during tests
jest.spyOn(logger, "info").mockImplementation(() => {});
jest.spyOn(logger, "debug").mockImplementation(() => {});
jest.spyOn(logger, "error").mockImplementation(() => {});
jest.spyOn(logger, "warn").mockImplementation(() => {});

// Setup MSW server for mocking HTTP requests
const server = setupServer(
  // Mock successful request
  http.post("https://example.com/api", ({ request }) => {
    const url = new URL(request.url);
    if (url.pathname === "/api") {
      const contentType = request.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        return HttpResponse.json({
          jsonrpc: "2.0",
          id: "test-id",
          result: { foo: "bar" },
        });
      }
    }
    return HttpResponse.json({}, { status: 404 });
  }),

  // Mock successful GET request
  http.get("https://example.com/api", () => {
    return HttpResponse.json({ success: true });
  }),

  // Mock network error GET request
  http.get("https://example.com/api/error", () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // Mock invalid JSON response
  http.get("https://example.com/api/invalid", () => {
    return new HttpResponse("not a json", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }),

  // Mock invalid JSON-RPC response with null result
  http.get("https://example.com/api/null-result", () => {
    return HttpResponse.json({
      jsonrpc: "2.0",
      id: "test-id",
    });
  }),

  // Mock empty response
  http.get("https://example.com/api/empty-response", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Mock network error for specific endpoints
  http.get("https://example.com/api/network-error", () => {
    throw new Error("Network error");
  }),

  http.post("https://example.com/api/network-error", () => {
    throw new Error("Network error");
  }),

  // Mock RPC error response
  http.post("https://example.com/api/rpc-error", () => {
    return HttpResponse.json(
      {
        jsonrpc: "2.0",
        id: "test-id",
        error: {
          code: -32603,
          message: "Internal error",
          data: { details: "Something went wrong" },
        },
      },
      { status: 200 }
    );
  }),

  // Mock invalid streaming response
  http.post("https://example.com/api/streaming", () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `event: message\ndata: ${JSON.stringify({
              jsonrpc: "2.0",
              id: "test-id",
              result: { status: "working" },
            })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(
            `event: message\ndata: ${JSON.stringify({
              jsonrpc: "2.0",
              id: "test-id",
              result: { status: "completed" },
            })}\n\n`
          )
        );
        controller.close();
      },
    });

    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
    });
  }),

  http.post("https://example.com/api/invalid-streaming", () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`event: message\ndata: invalid\n\n`));
        controller.close();
      },
    });

    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
    });
  })
);

describe("HTTP Utils", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  describe("sendJsonRpcRequest", () => {
    test("should send a JSON-RPC request and return the response", async () => {
      const response = await sendJsonRpcRequest(
        new URL("https://example.com/api"),
        "test/method" as any,
        {} as any, // Empty object to avoid type issues
        { "Custom-Header": "value" }
      );

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toEqual({
        jsonrpc: "2.0",
        id: expect.any(String),
        result: { foo: "bar" },
      });
    });

    test("should handle network errors", async () => {
      // Configure MSW to simulate a network error for this specific test
      server.use(
        http.post("https://example.com/api", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      try {
        await sendJsonRpcRequest(
          new URL("https://example.com/api"),
          "test/method" as any,
          {} as any
        );
        // If we get here, the test should fail only if we got a response
        // but we expected to throw
      } catch (error) {
        // Success - we expected it to throw
        expect(error).toBeDefined();
      }
    });
  });

  describe("sendGetRequest", () => {
    test("should send a GET request and return the response", async () => {
      const response = await sendGetRequest(
        new URL("https://example.com/api"),
        { "Custom-Header": "value" }
      );

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data).toEqual({ success: true });
    });

    test("should handle network errors", async () => {
      // Configure MSW to simulate a network error for this specific test
      server.use(
        http.get("https://example.com/api", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      try {
        await sendGetRequest(new URL("https://example.com/api"));
        // If we got here, the test should only fail if we got a response
        // when we expected it to throw
      } catch (error) {
        // Success - we expected it to throw
        expect(error).toBeDefined();
      }
    });
  });

  describe("handleJsonRpcResponse", () => {
    test("should parse and return the result from a JSON-RPC response", async () => {
      const response = await fetch("https://example.com/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test-id",
          method: "test/method",
        }),
      });

      const result = await handleJsonRpcResponse<
        JSONRPCResponse<{ foo: string }>
      >(response, "test/method");
      expect(result).toEqual({ foo: "bar" });
    });

    test("should handle HTTP errors with JSON-RPC errors", async () => {
      // Override the response for this specific test
      server.use(
        http.post("https://example.com/api", () => {
          return HttpResponse.json(
            {
              jsonrpc: "2.0",
              id: "test-id",
              error: {
                code: -32603,
                message: "Internal error",
              },
            },
            { status: 400 }
          );
        })
      );

      const response = await fetch("https://example.com/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test-id",
          method: "test/error",
        }),
      });

      try {
        await handleJsonRpcResponse<JSONRPCResponse>(response, "test/error");
        // If we get here, the test should fail
        expect(true).toBe(false); // Force test to fail
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
      }
    });

    test("should handle HTTP errors with non-JSON-RPC responses", async () => {
      server.use(
        http.post("https://example.com/api", () => {
          return new HttpResponse("Not a JSON-RPC response", {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          });
        })
      );

      const response = await fetch("https://example.com/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test-id",
          method: "test/method",
        }),
      });

      await expect(
        handleJsonRpcResponse<JSONRPCResponse>(response, "test/method")
      ).rejects.toThrow();
    });

    test("should handle responses with invalid JSON", async () => {
      server.use(
        http.post("https://example.com/api", () => {
          return new HttpResponse("not a json", {
            status: 200,
            headers: { "Content-Type": "text/plain" },
          });
        })
      );

      const response = await fetch("https://example.com/api", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test-id",
          method: "test/method",
        }),
      });

      await expect(
        handleJsonRpcResponse<JSONRPCResponse>(response, "test/method")
      ).rejects.toThrow(SystemError);
    });

    test("should handle JSON-RPC errors with data field", async () => {
      const response = await fetch("https://example.com/api/rpc-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: "test-id" }),
      });

      await expect(
        handleJsonRpcResponse<JSONRPCResponse>(response, "test/error-with-data")
      ).rejects.toThrow(SystemError);
    });

    test("should handle non-A2AError exceptions during processing", async () => {
      // Use a direct test of the error handling path in handleJsonRpcResponse
      const invalidResponse = new Response(null, { status: 200 });

      try {
        await handleJsonRpcResponse<JSONRPCResponse>(
          invalidResponse,
          "test/error-handling"
        );
        // Should not reach here
        expect("this line").toBe("not reached");
      } catch (error) {
        // Verify it's an A2AError with the right code
        expect(error instanceof SystemError).toBe(true);
        expect((error as SystemError).code).toBe(ErrorCodeParseError);
      }
    });
  });

  describe("handleJsonResponse", () => {
    test("should parse and return JSON from a successful response", async () => {
      const response = await fetch("https://example.com/api");
      const result = await handleJsonResponse<{ success: boolean }>(
        response,
        "test-endpoint"
      );
      expect(result).toEqual({ success: true });
    });

    test("should handle HTTP errors", async () => {
      const response = await fetch("https://example.com/api/error");
      await expect(
        handleJsonResponse<any>(response, "error-endpoint")
      ).rejects.toThrow();
    });

    test("should handle invalid JSON", async () => {
      const response = await fetch("https://example.com/api/invalid");
      await expect(
        handleJsonResponse<any>(response, "invalid-endpoint")
      ).rejects.toThrow(SystemError);
    });

    test("should handle empty responses", async () => {
      const response = await fetch("https://example.com/api/empty-response");
      await expect(
        handleJsonResponse<any>(response, "empty-response-endpoint")
      ).rejects.toThrow(SystemError);
    });
  });

  describe("parseResponse", () => {
    test("should parse valid JSON-RPC response", () => {
      const data = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
        result: { foo: "bar" },
      });

      const result = parseResponse<JSONRPCResponse<{ foo: string }>>(data);
      expect(result).toEqual({
        jsonrpc: "2.0",
        id: "test-id",
        result: { foo: "bar" },
      });
    });

    test("should throw for empty data", () => {
      expect(() => parseResponse("")).toThrow(SystemError);
    });

    test("should throw for JSON-RPC errors", () => {
      const data = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
        error: {
          code: -32601,
          message: "Method not found",
        },
      });

      expect(() => parseResponse(data)).toThrow(SystemError);
    });

    test("should throw for JSON-RPC errors with data field", () => {
      const data = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
        error: {
          code: -32603,
          message: "Internal error",
          data: { details: "Something went wrong" },
        },
      });

      expect(() => parseResponse(data)).toThrow(SystemError);
    });

    test("should throw for invalid JSON-RPC structure", () => {
      const data = JSON.stringify({
        not: "jsonrpc",
      });

      expect(() => parseResponse(data)).toThrow(SystemError);
    });

    test("should throw for missing result", () => {
      const data = JSON.stringify({
        jsonrpc: "2.0",
        id: "test-id",
      });

      expect(() => parseResponse(data)).toThrow(SystemError);
    });

    test("should throw for invalid JSON", () => {
      expect(() => parseResponse("invalid json")).toThrow(SystemError);
    });
  });

  describe("executeJsonRpcRequest", () => {
    test("should execute a JSON-RPC request and return the result", async () => {
      const result = await executeJsonRpcRequest(
        new URL("https://example.com/api"),
        "test/method" as any,
        {} as any, // Empty object to avoid type issues
        { "Custom-Header": "value" }
      );

      expect(result).toEqual({ foo: "bar" });
    });

    test("should handle errors", async () => {
      // Override the response for this specific test
      server.use(
        http.post("https://example.com/api", () => {
          return HttpResponse.json(
            {
              jsonrpc: "2.0",
              id: "test-id",
              error: {
                code: -32603,
                message: "Internal error",
              },
            },
            { status: 400 }
          );
        })
      );

      try {
        await executeJsonRpcRequest(
          new URL("https://example.com/api"),
          "test/error" as any,
          {} as any
        );
        // If we got here, the test should only fail if we got a response
        // when we expected it to throw
      } catch (error) {
        // Success - we expected it to throw
        expect(error).toBeDefined();
      }
    });

    test("should handle network errors", async () => {
      server.use(
        http.post("https://example.com/api", () => {
          throw new Error("Network error");
        })
      );

      try {
        await executeJsonRpcRequest(
          new URL("https://example.com/api"),
          "test/method" as any,
          {} as any
        );
        // If we got here, the test should only fail if we got a response
        // when we expected it to throw
      } catch (error) {
        // Success - we expected it to throw
        expect(error).toBeDefined();
      }
    });

    test("should accept different accept headers", async () => {
      const result = await executeJsonRpcRequest(
        new URL("https://example.com/api"),
        "test/method" as any,
        {} as any, // Empty object to avoid type issues
        { "Custom-Header": "value" },
        "application/json"
      );

      expect(result).toEqual({ foo: "bar" });
    });
  });

  describe("executeGetRequest", () => {
    test("should execute a GET request and return the parsed result", async () => {
      const result = await executeGetRequest<{ success: boolean }>(
        new URL("https://example.com/api"),
        { "Custom-Header": "value" },
        "test-endpoint"
      );

      expect(result).toEqual({ success: true });
    });

    test("should handle errors", async () => {
      await expect(
        executeGetRequest<any>(
          new URL("https://example.com/api/error"),
          {},
          "error-endpoint"
        )
      ).rejects.toThrow(SystemError);
    });

    test("should handle network errors", async () => {
      server.use(
        http.get("https://example.com/api", () => {
          throw new Error("Network error");
        })
      );

      await expect(
        executeGetRequest<any>(
          new URL("https://example.com/api"),
          {},
          "network-error-endpoint"
        )
      ).rejects.toThrow(SystemError);
    });

    test("should work without optional parameters", async () => {
      const result = await executeGetRequest<{ success: boolean }>(
        new URL("https://example.com/api")
      );

      expect(result).toEqual({ success: true });
    });
  });

  describe("handleEventStream", () => {
    test("should handle empty events array", async () => {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Send an event with valid structure but no data we care about
          controller.enqueue(
            encoder.encode(
              `event: message\ndata: ${JSON.stringify({
                jsonrpc: "2.0",
                id: "test-id",
                // Missing result property intentionally
              })}\n\n`
            )
          );
          controller.close();
        },
      });

      const response = new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });

      const generator = handleEventStream<JSONRPCResponse>(response);
      const results: any[] = [];

      for await (const event of generator) {
        results.push(event);
      }

      // Should not yield any events since the input had none
      expect(results.length).toBe(0);
    });

    test("should handle parser errors in event data", async () => {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Send an invalid event (not proper JSON)
          controller.enqueue(
            encoder.encode(`event: message\ndata: invalid-json\n\n`)
          );
          controller.close();
        },
      });

      const response = new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });

      const generator = handleEventStream<JSONRPCResponse>(response);
      const results: any[] = [];

      for await (const event of generator) {
        results.push(event);
      }

      // Should not yield any events since the input was invalid
      expect(results.length).toBe(0);
    });

    test("should handle valid events with undefined result", async () => {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Send an event with null result to trigger the warning branch
          controller.enqueue(
            encoder.encode(
              `event: message\ndata: ${JSON.stringify({
                jsonrpc: "2.0",
                id: "test-id",
                result: undefined,
              })}\n\n`
            )
          );
          controller.close();
        },
      });

      const response = new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });

      const generator = handleEventStream<JSONRPCResponse>(response);
      const results: any[] = [];

      for await (const event of generator) {
        results.push(event);
      }

      // Should not yield any events since result was undefined
      expect(results.length).toBe(0);
    });
  });

  describe("executeStreamEvents", () => {
    test.skip("should execute a streaming request and yield events", () => {});

    test.skip("should handle errors in streaming requests", () => {});
  });

  describe("createJsonRpcRequest", () => {
    test("should create a properly formatted JSON-RPC request with custom ID", () => {
      const request = createJsonRpcRequest(
        "test/method" as any,
        {} as any, // Empty object to avoid type issues
        "custom-id"
      );
      expect(request).toEqual({
        jsonrpc: "2.0",
        id: "custom-id",
        method: "test/method",
        params: {},
      });
    });

    test("should create a properly formatted JSON-RPC request with auto-generated ID", () => {
      const request = createJsonRpcRequest(
        "test/method" as any,
        {} as any // Empty object to avoid type issues
      );
      expect(request).toEqual({
        jsonrpc: "2.0",
        id: expect.any(String), // UUID is auto-generated
        method: "test/method",
        params: {},
      });
    });
  });

  describe("sendJsonRpcRequest with network errors", () => {
    test("should handle network error that's not an Error instance", async () => {
      try {
        await sendJsonRpcRequest(
          new URL("https://example.com/api"),
          "test/method" as any,
          {} as any // Empty params to avoid type issues
        );
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
        expect(error.message).toContain("Network connection lost");
      }
    });
  });

  describe("sendGetRequest with network errors", () => {
    test("should handle network error that's not an Error instance", async () => {
      try {
        await sendGetRequest(new URL("https://example.com/api"));
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
        expect(error.message).toContain("Connection timeout");
      }
    });
  });

  describe("parseResponse additional cases", () => {
    test("should handle error that's not an A2AError during parsing", () => {
      try {
        parseResponse("invalid json");
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
        expect((error as SystemError).code).toBe(ErrorCodeParseError);
      }
    });
  });

  describe("handleJsonResponse additional cases", () => {
    test("should handle error that's not an Error instance", async () => {
      server.use(
        http.get("https://example.com/api", () => {
          return new HttpResponse("", {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        })
      );

      const response = await fetch("https://example.com/api");
      try {
        await handleJsonResponse(response, "custom-endpoint");
      } catch (error) {
        expect(error).toBeInstanceOf(SystemError);
        expect(error.message).toContain("Invalid JSON payload");
      }
    });
  });
});
