import { TaskAndHistory } from "../../../interfaces/store.js";
import {
  A2AServiceInterface,
  A2AServiceMethodOptions,
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
  agent?: AgentEngine;
  contexts?: ContextManagerInterface;
  connections?: ConnectionManagerInterface;
  cancellations?: CancellationManagerInterface;
  tasks?: TaskManagerInterface;
  methods?: Partial<A2AServiceMethodOptions>;
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
    params.agent ?? defaultEngine,
    params.contexts ?? new ExecutionContextManager(),
    params.connections ?? new ConnectionManager(),
    params.cancellations ?? new CancellationManager(),
    params.tasks ?? new TaskManager(),
    createA2AServiceMethods(params.methods)
  );
}

export class A2AServiceImpl implements A2AServiceInterface {
  private agentInfo: AgentCard;
  private agent: AgentEngine;
  private connections: ConnectionManagerInterface;
  private cancellations: CancellationManagerInterface;
  private tasks: TaskManagerInterface;
  private contexts: ContextManagerInterface;
  private methods: A2AServiceMethodOptions;
  constructor(
    agentCard: AgentCard,
    agent: AgentEngine,
    contexts: ContextManagerInterface,
    connections: ConnectionManagerInterface,
    cancellations: CancellationManagerInterface,
    tasks: TaskManagerInterface,
    methods: A2AServiceMethodOptions
  ) {
    this.agent = agent;
    this.agentInfo = agentCard;
    this.contexts = contexts;
    this.connections = connections;
    this.cancellations = cancellations;
    this.tasks = tasks;
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
    return this.agentInfo;
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
    agent: AgentEngine = this.agent,
    signal?: AbortSignal
  ) {
    return await this.methods.sendMessage(
      message,
      this,
      agent,
      this.contexts,
      signal ?? new AbortController().signal
    );
  }

  async *streamMessage(
    message: MessageSendParams,
    agent: AgentEngine = this.agent,
    signal?: AbortSignal
  ) {
    yield* this.methods.streamMessage(
      message,
      this,
      agent,
      this.contexts,
      signal ?? new AbortController().signal
    );
  }

  async *resubscribe(
    input: TaskIdParams,
    agent: AgentEngine = this.agent,
    signal?: AbortSignal
  ) {
    yield* this.methods.resubscribe(
      input,
      this,
      agent,
      this.contexts,
      signal ?? new AbortController().signal
    );
  }
}
