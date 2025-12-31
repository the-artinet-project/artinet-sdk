/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { A2A } from "~/types/index.js";
import { Agent } from "~/services/a2a/index.js";
import {
  createAgent,
  ServiceParams as CreateAgentParams,
  Service,
} from "~/services/index.js";
import cors, { CorsOptions } from "cors";
import { jsonRPCMiddleware } from "./middeware.js";
import { errorHandler } from "./errors.js";
import { logger } from "~/config/index.js";
import { A2AError } from "@a2a-js/sdk/server";
import { formatJson } from "~/utils/common/utils.js";

export interface ServerParams {
  app?: express.Express;
  corsOptions?: CorsOptions;
  basePath?: string;
  port?: number;
  /**
   * Your agentCard must have supportsAuthenticatedExtendedCard set to true
   */
  extendedAgentCard?: A2A.AgentCard;
  agent: Agent | CreateAgentParams;
  agentCardPath?: string;
  register?: boolean;
}

export function rpcParser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  express.json()(req, res, (err) => {
    if (!req.body || typeof req.body !== "object") {
      return next(
        A2AError.parseError(`Invalid request body: ${formatJson(req.body)}`)
      );
    }
    if (err) {
      if (
        err instanceof SyntaxError &&
        "status" in err &&
        err.status === 400 &&
        "body" in err
      ) {
        return next(
          A2AError.parseError(`Invalid request body: ${formatJson(req.body)}`)
        );
      }
      return next(err);
    }
    next();
  });
}

const isParams = (
  agentOrParams: Agent | CreateAgentParams
): agentOrParams is CreateAgentParams => {
  return (
    agentOrParams &&
    typeof agentOrParams === "object" &&
    "engine" in agentOrParams &&
    typeof agentOrParams.engine === "function" &&
    "agentCard" in agentOrParams &&
    typeof agentOrParams.agentCard === "object"
  );
};

const ensureAgent = (agentOrParams: Agent | CreateAgentParams): Agent => {
  if (agentOrParams instanceof Service) {
    return agentOrParams;
  } else if (isParams(agentOrParams)) {
    return createAgent(agentOrParams);
  }
  throw new Error("invalid agent or params");
};

const registerAgent = async (agentCard: A2A.AgentCard) => {
  logger.debug("registerAgent: not implemented", { agentCard });
  return Promise.resolve(agentCard);
};

export function createAgentServer({
  app = express(),
  basePath = "/",
  agentCardPath = "/.well-known/agent-card.json",
  agent,
  corsOptions,
  extendedAgentCard,
  register = false,
  port,
}: ServerParams) {
  const agentInstance = ensureAgent(agent);
  app.use(cors(corsOptions));
  if (agentCardPath !== "/.well-known/agent-card.json") {
    // mount at the root for compliance with RFC8615 standard
    // todo: align with emerging multi-agent standards
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
      if (jsonrpc !== "2.0") {
        return next(A2AError.invalidRequest("Invalid JSON-RPC request"));
      }
      return await jsonRPCMiddleware(
        agentInstance,
        req,
        res,
        next,
        extendedAgentCard
      );
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
  const start = (_port?: number) => {
    try {
      const listenPort = _port ?? port;
      const server = app.listen(listenPort, () => {
        logger.info(`Agent server started on port ${listenPort}`);
      });

      if (register) {
        registerAgent(agentInstance.agentCard);
      }
      return server;
    } catch (error) {
      logger.error(`Failed to start agent server`, error);
      throw error;
    }
  };
  return { app, agent: agentInstance, start };
}

export type ExpressAgentServer = ReturnType<typeof createAgentServer>;
