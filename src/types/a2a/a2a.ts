import { core } from "../core/index.js";
import { A2A } from "@artinet/types";

export type AgentCardParams =
  | (Partial<A2A.AgentCard> & Required<Pick<A2A.AgentCard, "name">>)
  | string;

export type Update =
  | A2A.Message
  | A2A.Task
  | A2A.TaskStatusUpdateEvent
  | A2A.TaskArtifactUpdateEvent;

export type Engine = (
  context: Context
) => AsyncGenerator<Update, void, unknown>;

export interface BaseContext extends core.Context<A2A.Task> {
  readonly service: Service;
  readonly publisher: EventPublisher;
}

export interface Context extends BaseContext {
  readonly taskId: string;
  readonly userMessage: A2A.Message;
  readonly messages: MessageConsumerProxy;
  extensions?: A2A.AgentExtension[];
  references?: A2A.Task[];
  getTask: () => Promise<A2A.Task>;
}

export type ContextParams = Omit<
  BaseContext,
  "publisher" | "isCancelled" | "getState" | "abortSignal"
> &
  Omit<Partial<Context>, "userMessage"> & {
    messenger: MessageConsumerProxy;
    task?: A2A.Task;
    overrides?: Partial<Omit<EventConsumer, "contextId">>;
    abortSignal?: AbortSignal;
  };

export interface Contexts extends core.Contexts<Context> {
  create: (params: ContextParams) => Promise<Context>;
  list: () => Promise<Context[]>;
}

export interface Tasks extends core.Manager<A2A.Task> {
  update: (context: Context, update: Update) => Promise<A2A.Task>;
  create: (params: Partial<A2A.Task>) => Promise<A2A.Task>;
  has: (id: string) => Promise<boolean>;
}

export interface Cancellations extends Omit<core.Manager<void>, "get"> {
  has: (id: string) => Promise<boolean>;
}
export interface Connections extends Omit<core.Manager<void>, "get"> {}

export interface RequestHandler {
  getTask: (input: A2A.TaskQueryParams, context?: Context) => Promise<A2A.Task>;
  cancelTask: (input: A2A.TaskIdParams, context?: Context) => Promise<A2A.Task>;
  sendMessage: (
    message: A2A.MessageSendParams,
    context?: Context
  ) => Promise<A2A.SendMessageSuccessResult>;
  streamMessage: (
    message: A2A.MessageSendParams,
    context?: Context
  ) => AsyncGenerator<Update>;
  resubscribe: (
    input: A2A.TaskIdParams,
    context?: Context
  ) => AsyncGenerator<Update>;
  getAgentCard: () => Promise<A2A.AgentCard>;
}

export interface ExtendedHandler extends RequestHandler {
  getAuthenticatedExtendedCard: () => Promise<A2A.AgentCard>;
}

export interface Stream {
  readonly contextId: string;
  isAlive: boolean;
  kill: () => Promise<void>;
  updates: Update[];
  context: Context;
  run: (params: { service: Service }) => AsyncGenerator<Update>;
  subscribe: () => AsyncGenerator<Update>;
}

export interface Streams extends Omit<core.Manager<Stream>, "set"> {
  create: (
    params: core.Optional<Stream> & { context: Context }
  ) => Promise<Stream>;
  has: (id: string) => Promise<boolean>;
}

export interface Service
  extends core.Service<{
      engine: Engine;
      context: Context;
    }>,
    RequestHandler {
  readonly events?: Events;
  readonly connections: Connections;
  readonly cancellations: Cancellations;
  readonly tasks: Tasks;
  readonly contexts: Contexts;
  readonly streams: Streams;
  engine: Engine;
  agentCard: A2A.AgentCard;
}

export interface MessageProducer {
  isOpen: boolean;
  send: (message: A2A.MessageSendParams) => Promise<void>;
}

export type MessageMap = {
  message: [A2A.MessageSendParams];
  close: [];
};

export interface MessageConsumer
  extends core.Consumer<A2A.MessageSendParams, MessageMap> {
  message: A2A.MessageSendParams;
  messages: A2A.MessageSendParams[];
  close: () => Promise<void>;
  next: () => Promise<IteratorResult<A2A.MessageSendParams>>;
  return: (
    value: A2A.MessageSendParams
  ) => Promise<IteratorResult<A2A.MessageSendParams>>;
}
export type MessageConsumerProxy = MessageConsumer & A2A.MessageSendParams;

export interface EventConsumer {
  readonly contextId: string;
  readonly onStart?: (context: Context) => Promise<A2A.Task>;
  readonly onCancel: (update: Update, current: A2A.Task) => Promise<void>;
  readonly onUpdate: (update: Update, current: A2A.Task) => Promise<A2A.Task>;
  readonly onError: (error: any, current: A2A.Task) => Promise<void>;
  onComplete: (current: A2A.Task) => Promise<void>;
}

export type Emissions = {
  start: [A2A.MessageSendParams, A2A.Task];
  cancel: [Update];
  update: [A2A.Task, Update];
  error: [any, A2A.Task];
  complete: [A2A.Task];
};

export interface EventPublisher
  extends Omit<
      EventConsumer,
      "onComplete" | "onCancel" | "onError" | "onUpdate"
    >,
    core.Publisher<Emissions> {
  readonly onStart?: (context: Context) => Promise<A2A.Task>;
  readonly onCancel: (update: Update) => Promise<void>;
  readonly onUpdate: (update: Update) => Promise<A2A.Task>;
  readonly onError: (error: any) => Promise<void>;
  onComplete: () => Promise<void>;
}

export interface Events extends core.Manager<EventPublisher> {
  create: (params: core.Optional<EventPublisher>) => Promise<EventPublisher>;
}
export * from "@artinet/types/a2a";
