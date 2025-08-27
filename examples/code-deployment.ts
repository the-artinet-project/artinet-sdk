import {
  AgentEngine,
  Context,
  Task,
  TextPart,
  TaskState,
  TaskStatusUpdateEvent,
} from "@artinet/sdk";
import { artinet } from "@artinet/sdk/agents";

console.log("[CoderAgent] Starting");
export const coderAgent: AgentEngine = async function* (context: Context) {
  const message = context.command.message;
  const taskId = context.command.message.taskId ?? "";

  if (message.parts.length === 0) {
    console.warn(`[CoderAgent] No history/messages found for task ${taskId}`);
    const update: TaskStatusUpdateEvent = {
      taskId: taskId,
      contextId: context.contextId,
      kind: "status-update",
      status: {
        state: TaskState.failed,
        message: {
          messageId: "no-input-message-found",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "No input message found." }],
        },
      },
      final: true,
    };
    yield update;
    return;
  }
  const update: TaskStatusUpdateEvent = {
    taskId: taskId,
    contextId: context.contextId,
    kind: "status-update",
    status: {
      state: TaskState.working,
      message: {
        messageId: "generating-code",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Generating code..." }],
      },
    },
    final: false,
  };
  yield update;

  const response = await artinet.v0.connect({
    agentId: "Qwen/Qwen2.5-Coder-32B-Instruct",
    messages: [
      {
        role: "system",
        content:
          "You are an expert coding assistant. Provide a high-quality code sample according to the output instructions provided below. You may generate multiple files as needed.",
      },
      ...message.parts
        .filter((part) => part && part.kind === "text")
        .map((part) => ({
          role: message.role,
          content: (part as TextPart).text,
        })),
    ],
  });

  console.log("coderAgent", "response: ", response);
  const finalUpdate: TaskStatusUpdateEvent = {
    taskId: taskId,
    contextId: context.contextId,
    kind: "status-update",
    status: {
      state: TaskState.completed,
      message: {
        messageId: "code-generated",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: response }],
      },
    },
    final: true,
  };
  yield finalUpdate;
};

await artinet.v0.taskManager({ taskHandler: coderAgent });
console.log("[CoderAgent] Finished");
