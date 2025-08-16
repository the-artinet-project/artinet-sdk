import { A2AServiceImpl, ExecutionContextManager } from "./protocol/index.js";
export class Repository {
  private service: A2AServiceImpl;
  private contextManager: ExecutionContextManager;

  constructor() {
    this.service = new A2AServiceImpl();
    this.contextManager = new ExecutionContextManager();
  }
  getService() {
    return this.service;
  }
  getContextManager() {
    return this.contextManager;
  }
}

export const globalRepository = new Repository();

import {
  TaskStatusUpdateEvent,
  TaskState,
  Kind,
  MessageRoleSchema,
} from "../../types/index.js";

export const engine = async function* (request: any) {
  console.log("engine: request", request);
  const update: TaskStatusUpdateEvent = {
    kind: "status-update",
    taskId: request.taskId,
    contextId: request.contextId ?? request.taskId,
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
