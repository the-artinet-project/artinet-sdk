import { describe, beforeEach, test, expect, afterEach } from "@jest/globals";
import express from "express";
import http from "http";
import {
  A2AClient,
  TaskState,
  logInfo,
  configureLogger,
  ExecutionContext,
  MCPExecutionContext,
  MessageSendParams,
  SendMessageRequest,
  InMemoryTaskStore,
} from "../src/index.js";
import {
  A2AExecutionContext,
  AgentEngine,
  MCPContext,
} from "../src/types/services/context.js";
import { Protocol } from "../src/types/services/protocol.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { ServiceDispatcher } from "../src/types/services/dispatcher.js";
import { MCPService } from "../src/services/mcp/index.js";
import { A2AService } from "../src/services/a2a/index.js";
import { z } from "zod";
import { ExpressServer } from "../src/server/lib/express-server.js";
import expressListRoutes from "express-list-routes";
import request from "supertest";

configureLogger({ level: "silent" });

/**
 * Simple echo task handler for testing
 */
const echoAgent: AgentEngine = async function* (context: ExecutionContext) {
  const userMessage =
    context.protocol === Protocol.MCP
      ? (context.getRequestParams() as MCPContext).message
      : (context.getRequestParams() as MessageSendParams).message;
  // Extract user text
  const userText = userMessage;
  // Send working status
  yield {
    taskId:
      (context.getRequestParams() as MessageSendParams).message?.taskId ??
      context.id,
    contextId: context.id,
    kind: "status-update",
    status: {
      state: TaskState.working,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Processing..." }],
      },
    },
    final: false,
  };
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Check cancellation
  if (context.isCancelled()) {
    yield {
      taskId: context.id,
      contextId: context.id,
      kind: "status-update",
      status: {
        state: TaskState.canceled,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Task was canceled." }],
        },
      },
      final: true,
    };
    return;
  }

  // Create a response
  const response = `You said: "${userText}"`;

  // Create an artifact
  yield {
    taskId: context.id,
    contextId: context.id,
    kind: "artifact-update",
    artifact: {
      artifactId: "test-artifact-id",
      name: "echo.txt",
      parts: [{ kind: "text", text: response }],
    },
  };

  // Complete the task
  yield {
    id: context.id,
    contextId: context.id,
    kind: "task",
    status: {
      state: TaskState.completed,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: response }],
      },
    },
  };
};

const mockReq = (
  method: string,
  headers: Record<string, string> = {
    "mcp-session-id": "test-session-id",
    accept: "application/json, text/event-stream",
    "content-type": "application/json",
  },
  body: any = {
    jsonrpc: "2.0",
    id: "test-session-id",
    method: "tools/call",
    params: {
      name: "test-skill",
      arguments: {
        message: "hello world",
      },
    },
  }
) => {
  return {
    method: method,
    headers: headers,
    body: body,
    on: (event: string, callback: (...args: any[]) => void) => {
      logInfo("mockRequest", event);
    },
    status: (code: number) => {
      logInfo("mock request", code.toString());
    },
    write: (payload: any) => {
      logInfo("mock request", payload);
    },
    writeHead: (code: number, headers: Record<string, string>) => {
      logInfo("mock request", code.toString(), headers);
    },
    send: (payload: any) => {
      logInfo("mock request", payload);
    },
    end: (payload: any) => {
      logInfo("mock request", payload);
    },
  };
};

const mockRes = (
  resolve: (value?: any) => void,
  reject: (reason?: any) => void
) => {
  return {
    on: (event: string, callback: (...args: any[]) => void) => {
      logInfo("mockResponse", "on", event);
    },
    onclose: () => {
      logInfo("mockResponse", "onclose");
    },
    onerror: (error: any) => {
      logInfo("mockResponse", "onerror", error);
      reject(error);
    },
    onend: () => {
      logInfo("mockResponse", "onend");
    },
    ondata: (data: any) => {
      logInfo("mockResponse", "ondata", data);
    },
    ondrain: () => {
      logInfo("mockResponse", "ondrain");
    },
    onfinish: () => {
      logInfo("mockResponse", "onfinish");
    },
    write: (payload: any) => {
      logInfo("mockResponse", "write", payload);
    },
    writeHead: (code: number, headers: Record<string, string>) => {
      logInfo("mockResponseWriteHead", code.toString(), headers);
      if (code !== 200 && code !== 201 && code !== 204 && code !== 202) {
        reject(new Error(`Mock response error: ${code}`));
      }
      return {
        end: (arg: any) => {
          logInfo("writeHead:mockResponseEnd", arg);
          resolve();
        },
        send: (payload: any) => {
          logInfo("writeHead:mockResponseSend", payload);
        },
      };
    },
    send: (payload: any) => {
      logInfo("mockResponseSend", payload);
    },
    end: (payload: any) => {
      logInfo("mockResponseEnd", payload);
      resolve(payload);
    },
    status: (code: number) => {
      logInfo("mockResponseStatus", code.toString());
    },
  };
};

describe("Client-Server Integration Tests", () => {
  let dispatcher: ServiceDispatcher;
  let mcpService: MCPService;
  let a2aService: A2AService;
  let client: A2AClient;

  beforeEach(async () => {
    // Create a simple server
    a2aService = new A2AService({
      taskStore: new InMemoryTaskStore(),
      engine: echoAgent,
      card: {
        protocolVersion: "0.3.0   ",
        name: "test-agent",
        description: "test-description",
        url: "test-url",
        version: "1.0.0",
        capabilities: {
          streaming: false,
          pushNotifications: false,
          stateTransitionHistory: false,
        },
        defaultInputModes: ["text"],
        defaultOutputModes: ["text"],
        skills: [
          {
            id: "test-skill-id",
            name: "test-skill",
            description: "test-description",
            tags: ["test-tag"],
          },
        ],
      },
    });
    mcpService = new MCPService({
      serverInfo: {
        name: "test-mcp-server",
        version: "1.0.0",
      },
      engine: echoAgent,
      skills: [...a2aService.state.getCard().skills],
    });
    mcpService.tool(
      "echo-skill",
      {
        message: z.string(),
      },
      async ({ message }) => {
        return {
          content: [{ type: "text", text: message }],
        };
      }
    );
    dispatcher = new ServiceDispatcher({
      services: {
        [Protocol.A2A]: a2aService,
        [Protocol.MCP]: mcpService,
      },
      engine: echoAgent,
    });
  });

  test("dispatcher setup", async () => {
    expect(dispatcher).toBeDefined();
  });

  test("mcp service setup", async () => {
    expect(mcpService).toBeDefined();
  });

  test("a2a service setup", async () => {
    expect(a2aService).toBeDefined();
  });

  test("mcp execute", async () => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => "test-session-id",
    });
    transport.sessionId = "test-session-id";
    // @ts-ignore
    transport._initialized = true;
    return new Promise<void>((resolve, reject) => {
      const executionContext: ExecutionContext<MCPExecutionContext> = {
        id: "test-session-id",
        protocol: Protocol.MCP,
        getRequestParams: () => ({
          message: "Hello, world!",
        }),
        isCancelled: () => false,
        requestContext: {
          protocol: Protocol.MCP,
          id: "test-session-id",
          method: "tools/call",
          params: {
            message: "Hello, world!",
          },
          request: mockReq("POST"),
          transport: transport,
          response: mockRes(resolve, reject),
        },
      };
      mcpService
        .execute({
          executionContext: executionContext,
          engine: echoAgent,
        })
        .catch((error) => {
          console.error("mcpService execute error", error);
          reject(error);
        });
    });
  });

  test("a2a execute", async () => {
    return new Promise<void>((resolve, reject) => {
      const mockA2AReq = mockReq(
        "POST",
        {},
        {
          message: "Hello, world!",
        }
      );
      const mockA2ARes = mockRes(resolve, reject);
      const messageSendContext: A2AExecutionContext<SendMessageRequest> = {
        id: "test-message-id",
        protocol: Protocol.A2A,
        method: "message/send",
        params: {
          message: {
            messageId: "test-message-id",
            kind: "message",
            role: "user",
            parts: [{ kind: "text", text: "Hello, world!" }],
          },
        },
        request: mockA2AReq,
        response: mockA2ARes,
        task: {
          id: "test-message-id",
          contextId: "test-message-id",
          status: {
            state: TaskState.working,
            message: {
              messageId: "test-message-id",
              kind: "message",
              role: "user",
              parts: [{ kind: "text", text: "Hello, world!" }],
            },
          },
          kind: "task",
          metadata: {},
        },
      };
      a2aService
        .execute({
          executionContext: {
            id: "test-message-id",
            protocol: Protocol.A2A,
            getRequestParams: () => messageSendContext.params,
            isCancelled: () => false,
            requestContext: messageSendContext,
          },
          engine: echoAgent,
        })
        .catch((error) => {
          console.error("a2a execute error", error);
          reject(error);
        });
    });
  });

  test("mcp onRequest", async () => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => "test-session-id",
    });
    transport.sessionId = "test-session-id";
    // @ts-ignore
    transport._initialized = true;
    logInfo("transport", transport.sessionId);
    return new Promise<void>((resolve, reject) => {
      const mockRequest = mockReq("POST");
      const mockResponse = mockRes(resolve, reject);
      dispatcher
        .onRequest({
          protocol: Protocol.MCP,
          id: "test-session-id",
          method: "tools/call",
          params: {
            message: "Hello, world!",
          },
          request: mockRequest,
          response: mockResponse,
          transport: transport,
        })
        .catch((error) => {
          console.error("mcp onRequest error", error);
          reject(error);
        });
    });
  });
  test("a2a onRequest", async () => {
    return new Promise<void>((resolve, reject) => {
      const mockA2AReq = mockReq("POST");
      const mockA2ARes = mockRes(resolve, reject);
      dispatcher
        .onRequest({
          protocol: Protocol.A2A,
          id: "test-message-id",
          method: "message/send",
          params: {
            message: {
              messageId: "test-message-id",
              kind: "message",
              role: "user",
              parts: [{ kind: "text", text: "Hello, world!" }],
            },
          },
          request: mockA2AReq,
          response: mockA2ARes,
        })
        .catch((error) => {
          console.error("a2a onRequest error", error);
          reject(error);
        });
    });
  });

  test("mcp tool", async () => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => "test-session-id",
    });
    transport.sessionId = "test-session-id";
    // @ts-ignore
    transport._initialized = true;
    return new Promise<void>((resolve, reject) => {
      const mockRequest = mockReq("POST");
      const mockResponse = mockRes(resolve, reject);
      dispatcher
        .onRequest({
          protocol: Protocol.MCP,
          id: "test-session-id",
          method: "tools/call",
          params: {
            message: "Echo This!",
          },
          request: mockReq("POST", undefined, {
            jsonrpc: "2.0",
            id: "test-session-id",
            method: "tools/call",
            params: {
              name: "echo-skill",
              arguments: {
                message: "Echo This!",
              },
            },
          }),
          response: mockResponse,
          transport: transport,
        })
        .catch((error) => {
          console.error("mcp tool error", error);
          reject(error);
        });
    });
  });

  describe("express broker", () => {
    let app: express.Express;
    let server: http.Server;
    let broker: ExpressServer;
    // Track any pending requests for cleanup
    let pendingRequests: request.Test[] = [];

    beforeEach(async () => {
      broker = new ExpressServer({
        storage: new InMemoryTaskStore(),
        card: a2aService.state.getCard(),
        engine: echoAgent,
        services: {
          [Protocol.MCP]: mcpService,
          [Protocol.A2A]: a2aService,
        },
      });
      broker.registerRoutes();
      app = broker.getApp();
      server = await broker.start();
      pendingRequests = [];
    });

    afterEach(async () => {
      // Ensure all pending requests are completed
      await Promise.all(
        pendingRequests.map((req) => {
          try {
            return req;
          } catch (e) {
            // Ignore errors during cleanup
            return null;
          }
        })
      );

      await broker.stop();
      // Add a small delay to allow any open connections to close
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Helper function to track supertest requests
    const trackRequest = (req: request.Test): request.Test => {
      pendingRequests.push(req);
      return req;
    };

    test("express broker setup", async () => {
      const routes = expressListRoutes(app);
      logInfo("express broker routes", JSON.stringify(routes, null, 2));
    });
    test("express broker receive message", async () => {
      const response = await trackRequest(
        request(server)
          .post("/a2a")
          .send({
            jsonrpc: "2.0",
            id: "test-session-id",
            method: "message/send",
            params: {
              message: {
                messageId: "test-message-id",
                kind: "message",
                role: "user",
                parts: [{ kind: "text", text: "Hello, world!" }],
              },
            },
          })
      );
      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.kind).toBe("task");
      expect(response.body.result.status.state).toBe(TaskState.completed);
      expect(response.body.result.status.message).toBeDefined();
      expect(response.body.result.status.message.kind).toBe("message");
      expect(response.body.result.status.message.role).toBe("agent");
      expect(response.body.result.status.message.parts).toBeDefined();
      expect(response.body.result.status.message.parts[0].kind).toBe("text");
      expect(response.body.result.status.message.parts[0].text).toContain(
        "You said:"
      );
    });
  });
});
