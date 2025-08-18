import { TaskAndHistory } from "../../../interfaces/store.js";
import {
  A2AServiceInterface,
  A2AServiceMethodOptions,
  A2AServiceMethods,
} from "./interfaces/service.js";
import {
  AgentCard,
  AgentEngine,
  MessageSendParams,
  TaskIdParams,
} from "../../../../types/index.js";
import { Context, ContextManagerInterface } from "../../protocol/context.js";
import { ExecutionEngine } from "../../protocol/execute.js";
import { execute } from "../../protocol/execute.js";
import { sendMessage } from "./methods/send-message.js";
import { streamMessage } from "./methods/stream-message.js";
import { getTask } from "./methods/get-task.js";
import { resubscribe } from "./methods/resubscribe-task.js";
import { cancelTask } from "./methods/cancel-task.js";
import { engine as defaultEngine } from "../../test-engine.js";
import { ExecutionContextManager } from "../../protocol/context-impl.js";
import {
  ConnectionManagerInterface,
  ConnectionManager,
} from "../../protocol/states/connection-manager.js";
import {
  CancellationManagerInterface,
  CancellationManager,
} from "../../protocol/states/cancellation-manager.js";
import {
  TaskManagerInterface,
  TaskManager,
} from "../../protocol/states/task-manager.js";

export const defaultAgentCard: AgentCard = {
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

export interface A2AServiceParams {
  agentCard: AgentCard;
  contexts?: ContextManagerInterface;
  connections?: ConnectionManagerInterface;
  cancellations?: CancellationManagerInterface;
  tasks?: TaskManagerInterface;
  methods?: A2AServiceMethodOptions;
}

export function createA2AServiceMethods(
  methods?: Partial<A2AServiceMethodOptions>
): A2AServiceMethodOptions {
  return {
    getTask: methods?.getTask ?? getTask,
    cancelTask: methods?.cancelTask ?? cancelTask,
    sendMessage: methods?.sendMessage ?? sendMessage,
    streamMessage: methods?.streamMessage ?? streamMessage,
    resubscribe: methods?.resubscribe ?? resubscribe,
  };
}
export function createA2AService(params: A2AServiceParams) {
  return new A2AServiceImpl(
    params.agentCard,
    params.contexts ?? new ExecutionContextManager(),
    params.connections ?? new ConnectionManager(),
    params.cancellations ?? new CancellationManager(),
    params.tasks ?? new TaskManager(),
    createA2AServiceMethods(params.methods)
  );
}

export class A2AServiceImpl implements A2AServiceInterface {
  private agentCard: AgentCard;
  private agent?: AgentEngine;
  private connections: ConnectionManagerInterface;
  private cancellations: CancellationManagerInterface;
  private tasks: TaskManagerInterface;
  private contexts: ContextManagerInterface;
  private methods: A2AServiceMethodOptions;
  constructor(
    agentCard: AgentCard,
    contexts: ContextManagerInterface,
    connections: ConnectionManagerInterface,
    cancellations: CancellationManagerInterface,
    tasks: TaskManagerInterface,
    methods: A2AServiceMethodOptions,
    agent?: AgentEngine
  ) {
    this.agentCard = agentCard;
    this.contexts = contexts;
    this.connections = connections;
    this.cancellations = cancellations;
    this.tasks = tasks;
    this.agent = agent;
    this.methods = methods;
  }

  async execute(
    engine: ExecutionEngine<Context>,
    context: Context
  ): Promise<void> {
    await execute(engine, context);
  }

  async stop(): Promise<void> {
    const currentTasks = this.tasks.getTasks();
    for (const id of currentTasks) {
      this.addCancellation(id);
    }
    return;
  }

  getAgentCard(): AgentCard {
    return this.agentCard;
  }

  addConnection(id: string) {
    this.connections.addConnection(id);
  }

  removeConnection(id: string) {
    this.connections.removeConnection(id);
  }

  isCancelled(id: string) {
    return this.cancellations.isCancelled(id);
  }

  addCancellation(id: string) {
    this.cancellations.addCancellation(id);
  }

  removeCancellation(id: string) {
    this.cancellations.removeCancellation(id);
  }

  getState(id: string) {
    return this.tasks.getState(id);
  }

  setState(id: string, data: TaskAndHistory) {
    this.tasks.setState(id, data);
  }

  async getTask(input: TaskIdParams) {
    return await this.methods.getTask(input, this);
  }

  async cancelTask(input: TaskIdParams) {
    return await this.methods.cancelTask(input, this, this.contexts);
  }

  async sendMessage(
    message: MessageSendParams,
    signal?: AbortSignal,
    engine: ExecutionEngine = this.agent ?? defaultEngine
  ) {
    return await this.methods.sendMessage(
      message,
      signal ?? new AbortController().signal,
      this,
      engine,
      this.contexts
    );
  }

  async *streamMessage(
    message: MessageSendParams,
    signal?: AbortSignal,
    engine: ExecutionEngine = this.agent ?? defaultEngine
  ) {
    yield* this.methods.streamMessage(
      message,
      signal ?? new AbortController().signal,
      this,
      engine,
      this.contexts
    );
  }

  async *resubscribe(
    input: TaskIdParams,
    signal?: AbortSignal,
    engine: ExecutionEngine = this.agent ?? defaultEngine
  ) {
    yield* this.methods.resubscribe(
      input,
      signal ?? new AbortController().signal,
      this,
      engine,
      this.contexts
    );
  }
}
