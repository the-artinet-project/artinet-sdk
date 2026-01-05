/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import express from "express";

import cors, { CorsOptions } from "cors";
import { logger } from "~/config/index.js";
import { native } from "../adapters/a2a_request_handler.js";
import { jsonRpcHandler, UserBuilder } from "@a2a-js/sdk/server/express";
import {
  ServerParams as BaseServerParams,
  ensureAgent,
  registerAgent,
} from "../params.js";

export type ServerParams = BaseServerParams & {
  app?: express.Express;
  corsOptions?: CorsOptions;
};

/**
 * @note Best used with the `cr8` builder.
 * @param {ServerParams} params - The server parameters
 * @returns {ExpressAgentServer} - The express agent server
 * @example
 * ```typescript
 * const { app, agent, start } = serve({
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
  agentInstance.getAgentCard().then((card) => {
    const url = new URL(card.url);
    if (!url.pathname.startsWith(basePath)) {
      logger.warn(
        `AgentCard may be misconfigured: URL pathname ${url.pathname} does not start with base path ${basePath}, this may cause issues with the client.`
      );
    }
  });

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
 * @deprecated Use `cr8.serve` instead.
 */
export const createAgentServer = serve;
export type ExpressAgentServer = ReturnType<typeof serve>;
