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
import { logger } from "~/config/index.js";
import { A2AError, ExtendedAgentCardProvider } from "@a2a-js/sdk/server";
import { formatJson } from "~/utils/common/utils.js";
import { native } from "../adapters/a2a_request_handler.js";
import { jsonRpcHandler, UserBuilder } from "@a2a-js/sdk/server/express";

//TODO: move to index.ts
export interface ServerParams {
  //App will be removed from BaseServerParams in v0.6.0
  app?: express.Express;
  corsOptions?: CorsOptions;
  basePath?: string;
  port?: number;
  /**
   * Your agentCard must have {@link A2A.AgentCard.supportsAuthenticatedExtendedCard} set to true
   */
  extendedAgentCard?: A2A.AgentCard | ExtendedAgentCardProvider;
  agent: Agent | CreateAgentParams;
  agentCardPath?: string;
  register?: boolean;
  userBuilder?: UserBuilder;
}

/**
 * @deprecated Use {@link jsonRpcHandler} instead.
 */
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
/**
 * @note Best used with the `cr8` builder.
 * @param {ServerParams} params - The server parameters
 * @returns {ExpressAgentServer} - The express agent server
 * @example
 * ```typescript
 * const { app, agent, start } = createAgentServer({
 *   agent: cr8("MyAgent")
 *     .text("Hello, world!")
 *     .agent,
 *   basePath: "/a2a",
 * });
 * ```
 */
export function serve({
  app = express(),
  basePath = "/",
  agentCardPath = "/.well-known/agent-card.json",
  agent,
  corsOptions,
  extendedAgentCard,
  register = false,
  port,
  userBuilder = UserBuilder.noAuthentication,
}: ServerParams) {
  const agentInstance = ensureAgent(agent);
  /**
   * Now that agents are services we can wrap them in any kind of transport layer
   * or in express we can use json-rpc, but we could also use websockets, etc
   */

  const router = express.Router();
  router.use(cors(corsOptions));
  if (agentCardPath !== "/.well-known/agent-card.json") {
    // todo: align with emerging multi-agent standards
    router.use(`/.well-known/agent-card.json`, (_, res) => {
      res.json(agentInstance.agentCard);
    });
  }
  router.use(`${agentCardPath}`, (_, res) => {
    // mount at the custom path
    res.json(agentInstance.agentCard);
  });
  // mount at the old agent card path for backwards compatibility
  router.use(`/.well-known/agent.json`, (_, res) => {
    res.json(agentInstance.agentCard);
  });
  router.use(
    jsonRpcHandler({
      requestHandler: native(agentInstance, undefined, extendedAgentCard),
      userBuilder: userBuilder,
    })
  );
  app.use(basePath, router);
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
/**
 * @deprecated Use `cr8.server` instead.
 */
export const createAgentServer = serve;
export type ExpressAgentServer = ReturnType<typeof serve>;
