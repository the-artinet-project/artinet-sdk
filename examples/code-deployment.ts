import { TaskYieldUpdate, TaskContext, Task, TextPart } from "@artinet/sdk";
import { artinet } from "@artinet/sdk/agents";

console.log("[CoderAgent] Starting");
export async function* coderAgent({
  task,
  history,
}: TaskContext): AsyncGenerator<TaskYieldUpdate, Task | void, unknown> {
  history = [...history, ...(task.status.message ? [task.status.message] : [])];
  const messages = (history ?? [])
    .map((m) => ({
      role: (m.role === "agent" ? "model" : "user") as "user" | "model",
      content: m.parts
        .filter((p): p is TextPart => !!(p as TextPart).text)
        .map((p) => p.text)
        .join("\n"),
    }))
    .filter((m) => m.content.length > 0);

  if (messages.length === 0) {
    console.warn(`[CoderAgent] No history/messages found for task ${task.id}`);
    yield {
      state: "failed",
      message: {
        role: "agent",
        parts: [{ type: "text", text: "No input message found." }],
      },
    };
    return;
  }

  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ type: "text", text: "Generating code..." }],
    },
  };

  const response = await artinet.v0.connect({
    agentId: "Qwen/Qwen2.5-Coder-32B-Instruct",
    messages: [
      {
        role: "system",
        content:
          "You are an expert coding assistant. Provide a high-quality code sample according to the output instructions provided below. You may generate multiple files as needed.",
      },
      ...messages,
    ],
  });

  console.log("coderAgent", "response: ", response);
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [
        {
          type: "text",
          text: response,
        },
      ],
    },
  };
}

await artinet.v0.taskManager({ taskHandler: coderAgent });
console.log("[CoderAgent] Finished");
