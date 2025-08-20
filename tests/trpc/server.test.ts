import {
  jest,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import { createAgentRouter } from "../../src/server/trpc/server.js";
import { globalRepository } from "../../src/server/trpc/repository.js";
import { configureLogger, TaskState, TASK_NOT_FOUND } from "../../src/index.js";
import express from "express";
import request from "supertest";
import { createAgentServer } from "../../src/server/trpc/servers/express.js";
import { engine } from "../../src/server/trpc/test-engine.js";
import { defaultAgentCard } from "../../src/server/trpc/repository.js";
// Set a reasonable timeout for all tests
jest.setTimeout(10000);
configureLogger({ level: "error" });
const agentRouter = createAgentRouter({
  agentInfoPath: "agentCard",
});
describe("trpc-server", () => {
  const testId = "123";
  const agent = agentRouter.createCaller({
    session: {
      id: testId,
    },
    auth: {
      userId: testId,
    },
    service: globalRepository.getService(),
  });

  beforeEach(() => {});

  afterEach(() => {
    globalRepository.getService().setState(testId, undefined);
  });

  it("should be able to call the agentCard procedure", async () => {
    const result = await agent.agentCard();
    expect(result).toEqual({
      protocolVersion: "0.3.0",
      name: "A2A Server",
      description: "A general-purpose A2A protocol server",
      version: "0.1.0",
      url: "http://localhost",
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
        extensions: [],
      },
      skills: [],
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"],
    });
  });
  describe("message", () => {
    it("should call send", async () => {
      // const start = performance.now();
      const result = await agent.message.send({
        message: {
          messageId: testId,
          kind: "message",
          role: "user",
          parts: [{ kind: "text", text: "hello world" }],
          contextId: testId,
          taskId: testId,
        },
      });
      // const end = performance.now();
      // console.log("execution time", end - start);
      expect(result).toEqual({
        kind: "task",
        id: testId,
        contextId: testId,
        history: [
          {
            taskId: testId,
            contextId: testId,
            kind: "message",
            messageId: testId,
            role: "user",
            parts: [{ kind: "text", text: "hello world" }],
          },
        ],
        metadata: undefined,
        status: {
          message: {
            kind: "message",
            messageId: testId,
            role: "agent",
            parts: [{ kind: "text", text: "Thinking..." }],
          },
          state: TaskState.completed,
          timestamp: "2024-01-01T00:00:00.000Z",
        },
      });
    });
    it("should call stream", async () => {
      const result = await agent.message.stream({
        message: {
          messageId: testId,
          kind: "message",
          role: "user",
          parts: [{ kind: "text", text: "hello world" }],
          contextId: testId,
        },
      });
      const messages: any[] = [];
      for await (const message of result) {
        messages.push(message);
      }
      expect(messages.length).toEqual(3);
    });
  });
  describe("task", () => {
    it("should call resubscribe", async () => {
      const stream = await agent.tasks.resubscribe({
        id: testId,
      });
      const messages: any[] = [];
      try {
        for await (const message of stream) {
          messages.push(message);
        }
      } catch (error) {
        expect(error).toEqual(TASK_NOT_FOUND({ taskId: testId }));
      }
      expect(messages.length).toEqual(0);
    });
    it("should call get", async () => {
      await expect(
        agent.tasks.get({
          id: testId,
        })
      ).rejects.toThrowError("Task not found");
    });
    it("should call cancel", async () => {
      await expect(
        agent.tasks.cancel({
          id: testId,
        })
      ).rejects.toThrowError("Task not found");
    });
  });

  describe("express", () => {
    it("should create an express server", async () => {
      const initapp = express();
      initapp.get("/", (req, res) => {
        res.send("Hello, world!");
      });
      const { app } = createAgentServer({
        app: initapp,
        agent: engine,
        agentInfo: defaultAgentCard,
        basePath: "/api/v1/agent",
        agentInfoPath: "/api/v1/agent/agentCard",
      });
      expect(app).toBeDefined();
      const server = app.listen(2021, () => {});
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await request(app).get("/api/v1/agent/agentCard");
      server.close();
    });
  });
});
