import * as trpcExpress from "@trpc/server/adapters/express";
import { createAgentRouter } from "../server.js";
import { AgentCard, Message } from "../../../types/index.js";
import express from "express";
import { A2AServiceInterface } from "../protocol/index.js";
import { createA2AService, defaultAgentCard } from "../procs/a2a/service.js";
import { AgentEngine } from "../../../types/index.js";
import { engine as defaultEngine } from "../test-engine.js";
import { CorsOptions } from "cors";
import { TaskManagerInterface } from "../protocol/states/task-manager.js";
import { ContextManagerInterface } from "../protocol/context.js";
import { CancellationManagerInterface } from "../protocol/states/cancellation-manager.js";
import { ConnectionManagerInterface } from "../protocol/states/connection-manager.js";
import { EventManagerOptions } from "../protocol/events/manager.js";
import { TaskAndHistory } from "../../interfaces/store.js";
import cors from "cors";
import { jsonRpcExpressMiddleware } from "./json-rpc-express.js";
import { A2AServiceMethodOptions } from "../procs/a2a/interfaces/service.js";

export interface ExpressServerParams {
  app?: express.Express;
  corsOptions?: CorsOptions;
  basePath?: string;
}

export interface StateManagementParams {
  taskManager?: TaskManagerInterface;
  contextManager?: ContextManagerInterface;
  cancellationManager?: CancellationManagerInterface;
  connectionManager?: ConnectionManagerInterface;
  methods?: Partial<A2AServiceMethodOptions>;
  events?: EventManagerOptions<Message, TaskAndHistory>; //currently not used
}

export interface CreateAgentServerParams<TInfo extends AgentCard = AgentCard>
  extends ExpressServerParams {
  agent: AgentEngine;
  agentInfo: TInfo;
  agentInfoPath?: string;
  service?: A2AServiceInterface | StateManagementParams;
  register?: boolean;
}

export const createAgentServer = <TInfo extends AgentCard = AgentCard>(
  params: CreateAgentServerParams<TInfo>
) => {
  const {
    app = express(),
    basePath = "/",
    agentInfoPath = "/agent-card",
    agentInfo = defaultAgentCard,
    agent = defaultEngine,
  } = params;
  console.log("agentInfoPath", agentInfoPath);
  let serviceParams = params.service;
  let serviceInstance: A2AServiceInterface;

  if (
    serviceParams &&
    ("taskManager" in serviceParams ||
      "contextManager" in serviceParams ||
      "cancellationManager" in serviceParams ||
      "connectionManager" in serviceParams)
  ) {
    serviceInstance = createA2AService({
      agentCard: agentInfo,
      contexts: serviceParams.contextManager,
      connections: serviceParams.connectionManager,
      cancellations: serviceParams.cancellationManager,
      tasks: serviceParams.taskManager,
    });
  } else {
    serviceInstance =
      (serviceParams as A2AServiceInterface) ||
      createA2AService({ agentCard: agentInfo });
  }
  console.log("serviceInstance", serviceInstance);
  const agentRouter = createAgentRouter({});
  app.use(express.json());
  app.use(cors(params.corsOptions));
  app.get(agentInfoPath, (req, res) => {
    res.json(agentInfo);
  });
  // Add JSON-RPC middleware to convert JSON-RPC calls to tRPC procedures
  app.post(
    basePath,
    express.json(),
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { jsonrpc } = req.body;
      if (jsonrpc === "2.0") {
        return await jsonRpcExpressMiddleware(serviceInstance, req, res);
      }
      next();
    }
  );
  app.use(
    `${basePath}`,
    trpcExpress.createExpressMiddleware({
      router: agentRouter,
      createContext: async (ctx: trpcExpress.CreateExpressContextOptions) => {
        console.log("createContext");
        return {
          ...ctx,
          service: serviceInstance,
          engine: agent,
        };
      },
    })
  );
  return { app, service: serviceInstance };
};

export type AgentServer = ReturnType<typeof createAgentServer>;
