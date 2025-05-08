import express, { Response } from "express";
import http from "http";
import { CorsOptions } from "cors";

import {
  AgentCard,
  Message,
  Task,
  SendTaskStreamingRequest,
  TaskResubscriptionRequest,
} from "../../types/index.js";

import { TaskStore } from "./store.js";
import { TaskHandler } from "./context.js";
import { JSONRPCServerType } from "./params.js";
import { TaskAndHistory } from "./store.js";
import { TaskContext } from "./context.js";

export interface Server {
  start(): express.Express;
  stop(): Promise<void>;
  registerServer(): Promise<string>;
  getBasePath(): string;
  getCorsOptions(): CorsOptions;
  getCard(): AgentCard;
  getTaskStore(): TaskStore;
  getTaskHandler(): TaskHandler;
  getActiveCancellations(): Set<string>;
  getActiveStreams(): Map<string, Response[]>;
  getPort(): number;
  getRpcServer(): JSONRPCServerType;
  getExpressApp(): express.Express;
  getServerInstance(): http.Server | undefined;
  getTaskContext(
    task: Task,
    userMessage: Message,
    history: Message[]
  ): TaskContext;
  onCancel(data: TaskAndHistory, res: Response): Promise<void>;
  onEnd(taskId: string, res: Response): Promise<void>;
  addStreamForTask(taskId: string, res: Response): void;
  removeStreamForTask(taskId: string, res: Response): void;
  closeStreamsForTask(taskId: string): void;
  handleTaskSendSubscribe(
    req: SendTaskStreamingRequest,
    res: Response
  ): Promise<void>;
  handleTaskResubscribe(
    req: TaskResubscriptionRequest,
    res: Response
  ): Promise<void>;
  defaultAgentCard(): AgentCard;
  createTaskContext(
    task: Task,
    userMessage: Message,
    history: Message[]
  ): TaskContext;
}
