import { AgentCard } from "../../schemas/index.js";
import { AgentEngine } from "../context.js";
import { TaskStore } from "../../../server/interfaces/store.js";

export interface A2AServiceOptions {
  engine: AgentEngine;
  card: AgentCard;
  taskStore: TaskStore;
}

export type { A2AServiceInterface } from "../../../server/trpc/procs/a2a/interfaces/service.js";
