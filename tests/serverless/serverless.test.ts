import { describe, it, expect, jest } from "@jest/globals";
import lambdaLocal from "lambda-local";
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from "aws-lambda";
import { cr8, A2A } from "../../src/index.js";
import { serve } from "../../src/server/express/serverless/index.js";
import { configure } from "../../src/config/index.js";
import { configurePino } from "../../src/extensions/pino.js";
import pino from "pino";

configure({
  logger: configurePino(
    pino({
      level: "warn",
      transport: { target: "pino-pretty", options: { colorize: true } },
    })
  ),
});

jest.setTimeout(15000);
lambdaLocal.getLogger().level = "error";

function createMockEvent(
  method: string,
  path: string,
  body?: object
): APIGatewayProxyEvent {
  return {
    httpMethod: method,
    path,
    body: body ? JSON.stringify(body) : null,
    headers: { "content-type": "application/json" },
    multiValueHeaders: {},
    isBase64Encoded: false,
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: "123456789012",
      apiId: "test-api",
      authorizer: null,
      protocol: "HTTP/1.1",
      httpMethod: method,
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        clientCert: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: "127.0.0.1",
        user: null,
        userAgent: "test-agent",
        userArn: null,
      },
      path,
      stage: "test",
      requestId: "test-request-id",
      requestTimeEpoch: Date.now(),
      resourceId: "test-resource",
      resourcePath: path,
    },
    resource: path,
  };
}

function createMockContext(): Context {
  return {
    callbackWaitsForEmptyEventLoop: true,
    functionName: "test-function",
    functionVersion: "1",
    invokedFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:test",
    memoryLimitInMB: "128",
    awsRequestId: "test-request-id",
    logGroupName: "/aws/lambda/test",
    logStreamName: "test-stream",
    getRemainingTimeInMillis: () => 30000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };
}

describe("createServerlessHandler", () => {
  const agent = cr8({
    name: "Serverless Test Agent",
    version: "1.0.0",
    url: "https://test.example.com/a2a",
    capabilities: { streaming: false },
  }).text(({ content }) => `Echo: ${content}`).agent;

  const handler: Handler = serve(
    { agent, basePath: "/a2a" },
    { provider: "aws"}
  );

  describe("Agent Card", () => {
    it("serves agent card at /.well-known/agent.json", async () => {
      const event = createMockEvent("GET", "/a2a/.well-known/agent.json");
      const context = createMockContext();
      const result = (await lambdaLocal.execute({
        lambdaFunc: { handler: () => handler(event, context, () => {}) },
        lambdaHandler: "handler",
        event: {},
        timeoutMs: 10000,
      })) as APIGatewayProxyResult;

      expect(result.statusCode).toBe(200);

      const body = JSON.parse(result.body);
      expect(body.name).toBe("Serverless Test Agent");
      expect(body.version).toBe("1.0.0");
    });
  });

  describe("message/send", () => {
    it("handles a valid message send request", async () => {
      const requestBody: A2A.SendMessageRequest = {
        jsonrpc: "2.0",
        id: "serverless-test-1",
        method: "message/send",
        params: {
          message: {
            kind: "message",
            messageId: "test-msg-1",
            taskId: "serverless-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Hello serverless!" }],
          },
        },
      };

      const event = createMockEvent("POST", "/a2a", requestBody);
      const context = createMockContext();

      const result = (await lambdaLocal.execute({
        lambdaFunc: { handler: () => handler(event, context, () => {})},
        lambdaHandler: "handler",
        event: {},
        timeoutMs: 10000,
      })) as APIGatewayProxyResult;

      expect(result.statusCode).toBe(200);

      const body = JSON.parse(result.body);
      expect(body.jsonrpc).toBe("2.0");
      expect(body.id).toBe("serverless-test-1");
      expect(body.result).toBeDefined();
      expect(body.result.status.state).toBe("completed");
    });
  });
});
