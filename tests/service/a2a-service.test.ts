import { describe, it, beforeEach, expect, afterEach } from "@jest/globals";
import { AgentBuilder, getContent, A2A } from "../../src/index.js";
import { MOCK_AGENT_CARD as defaultAgentCard } from "../utils/info.js";
import { configure } from "../../src/config/index.js";
import { configurePino } from "../../src/extensions/pino.js";
// import pino from "pino";
// import pinoCaller from "pino-caller";
// import { ResourceReferenceSchema } from "@modelcontextprotocol/sdk/types.js";
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
describe("A2A Service Tests", () => {
  let agent: A2A.Service;

  beforeEach(() => {
    agent = AgentBuilder()
      .text(({ context }) => {
        return context.references?.[0]?.id ?? "no reference";
      })
      .createAgent({
        agentCard: defaultAgentCard,
      });
  });
  afterEach(() => {
    agent.stop();
  });
  it("should get referenceTasks", async () => {
    const result1: A2A.SendMessageSuccessResult = await agent.sendMessage({
      message: {
        messageId: "test-message-id",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "hello world!" }],
      },
    });
    const result2: A2A.SendMessageSuccessResult = await agent.sendMessage({
      message: {
        messageId: "test-message-id-2",
        kind: "message",
        role: "user",
        parts: [{ kind: "text", text: "hello world! 2" }],
        referenceTaskIds: [(result1 as A2A.Task).id],
      },
    });
    expect((result2 as A2A.Task).status.message?.parts).toHaveLength(1);
    expect((result2 as A2A.Task).status.message?.parts[0].text).toBe(
      (result1 as A2A.Task).id
    );
  });
});
