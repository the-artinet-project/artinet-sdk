import express from "express";
import http from "http";
import { CorsOptions } from "cors";
import { ManagerOptions } from "./services/manager.js";

/**
 * @description The express server options.
 */
export interface ExpressServerOptions extends ManagerOptions {
  /**
   * @description The app.
   * @type {express.Express}
   */
  app?: express.Express;
  /**
   * @description The cors options.
   * @type {CorsOptions}
   */
  corsOptions?: CorsOptions;
  /**
   * @description The base path.
   * @type {string}
   */
  basePath?: string;
  /**
   * @description The fallback path.
   * @type {string}
   */
  fallbackPath?: string;
  /**
   * @description The register.
   * @type {boolean}
   */
  register?: boolean;
  /**
   * @description The port.
   * @type {number}
   */
  port?: number;
}

/**
 * @description The express server interface.
 */
export interface ExpressServerInterface {
  /**
   * @description Gets the app.
   * @returns {express.Express} The app.
   */
  getApp(): express.Express;
  /**
   * @description Starts the server.
   * @returns {Promise<http.Server>} The server.
   */
  start(): Promise<http.Server>;
  /**
   * @description Stops the server.
   */
  stop(): Promise<void>;
}
