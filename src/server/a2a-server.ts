import express, { Response } from "express";
import { CorsOptions } from "cors";
import http from "http";

import type {
  AgentCard,
  Task,
  Message,
  SendStreamingMessageRequest,
  TaskResubscriptionRequest,
  MessageSendConfiguration,
} from "../types/index.js";
import { logDebug, register } from "../utils/index.js";

import { TaskStore, TaskAndHistory } from "./interfaces/store.js";
import { TaskHandler, TaskContext } from "../types/index.js";
import { A2AServerParams, JSONRPCServerType } from "./interfaces/params.js";
import { Server } from "./interfaces/server.js";

import { ExpressServer } from "./lib/express-server.js";
import { InMemoryTaskStore } from "./lib/storage/memory.js";
import { Protocol } from "../types/services/index.js";
import { A2AService } from "../services/a2a/service.js";

/**
 * @deprecated Use ExpressServer instead.
 * Implements an A2A protocol compliant server using Express.
 * Handles task creation, streaming, cancellation and more.
 * Uses Jayson for JSON-RPC handling.
 */
export class A2AServer implements Server {
  protected expressServer: ExpressServer;
  /**
   * Returns the base path for the server
   */
  getBasePath(): string {
    return this.expressServer.basePath;
  }

  /**
   * Returns the CORS options for the server
   */
  getCorsOptions(): CorsOptions {
    return this.expressServer.corsOptions;
  }

  /**
   * Returns the agent card for the server
   */
  getCard(): AgentCard {
    return this.expressServer.card;
  }

  /**
   * Returns the task store
   */
  getTaskStore(): TaskStore {
    return (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.getTaskStore();
  }

  /**
   * Returns the task handler
   */
  getTaskHandler(): TaskHandler {
    return this.expressServer.engine;
  }

  /**
   * Returns the set of active cancellations
   */
  getActiveCancellations(): Set<string> {
    return (this.expressServer.getService(Protocol.A2A) as A2AService)?.state
      .activeCancellations;
  }

  /**
   * Returns the map of active streams
   */
  getActiveStreams(): Map<string, Response[]> {
    return (this.expressServer.getService(Protocol.A2A) as A2AService)?.state
      .activeStreams;
  }

  /**
   * Returns the port number
   */
  getPort(): number {
    return this.expressServer.port;
  }

  /**
   * Returns the JSON-RPC server
   */
  getRpcServer(): JSONRPCServerType {
    throw new Error("Not implemented");
  }

  /**
   * Returns the server instance
   */
  getServerInstance(): http.Server | undefined {
    return this.expressServer.serverInstance;
  }

  /**
   * Returns the Express app
   */
  getExpressApp(): express.Express {
    return this.expressServer.getApp();
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
    this.expressServer = new ExpressServer({
      card: params.card ?? A2AServer.defaultAgentCard(),
      storage: params.taskStore ?? new InMemoryTaskStore(),
      corsOptions: params.corsOptions,
      basePath: params.basePath,
      port: params.port,
      fallbackPath: params.fallbackPath,
      register: params.register,
      engine: params.handler,
    });

    logDebug("A2AServer", "Server initialized", {
      basePath: this.expressServer.basePath,
      port: this.expressServer.port,
      corsEnabled: !!this.expressServer.corsOptions,
    });
  }

  /**
   * Starts the Express server listening on the specified port.
   * @returns The running Express application instance.
   */
  start(): express.Express {
    if (this.expressServer.serverInstance) {
      throw new Error("Server already started");
    }

    this.expressServer.start();

    //lazily register your server with the A2A registry on startup
    //this is so that you can start the server without having to wait for registration
    //you can call also call this.registerServer() later to register your server
    if (this.expressServer.register) {
      this.registerServer();
    }
    return this.expressServer.getApp();
  }

  /**
   * Stops the server and closes all connections.
   * @returns A promise that resolves when the server is stopped.
   */
  async stop(): Promise<void> {
    if (!this.expressServer.serverInstance) {
      return;
    }

    await this.expressServer.stop();
  }

  /**
   * Registers the server with the A2A registry.
   * @returns A promise that resolves to the registration ID or an empty string if registration fails.
   */
  public async registerServer(): Promise<string> {
    if (this.expressServer.card) {
      return await register(this.expressServer.card);
    }
    return "";
  }

  /**
   * Handles task cancellation
   * @param data Task and history data
   * @param res Response object
   */
  public async onCancel(
    context: TaskContext,
    data: TaskAndHistory,
    res: Response
  ): Promise<void> {
    await (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.onCancel(context, data, res);
  }

  /**
   * Handles cleanup when a task stream ends
   * @param taskId The task ID
   * @param res Response object
   */
  public async onEnd(taskId: string, res: Response): Promise<void> {
    await (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.onEnd(taskId, res);
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
    await (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.handleSendStreamingMessage(req, res);
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
    await (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.handleTaskResubscribe(req, res);
  }

  /**
   * Adds a response stream to the tracking map for a task.
   * @param taskId The task ID
   * @param res The response stream
   */
  public addStreamForTask(taskId: string, res: Response): void {
    (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.addStreamForTask(taskId, res);
  }

  /**
   * Removes a response stream from the tracking map for a task.
   * @param taskId The task ID
   * @param res The response stream
   */
  public removeStreamForTask(taskId: string, res: Response): void {
    (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.removeStreamForTask(taskId, res);
  }

  /**
   * Initializes the default agent card
   */
  public static defaultAgentCard(): AgentCard {
    return {
      protocolVersion: "0.3.0",
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
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"],
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
    history: Message[],
    configuration?: MessageSendConfiguration
  ): TaskContext {
    return (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.createTaskContext(task, userMessage, history, configuration);
  }

  /**
   * Closes any active streams for a task.
   * @param taskId The task ID
   */
  public closeStreamsForTask(taskId: string): void {
    (
      this.expressServer.getService(Protocol.A2A) as A2AService
    )?.state.closeStreamsForTask(taskId);
  }
}
