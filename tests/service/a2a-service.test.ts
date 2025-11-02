import { describe, it, beforeEach, expect, afterEach } from "@jest/globals";
import { AgentBuilder, A2AService, getContent, Task } from "../../src/index.js";
import { configureLogger } from "../../src/utils/logging/index.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "../utils/info.js";
configureLogger({ level: "error" });

describe("A2A Service Tests", () => {
  let agent: A2AService;

  beforeEach(() => {
    agent = AgentBuilder()
      .text(() => "hello world!")
      .createAgent({
        agentCard: defaultAgentCard,
      });
  });
  afterEach(() => {
    agent.stop();
  });
  it("should get referenceTasks", async () => {
    const result1: Task = await agent.sendMessage({
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "hello world!" }],
      },
    });
    const result2: Task = await agent.sendMessage({
      message: {
        messageId: "test-message-id-2",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "hello world! 2" }],
        referenceTaskIds: [result1.id],
      },
    });
    expect(result2.metadata?.referencedTasks).toHaveLength(1);
    expect((result2.metadata?.referencedTasks as Task[])[0].id).toBe(
      result1.id
    );
  });
});
