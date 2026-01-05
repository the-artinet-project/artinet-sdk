import {
  jest,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from "@jest/globals";
import express from "express";
import request from "supertest";
import {
  A2A,
  ExpressAgentServer,
  createAgentServer,
  AgentEngine,
  getParts,
} from "../src/index.js";
import { configure } from "../src/config/index.js";
// import { configurePino } from "../src/extensions/pino.js";
// import pino from "pino";
// import pinoCaller from "pino-caller";
// configure({
//   logger: configurePino(
//     pinoCaller(
//       pino({
//         level: "info",
//         transport: {
//           target: "pino-pretty",
//           options: { colorize: true },
//         },
//       })
//     )
//   ),
// });
// Set a reasonable timeout for all tests
jest.setTimeout(10000);

// Specialized task handler for streaming tests
const streamingTestHandler: AgentEngine = async function* (
  context: A2A.Context
) {
  const message = context.userMessage;
  const taskId = message.taskId ?? "";
  const contextId = message.contextId ?? "";
  const { text } = getParts(message.parts);

  // Quick completion without streaming for non-streaming tests
  if (text.includes("quick")) {
    yield {
      taskId: taskId,
      contextId: contextId,
      kind: "status-update",
      status: {
        state: A2A.TaskState.completed,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Quick completion" }],
        },
      },
      final: true,
    };
    return;
  }

  // Test for resubscription
  if (text.includes("resubscribe")) {
    yield {
      taskId: taskId,
      contextId: contextId,
      kind: "status-update",
      status: {
        state: A2A.TaskState.working,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [
            { kind: "text", text: "Starting work for resubscribe test..." },
          ],
        },
      },
      final: false,
    };

    // Add a small delay to allow for resubscription test
    await new Promise((resolve) => setTimeout(resolve, 200));

    yield {
      taskId: taskId,
      contextId: contextId,
      kind: "status-update",
      status: {
        state: A2A.TaskState.completed,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [
            { kind: "text", text: "Completed task for resubscribe test" },
          ],
        },
      },
      final: true,
    };
    return;
  }

  // Long running task with multiple updates
  yield {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: A2A.TaskState.submitted,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Task submitted" }],
      },
    },
    final: false,
  };

  // Progress updates
  for (let i = 1; i <= 3; i++) {
    const progressUpdate: A2A.TaskStatusUpdateEvent = {
      taskId: taskId,
      contextId: contextId,
      kind: "status-update",
      status: {
        state: A2A.TaskState.working,
        message: {
          messageId: "test-message-id",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: `Progress update ${i}/3` }],
        },
      },
      final: false,
    };
    yield progressUpdate;
    // Small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Final completion
  yield {
    taskId: taskId,
    contextId: contextId,
    kind: "status-update",
    status: {
      state: A2A.TaskState.completed,
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Task completed successfully" }],
      },
    },
    final: true,
  };
};

describe.skip("Streaming API Tests", () => {
  let server: ExpressAgentServer;
  let app: express.Express;
  let pendingRequests: request.Test[] = [];

  beforeEach(() => {
    server = createAgentServer({
      agent: {
        engine: streamingTestHandler,
        agentCard: {
          name: "Streaming Test Agent",
          url: "http://localhost:41241",
          version: "1.0.0",
          protocolVersion: "0.3.0",
          capabilities: {
            streaming: true,
            pushNotifications: false,
            stateTransitionHistory: true,
          },
          skills: [
            {
              id: "streaming-test",
              name: "Streaming Test Skill",
              description: "Streaming Test Skill",
              tags: ["streaming", "test"],
            },
          ],
          description: "Streaming Test Agent",
          defaultInputModes: ["text"],
          defaultOutputModes: ["text"],
        },
      },
    });
    app = server.app;
    pendingRequests = [];
  });

  afterEach(async () => {
    // Clear the pending requests array - we don't need to re-execute them
    pendingRequests = [];
  });

  // Helper function to track supertest requests
  const trackRequest = (req: request.Test): request.Test => {
    pendingRequests.push(req);
    return req;
  };

  // Helper to collect streamed events
  const collectStreamEvents = async (
    req: request.Test,
    timeout = 2000
  ): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const events: string[] = [];
      let responseEnded = false;
      const timeoutId = setTimeout(() => {
        if (!responseEnded) {
          responseEnded = true;
          resolve(events);
        }
      }, timeout);

      req
        .buffer(false)
        .parse((res, callback) => {
          res.setEncoding("utf8");
          let data = "";
          res.on("data", (chunk: string) => {
            data += chunk;
            // Server-Sent Events are separated by double newlines
            const parts = data.split("\n\n");
            if (parts.length > 1) {
              data = parts.pop() || "";
              for (const part of parts) {
                if (part.trim()) {
                  events.push(part);
                }
              }
            }
          });
          res.on("end", () => {
            clearTimeout(timeoutId);
            if (!responseEnded) {
              responseEnded = true;
              resolve(events);
            }
          });
          res.on("error", (err) => {
            clearTimeout(timeoutId);
            if (!responseEnded) {
              responseEnded = true;
              reject(err);
            }
          });
          callback(null, res);
        })
        .end((err) => {
          if (err && !responseEnded) {
            responseEnded = true;
            reject(err);
          }
        });
    });
  };

  describe("message/stream", () => {
    it("establishes a stream and sends events until completion", async () => {
      const requestBody: A2A.SendStreamingMessageRequest = {
        jsonrpc: "2.0",
        id: "stream-request-1",
        method: "message/stream",
        params: {
          message: {
            messageId: "stream-message-id-1",
            kind: "message",
            taskId: "stream-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Test streaming updates" }],
          },
        },
      };

      const req = trackRequest(
        request(app)
          .post("/")
          .set("Accept", "text/event-stream")
          .send(requestBody)
      );

      const events = await collectStreamEvents(req);
      // Check for all expected events
      expect(events.length).toBeGreaterThanOrEqual(5); // submitted + 3 working + completed

      // Verify events contain correct data
      let foundSubmitted = false;
      let workingCount = 0;
      let foundCompleted = false;
      let foundFinal = false;

      for (const event of events) {
        const lines = event.split("\n");
        const dataLine = lines.find((line) => line.startsWith("data:"));

        if (dataLine) {
          const data = JSON.parse(dataLine.substring(5).trim());

          if (data.result?.status?.state === "submitted") {
            foundSubmitted = true;
          } else if (data.result?.status?.state === "working") {
            workingCount++;
          } else if (data.result?.status?.state === "completed") {
            foundCompleted = true;
          }

          if (data.result?.final === true) {
            foundFinal = true;
          }
        }
      }

      expect(foundSubmitted).toBe(true);
      expect(workingCount).toBeGreaterThanOrEqual(3);
      expect(foundCompleted).toBe(true);
      expect(foundFinal).toBe(true);
    });
  });

  describe("tasks/resubscribe", () => {
    it("allows resubscribing to an existing task stream", async () => {
      // First create a streaming task
      const createBody: A2A.SendStreamingMessageRequest = {
        jsonrpc: "2.0",
        id: "resubscribe-request-1",
        method: "message/stream",
        params: {
          message: {
            messageId: "resubscribe-message-id-1",
            kind: "message",
            taskId: "resubscribe-task-1",
            role: "user",
            parts: [{ kind: "text", text: "Test for resubscribe" }],
          },
        },
      };

      const req1 = trackRequest(
        request(app)
          .post("/")
          .set("Accept", "text/event-stream")
          .send(createBody)
      );

      // Start collecting events from first request
      const initialEventsPromise = collectStreamEvents(req1, 500);

      // Wait a bit to ensure the task is started
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Now resubscribe to the same task
      const resubscribeBody: A2A.TaskResubscriptionRequest = {
        jsonrpc: "2.0",
        id: "resubscribe-stream-2",
        method: "tasks/resubscribe",
        params: {
          id: "resubscribe-task-1",
        },
      };

      const req2 = trackRequest(
        request(app)
          .post("/")
          .set("Accept", "text/event-stream")
          .send(resubscribeBody)
      );

      // Collect events from the resubscription request
      const resubscribeEvents = await collectStreamEvents(req2);
      // Wait for the initial events to complete
      const initialEvents = await initialEventsPromise;
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // Verify we received events from resubscription
      expect(resubscribeEvents.length).toBeGreaterThan(0);

      // Check for task completion event in at least one of the streams
      const allEvents = [...initialEvents, ...resubscribeEvents];
      let foundCompleted = false;
      for (const event of allEvents) {
        const lines = event.split("\n");
        const dataLine = lines.find((line) => line.startsWith("data:"));

        if (dataLine) {
          const data = JSON.parse(dataLine.substring(5).trim());
          if (data.result?.status?.state === "completed") {
            foundCompleted = true;
            break;
          }
        }
      }
      expect(foundCompleted).toBe(true);
    });

    it("returns error when resubscribing to non-existent task", async () => {
      const requestBody: A2A.TaskResubscriptionRequest = {
        jsonrpc: "2.0",
        id: "nonexistent-resubscribe-1",
        method: "tasks/resubscribe",
        params: {
          id: "nonexistent-task-1",
        },
      };

      const response = await request(app).post("/").send(requestBody);
      expect(response.status).toBe(200);
      if (response.type === "application/json") {
        expect(response.body.error).toBeDefined();
        expect(response.body.error.code).toBe(A2A.ErrorCodeTaskNotFound);
        expect(response.body.error.message).toBe("Task not found");
      } else if (response.type === "text/event-stream") {
        const responseData = JSON.parse(response.text.split("data:")[1].trim());
        expect(responseData.error).toBeDefined();
        expect(responseData.error.code).toBe(A2A.ErrorCodeTaskNotFound);
        expect(responseData.error.message).toContain("Task not found");
      }
    });
  });
});
