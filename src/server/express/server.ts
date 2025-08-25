/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { INVALID_REQUEST } from "~/utils/index.js";
import { Agent, FactoryParams as CreateAgentParams } from "~/types/index.js";
import { createAgent } from "~/services/index.js";
import cors, { CorsOptions } from "cors";
import { jsonRPCMiddleware } from "./middeware.js";
import { errorHandler } from "./errors.js";

export interface ServerParams {
  app?: express.Express;
  corsOptions?: CorsOptions;
  basePath?: string;
}

function ensureAgent(agentOrParams: Agent | CreateAgentParams): Agent {
  if (
    agentOrParams &&
    typeof agentOrParams === "object" &&
    "agentCard" in agentOrParams &&
    typeof agentOrParams.agentCard === "object" &&
    "sendMessage" in agentOrParams &&
    typeof agentOrParams.sendMessage === "function" &&
    "streamMessage" in agentOrParams &&
    typeof agentOrParams.streamMessage === "function" &&
    "addConnection" in agentOrParams &&
    typeof agentOrParams.addConnection === "function" &&
    "removeConnection" in agentOrParams &&
    typeof agentOrParams.removeConnection === "function" &&
    "getState" in agentOrParams &&
    typeof agentOrParams.getState === "function" &&
    "setState" in agentOrParams &&
    typeof agentOrParams.setState === "function"
  ) {
    return agentOrParams;
  } else if (
    agentOrParams &&
    typeof agentOrParams === "object" &&
    "engine" in agentOrParams &&
    typeof agentOrParams.engine === "function" &&
    "agentCard" in agentOrParams &&
    typeof agentOrParams.agentCard === "object"
  ) {
    return createAgent(agentOrParams as CreateAgentParams);
  }
  throw new Error("invalid agent or params");
}

export function createAgentServer(
  params: ServerParams & {
    agent: Agent | CreateAgentParams;
    agentCardPath?: string;
    register?: boolean;
  }
) {
  const {
    app = express(),
    basePath = "/",
    agentCardPath = "/.well-known/agent-card.json",
    agent,
  } = params;

  const agentInstance = ensureAgent(agent);

  app.use(express.json());
  app.use(cors(params.corsOptions));
  app.get(agentCardPath, (_, res) => {
    res.json(agentInstance.agentCard);
  });
  /**
   * Now that agents are services we can wrap them in any kind of transport layer
   * for express we can use json-rpc, but we could also use websockets, or any other
   * transport layer.
   */
  //a standard express middleware to handle json-rpc requests
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
        return await jsonRPCMiddleware(agentInstance, req, res, next);
      }
      next(INVALID_REQUEST({ data: { message: "Invalid JSON-RPC request" } }));
    }
  );
  app.use(errorHandler);
  /** this is an example of using trpc as express middleware
    app.use(
      `${basePath}`,
      trpcExpress.createExpressMiddleware({
        router: agentRouter,
        createContext: async (ctx: trpcExpress.CreateExpressContextOptions) => {
          return {
            ...ctx,
            service: serviceInstance,
            engine: agent,
          };
        },
      })
    );
   * we could also just use trpc directly or any other transport layer
   */
  return { app, agent: agentInstance };
}

export type ExpressAgentServer = ReturnType<typeof createAgentServer>;
