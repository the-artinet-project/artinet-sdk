import { describe, it, expect } from "@jest/globals";
import { createAgentExecutor, AgentBuilder } from "../../src/index.js";
import { configureLogger } from "../../src/utils/logging/index.js";
import { MOCK_AGENT_CARD } from "../utils/info.js";
configureLogger({ level: "silent" });

describe("Agent Builder Tests", () => {
  it("should create step", () => {
    const textStep = AgentBuilder()
      .text(({ command }) => {
        return "hello there";
      })
      .build();
    expect(textStep).toBeDefined();
    expect(textStep.length).toBe(1);
    expect(textStep[0].step).toBeDefined();
    expect(textStep[0].kind).toBe("text");
  });
  it("should execute step", async () => {
    const textStep = AgentBuilder()
      .text(({ command }) => {
        return "hello there";
      })
      .build();
    const result = await textStep[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result).toBe("hello there");
  });
  it("should capture args", async () => {
    const textStep = AgentBuilder()
      .text(({ command }) => {
        return {
          parts: ["hello there"],
          args: ["goodbye there"],
        };
      })
      .build();
    const result = await textStep[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result.parts).toBeDefined();
    expect(result.parts).toHaveLength(1);
    expect(result.parts[0]).toBe("hello there");
    expect(result.args).toBeDefined();
    expect(result.args).toHaveLength(1);
    expect(result.args[0]).toBe("goodbye there");
  });
  it("should capture file", async () => {
    const fileStep = AgentBuilder()
      .file(({ command }) => {
        return [{ uri: "file-id" }, { bytes: "file-bytes" }];
      })
      .build();
    const result = await fileStep[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    expect(result[0].uri).toBe("file-id");
    expect(result[1].bytes).toBe("file-bytes");
  });
  it("should capture data", async () => {
    const dataStep = AgentBuilder()
      .data(({ command }) => {
        return [{ data: "data-bytes" }];
      })
      .build();
    const result = await dataStep[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result[0].data).toBe("data-bytes");
  });
  it("should capture multiple parts", async () => {
    const dataStep = AgentBuilder()
      .data(({ command }) => {
        return [{ data: "data-bytes" }, { data: "data-bytes-2" }];
      })
      .build();
    const result = await dataStep[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    expect(result[0].data).toBe("data-bytes");
    expect(result[1].data).toBe("data-bytes-2");
  });
  it("should capture multiple parts with args", async () => {
    const dataStep = AgentBuilder()
      .data(({ command }) => {
        return {
          parts: [{ data: "data-bytes" }, { data: "data-bytes-2" }],
          args: ["goodbye there", "goodbye there 2"],
        };
      })
      .build();
    const result = await dataStep[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result).toBeDefined();
    expect(result.parts).toBeDefined();
    expect(result.parts).toHaveLength(2);
    expect(result.parts[0].data).toBe("data-bytes");
    expect(result.parts[1].data).toBe("data-bytes-2");
    expect(result.args).toBeDefined();
    expect(result.args).toHaveLength(2);
    expect(result.args[0]).toBe("goodbye there");
    expect(result.args[1]).toBe("goodbye there 2");
  });
  it("should capture multiple types of steps", async () => {
    const agent = AgentBuilder()
      .text(({ command }) => {
        return "hello there";
      })
      .file(({ command }) => {
        return [{ uri: "file-id" }, { bytes: "file-bytes" }];
      })
      .data(({ command }) => {
        return [{ data: "data-bytes" }];
      })
      .build();
    const result = await agent[0].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    const result2 = await agent[1].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    const result3 = await agent[2].step({
      command: {
        kind: "message",
        message: "hello there",
      },
    });
    expect(result).toBe("hello there");
    expect(result2).toHaveLength(2);
    expect(result2[0].uri).toBe("file-id");
    expect(result2[1].bytes).toBe("file-bytes");
    expect(result3).toHaveLength(1);
    expect(result3[0].data).toBe("data-bytes");
  });
  it("should run in order", async () => {
    const agent = AgentBuilder()
      .text(({ command }) => {
        return "hello there";
      })
      .text(({ command }) => {
        return "hello there 2";
      })
      .text(({ command }) => {
        return "hello there 3";
      })
      .build();
    const executionWrapper = createAgentExecutor(agent);
    const results: any[] = [];
    for await (const result of executionWrapper({
      command: {
        kind: "message",
        message: {
          messageId: "123",
          contextId: "456",
          taskId: "789",
          message: "hello there",
        },
      },
      isCancelled: () => false,
      contextId: "456",
      State: () => ({
        task: {
          id: "789",
          contextId: "456",
        },
      }),
    })) {
      results.push(result);
      //   console.log(result);
    }
    expect(results).toHaveLength(5);
    expect(results[0].kind).toBe("status-update");
    expect(results[0].status.state).toBe("submitted");
    expect(results[0].status.timestamp).toBeDefined();
    expect(results[0].final).toBe(false);
    expect(results[0].taskId).toBe("789");
    expect(results[0].contextId).toBe("456");
    expect(results[1].status.state).toBe("working");
    expect(results[1].status.timestamp).toBeDefined();
    expect(results[1].final).toBe(false);
    expect(results[1].taskId).toBe("789");
    expect(results[1].contextId).toBe("456");
    expect(results[1].status.message.parts).toHaveLength(1);
    expect(results[1].status.message.parts[0].text).toBe("hello there");
    expect(results[2].status.state).toBe("working");
    expect(results[2].status.timestamp).toBeDefined();
    expect(results[2].final).toBe(false);
    expect(results[2].taskId).toBe("789");
    expect(results[2].contextId).toBe("456");
    expect(results[2].status.message.parts).toHaveLength(1);
    expect(results[2].status.message.parts[0].text).toBe("hello there 2");
    expect(results[3].status.state).toBe("working");
    expect(results[3].status.timestamp).toBeDefined();
    expect(results[3].final).toBe(false);
    expect(results[3].taskId).toBe("789");
    expect(results[3].contextId).toBe("456");
    expect(results[3].status.message.parts).toHaveLength(1);
    expect(results[3].status.message.parts[0].text).toBe("hello there 3");
    expect(results[4].status.state).toBe("completed");
    expect(results[4].status.timestamp).toBeDefined();
    expect(results[4].id).toBe("789");
    expect(results[4].contextId).toBe("456");
  });
  it("should run with multiple kinds of steps", async () => {
    const agent = AgentBuilder()
      .text(({ command }) => {
        return "hello there";
      })
      .file(({ command }) => {
        return [{ uri: "file-id" }, { bytes: "file-bytes" }];
      })
      .data(({ command }) => {
        return [{ entry: "data-bytes" }];
      });
    const executionWrapper = agent.createAgentEngine();
    const results: any[] = [];
    for await (const result of executionWrapper({
      contextId: "456",
      command: {
        kind: "message",
        message: {
          messageId: "123",
          contextId: "456",
          taskId: "789",
          message: "hello there",
        },
      },
      isCancelled: () => false,
      State: () => ({
        task: {
          id: "789",
          contextId: "456",
        },
      }),
    })) {
      results.push(result);
    }
    expect(results).toHaveLength(5);
    expect(results[1].status.message.parts[0].text).toBe("hello there");
    expect(results[2].status.message.parts[0].file.uri).toBe("file-id");
    expect(results[2].status.message.parts[1].file.bytes).toBe("file-bytes");
    expect(results[3].status.message.parts[0].data.entry).toBe("data-bytes");
  });
  it("should run with multiple kinds of steps with args", async () => {
    const agent = AgentBuilder()
      .text(({ command }) => {
        return {
          parts: ["hello there"],
          args: ["goodbye there"],
        };
      })
      .file(({ command, args }) => {
        return {
          parts: [{ bytes: args[0] }],
          args: ["goodbye there 2", "goodbye there 3"],
        };
      })
      .data(({ command, args }) => {
        return {
          parts: [{ entry: args[0], entry2: args[1] }],
        };
      });
    const executionWrapper = agent.createAgentEngine();
    const results: any[] = [];
    for await (const result of executionWrapper({
      contextId: "456",
      command: {
        kind: "message",
        message: {
          messageId: "123",
          contextId: "456",
          taskId: "789",
          message: "hello there",
        },
      },
      isCancelled: () => false,
      State: () => ({
        task: {
          id: "789",
          contextId: "456",
        },
      }),
    })) {
      results.push(result);
    }
    expect(results).toHaveLength(5);
    expect(results[1].status.message.parts[0].text).toBe("hello there");
    expect(results[2].status.message.parts[0].file.bytes).toBe("goodbye there");
    expect(results[3].status.message.parts[0].data.entry).toBe(
      "goodbye there 2"
    );
    expect(results[3].status.message.parts[0].data.entry2).toBe(
      "goodbye there 3"
    );
  });
  it("should pass content to step", async () => {
    const agent = AgentBuilder().text(({ content }) => {
      expect(content).toBe("hello world");
      return content;
    });
    const executionWrapper = agent.createAgentEngine();
    const results: any[] = [];
    for await (const result of executionWrapper({
      contextId: "456",
      command: {
        kind: "message",
        message: {
          messageId: "123",
          contextId: "456",
          taskId: "789",
          parts: [{ kind: "text", text: "hello world" }],
        },
      },
      isCancelled: () => false,
      State: () => ({
        task: {
          id: "789",
          contextId: "456",
        },
      }),
    })) {
      results.push(result);
    }
    expect(results).toHaveLength(3);
    expect(results[1].status.message.parts[0].text).toBe("hello world");
  });

  it("should create agent", async () => {
    const agent = AgentBuilder()
      .text(({ command }) => {
        return {
          parts: ["hello there"],
          args: ["goodbye there"],
        };
      })
      .file(({ command, args }) => {
        return {
          parts: [{ bytes: args[0] }],
          args: ["goodbye there 2", "goodbye there 3"],
        };
      })
      .data(({ command, args }) => {
        return {
          parts: [{ entry: args[0], entry2: args[1] }],
        };
      })
      .createAgent({
        agentCard: MOCK_AGENT_CARD,
      });
    expect(agent).toBeDefined();
    const result = await agent.sendMessage({
      message: {
        messageId: "123",
        contextId: "456",
        taskId: "789",
        message: "hello there",
      },
      isCancelled: () => false,
      State: () => ({
        task: {
          id: "789",
          contextId: "456",
        },
      }),
    });
    expect(result).toBeDefined();
    expect(result.status.state).toBe("completed");
    expect(result.status.message.parts).toHaveLength(3);
    expect(result.status.message.parts[0].text).toBe("hello there");
    expect(result.status.message.parts[1].file.bytes).toBe("goodbye there");
    expect(result.status.message.parts[2].data.entry).toBe("goodbye there 2");
    expect(result.status.message.parts[2].data.entry2).toBe("goodbye there 3");
    expect(result.status.message.taskId).toBe("789");
    expect(result.status.message.contextId).toBe("456");
    expect(result.status.message.messageId).toBeDefined();
  });
});
