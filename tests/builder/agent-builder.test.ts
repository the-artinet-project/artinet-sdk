import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import {
  createStepEngine,
  cr8,
  A2A,
  describe as des6,
  extractTextContent,
} from "../../src/index.js";
import { MOCK_AGENT_CARD } from "../utils/info.js";

// Helper to create a mock context for testing
const createMockContext = (
  overrides: Partial<A2A.Context> = {}
): A2A.Context => {
  const message: A2A.Message = {
    messageId: "test-msg-id",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "hello world" }],
    taskId: "test-task-id",
    contextId: "test-context-id",
  };

  return {
    taskId: "test-task-id",
    contextId: "test-context-id",
    userMessage: message,
    messages: { message, messages: [{ message }] } as any,
    isCancelled: async () => false,
    abortSignal: new AbortController().signal,
    getState: async () => undefined,
    getTask: async () =>
      ({
        id: "test-task-id",
        contextId: "test-context-id",
        status: { state: "working" },
      } as any),
    service: {} as any,
    publisher: {
      onStart: async () => ({}),
      onUpdate: async () => ({}),
      onCancel: async () => {},
      onError: async () => {},
      onComplete: async () => {},
    } as any,
    extensions: [],
    references: [],
    ...overrides,
  } as A2A.Context;
};

describe("Agent Builder Tests", () => {
  describe("Basic Step Creation", () => {
    it("should create text step", () => {
      const textStep = cr8("TestAgent").text(({ message }) => {
        return "hello there";
      }).steps;
      expect(textStep).toBeDefined();
      expect(textStep.length).toBe(1);
      expect(textStep[0].step).toBeDefined();
      expect(textStep[0].kind).toBe("text");
      expect(textStep[0].id).toBeDefined();
    });

    it("should execute text step with static value", async () => {
      const textStep = cr8("TestAgent").text("hi there").steps;
      const result = await textStep[0].step({
        message: {
          kind: "message",
          message: "hello there",
        },
      } as any);
      expect(result).toBe("hi there");
    });

    it("should create file step", () => {
      const fileStep = cr8("TestAgent").file({ uri: "test-uri" }).steps;
      expect(fileStep).toBeDefined();
      expect(fileStep.length).toBe(1);
      expect(fileStep[0].kind).toBe("file");
    });

    it("should create data step", () => {
      const dataStep = cr8("TestAgent").data({ key: "value" }).steps;
      expect(dataStep).toBeDefined();
      expect(dataStep.length).toBe(1);
      expect(dataStep[0].kind).toBe("data");
    });
  });

  describe("Carry Arguments Between Steps", () => {
    it("should capture args and pass to next step", async () => {
      const textStep = cr8("TestAgent").text(({ message }) => {
        return {
          reply: ["hello there"],
          args: { greeting: "goodbye there" },
        };
      }).steps;
      const result = await textStep[0].step({
        message: {
          kind: "message",
          message: "hello there",
        },
      } as any);
      expect(result.reply).toBeDefined();
      expect(result.reply).toHaveLength(1);
      expect(result.reply[0]).toBe("hello there");
      expect(result.args).toBeDefined();
      expect(result.args.greeting).toBe("goodbye there");
    });

    it("should carry args through multiple steps", async () => {
      const agent = cr8("TestAgent")
        .text(({ message }) => {
          return {
            reply: "step 1",
            args: { fromStep1: "value1" },
          };
        })
        .text(({ args }) => {
          return {
            reply: `step 2 received: ${args?.fromStep1}`,
            args: { fromStep2: "value2" },
          };
        })
        .text(({ args }) => {
          return `step 3 received: ${args?.fromStep2}`;
        });

      const executionWrapper = agent.engine;
      const results: any[] = [];
      const mockContext = createMockContext({
        taskId: "789",
        contextId: "456",
      });

      for await (const result of executionWrapper(mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(5); // submitted + 3 working + task
      expect(results[1].status.message.parts[0].text).toBe("step 1");
      expect(results[2].status.message.parts[0].text).toBe(
        "step 2 received: value1"
      );
      expect(results[3].status.message.parts[0].text).toBe(
        "step 3 received: value2"
      );
    });
  });

  describe("File Steps", () => {
    it("should capture file with uri", async () => {
      const fileStep = cr8("TestAgent").file(({ message }) => {
        return [{ uri: "file-id" }, { bytes: "file-bytes" }];
      }).steps;
      const result = await fileStep[0].step({
        message: {
          kind: "message",
          message: "hello there",
        },
      } as any);
      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(result[0].uri).toBe("file-id");
      expect(result[1].bytes).toBe("file-bytes");
    });

    it("should accept static file value", async () => {
      const fileStep = cr8("TestAgent").file({ uri: "static-file" }).steps;
      const result = await fileStep[0].step({} as any);
      expect(result.uri).toBe("static-file");
    });
  });

  describe("Data Steps", () => {
    it("should capture data", async () => {
      const dataStep = cr8("TestAgent").data(({ message }) => {
        return [{ data: "data-bytes" }];
      }).steps;
      const result = await dataStep[0].step({
        message: {
          kind: "message",
          message: "hello there",
        },
      } as any);
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].data).toBe("data-bytes");
    });

    it("should accept static data value", async () => {
      const dataStep = cr8("TestAgent").data({ key: "static-value" }).steps;
      const result = await dataStep[0].step({} as any);
      expect(result.key).toBe("static-value");
    });

    it("should capture multiple data parts with args", async () => {
      const dataStep = cr8("TestAgent").data(({ message }) => {
        return {
          reply: [{ entry: "data-1" }, { entry: "data-2" }],
          args: { carried: "value" },
        };
      }).steps;
      const result = await dataStep[0].step({
        message: {
          kind: "message",
          message: "hello there",
        },
      } as any);
      expect(result.reply).toBeDefined();
      expect(result.reply).toHaveLength(2);
      expect(result.reply[0].entry).toBe("data-1");
      expect(result.reply[1].entry).toBe("data-2");
      expect(result.args.carried).toBe("value");
    });
  });

  describe("Message Steps", () => {
    it("should create message step with function", () => {
      const messageStep = cr8("TestAgent").message(({ context }) => {
        return des6.message({
          role: "agent",
          parts: [{ kind: "text", text: "hello" }],
        });
      }).steps;
      expect(messageStep).toBeDefined();
      expect(messageStep.length).toBe(1);
      expect(messageStep[0].kind).toBe("message");
    });

    it("should create message step with static string", () => {
      const messageStep = cr8("TestAgent").message("Hello from agent").steps;
      expect(messageStep).toBeDefined();
      expect(messageStep.length).toBe(1);
      expect(messageStep[0].kind).toBe("message");
    });

    it("should execute message step and return message params", async () => {
      const messageStep = cr8("TestAgent").message(({ context }) => {
        return {
          role: "agent",
          parts: [{ kind: "text", text: "agent response" }],
        };
      }).steps;
      const result = await messageStep[0].step({
        context: createMockContext(),
      } as any);
      expect(result.role).toBe("agent");
      expect(result.parts[0].text).toBe("agent response");
    });
  });

  describe("Artifact Steps", () => {
    it("should create artifact step with function", () => {
      const artifactStep = cr8("TestAgent").artifact(({ context }) => {
        return des6.artifact({
          artifactId: "test-artifact",
          parts: [{ kind: "text", text: "artifact content" }],
        });
      }).steps;
      expect(artifactStep).toBeDefined();
      expect(artifactStep.length).toBe(1);
      expect(artifactStep[0].kind).toBe("artifact-update");
    });

    it("should create artifact step with static value", () => {
      const artifactStep = cr8("TestAgent").artifact(
        des6.artifact({
          artifactId: "static-artifact",
          parts: [{ kind: "text", text: "static content" }],
        })
      ).steps;
      expect(artifactStep).toBeDefined();
      expect(artifactStep[0].kind).toBe("artifact-update");
    });

    it("should execute artifact step", async () => {
      const artifactStep = cr8("TestAgent").artifact(({ context }) => {
        return {
          artifactId: "artifact-123",
          parts: [{ kind: "text", text: "content" }],
        };
      }).steps;
      const result = await artifactStep[0].step({
        context: createMockContext(),
      } as any);
      expect(result.artifactId).toBe("artifact-123");
    });
  });

  describe("Status Steps", () => {
    it("should create status step with function", () => {
      const statusStep = cr8("TestAgent").status(({ context }) => {
        return {
          status: {
            state: A2A.TaskState.working,
          },
        };
      }).steps;
      expect(statusStep).toBeDefined();
      expect(statusStep.length).toBe(1);
      expect(statusStep[0].kind).toBe("status-update");
    });

    it("should create status step with static string", () => {
      const statusStep = cr8("TestAgent").status("working").steps;
      expect(statusStep).toBeDefined();
      expect(statusStep[0].kind).toBe("status-update");
    });

    it("should execute status step", async () => {
      const statusStep = cr8("TestAgent").status(({ context }) => {
        return {
          status: {
            state: A2A.TaskState.completed,
            message: des6.message("Task completed"),
          },
        };
      }).steps;
      const result = await statusStep[0].step({
        context: createMockContext(),
      } as any);
      expect(result.status.state).toBe(A2A.TaskState.completed);
    });
  });

  describe("Task Steps", () => {
    it("should create task step with function", () => {
      const taskStep = cr8("TestAgent").task(({ context }) => {
        return des6.task({
          taskId: context.taskId,
          contextId: context.contextId,
          state: A2A.TaskState.completed,
        });
      }).steps;
      expect(taskStep).toBeDefined();
      expect(taskStep.length).toBe(1);
      expect(taskStep[0].kind).toBe("task");
    });

    it("should create task step with static string", () => {
      const taskStep = cr8("TestAgent").task("task result").steps;
      expect(taskStep).toBeDefined();
      expect(taskStep[0].kind).toBe("task");
    });

    it("should execute task step", async () => {
      const mockContext = createMockContext();
      const taskStep = cr8("TestAgent").task(({ context }) => {
        return {
          id: context.taskId,
          contextId: context.contextId,
          status: {
            state: A2A.TaskState.completed,
          },
        };
      }).steps;
      const result = await taskStep[0].step({
        context: mockContext,
      } as any);
      expect(result.status.state).toBe(A2A.TaskState.completed);
    });
  });

  describe("Mixed Step Types", () => {
    it("should capture multiple types of steps", async () => {
      const agent = cr8("TestAgent")
        .text("hello there")
        .file(({ message }) => {
          return [{ uri: "file-id" }, { bytes: "file-bytes" }];
        })
        .data(({ message }) => {
          return [{ entry: "data-bytes" }];
        }).steps;

      const result = await agent[0].step({} as any);
      const result2 = await agent[1].step({} as any);
      const result3 = await agent[2].step({} as any);

      expect(result).toBe("hello there");
      expect(result2).toHaveLength(2);
      expect(result2[0].uri).toBe("file-id");
      expect(result2[1].bytes).toBe("file-bytes");
      expect(result3).toHaveLength(1);
      expect(result3[0].entry).toBe("data-bytes");
    });

    it("should chain all step types", () => {
      const agent = cr8("TestAgent")
        .text("text step")
        .file({ uri: "file-uri" })
        .data({ key: "value" })
        .message("message step")
        .artifact(
          des6.artifact({
            artifactId: "artifact",
            parts: [{ kind: "text", text: "content" }],
          })
        )
        .status("working")
        .task("task result");

      expect(agent.steps).toHaveLength(7);
      expect(agent.steps[0].kind).toBe("text");
      expect(agent.steps[1].kind).toBe("file");
      expect(agent.steps[2].kind).toBe("data");
      expect(agent.steps[3].kind).toBe("message");
      expect(agent.steps[4].kind).toBe("artifact-update");
      expect(agent.steps[5].kind).toBe("status-update");
      expect(agent.steps[6].kind).toBe("task");
    });
  });

  describe("Engine Execution", () => {
    it("should run steps in order", async () => {
      const agentSteps = cr8("TestAgent")
        .text(({ message }) => {
          return "hello there";
        })
        .text(() => "hello there 2")
        .text("hello there 3").steps;

      const executionWrapper = createStepEngine(agentSteps);
      const results: any[] = [];
      const mockContext = createMockContext({
        taskId: "789",
        contextId: "456",
        userMessage: {
          messageId: "123",
          kind: "message",
          role: "user",
          parts: [{ kind: "text", text: "hello there" }],
          taskId: "789",
          contextId: "456",
        },
      });

      for await (const result of executionWrapper(mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(5);
      expect(results[0].kind).toBe("status-update");
      expect(results[0].status.state).toBe("submitted");
      expect(results[0].taskId).toBe("789");
      expect(results[0].contextId).toBe("456");
      expect(results[1].status.state).toBe("working");
      expect(results[1].status.message.parts[0].text).toBe("hello there");
      expect(results[2].status.message.parts[0].text).toBe("hello there 2");
      expect(results[3].status.message.parts[0].text).toBe("hello there 3");
      // Final task result comes from context.getTask() mock which returns "working"
      expect(results[4].status).toBeDefined();
    });

    it("should mark final task as completed when using cr8", async () => {
      const agent = cr8("TestAgent").text("hello there");
      const results: any[] = [];
      const mockContext = createMockContext({
        getTask: async () =>
          ({
            id: "test-task-id",
            contextId: "test-context-id",
            status: { state: "working" },
          } as any),
      });

      for await (const result of agent.engine(mockContext)) {
        results.push(result);
      }

      const finalResult = results[results.length - 1];
      expect(finalResult.status.state).toBe(A2A.TaskState.completed);
    });

    it("should run with multiple kinds of steps", async () => {
      const agent = cr8("TestAgent")
        .text(({ message }) => {
          return "hello there";
        })
        .file(({ message }) => {
          return [{ uri: "file-id" }, { bytes: "file-bytes" }];
        })
        .data(({ message }) => {
          return [{ entry: "data-bytes" }];
        });

      const executionWrapper = agent.engine;
      const results: any[] = [];
      const mockContext = createMockContext({
        taskId: "789",
        contextId: "456",
      });

      for await (const result of executionWrapper(mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(5);
      expect(results[1].status.message.parts[0].text).toBe("hello there");
      expect(results[2].status.message.parts[0].file.uri).toBe("file-id");
      expect(results[2].status.message.parts[1].file.bytes).toBe("file-bytes");
      expect(results[3].status.message.parts[0].data.entry).toBe("data-bytes");
    });

    it("should pass content to step", async () => {
      const agent = cr8("TestAgent").text(({ content }) => {
        expect(content).toBe("hello world");
        return content ?? "no content";
      });

      const executionWrapper = agent.engine;
      const results: any[] = [];
      const mockContext = createMockContext({
        taskId: "789",
        contextId: "456",
        userMessage: {
          messageId: "123",
          kind: "message",
          role: "user",
          parts: [{ kind: "text", text: "hello world" }],
          taskId: "789",
          contextId: "456",
        },
      });

      for await (const result of executionWrapper(mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(3);
      expect(results[1].status.message.parts[0].text).toBe("hello world");
    });

    it("should support skip function", async () => {
      const agent = cr8("TestAgent")
        .text(({ skip }) => {
          skip();
          return "this should be skipped";
        })
        .text(() => "this should run");

      const executionWrapper = agent.engine;
      const results: any[] = [];
      const mockContext = createMockContext();

      for await (const result of executionWrapper(mockContext)) {
        results.push(result);
      }

      // submitted + 1 working (second step) + task
      expect(results).toHaveLength(3);
      expect(results[1].status.message.parts[0].text).toBe("this should run");
    });
  });

  describe("Agent Creation", () => {
    it("should create agent with engine", async () => {
      const agent = cr8(MOCK_AGENT_CARD).text("hello there").agent;

      expect(agent).toBeDefined();
      expect(agent.agentCard).toBeDefined();
      expect(agent.agentCard.name).toBe(MOCK_AGENT_CARD.name);
      expect(agent.agentCard.url).toBe(MOCK_AGENT_CARD.url);
    });

    it("should create server", () => {
      const server = cr8({
        name: "TestAgent",
      }).text("hello world!").server;
      expect(server).toBeDefined();
    });

    it("should get agentCard", () => {
      const factory = cr8("TestAgent").text("hello");
      expect(factory.agentCard).toBeDefined();
      expect(factory.agentCard.name).toBe("TestAgent");
    });

    it("should get params", () => {
      const factory = cr8("TestAgent", { basePath: "/custom" }).text("hello");
      expect(factory.params).toBeDefined();
      expect(factory.params?.basePath).toBe("/custom");
    });
  });

  describe("Factory Methods", () => {
    it("should create with AgentFactory.create", () => {
      const factory = cr8("TestAgent");
      expect(factory).toBeDefined();
      expect(factory.steps).toHaveLength(0);
    });

    it("should support from() to create agent with custom engine", () => {
      const factory = cr8("TestAgent").text("hello");
      const customEngine = factory.engine;
      const agent = factory.from(customEngine);
      expect(agent).toBeDefined();
    });

    it("should support serve() to create server with custom engine", () => {
      const factory = cr8("TestAgent").text("hello");
      const server = factory.serve();
      expect(server).toBeDefined();
    });
  });

  describe("Type Inference with Carry", () => {
    it("should infer carry types correctly through chain", async () => {
      // This test verifies type inference works at compile time
      const agent = cr8("TestAgent")
        .text(({ message }) => {
          return {
            reply: "step 1",
            args: { name: "John", age: 30 },
          };
        })
        .text(({ args }) => {
          // TypeScript should know args has name and age
          return `Hello ${args?.name}, you are ${args?.age}`;
        });

      const results: any[] = [];
      const mockContext = createMockContext();

      for await (const result of agent.engine(mockContext)) {
        results.push(result);
      }

      expect(results[2].status.message.parts[0].text).toBe(
        "Hello John, you are 30"
      );
    });
  });

  describe("Error Handling", () => {
    it("should throw error for empty steps", () => {
      expect(() => createStepEngine([])).toThrow("No steps provided");
    });
  });
});

describe("SendMessage Step Tests", () => {
  it("should create sendMessage step", () => {
    const targetAgent = cr8("TargetAgent").text("I am the target").agent;

    const orchestrator = cr8("Orchestrator").sendMessage({
      agent: targetAgent,
      message: "Hello target",
    });

    expect(orchestrator.steps).toHaveLength(1);
    expect(orchestrator.steps[0].kind).toBe("task");
  });

  it("should execute sendMessage step and return task", async () => {
    const targetAgent = cr8(MOCK_AGENT_CARD).text("Target response").agent;

    const orchestrator = cr8(MOCK_AGENT_CARD)
      .text("Starting orchestration")
      .sendMessage({
        agent: targetAgent,
        message: "Hello target",
      })
      .text(({ args }) => {
        return `Got task state: ${args?.task?.status?.state ?? "unknown"}`;
      });

    const results: any[] = [];
    const mockContext = createMockContext();

    for await (const result of orchestrator.engine(mockContext)) {
      results.push(result);
    }

    // submitted + text + task + text + final task
    expect(results.length).toBeGreaterThanOrEqual(4);
  });

  it("should forward context message when no message provided", () => {
    const targetAgent = cr8("TargetAgent").text("response").agent;

    const orchestrator = cr8("Orchestrator").sendMessage({
      agent: targetAgent,
      // No message - should use context.userMessage
    });

    expect(orchestrator.steps).toHaveLength(1);
  });

  it("should forward previous agent message parts to the next agent", async () => {
    const orchestrator = cr8("Orchestrator")
      .text("Starting orchestration")
      .sendMessage({
        agent: cr8("TargetAgent").text("response").agent,
      })
      .sendMessage({
        agent: cr8("TargetAgent").text(({ context }) => {
          expect(context.userMessage.parts).toHaveLength(2);
          return (
            context.userMessage.parts[0].text +
            " " +
            context.userMessage.parts[1].text +
            " " +
            "response-2"
          );
        }).agent,
      })
      .text(({ context, args }) => {
        return `Got task state: ${extractTextContent(args?.task)}`;
      });

    const results: any[] = [];
    const mockContext = createMockContext();

    for await (const result of orchestrator.engine(mockContext)) {
      results.push(result);
    }
    expect(results.length).toBeGreaterThanOrEqual(5);
    expect(results[4].status.message?.parts[0].text).toBe(
      "Got task state: response hello world response-2"
    );
  });
});

describe("Transform Tests", () => {
  it("should transform text parts correctly", async () => {
    const agent = cr8("TestAgent").text("hello world");
    const results: any[] = [];
    const mockContext = createMockContext();

    for await (const result of agent.engine(mockContext)) {
      results.push(result);
    }

    const workingResult = results.find(
      (r) => r.status?.state === "working" && r.status?.message
    );
    expect(workingResult).toBeDefined();
    expect(workingResult.status.message.parts[0].kind).toBe("text");
    expect(workingResult.status.message.parts[0].text).toBe("hello world");
  });

  it("should transform file parts correctly", async () => {
    const agent = cr8("TestAgent").file({
      uri: "https://example.com/file.pdf",
      name: "file.pdf",
      mimeType: "application/pdf",
    });
    const results: any[] = [];
    const mockContext = createMockContext();

    for await (const result of agent.engine(mockContext)) {
      results.push(result);
    }

    const workingResult = results.find(
      (r) => r.status?.state === "working" && r.status?.message
    );
    expect(workingResult).toBeDefined();
    expect(workingResult.status.message.parts[0].kind).toBe("file");
    expect(workingResult.status.message.parts[0].file.uri).toBe(
      "https://example.com/file.pdf"
    );
  });

  it("should transform data parts correctly", async () => {
    const agent = cr8("TestAgent").data({
      key: "value",
      nested: { inner: "data" },
    });
    const results: any[] = [];
    const mockContext = createMockContext();

    for await (const result of agent.engine(mockContext)) {
      results.push(result);
    }

    const workingResult = results.find(
      (r) => r.status?.state === "working" && r.status?.message
    );
    expect(workingResult).toBeDefined();
    expect(workingResult.status.message.parts[0].kind).toBe("data");
    expect(workingResult.status.message.parts[0].data.key).toBe("value");
    expect(workingResult.status.message.parts[0].data.nested.inner).toBe(
      "data"
    );
  });
});

describe("Describe Builder Integration", () => {
  it("should work with describe.message", () => {
    const message = des6.message({
      role: "agent",
      parts: [{ kind: "text", text: "test" }],
    });
    expect(message).toBeDefined();
    expect(message.role).toBe("agent");
  });

  it("should work with describe.artifact", () => {
    const artifact = des6.artifact({
      artifactId: "test-artifact",
      parts: [{ kind: "text", text: "artifact content" }],
    });
    expect(artifact).toBeDefined();
    expect(artifact.artifactId).toBe("test-artifact");
  });

  it("should work with describe.task", () => {
    // describe.task uses 'id' not 'taskId' for the task id
    const task = des6.task({
      id: "test-task",
      contextId: "test-context",
      status: { state: A2A.TaskState.completed },
    });
    expect(task).toBeDefined();
    expect(task.id).toBe("test-task");
    expect(task.contextId).toBe("test-context");
    expect(task.status.state).toBe("completed");
  });

  it("should work with describe.update.working", () => {
    const update = des6.update.working({
      taskId: "test-task",
      contextId: "test-context",
      message: des6.message("working..."),
    });
    expect(update).toBeDefined();
    expect(update.status.state).toBe("working");
  });

  it("should work with describe.update.submitted", () => {
    const update = des6.update.submitted({
      taskId: "test-task",
      contextId: "test-context",
    });
    expect(update).toBeDefined();
    expect(update.status.state).toBe("submitted");
  });
});
