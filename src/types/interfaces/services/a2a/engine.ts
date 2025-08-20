import { ExecutionEngine } from "../core/execution/index.js";
import { Command, Update } from "./context.js";

export type A2AEngine = ExecutionEngine<Command, Update>;
