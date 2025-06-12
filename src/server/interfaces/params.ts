import { CorsOptions } from "cors";

import {
  A2AResponse,
  AgentCard,
  CancelTaskRequest,
  CancelTaskResponse,
  GetTaskPushNotificationConfigRequest,
  GetTaskPushNotificationConfigResponse,
  GetTaskRequest,
  GetTaskResponse,
  Message,
  SendMessageRequest,
  SendMessageResponse,
  SendStreamingMessageRequest,
  SetTaskPushNotificationConfigRequest,
  SetTaskPushNotificationConfigResponse,
  Task,
  TaskResubscriptionRequest,
  MessageSendConfiguration,
  A2ARequest,
} from "../../types/extended-schema.js";

import { TaskStore } from "./store.js";
import { TaskHandler, TaskContext } from "../../types/index.js";

import jayson from "jayson";

import { ErrorHandler } from "../../utils/common/errors.js";
import { JSONRPCError } from "../../types/extended-schema.js";

import { Response } from "express";

export type JSONRPCServerType = jayson.Server;
export const JSONRPCServer = jayson.Server;

export type JSONRPCCallback<Res = A2AResponse | Task | null> = (
  error: JSONRPCError | null,
  result?: Res
) => void;

/**
 * Function type for creating a JSON-RPC server
 * @param params Parameters required to initialize the server
 * @returns A configured JSON-RPC server instance
 */
export type JSONRPCServerFactory = (
  params: CreateJSONRPCServerParams
) => JSONRPCServerType;

/**
 * Function type for creating a JSON-RPC Method
 * @param params Parameters required to initialize the server
 * @returns A configured JSON-RPC server instance
 */
export type JSONRPCMethodHandler<Params, Result> = (
  requestParams: Params,
  callback: JSONRPCCallback<Result>
) => Promise<void>;

/**
 * Type for the ActiveCancellations set
 * This can be used by consumers to implement their own server solutions
 */
export type ActiveCancellations = Set<string>;

/**
 * Type for the CloseStreamsForTask function
 * This can be used by consumers to implement their own server solutions
 */
export type CloseStreamsForTask = (taskId: string) => void;

/**
 * Type for the CreateTaskContext function
 * This can be used by consumers to implement their own server solutions
 */
export type CreateTaskContext = (
  task: Task,
  message: Message,
  history: Message[],
  configuration?: MessageSendConfiguration
) => TaskContext;

/**
 * Type for the createJSONRPCServer function
 * This can be used by consumers to implement their own server solutions
 */
export type CreateJSONRPCServer = (
  params: CreateJSONRPCServerParams
) => JSONRPCServerType;

/**
 * Interface for createJSONRPCServer parameters
 * This can be used by consumers to implement their own server solutions
 */
export interface CreateJSONRPCServerParams {
  taskStore: TaskStore;
  card: AgentCard;
  taskHandler: TaskHandler;
  activeCancellations: ActiveCancellations;
  createTaskContext: CreateTaskContext;
  closeStreamsForTask: CloseStreamsForTask;
}

/**
 * Parameters for creating an A2AServer instance.
 */
export type A2AServerParams = {
  handler: TaskHandler;
  corsOptions?: CorsOptions;
  port?: number;
  basePath?: string;
  taskStore?: TaskStore;
  card?: AgentCard;
  createJSONRPCServer?: JSONRPCServerFactory;
  fallbackPath?: string;
  register?: boolean;
};

/**
 * Parameters for creating an Express server.
 */
export type CreateExpressServerParams = Omit<
  A2AServerParams,
  "createJSONRPCServer" | "taskStore" | "handler" | "register"
> &
  Required<
    Pick<
      A2AServerParams,
      "card" | "basePath" | "port" | "corsOptions" | "fallbackPath"
    >
  > & {
    rpcServer: JSONRPCServerType;
    errorHandler: ErrorHandler;
    onTaskSendSubscribe: (
      req: SendStreamingMessageRequest,
      res: Response
    ) => Promise<void>;
    onTaskResubscribe: (
      req: TaskResubscriptionRequest,
      res: Response
    ) => Promise<void>;
  };
/**
 * Type for the A2AMethodHandler function
 * This can be used by consumers to implement their own server solutions
 */
export type A2AMethodHandler<
  RequestParamT extends A2ARequest["params"],
  Result extends A2AResponse | Message | Task | null,
> = (
  deps: CreateJSONRPCServerParams,
  requestParams: RequestParamT,
  callback: JSONRPCCallback<Result>
) => Promise<void>;

/**
 * Type for the SendTaskMethod function
 * This can be used by consumers to implement their own server solutions
 */
export type SendTaskMethod = A2AMethodHandler<
  SendMessageRequest["params"],
  SendMessageResponse | Message | Task | null
>;

/**
 * Type for the GetTaskMethod function
 * This can be used by consumers to implement their own server solutions
 */
export type GetTaskMethod = A2AMethodHandler<
  GetTaskRequest["params"],
  GetTaskResponse | Task | null
>;

/**
 * Type for the CancelTaskMethod function
 * This can be used by consumers to implement their own server solutions
 */
export type CancelTaskMethod = A2AMethodHandler<
  CancelTaskRequest["params"],
  CancelTaskResponse | Task | null
>;

/**
 * Type for the SetTaskPushNotificationMethod function
 * This can be used by consumers to implement their own server solutions
 */
export type SetTaskPushNotificationMethod = A2AMethodHandler<
  SetTaskPushNotificationConfigRequest["params"],
  SetTaskPushNotificationConfigResponse | null
>;

/**
 * Type for the GetTaskPushNotificationMethod function
 * This can be used by consumers to implement their own server solutions
 */
export type GetTaskPushNotificationMethod = A2AMethodHandler<
  GetTaskPushNotificationConfigRequest["params"],
  GetTaskPushNotificationConfigResponse | null
>;
