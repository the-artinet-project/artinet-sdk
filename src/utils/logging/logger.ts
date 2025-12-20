/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { ILogger } from "./observability.js";
import { logger } from "../../config/index.js";
import { applyDefaults } from "../../config/default.js";
/**
 * Configures the logger with the specified options
 * @deprecated Use configure() instead
 * @param options - Logger configuration options
 */
export function configureLogger(options: {
  level?: ILogger["level"];
  name?: string;
  prettyPrint?: boolean; //deprecated
}) {
  applyDefaults({
    logger: {
      level: options.level || "silent",
    } as ILogger,
  });
  return logger;
}
configureLogger({ level: "silent" });
