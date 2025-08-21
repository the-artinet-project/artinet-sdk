import { ExecutionEngine } from "../core/execution/index.js";
import { Command, State, Update } from "./context.js";

export type A2AEngine = ExecutionEngine<Command, State, Update>;
