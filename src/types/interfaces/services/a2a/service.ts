import {
  ConnectionManagerInterface,
  CancellationManagerInterface,
  ContextManagerInterface,
  ServiceInterface,
  TaskManagerInterface,
} from "../core/index.js";
import {
  AgentCard,
  MessageSendParams,
  SendMessageSuccessResult,
  Task,
  TaskIdParams,
} from "~types/schemas/a2a/index.js";
import { UpdateEvent, Command, State, Update } from "./context.js";
import { A2AEngine } from "./engine.js";

export interface FactoryParams {
  agentCard: AgentCard;
  agent: A2AEngine;
  contexts?: ContextManagerInterface<Command, State, Update>;
  connections?: ConnectionManagerInterface;
  cancellations?: CancellationManagerInterface;
  tasks?: TaskManagerInterface<State>;
  methods?: Partial<MethodOptions>;
}

export interface MethodOptions {
  getTask: (input: TaskIdParams, service: A2AServiceInterface) => Promise<Task>;
  cancelTask: (
    input: TaskIdParams,
    service: A2AServiceInterface,
    contextManager: ContextManagerInterface<Command, State, Update>
  ) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    service: A2AServiceInterface,
    agent: A2AEngine,
    contextManager: ContextManagerInterface<Command, State, Update>,
    signal: AbortSignal
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    service: A2AServiceInterface,
    agent: A2AEngine,
    contextManager: ContextManagerInterface<Command, State, Update>,
    signal: AbortSignal
  ) => AsyncGenerator<UpdateEvent>;
  resubscribe: (
    input: TaskIdParams,
    service: A2AServiceInterface,
    agent: A2AEngine,
    contextManager: ContextManagerInterface<Command, State, Update>,
    signal: AbortSignal
  ) => AsyncGenerator<UpdateEvent>;
}

export interface MethodsInterface {
  getTask: (input: TaskIdParams) => Promise<Task>;
  cancelTask: (input: TaskIdParams) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    agent?: A2AEngine,
    signal?: AbortSignal
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    agent?: A2AEngine,
    signal?: AbortSignal
  ) => AsyncGenerator<UpdateEvent>;
  resubscribe: (
    input: TaskIdParams,
    agent?: A2AEngine,
    signal?: AbortSignal
  ) => AsyncGenerator<UpdateEvent>;
}

export interface A2AServiceInterface<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
> extends ServiceInterface<TCommand, TState, TUpdate>,
    MethodsInterface {
  getAgentCard: () => AgentCard;
  addConnection: (id: string) => void;
  removeConnection: (id: string) => void;
  isCancelled: (id: string) => boolean;
  addCancellation: (id: string) => void;
  removeCancellation: (id: string) => void;
  getState: (id: string) => TState | undefined;
  setState: (id: string, data: TState) => void;
}
