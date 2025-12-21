import {
  jest,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import { createA2ARouter, createAgent } from "../../src/index.js";
import { A2A, TASK_NOT_FOUND } from "../../src/index.js";
import express from "express";
import request from "supertest";
import { createAgentServer } from "../../src/index.js";
import { TestAgentLogic as engine } from "../utils/engine.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "../utils/info.js";
// Set a reasonable timeout for all tests
jest.setTimeout(10000);
const agentRouter = createA2ARouter();
describe("trpc-server", () => {
  const testId = "123";
  let agent = agentRouter.createCaller({
    service: createAgent({
      agentCard: defaultAgentCard,
      engine: engine,
    }),
  });

  beforeEach(() => {});

  afterEach(() => {
    agent = agentRouter.createCaller({
      service: createAgent({
        agentCard: defaultAgentCard,
        engine: engine,
      }),
    });
  });

  it("should be able to call the agentCard procedure", async () => {
    const result = await agent.agentCard();
    expect(result).toEqual(defaultAgentCard);
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
        metadata: {},
        status: {
          message: {
            kind: "message",
            taskId: testId,
            contextId: testId,
            messageId: testId,
            role: "user",
            parts: [{ kind: "text", text: "hello world" }],
          },
          state: A2A.TaskState.completed,
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
      expect(messages.length).toEqual(2);
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
          console.log("message", message);
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
        agent: {
          agentCard: defaultAgentCard,
          engine: engine,
        },
        basePath: "/api/v1/agent",
        agentCardPath: "/api/v1/agent/agentCard",
      });
      expect(app).toBeDefined();
      const server = app.listen(2021, () => {});
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await request(app).get("/api/v1/agent/agentCard");
      server.close();
    });
  });
});
