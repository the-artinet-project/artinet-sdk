import { AgentCard } from "../../../types/index.js";
import express from "express";
import { A2AServiceInterface } from "../protocol/index.js";
import { createA2AService, defaultAgentCard } from "../procs/a2a/service.js";
import { AgentEngine } from "../../../types/index.js";
import { CorsOptions } from "cors";
import { TaskManagerInterface } from "../protocol/states/task-manager.js";
import { ContextManagerInterface } from "../protocol/context.js";
import { CancellationManagerInterface } from "../protocol/states/cancellation-manager.js";
import { ConnectionManagerInterface } from "../protocol/states/connection-manager.js";
import { EventManagerOptions } from "../protocol/events/manager.js";
import { TaskAndHistory } from "../../../types/interfaces/storage.js";
import cors from "cors";
import { jsonRpcExpressMiddleware } from "./json-rpc-express.js";
import { A2AServiceMethodOptions } from "../procs/a2a/interfaces/service.js";
import { MessageSendParams } from "../../../types/schemas/index.js";
import { errorHandler, INVALID_REQUEST } from "../../../utils/common/errors.js";

export interface ExpressServerParams {
  app?: express.Express;
  corsOptions?: CorsOptions;
  basePath?: string;
}

export interface ServiceBuilder {
  taskManager?: TaskManagerInterface;
  contextManager?: ContextManagerInterface;
  cancellationManager?: CancellationManagerInterface;
  connectionManager?: ConnectionManagerInterface;
  methods?: Partial<A2AServiceMethodOptions>;
  events?: EventManagerOptions<MessageSendParams, TaskAndHistory>; //currently not used
}

export interface CreateAgentServerParams<TInfo extends AgentCard = AgentCard>
  extends ExpressServerParams {
  agent: AgentEngine;
  agentInfo: TInfo;
  agentInfoPath?: string;
  service?: A2AServiceInterface | ServiceBuilder;
  register?: boolean;
}

export const createAgentServer = <TInfo extends AgentCard = AgentCard>(
  params: CreateAgentServerParams<TInfo>
) => {
  const {
    app = express(),
    basePath = "/",
    agentInfoPath = "/.well-known/agent.json",
    agentInfo = defaultAgentCard,
    agent,
  } = params;
  if (!agent) {
    throw new Error("Agent is required");
  }
  // console.log("agentInfoPath", agentInfoPath);
  let serviceParams = params.service;
  let serviceInstance: A2AServiceInterface;

  if (
    serviceParams &&
    ("taskManager" in serviceParams ||
      "contextManager" in serviceParams ||
      "cancellationManager" in serviceParams ||
      "connectionManager" in serviceParams ||
      "methods" in serviceParams)
  ) {
    serviceInstance = createA2AService({
      agentCard: agentInfo,
      agent,
      contexts: serviceParams.contextManager,
      connections: serviceParams.connectionManager,
      cancellations: serviceParams.cancellationManager,
      tasks: serviceParams.taskManager,
      methods: serviceParams.methods,
    });
  } else {
    serviceInstance =
      (serviceParams as A2AServiceInterface) ||
      createA2AService({ agentCard: agentInfo, agent });
  }

  //   const agentRouter = createAgentRouter({});
  app.use(express.json());
  app.use(cors(params.corsOptions));
  app.get(agentInfoPath, (req, res) => {
    res.json(agentInfo);
  });
  /**
   * Now that agents are services we can wrap them in any kind of transport layer
   * for express we can use json-rpc, but we could also use websockets, or any other
   * transport layer.
   */
  //this is an example of using a standard express middleware to handle json-rpc
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
        return await jsonRpcExpressMiddleware(serviceInstance, req, res, next);
      }
      next(INVALID_REQUEST({ data: { message: "Invalid JSON-RPC request" } }));
    }
  );
  app.use(errorHandler);
  //this is an example of using the trpc express middleware
  //   app.use(
  //     `${basePath}`,
  //     trpcExpress.createExpressMiddleware({
  //       router: agentRouter,
  //       createContext: async (ctx: trpcExpress.CreateExpressContextOptions) => {
  //         console.log("createContext");
  //         return {
  //           ...ctx,
  //           service: serviceInstance,
  //           engine: agent,
  //         };
  //       },
  //     })
  //   );
  /**
   * we could also just use trpc directly or any other transport layer
   */
  return { app, service: serviceInstance };
};

export type AgentServer = ReturnType<typeof createAgentServer>;
