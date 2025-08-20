import {
  A2AServiceInterface,
  A2AEngine,
  AgentCard,
  ContextManagerInterface,
  ConnectionManagerInterface,
  CancellationManagerInterface,
  TaskManagerInterface,
  MethodOptions,
  TaskAndHistory,
  TaskIdParams,
  MessageSendParams,
  Command,
  State,
  Update,
  Context,
} from "~/types/index.js";
import { coreExecute } from "~/services/core/execution/execute.js";

export class A2AService implements A2AServiceInterface {
  private agentInfo: AgentCard;
  private agent: A2AEngine;
  private connections: ConnectionManagerInterface;
  private cancellations: CancellationManagerInterface;
  private tasks: TaskManagerInterface<TaskAndHistory>;
  private contexts: ContextManagerInterface<Command, State, Update>;
  private methods: MethodOptions;
  constructor(
    agentCard: AgentCard,
    agent: A2AEngine,
    contexts: ContextManagerInterface<Command, State, Update>,
    connections: ConnectionManagerInterface,
    cancellations: CancellationManagerInterface,
    tasks: TaskManagerInterface<TaskAndHistory>,
    methods: MethodOptions
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
    engine: A2AEngine,
    context: Context<Command, State, Update>
  ): Promise<void> {
    await coreExecute(engine, context);
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
    agent: A2AEngine = this.agent,
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
    agent: A2AEngine = this.agent,
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
    agent: A2AEngine = this.agent,
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
