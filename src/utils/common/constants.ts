import { TaskState } from "../../types/schema/index.js";
import { TaskYieldUpdate } from "../../types/extended-schema.js";

export const WORKING_UPDATE: TaskYieldUpdate = {
  state: TaskState.Working,
  message: {
    messageId: "working-update",
    kind: "message",
    role: "agent" as const,
    parts: [{ kind: "text" as const, text: "Processing..." }],
  },
};

export const CANCEL_UPDATE: TaskYieldUpdate = {
  state: TaskState.Canceled,
  message: {
    messageId: "cancel-update",
    kind: "message",
    role: "agent" as const,
    parts: [
      {
        kind: "text" as const,
        text: "Task was canceled during execution.",
      },
    ],
  },
};

export const SUBMITTED_UPDATE: TaskYieldUpdate = {
  state: TaskState.Submitted,
  message: {
    messageId: "submitted-update",
    kind: "message",
    role: "agent" as const,
    parts: [{ kind: "text" as const, text: "Task was submitted." }],
  },
};

export const FINAL_STATES: TaskState[] = [
  TaskState.Completed,
  TaskState.Failed,
  TaskState.Canceled,
];
