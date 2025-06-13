import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { CreateExpressServerParams } from "../interfaces/params.js";
import { ServiceManager } from "../../services/manager.js";
import {
  ExpressServerInterface,
  ExpressServerOptions,
} from "../../types/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { Protocol } from "../../types/services/protocol.js";
import { v4 as uuidv4 } from "uuid";
import http from "http";
import util from "util";
import { CorsOptions } from "cors";
import { logError, logInfo } from "../../utils/logging/log.js";
import { INVALID_REQUEST, PARSE_ERROR } from "../../utils/common/errors.js";

/**
 * @deprecated Use ExpressServer instead.
 * @description Creates an Express server for the A2A protocol.
 * Handles task creation, streaming, cancellation and more.
 * Uses Jayson for JSON-RPC handling.
 */
export function createExpressServer(params: CreateExpressServerParams): {
  app: express.Express;
} {
  const {
    card,
    corsOptions,
    basePath,
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
          if (body.method === "message/stream") {
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

  return { app };
}

/**
 * @description The express server class.
 */
export class ExpressServer
  extends ServiceManager
  implements ExpressServerInterface
{
  readonly basePath: string;
  readonly fallbackPath: string;
  private _serverInstance: http.Server | undefined;
  readonly port: number;
  protected app: express.Express;
  readonly register: boolean;
  readonly corsOptions: CorsOptions;
  private initialized: boolean = false;

  /**
   * @description Gets the server instance.
   * @returns {http.Server | undefined} The server instance.
   */
  get serverInstance(): http.Server | undefined {
    return this._serverInstance;
  }

  /**
   * @description The constructor.
   * @param {ExpressServerOptions} params The express server options.
   */
  constructor(params: ExpressServerOptions) {
    super(params);
    this.corsOptions = params.corsOptions ?? {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    let basePath = params.basePath ?? "/";

    if (basePath !== "/") {
      basePath = `/${basePath.replace(/^\/|\/$/g, "")}/`;
    }

    this.basePath = basePath;

    this.fallbackPath = params.fallbackPath ?? "/agent-card";

    this.port = params.port ?? 41241;

    this.app = params.app ?? express();

    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());

    this.register = params.register ?? false;
  }

  /**
   * @description Registers the routes.
   * @param {StreamableHTTPServerTransport} transport The mcp transport.
   */
  registerRoutes(
    transport?: StreamableHTTPServerTransport,
    atBasePath?: boolean
  ): void {
    this.app.get(`/.well-known/agent.json`, (_, res) => {
      res.json(this.getCard());
    });
    this.app.get(this.fallbackPath, (_, res) => {
      res.json(this.getCard());
    });
    for (const service of Object.values(this.services)) {
      const path = atBasePath
        ? `${this.basePath}`
        : this.basePath === "/"
          ? `/${service.protocol}`
          : `${this.basePath}${service.protocol}`;
      this.app.get(
        path,
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            const { id, method, params, jsonrpc } = req.body;
            if (jsonrpc !== "2.0") {
              res.status(400).json({ error: "Invalid JSON-RPC version" });
              return;
            }
            const context = this.createRequestContext({
              id,
              protocol: service.protocol,
              method,
              params: {
                ...params,
                protocol: service.protocol,
              },
              request: req,
              response: res,
              transport:
                service.protocol === Protocol.MCP
                  ? transport
                    ? transport
                    : new StreamableHTTPServerTransport({
                        sessionIdGenerator: () => uuidv4(),
                      })
                  : undefined,
            });
            return await this.onRequest(context).catch((error) => {
              res.status(500).json({ id, error: error.message });
            });
          } catch (error) {
            console.error("Error in GET", error);
            next(error);
          }
        }
      );

      this.app.post(
        path,
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          try {
            const { id, method, params, jsonrpc } = req.body;
            if (jsonrpc !== "2.0") {
              res.status(200).send({
                jsonrpc: "2.0",
                id: id,
                error: INVALID_REQUEST({
                  jsonrpc: jsonrpc,
                  data: req.body,
                }),
              });
              return;
            }
            const context = this.createRequestContext({
              id,
              protocol: service.protocol,
              method,
              params: {
                ...params,
                protocol: service.protocol,
              },
              request: req,
              response: res,
              transport:
                service.protocol === Protocol.MCP
                  ? transport
                    ? transport
                    : new StreamableHTTPServerTransport({
                        sessionIdGenerator: () => uuidv4(),
                      })
                  : undefined,
            });
            return await this.onRequest(context).catch((error) => {
              res.status(500).json({ error: error.message });
            });
          } catch (error) {
            console.error("Error in POST", error);
            next(error);
          }
        }
      );

      this.app.delete(path, async (_, res: express.Response) => {
        res.status(500).json({ error: "Not implemented" });
      });
    }
    this.initialized = true;
  }

  /**
   * @description Gets the app.
   * @returns {express.Express} The app.
   */
  getApp(): express.Express {
    if (!this.initialized) {
      this.registerRoutes();
    }
    return this.app;
  }

  /**
   * @description Starts the server.
   * @returns {Promise<http.Server>} The server.
   */
  async start(): Promise<http.Server> {
    if (!this.initialized) {
      this.registerRoutes();
    }
    if (this._serverInstance) {
      return this._serverInstance;
    }
    this._serverInstance = this.app.listen(this.port, () => {
      logInfo("ExpressServer", `Express Server started and listening`, {
        port: this.port,
        path: this.basePath,
      });
    });
    return this._serverInstance;
  }

  /**
   * @description Stops the server.
   */
  async stop(): Promise<void> {
    await super.destroy();
    if (!this._serverInstance) {
      return;
    }
    try {
      const closeServer = util
        .promisify(this._serverInstance.close)
        .bind(this._serverInstance);
      await closeServer();
      this._serverInstance = undefined;
    } catch (error) {
      this._serverInstance = undefined;
      logError("ExpressServer", "Error stopping server:", error);
    }
  }
}
