import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { logInfo } from "../../utils/logging/log.js";
import http from "http";
import { CreateExpressServerParams } from "../interfaces/params.js";

/**
 * Creates an Express server for the A2A protocol.
 * Handles task creation, streaming, cancellation and more.
 * Uses Jayson for JSON-RPC handling.
 */
export function createExpressServer(params: CreateExpressServerParams): {
  app: express.Express;
  server: http.Server;
} {
  const {
    card,
    corsOptions,
    basePath,
    port,
    rpcServer,
    fallbackPath,
    errorHandler,
    onTaskSendSubscribe,
    onTaskResubscribe,
  } = params;
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.get("/.well-known/agent.json", (_, res) => {
    res.json(card);
  });

  app.get(fallbackPath, (_, res) => {
    res.json(card);
  });

  //SSE Paths
  app.post(
    basePath,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = req.body;
        if (body && body.method) {
          if (body.method === "tasks/sendSubscribe") {
            return await onTaskSendSubscribe(body, res);
          } else if (body.method === "tasks/resubscribe") {
            return await onTaskResubscribe(body, res);
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    }
  );

  //RPC server
  app.post(basePath, rpcServer.middleware());

  // Fallback error handler
  app.use(errorHandler);

  // Start listening
  const server = app.listen(port, () => {
    logInfo("A2AServer", `A2A Server started and listening`, {
      port,
      path: basePath,
    });
  });

  return { app, server };
}
