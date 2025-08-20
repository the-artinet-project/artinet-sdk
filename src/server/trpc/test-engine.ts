import {
  TaskStatusUpdateEvent,
  TaskState,
  Kind,
  MessageRoleSchema,
  MessageSendParams,
} from "../../types/index.js";

export const engine = async function* (request: MessageSendParams) {
  const update: TaskStatusUpdateEvent = {
    kind: "status-update",
    taskId: request.message.taskId ?? "",
    contextId: request.message.contextId ?? "",
    status: {
      state: TaskState.completed,
      timestamp: "2024-01-01T00:00:00.000Z",
      message: {
        kind: Kind.message,
        messageId: "123",
        role: MessageRoleSchema.enum.agent,
        parts: [
          {
            kind: Kind.text,
            text: "Thinking...",
          },
        ],
      },
    },
    final: true,
    metadata: {},
  };
  yield update;
};
