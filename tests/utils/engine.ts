import {
  A2AEngine,
  MessageSendParams,
  Task,
  TaskState,
} from "../../src/types/index.js";
//echoes the users input back as a task
export const TestAgentLogic: A2AEngine = async function* (
  command: MessageSendParams
) {
  const Task: Task = {
    id: command.message.taskId ?? "",
    contextId: command.message.contextId ?? "",
    status: {
      state: TaskState.completed,
      message: command.message,
      timestamp: "2024-01-01T00:00:00.000Z",
    },
    kind: "task",
    metadata: {},
    history: [command.message],
  };
  yield Task;
};
