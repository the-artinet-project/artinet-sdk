import {
  ClientProxy,
  Message,
  Task,
  TaskContext,
  TaskYieldUpdate,
} from "@artinet/sdk";
import { artinet } from "@artinet/sdk/agents";

console.log("[SimpleEchoAgent] Starting");

export async function* simpleEchoAgent(
  context: TaskContext
): AsyncGenerator<TaskYieldUpdate, Task | void, unknown> {
  console.log("simpleEchoAgent called");
  yield {
    state: "working",
    message: {
      role: "agent",
      parts: [{ text: "Thinking about your request...", type: "text" }],
    },
  };

  const userText = context.userMessage.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join(" ");

  console.log(`Processing request: ${userText}`);
  try {
    const agentClient: ClientProxy = artinet.v0.agent({
      baseUrl:
        "https://agents.stage.artinet.io/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349",
      headers: {},
      fallback:
        "/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349/agent-card",
    });
    const agentCard = await agentClient.agentCard();
    console.log("agentCard: ", agentCard);
    const message: Message = {
      role: "user",
      parts: [
        {
          type: "text",
          text: "Write a python function to share files remotely. Please be concise and respond with code only. Please use the following format: def share_files(files: list[str]) -> str: ...",
        },
      ],
    };
    const task = await agentClient.sendTask({
      id: "111",
      message: message,
    });
    console.log("task returned: ", JSON.stringify(task, null, 2));
    yield {
      state: task?.status?.state || "working",
      message: task?.status?.message
        ? {
            role: "agent",
            parts: task?.status?.message?.parts.map((part) => ({
              ...part,
              text: part.type === "text" ? part.text : "",
            })),
          }
        : {
            role: "agent",
            parts: [{ text: "Task sent to Artinet...", type: "text" }],
          },
    };
  } catch (error) {
    console.error("Error sending task: ", error);
    yield {
      state: "failed",
      message: {
        role: "agent",
        parts: [{ text: "Error sending task: " + error, type: "text" }],
      },
    };
  }
  // Check for task cancellation
  if (context.isCancelled()) {
    console.log("Task was cancelled");
    yield {
      state: "canceled",
      message: {
        role: "agent",
        parts: [{ text: "Processing has been cancelled.", type: "text" }],
      },
    };
    return;
  }

  // Create a response
  const response = `You said: "${userText}". This is an echo server example.`;

  // Yield an artifact (optional)
  yield {
    name: "response.txt",
    parts: [{ text: response, type: "text" }],
  };

  // Yield a completed status with response message
  yield {
    state: "completed",
    message: {
      role: "agent",
      parts: [{ text: response, type: "text" }],
    },
  };
}

await artinet.v0.taskManager({ taskHandler: simpleEchoAgent });
console.log("[SimpleEchoAgent] Finished");
