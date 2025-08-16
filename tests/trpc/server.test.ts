import {
  jest,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import { agentRouter } from "../../src/server/trpc/server.js";
import { globalRepository } from "../../src/server/trpc/procedures/service.js";
import { configureLogger, TaskState, TASK_NOT_FOUND } from "../../src/index.js";

// Set a reasonable timeout for all tests
jest.setTimeout(10000);
configureLogger({ level: "silent" });

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
      name: "Agent",
      description: "Agent",
      url: "https://agent.com",
      version: "1.0.0",
      protocolVersion: "0.3.0",
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
        extensions: [],
      },
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"],
      skills: [],
      signatures: [],
    });
  });
  describe("message", () => {
    it("should call send", async () => {
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
        console.log("message/stream/test/message", message);
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
});
