import { TaskState, TaskYieldUpdate } from "../../types/extended-schema.js";

export const WORKING_UPDATE: TaskYieldUpdate = {
  state: "working",
  message: {
    role: "agent" as const,
    parts: [{ type: "text" as const, text: "Processing..." }],
  },
};

export const CANCEL_UPDATE: TaskYieldUpdate = {
  state: "canceled",
  message: {
    role: "agent" as const,
    parts: [
      {
        type: "text" as const,
        text: "Task was canceled during execution.",
      },
    ],
  },
};

export const SUBMITTED_UPDATE: TaskYieldUpdate = {
  state: "submitted",
  message: {
    role: "agent" as const,
    parts: [{ type: "text" as const, text: "Task was submitted." }],
  },
};

export const FINAL_STATES: TaskState[] = ["completed", "failed", "canceled"];
