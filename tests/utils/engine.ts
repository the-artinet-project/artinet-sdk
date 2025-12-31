import { AgentEngine, A2A } from "../../src/types/index.js";
import { SUBMITTED_UPDATE } from "../../src/create/index.js";
//echoes the users input back as a task
export const TestAgentLogic: AgentEngine = async function* (
  context: A2A.Context
) {
  const message = context.userMessage;
  yield SUBMITTED_UPDATE(message.taskId ?? "", message.contextId ?? "");
  const Task: A2A.Task = {
    id: context.taskId,
    contextId: context.contextId,
    status: {
      state: A2A.TaskState.completed,
      message: message,
      timestamp: "2024-01-01T00:00:00.000Z",
    },
    kind: "task",
    metadata: {},
    history: [message],
  };
  yield Task;
};
