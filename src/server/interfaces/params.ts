import { CorsOptions } from "cors";
import {
  AgentCard,
  Message,
  SendTaskStreamingRequest,
  Task,
  TaskResubscriptionRequest,
} from "../../types/extended-schema.js";
import { TaskStore } from "./store.js";
import { TaskHandler, TaskContext } from "./context.js";
import jayson from "jayson";
import { ErrorHandler } from "../../utils/common/errors.js";
import { Response } from "express";

export type JSONRPCServerType = jayson.Server;
export const JSONRPCServer = jayson.Server;
type JSONRPCError = jayson.JSONRPCError;

// Define callback type for Jayson
export type JSONRPCCallback = (
  error: JSONRPCError | null,
  result?: any
) => void;

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
  history: Message[]
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
};

/**
 * Parameters for creating an Express server.
 */
export type CreateExpressServerParams = Omit<
  A2AServerParams,
  "createJSONRPCServer" | "taskStore" | "handler"
> &
  Required<
    Pick<A2AServerParams, "card" | "basePath" | "port" | "corsOptions">
  > & {
    rpcServer: JSONRPCServerType;
    errorHandler: ErrorHandler;
    onTaskSendSubscribe: (
      req: SendTaskStreamingRequest,
      res: Response
    ) => Promise<void>;
    onTaskResubscribe: (
      req: TaskResubscriptionRequest,
      res: Response
    ) => Promise<void>;
  };

/**
 * Function type for creating a JSON-RPC server
 * @param params Parameters required to initialize the server
 * @returns A configured JSON-RPC server instance
 */
export type JSONRPCServerFactory = (
  params: CreateJSONRPCServerParams
) => JSONRPCServerType;
