import express from "express";
import {
  ExpressServerInterface,
  ExpressServerOptions,
} from "../../types/express.js";
import http from "http";
import util from "util";
import { CorsOptions } from "cors";
import { logError, logInfo } from "../../utils/logging/log.js";
import { createAgentServer } from "../trpc/servers/express.js";
import { A2AServiceInterface } from "../trpc/protocol/index.js";

/**
 * @deprecated Use the createAgentServer function instead.
 * @description The express server class.
 */
export class ExpressServer implements ExpressServerInterface {
  readonly basePath: string;
  private _serverInstance: http.Server | undefined;
  readonly port: number;
  protected app: express.Express;
  readonly register: boolean;
  readonly corsOptions: CorsOptions;
  readonly service: A2AServiceInterface;
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
    this.port = params.port ?? 41241;

    const { app, service } = createAgentServer({
      app: params.app,
      corsOptions: this.corsOptions,
      basePath: this.basePath,
      agent: params.agent,
      agentInfo: params.agentInfo,
    });
    this.app = app;
    this.service = service;
    this.register = params.register ?? false;
  }

  /**
   * @description Gets the app.
   * @returns {express.Express} The app.
   */
  getApp(): express.Express {
    return this.app;
  }

  /**
   * @description Starts the server.
   * @returns {Promise<http.Server>} The server.
   */
  async start(): Promise<http.Server> {
    if (this._serverInstance) {
      return this._serverInstance;
    }
    this._serverInstance = this.app.listen(this.port, () => {
      logInfo("AgentServer", `Agent Server started and listening`, {
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
      logError("AgentServer", "Error stopping server:", error);
    }
  }
}
