import { ServiceInterface } from "../../../services/interfaces/service.js";
import {
  AgentCard,
  MessageSendParams,
  SendMessageSuccessResult,
  Task,
  TaskIdParams,
  UpdateEvent,
} from "../../../../../types/index.js";
import { TaskAndHistory } from "../../../../interfaces/store.js";
import { Context, ContextManagerInterface } from "../../../protocol/context.js";
import { ExecutionEngine } from "../../../protocol/execute.js";

export interface A2AServiceMethodOptions {
  getTask: (input: TaskIdParams, service: A2AServiceInterface) => Promise<Task>;
  cancelTask: (
    input: TaskIdParams,
    service: A2AServiceInterface,
    contextManager: ContextManagerInterface
  ) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    signal: AbortSignal,
    service: A2AServiceInterface,
    engine: ExecutionEngine,
    contextManager: ContextManagerInterface
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    signal: AbortSignal,
    service: A2AServiceInterface,
    engine: ExecutionEngine,
    contextManager: ContextManagerInterface
  ) => AsyncGenerator<UpdateEvent>;
  resubscribe: (
    input: TaskIdParams,
    signal: AbortSignal,
    service: A2AServiceInterface,
    engine: ExecutionEngine,
    contextManager: ContextManagerInterface
  ) => AsyncGenerator<UpdateEvent>;
}

export interface A2AServiceMethods {
  getTask: (input: TaskIdParams) => Promise<Task>;
  cancelTask: (input: TaskIdParams) => Promise<Task>;
  sendMessage: (
    message: MessageSendParams,
    signal?: AbortSignal,
    engine?: ExecutionEngine
  ) => Promise<SendMessageSuccessResult>;
  streamMessage: (
    message: MessageSendParams,
    signal?: AbortSignal,
    engine?: ExecutionEngine
  ) => AsyncGenerator<UpdateEvent>;
  resubscribe: (
    input: TaskIdParams,
    signal?: AbortSignal,
    engine?: ExecutionEngine
  ) => AsyncGenerator<UpdateEvent>;
}
export interface A2AServiceInterface<
  TRequest extends {} = any,
  TState extends TaskAndHistory = TaskAndHistory,
> extends ServiceInterface<Context<TRequest, TState>>,
    A2AServiceMethods {
  getAgentCard: () => AgentCard;
  addConnection: (id: string) => void;
  removeConnection: (id: string) => void;
  isCancelled: (id: string) => boolean;
  addCancellation: (id: string) => void;
  removeCancellation: (id: string) => void;
  getState: (id: string) => TState | undefined;
  setState: (id: string, data: TState) => void;
}
