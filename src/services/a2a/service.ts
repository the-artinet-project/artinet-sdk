import {
  defaultCancelTaskMethod,
  createJSONRPCMethod,
  defaultGetTaskPushNotificationMethod,
  defaultSetTaskPushNotificationMethod,
  defaultGetTaskMethod,
  defaultSendTaskMethod,
  CreateJSONRPCServerParams,
  JSONRPCCallback,
} from "../../server/index.js";
import {
  Task,
  Message,
  TaskResubscriptionRequest,
  SendStreamingMessageRequest,
  SendMessageRequest,
  SendMessageResponse,
  A2ARequest,
  A2AResponse,
  GetTaskRequest,
  CancelTaskRequest,
  SetTaskPushNotificationConfigRequest,
  GetTaskPushNotificationConfigRequest,
  TaskState,
  TaskArtifactUpdateEvent,
} from "../../types/index.js";
import {
  AgentEngine,
  ExecutionContext,
  A2AExecutionContext,
} from "../../types/services/context.js";
import { Protocol } from "../../types/services/protocol.js";
import { Response } from "express";
import { loadState, processUpdate } from "../../server/lib/state.js";
import {
  FINAL_STATES,
  getCurrentTimestamp,
  INVALID_PARAMS,
  INVALID_REQUEST,
  METHOD_NOT_FOUND,
  TASK_NOT_FOUND,
  validateSendMessageParams,
  WORKING_UPDATE,
} from "../../utils/index.js";
import { processTaskStream } from "../../transport/streaming/stream.js";
import { sendSSEEvent, setupSseStream } from "../../index.js";
import { A2ARepositoryParams } from "../../types/services/a2a/repository.js";
import { A2AServiceInterface } from "../../types/services/a2a/service.js";
import { A2ARepository } from "./repository.js";

export class A2AService implements A2AServiceInterface {
  readonly name: string = "a2a";
  readonly protocol: Protocol = Protocol.A2A;
  readonly engine: AgentEngine;
  readonly state: A2ARepository;

  constructor(params: A2ARepositoryParams & { engine: AgentEngine }) {
    this.engine = params.engine;
    this.state = new A2ARepository(params);
  }

  /**
   * Handles the message/stream method.
   * @param req The SendTaskRequest object
   * @param res The Express Response object
   */
  public async handleTaskSendSubscribe(
    req: SendStreamingMessageRequest,
    res: Response
  ): Promise<void> {
    validateSendMessageParams(req.params);
    const { message, metadata } = req.params;
    if (!message.taskId) {
      throw INVALID_PARAMS("Missing task ID");
    }
    const taskId = message.taskId;
    let contextId = message.contextId ?? "unknown";

    const executionContext: ExecutionContext<
      A2AExecutionContext<SendStreamingMessageRequest>
    > = {
      id: taskId,
      protocol: Protocol.A2A,
      getRequestParams: () => req.params,
      isCancelled: () => this.state.getActiveCancellations().has(taskId),
    };

    // Set up SSE stream with initial status
    setupSseStream(
      res,
      taskId,
      {
        taskId: taskId,
        contextId: contextId,
        kind: "status-update",
        status: {
          state: TaskState.Submitted,
          timestamp: getCurrentTimestamp(),
        },
        final: false,
      },
      this.state.addStreamForTask.bind(this)
    );

    // Load or create task
    let currentData = await loadState(
      this.state.getTaskStore(),
      message,
      metadata,
      taskId,
      contextId
    );

    // Create task context
    const context = this.state.createTaskContext(
      currentData.task,
      message,
      currentData.history
    );

    contextId = currentData.task.contextId || contextId;
    const workingUpdate = WORKING_UPDATE(taskId, contextId);
    currentData = await processUpdate(this.state.getTaskStore(), {
      context: context,
      current: currentData,
      update: workingUpdate,
    });

    // Send the working status
    sendSSEEvent(res, currentData.task.id, workingUpdate);

    // Process the task using the shared method
    await processTaskStream(
      context,
      this.state.getTaskStore(),
      this.engine,
      res,
      taskId,
      currentData,
      this.state.onCancel.bind(this),
      this.state.onEnd.bind(this),
      executionContext
    );
  }

  /**
   * Handles the tasks/resubscribe method.
   * @param req The TaskResubscriptionRequest object
   * @param res The Express Response object
   */
  public async handleTaskResubscribe(
    req: TaskResubscriptionRequest,
    res: Response
  ): Promise<void> {
    const { id: taskId } = req.params;
    if (!taskId) {
      console.error("Task ID is required", req);
      throw INVALID_PARAMS("Missing task ID");
    }

    const executionContext: ExecutionContext<
      A2AExecutionContext<TaskResubscriptionRequest>
    > = {
      id: taskId,
      protocol: Protocol.A2A,
      getRequestParams: () => req.params,
      isCancelled: () => this.state.getActiveCancellations().has(taskId),
    };

    // Try to load the task
    const data = await this.state.getTaskStore().load(taskId);
    if (!data) {
      throw TASK_NOT_FOUND("Task Id: " + taskId);
    }

    // Set up SSE stream with current task status
    setupSseStream(
      res,
      taskId,
      {
        taskId: taskId,
        contextId: data.task.contextId || "unknown",
        kind: "status-update",
        status: data.task.status,
        final: false,
        metadata: data.task.metadata,
      },
      this.state.addStreamForTask.bind(this)
    );

    // Check if task is in final state
    if (FINAL_STATES.includes(data.task.status.state)) {
      // If the task is already complete, send all artifacts and close
      if (data.task.artifacts && data.task.artifacts.length > 0) {
        for (const artifact of data.task.artifacts) {
          const response: TaskArtifactUpdateEvent = {
            taskId: taskId,
            contextId: data.task.contextId || "unknown",
            kind: "artifact-update",
            artifact,
            lastChunk: true,
            metadata: data.task.metadata,
          };
          sendSSEEvent(res, taskId, response);
        }
      }

      // Remove from tracking and close
      this.state.removeStreamForTask(taskId, res);
      res.write("event: close\ndata: {}\n\n");
      res.end();
      return;
    }

    // For non-final states, create context and continue processing
    // We need to use the last user message as the current message
    const lastUserMessage = data.history
      .filter((msg) => msg.role === "user")
      .pop();
    if (!lastUserMessage) {
      throw INVALID_REQUEST("No user message found");
    }

    const context = this.state.createTaskContext(
      data.task,
      lastUserMessage,
      data.history
    );

    // Continue processing the task using the shared method
    await processTaskStream(
      context,
      this.state.getTaskStore(),
      this.engine,
      res,
      taskId,
      data,
      this.state.onCancel.bind(this),
      this.state.onEnd.bind(this),
      executionContext
    );
  }

  /**
   * Executes a method on the A2A service.
   * @param executionContext The execution context.
   * @param engine The agent engine.
   */
  async execute({
    executionContext,
    engine,
  }: {
    executionContext: ExecutionContext<A2AExecutionContext>;
    engine: AgentEngine;
  }): Promise<void> {
    if (!executionContext.requestContext) {
      throw INVALID_REQUEST({
        message: "Invalid request",
        data: {
          method: "unknown",
          params: executionContext.getRequestParams(),
        },
      });
    }
    if (!executionContext.requestContext?.method) {
      throw METHOD_NOT_FOUND({ method: "unknown" });
    }
    let closeConnection = false;
    const callback = (error: any, result: any) => {
      if (error) {
        executionContext.requestContext?.response.status(500).send({
          jsonrpc: "2.0",
          id: executionContext.id,
          error: error,
        });
        closeConnection = true;
      } else {
        executionContext.requestContext?.response.send({
          jsonrpc: "2.0",
          id: executionContext.id,
          result,
        });
      }
      if (closeConnection) {
        executionContext.requestContext?.response.end();
      }
    };
    switch (executionContext.requestContext?.method) {
      case "message/send":
      case "tasks/get":
      case "tasks/cancel":
      case "tasks/pushNotificationConfig/set":
      case "tasks/pushNotificationConfig/get":
        closeConnection = true;
        return await A2AService.dispatchMethod(
          executionContext.requestContext.method,
          executionContext.requestContext.params,
          callback,
          {
            taskStore: this.state.getTaskStore(),
            card: this.state.getCard(),
            taskHandler: engine,
            activeCancellations: this.state.getActiveCancellations(),
            createTaskContext: this.state.createTaskContext.bind(this),
            closeStreamsForTask: this.state.closeStreamsForTask.bind(this),
          }
        );
      case "message/stream": //todo make the following functions leverage callback
        return await this.handleTaskSendSubscribe(
          executionContext.requestContext.request,
          executionContext.requestContext.response
        ).catch((error) => {
          closeConnection = true;
          callback(error, null);
        });
      case "tasks/resubscribe":
        return await this.handleTaskResubscribe(
          executionContext.requestContext.request,
          executionContext.requestContext.response
        ).catch((error) => {
          closeConnection = true;
          callback(error, null);
        });
      default:
        callback(
          METHOD_NOT_FOUND({ method: executionContext.requestContext?.method }),
          null
        );
        break;
    }
  }

  /**
   * Dispatches a method to the A2A service.
   * @param method The method to dispatch.
   * @param params The parameters to dispatch.
   * @param callback The callback to dispatch.
   * @param deps The dependencies to dispatch.
   */
  static async dispatchMethod<T extends A2ARequest>(
    method: T["method"],
    params: T["params"],
    callback: JSONRPCCallback<A2AResponse | Task | Message | null>,
    deps: CreateJSONRPCServerParams
  ) {
    switch (method) {
      case "message/send":
        return await createJSONRPCMethod<
          SendMessageRequest["params"],
          SendMessageResponse | Task | Message | null
        >(
          deps,
          defaultSendTaskMethod,
          method
        )(params as SendMessageRequest["params"], callback);
      case "tasks/get":
        return await createJSONRPCMethod(
          deps,
          defaultGetTaskMethod,
          method
        )(params as GetTaskRequest["params"], callback);
      case "tasks/cancel":
        return await createJSONRPCMethod(
          deps,
          defaultCancelTaskMethod,
          method
        )(params as CancelTaskRequest["params"], callback);
      case "tasks/pushNotificationConfig/set":
        return await createJSONRPCMethod(
          deps,
          defaultSetTaskPushNotificationMethod,
          method
        )(params as SetTaskPushNotificationConfigRequest["params"], callback);
      case "tasks/pushNotificationConfig/get":
        return await createJSONRPCMethod(
          deps,
          defaultGetTaskPushNotificationMethod,
          method
        )(params as GetTaskPushNotificationConfigRequest["params"], callback);
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }
}
