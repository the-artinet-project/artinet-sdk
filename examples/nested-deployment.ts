import {
  AgentEngine,
  Context,
  Message,
  Task,
  TaskContext,
  TaskArtifactUpdateEvent,
  TaskState,
  TaskStatusUpdateEvent,
  TextPart,
} from "@artinet/sdk";
import { ClientProxy } from "@artinet/sdk/deployment";
import { artinet } from "@artinet/sdk/agents";

console.log("[SimpleEchoAgent] Starting");

export const simpleEchoAgent: AgentEngine = async function* (context: Context) {
  console.log("simpleEchoAgent called");
  yield {
    taskId: context.command.message.taskId ?? "",
    contextId: context.contextId,
    kind: "status-update",
    status: {
      state: TaskState.working,
      message: {
        messageId: "thinking-about-your-request",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: "Thinking about your request..." }],
      },
    },
    final: false,
  };

  const userText = context.command.message.parts
    .filter((part) => part.kind === "text")
    .map((part) => (part as TextPart).text)
    .join(" ");

  try {
    const agentClient: ClientProxy = artinet.v0.agent({
      baseUrl:
        "https://agents.artinet.io/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349",
      headers: {},
      fallbackPath:
        "/agentId=0x88a03f820c633d580f37e9dae1487a32ae2f59b42eafe0f8396c5a902507f349/agent-card",
    });
    const agentCard = await agentClient.agentCard();
    console.log("agentCard: ", agentCard);
    const message: Message = {
      messageId: "user-message",
      kind: "message",
      role: "user",
      parts: [
        {
          kind: "text",
          text: "Write a python function to share files remotely. Please be concise and respond with code only. Please use the following format: def share_files(files: list[str]) -> str: ...",
        },
      ],
    };
    const task: Task | Message | null = await agentClient.sendMessage({
      message: message,
    });
    console.log("task returned: ", JSON.stringify(task, null, 2));
    if (!task || !("status" in task)) {
      throw new Error("Task returned: " + JSON.stringify(task, null, 2));
    }
    const update: TaskStatusUpdateEvent = {
      taskId: context.command.message.taskId ?? "",
      contextId: context.contextId,
      kind: "status-update",
      status: {
        state: task.status.state || TaskState.working,
        message: task.status.message
          ? {
              messageId: task?.status?.message?.messageId ?? "",
              kind: "message",
              role: "agent",
              parts: task?.status?.message?.parts.map((part) => ({
                ...(part as TextPart),
                text: part.kind === "text" ? (part as TextPart).text : "",
              })),
            }
          : {
              messageId: "task-sent-to-artinet",
              kind: "message",
              role: "agent",
              parts: [{ kind: "text", text: "Task sent to Artinet..." }],
            },
      },
      final: false,
    };
    yield update;
  } catch (error) {
    console.error("Error sending task: ", error);
    const errorUpdate: TaskStatusUpdateEvent = {
      taskId: context.command.message.taskId ?? "",
      contextId: context.contextId,
      kind: "status-update",
      status: {
        state: TaskState.failed,
        message: {
          messageId: "error-sending-task",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Error sending task: " + error }],
        },
      },
      final: true,
    };
    yield errorUpdate;
  }
  // Check for task cancellation
  if (context.isCancelled()) {
    console.log("Task was cancelled");
    const cancelUpdate: TaskStatusUpdateEvent = {
      taskId: context.command.message.taskId ?? "",
      contextId: context.contextId,
      kind: "status-update",
      status: {
        state: TaskState.canceled,
        message: {
          messageId: "task-cancelled",
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: "Processing has been cancelled." }],
        },
      },
      final: true,
    };
    yield cancelUpdate;
    return;
  }

  // Create a response
  const response = `You said: "${userText}". This is an echo server example.`;

  // Yield an artifact (optional)
  const artifactUpdate: TaskArtifactUpdateEvent = {
    taskId: context.command.message.taskId ?? "",
    contextId: context.contextId,
    kind: "artifact-update",
    artifact: {
      artifactId: "response.txt",
      name: "response.txt",
      parts: [{ kind: "text", text: response }],
    },
  };
  yield artifactUpdate;
  const completedUpdate: TaskStatusUpdateEvent = {
    taskId: context.command.message.taskId ?? "",
    contextId: context.contextId,
    kind: "status-update",
    status: {
      state: TaskState.completed,
      message: {
        messageId: "task-completed",
        kind: "message",
        role: "agent",
        parts: [{ kind: "text", text: response }],
      },
    },
    final: true,
  };
  yield completedUpdate;
};

await artinet.v0.taskManager({ taskHandler: simpleEchoAgent });
console.log("[SimpleEchoAgent] Finished");
