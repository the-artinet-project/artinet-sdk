import express, { Response } from "express";
import { CorsOptions } from "cors";
import http from "http";
import util from "util";

import type {
  AgentCard,
  Task,
  Message,
  SendTaskStreamingRequest,
  TaskResubscriptionRequest,
} from "../types/index.js";

import {
  getCurrentTimestamp,
  validateTaskSendParams,
  INVALID_PARAMS,
  TASK_NOT_FOUND,
  INVALID_REQUEST,
  errorHandler,
  CANCEL_UPDATE,
  FINAL_STATES,
  WORKING_UPDATE,
  logDebug,
  register,
  logInfo,
} from "../utils/index.js";

import {
  sendSSEEvent,
  setupSseStream,
  processTaskStream,
} from "../transport/index.js";

import { TaskStore, TaskAndHistory } from "./interfaces/store.js";
import { TaskHandler, TaskContext } from "./interfaces/context.js";
import { A2AServerParams, JSONRPCServerType } from "./interfaces/params.js";
import { Server } from "./interfaces/server.js";

import { defaultCreateJSONRPCServer } from "./lib/json-middleware.js";
import { createExpressServer } from "./lib/express-server.js";
import { updateState, loadState } from "./lib/state.js";
import { InMemoryTaskStore } from "./lib/storage/memory.js";

/**
 * Implements an A2A protocol compliant server using Express.
 * Handles task creation, streaming, cancellation and more.
 * Uses Jayson for JSON-RPC handling.
 */
export class A2AServer implements Server {
  private taskHandler: TaskHandler;
  private taskStore: TaskStore;
  private corsOptions: CorsOptions;
  private basePath: string;
  private port: number;
  private rpcServer: JSONRPCServerType;
  private serverInstance: http.Server | undefined;
  private app: express.Express;
  private fallbackPath: string;
  private register: boolean;
  private activeCancellations: Set<string> = new Set();
  private activeStreams: Map<string, Response[]> = new Map();

  /** The agent card representing this server */
  public card!: AgentCard;

  /**
   * Returns the base path for the server
   */
  getBasePath(): string {
    return this.basePath;
  }

  /**
   * Returns the CORS options for the server
   */
  getCorsOptions(): CorsOptions {
    return this.corsOptions;
  }

  /**
   * Returns the agent card for the server
   */
  getCard(): AgentCard {
    return this.card;
  }

  /**
   * Returns the task store
   */
  getTaskStore(): TaskStore {
    return this.taskStore;
  }

  /**
   * Returns the task handler
   */
  getTaskHandler(): TaskHandler {
    return this.taskHandler;
  }

  /**
   * Returns the set of active cancellations
   */
  getActiveCancellations(): Set<string> {
    return this.activeCancellations;
  }

  /**
   * Returns the map of active streams
   */
  getActiveStreams(): Map<string, Response[]> {
    return this.activeStreams;
  }

  /**
   * Returns the port number
   */
  getPort(): number {
    return this.port;
  }

  /**
   * Returns the JSON-RPC server
   */
  getRpcServer(): JSONRPCServerType {
    return this.rpcServer;
  }

  /**
   * Returns the server instance
   */
  getServerInstance(): http.Server | undefined {
    return this.serverInstance;
  }

  /**
   * Returns the Express app
   */
  getExpressApp(): express.Express {
    return this.app;
  }

  /**
   * Returns a task context for the specified task and messages
   */
  getTaskContext(
    task: Task,
    userMessage: Message,
    history: Message[]
  ): TaskContext {
    return this.createTaskContext(task, userMessage, history);
  }

  /**
   * Returns the default agent card
   */
  defaultAgentCard(): AgentCard {
    return A2AServer.defaultAgentCard();
  }

  /**
   * Creates a new A2AServer.
   * @param handler The task handler function that will process tasks
   * @param options Options for configuring the server
   */
  constructor(params: A2AServerParams) {
    // Store the handler
    this.taskHandler = params.handler;

    // Set up store
    this.taskStore = params.taskStore ?? new InMemoryTaskStore();

    // Configure CORS
    this.corsOptions = params.corsOptions ?? {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    };

    // Set port
    this.port = params.port ?? 41241;

    let basePath = params.basePath ?? "/";

    if (basePath !== "/") {
      basePath = `/${basePath.replace(/^\/|\/$/g, "")}/`;
    }
    this.basePath = basePath;
    // Set up default agent card if not provided
    this.card = params.card ?? A2AServer.defaultAgentCard();

    // Initialize the Jayson server
    this.rpcServer = params.createJSONRPCServer
      ? params.createJSONRPCServer({
          taskStore: this.taskStore,
          card: this.card,
          taskHandler: this.taskHandler,
          activeCancellations: this.activeCancellations,
          createTaskContext: this.createTaskContext.bind(this),
          closeStreamsForTask: this.closeStreamsForTask.bind(this),
        })
      : defaultCreateJSONRPCServer({
          taskStore: this.taskStore,
          card: this.card,
          taskHandler: this.taskHandler,
          activeCancellations: this.activeCancellations,
          createTaskContext: this.createTaskContext.bind(this),
          closeStreamsForTask: this.closeStreamsForTask.bind(this),
        });

    this.fallbackPath = params.fallbackPath ?? "/agent-card";

    const { app } = createExpressServer({
      card: this.card,
      corsOptions: this.corsOptions,
      basePath: this.basePath,
      port: this.port,
      rpcServer: this.rpcServer,
      fallbackPath: this.fallbackPath,
      errorHandler: errorHandler,
      onTaskSendSubscribe: this.handleTaskSendSubscribe.bind(this),
      onTaskResubscribe: this.handleTaskResubscribe.bind(this),
    });
    this.app = app;

    //register your server with the A2A registry on startup
    this.register = params.register ?? false;

    logDebug("A2AServer", "Server initialized", {
      basePath: this.basePath,
      port: this.port,
      corsEnabled: !!this.corsOptions,
    });
  }

  /**
   * Starts the Express server listening on the specified port.
   * @returns The running Express application instance.
   */
  start(): express.Express {
    if (this.serverInstance) {
      throw new Error("Server already started");
    }

    const server = this.app.listen(this.port, () => {
      logInfo("A2AServer", `A2A Server started and listening`, {
        port: this.port,
        path: this.basePath,
      });
    });

    this.serverInstance = server;
    //lazily register your server with the A2A registry on startup
    //this is so that you can start the server without having to wait for registration
    //you can call also call this.registerServer() later to register your server
    if (this.register) {
      this.registerServer();
    }
    return this.app;
  }

  /**
   * Stops the server and closes all connections.
   * @returns A promise that resolves when the server is stopped.
   */
  async stop(): Promise<void> {
    if (!this.serverInstance) {
      return;
    }

    // Close all active streams first
    this.activeStreams.forEach((streams, taskId) => {
      if (streams.length > 0) {
        logDebug("A2AServer", "Closing streams for task during stop", {
          taskId,
        });
        this.closeStreamsForTask(taskId);
      }
    });
    this.activeStreams.clear();

    const closeServer = util
      .promisify(this.serverInstance.close)
      .bind(this.serverInstance);

    try {
      await closeServer();
      logDebug("A2AServer", "Server stopped successfully.");
      this.serverInstance = undefined;
    } catch (err) {
      logDebug("A2AServer", "Error stopping server:", err);
      this.serverInstance = undefined;
      throw err;
    }
  }

  /**
   * Registers the server with the A2A registry.
   * @returns A promise that resolves to the registration ID or an empty string if registration fails.
   */
  public async registerServer(): Promise<string> {
    if (this.card) {
      return await register(this.card);
    }
    return "";
  }

  /**
   * Handles task cancellation
   * @param data Task and history data
   * @param res Response object
   */
  public async onCancel(data: TaskAndHistory, res: Response): Promise<void> {
    const currentData = await updateState(this.taskStore, data, CANCEL_UPDATE);

    // Send the canceled status
    sendSSEEvent(res, {
      id: currentData.task.id,
      status: currentData.task.status,
      final: true,
    });

    this.closeStreamsForTask(currentData.task.id);
  }

  /**
   * Handles cleanup when a task stream ends
   * @param taskId The task ID
   * @param res Response object
   */
  public async onEnd(taskId: string, res: Response): Promise<void> {
    this.activeCancellations.delete(taskId);
    this.removeStreamForTask(taskId, res);
  }

  /**
   * Handles the tasks/sendSubscribe method.
   * @param req The SendTaskRequest object
   * @param res The Express Response object
   */
  public async handleTaskSendSubscribe(
    req: SendTaskStreamingRequest,
    res: Response
  ): Promise<void> {
    validateTaskSendParams(req.params);
    const { id: taskId, message, sessionId, metadata } = req.params;

    // Set up SSE stream with initial status
    setupSseStream(
      res,
      taskId,
      {
        id: taskId,
        status: {
          state: "submitted",
          timestamp: getCurrentTimestamp(),
          message: null,
        },
      },
      this.addStreamForTask.bind(this)
    );

    // Load or create task
    let currentData = await loadState(
      this.taskStore,
      taskId,
      message,
      sessionId,
      metadata
    );

    // Create task context
    const context = this.createTaskContext(
      currentData.task,
      message,
      currentData.history
    );

    currentData = await updateState(
      this.taskStore,
      currentData,
      WORKING_UPDATE
    );

    // Send the working status
    sendSSEEvent(res, {
      id: taskId,
      status: currentData.task.status,
      final: false,
    });

    // Process the task using the shared method
    await processTaskStream(
      this.taskStore,
      this.taskHandler,
      res,
      taskId,
      context,
      currentData,
      this.onCancel.bind(this),
      this.onEnd.bind(this)
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
      throw INVALID_PARAMS();
    }

    // Try to load the task
    const data = await this.taskStore.load(taskId);
    if (!data) {
      throw TASK_NOT_FOUND();
    }

    // Set up SSE stream with current task status
    setupSseStream(
      res,
      taskId,
      {
        id: taskId,
        status: data.task.status,
        final: false,
      },
      this.addStreamForTask.bind(this)
    );

    // Check if task is in final state
    if (FINAL_STATES.includes(data.task.status.state)) {
      // If the task is already complete, send all artifacts and close
      if (data.task.artifacts && data.task.artifacts.length > 0) {
        for (const artifact of data.task.artifacts) {
          sendSSEEvent(res, {
            id: taskId,
            artifact,
            final: true,
          });
        }
      }

      // Remove from tracking and close
      this.removeStreamForTask(taskId, res);
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
      throw INVALID_REQUEST();
    }

    const context = this.createTaskContext(
      data.task,
      lastUserMessage,
      data.history
    );

    // Continue processing the task using the shared method
    await processTaskStream(
      this.taskStore,
      this.taskHandler,
      res,
      taskId,
      context,
      data,
      this.onCancel.bind(this),
      this.onEnd.bind(this)
    );
  }

  /**
   * Adds a response stream to the tracking map for a task.
   * @param taskId The task ID
   * @param res The response stream
   */
  public addStreamForTask(taskId: string, res: Response): void {
    if (!this.activeStreams.has(taskId)) {
      this.activeStreams.set(taskId, []);
    }
    logDebug("A2AServer", "Adding stream for task", {
      taskId,
      activeStreams: this.activeStreams,
    });
    this.activeStreams.get(taskId)?.push(res);
  }

  /**
   * Removes a response stream from the tracking map for a task.
   * @param taskId The task ID
   * @param res The response stream
   */
  public removeStreamForTask(taskId: string, res: Response): void {
    const streams = this.activeStreams.get(taskId);
    if (streams) {
      const index = streams.indexOf(res);
      if (index !== -1) {
        streams.splice(index, 1);
        if (streams.length === 0) {
          logDebug("A2AServer", "Removing stream for task", {
            taskId,
            activeStreams: this.activeStreams,
          });
          this.activeStreams.delete(taskId);
        }
      }
    }
  }

  /**
   * Initializes the default agent card
   */
  public static defaultAgentCard(): AgentCard {
    return {
      name: "A2A Server",
      description: "A general-purpose A2A protocol server",
      version: "0.1.0",
      url: "http://localhost",
      capabilities: {
        streaming: true,
        pushNotifications: false,
        stateTransitionHistory: true,
      },
      skills: [],
    };
  }

  /**
   * Creates a TaskContext object for a task handler.
   * @param task The task
   * @param userMessage The user message
   * @param history The message history
   * @returns A TaskContext object
   */
  public createTaskContext(
    task: Task,
    userMessage: Message,
    history: Message[]
  ): TaskContext {
    return {
      task,
      userMessage,
      history,
      isCancelled: () => this.activeCancellations.has(task.id),
    };
  }

  /**
   * Closes any active streams for a task.
   * @param taskId The task ID
   */
  public closeStreamsForTask(taskId: string): void {
    const streams = this.activeStreams.get(taskId);
    if (streams) {
      // Send close event to all streams
      for (const stream of streams) {
        if (stream.writable) {
          stream.write("event: close\ndata: {}\n\n");
          stream.end();
        }
      }
      this.activeStreams.delete(taskId);
    }
  }
}
