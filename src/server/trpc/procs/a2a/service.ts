import { TaskAndHistory } from "../../../interfaces/store.js";
import { A2AServiceInterface } from "./interfaces/service.js";
import {
  AgentCard,
  MessageSendParams,
  TaskIdParams,
} from "../../../../types/index.js";
import { Context, ContextManager } from "../../protocol/context.js";
import { ExecutionEngine } from "../../protocol/execute.js";
import { execute } from "../../protocol/execute.js";
import { sendMessage } from "./methods/send-message.js";
import { streamMessage } from "./methods/stream-message.js";
import { getTask } from "./methods/get-task.js";
import { resubscribe } from "./methods/resubscribe-task.js";
import { cancelTask } from "./methods/cancel-task.js";
import { engine as defaultEngine } from "../../test-engine.js";

const defaultAgentCard: AgentCard = {
  protocolVersion: "0.3.0",
  name: "A2A Server",
  description: "A general-purpose A2A protocol server",
  version: "0.1.0",
  url: "http://localhost",
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
    extensions: [],
  },
  skills: [],
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
};

export class A2AServiceImpl implements A2AServiceInterface {
  private agentCard: AgentCard = defaultAgentCard; //todo: make this configurable
  private connections: Set<string> = new Set();
  private cancellations: Set<string> = new Set();
  private states: Map<string, TaskAndHistory> = new Map(); //!For Testing
  private contextManager: ContextManager;
  constructor(contextManager: ContextManager) {
    this.contextManager = contextManager;
  }
  async execute(
    engine: ExecutionEngine<Context>,
    context: Context
  ): Promise<void> {
    await execute(engine, context);
  }

  async stop(): Promise<void> {
    for (const id of this.states.keys()) {
      //gracefully cancel the tasks
      this.addCancellation(id);
    }
    return;
  }

  getAgentCard(): AgentCard {
    return this.agentCard;
  }

  addConnection(id: string) {
    this.connections.add(id);
  }

  removeConnection(id: string) {
    this.connections.delete(id);
  }

  isCancelled(id: string) {
    return this.cancellations.has(id);
  }

  addCancellation(id: string) {
    this.cancellations.add(id);
  }

  removeCancellation(id: string) {
    this.cancellations.delete(id);
  }

  getState(id: string) {
    return this.states.get(id);
  }

  setState(id: string, data: TaskAndHistory) {
    this.states.set(id, data);
  }

  async getTask(input: TaskIdParams) {
    return await getTask(input, this);
  }

  async cancelTask(input: TaskIdParams, contextManager: ContextManager) {
    return await cancelTask(input, this, contextManager);
  }

  async sendMessage(
    message: MessageSendParams,
    signal?: AbortSignal,
    engine: ExecutionEngine = defaultEngine
  ) {
    return await sendMessage(
      message,
      signal ?? new AbortController().signal,
      this,
      engine,
      this.contextManager
    );
  }

  async *streamMessage(
    message: MessageSendParams,
    signal?: AbortSignal,
    engine: ExecutionEngine = defaultEngine
  ) {
    yield* streamMessage(
      message,
      signal ?? new AbortController().signal,
      this,
      engine,
      this.contextManager
    );
  }

  async *resubscribe(
    input: TaskIdParams,
    signal?: AbortSignal,
    engine: ExecutionEngine = defaultEngine
  ) {
    yield* resubscribe(
      input,
      signal ?? new AbortController().signal,
      this,
      engine,
      this.contextManager
    );
  }
}
