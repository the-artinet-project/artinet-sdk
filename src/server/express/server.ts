/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { INVALID_REQUEST, PARSE_ERROR } from "~/utils/index.js";
import {
  Agent,
  AgentCard,
  FactoryParams as CreateAgentParams,
} from "~/types/index.js";
import { createAgent } from "~/services/index.js";
import cors, { CorsOptions } from "cors";
import { jsonRPCMiddleware } from "./middeware.js";
import { errorHandler } from "./errors.js";

export interface ServerParams {
  app?: express.Express;
  corsOptions?: CorsOptions;
  basePath?: string;
  /* Your agentCard must have supportsAuthenticatedExtendedCard set to true */
  extendedAgentCard?: AgentCard;
}

function rpcParser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  express.json()(req, res, (err) => {
    if (err) {
      if (
        err instanceof SyntaxError &&
        "status" in err &&
        err.status === 400 &&
        "body" in err
      ) {
        return next(
          PARSE_ERROR({
            data: err.message,
          })
        );
      }
      return next(err);
    }
    next();
  });
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
  app.use(cors(params.corsOptions));
  if (agentCardPath !== "/.well-known/agent-card.json") {
    // mount at the root for compliance with RFC8615 standard
    app.use("/.well-known/agent-card.json", (_, res) => {
      res.json(agentInstance.agentCard);
    });
  }
  app.use(agentCardPath, (_, res) => {
    // mount at the custom path
    res.json(agentInstance.agentCard);
  });
  // mount at the old agent card path for backwards compatibility
  app.use("/.well-known/agent.json", (_, res) => {
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
    rpcParser,
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { jsonrpc } = req.body;
      if (jsonrpc === "2.0") {
        return await jsonRPCMiddleware(
          agentInstance,
          req,
          res,
          next,
          params.extendedAgentCard
        );
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
   * we could also use trpc directly or any other transport layer
   */
  return { app, agent: agentInstance };
}

export type ExpressAgentServer = ReturnType<typeof createAgentServer>;
