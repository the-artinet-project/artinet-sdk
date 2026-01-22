/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import serverless from "serverless-http";
import { ServerParams, serve as serveExpress } from "../server.js";
import { logger } from "~/config/index.js";

/**
 * Creates a serverless handler for the given parameters and options.
 * @note Streaming capabilities are currently not supported in serverless handlers.
 * @docs https://github.com/dougmoscrop/serverless-http
 * 
 * @param params - {@link ServerParams}
 * @param options - {@link serverless.Options}
 * @example
 * ```typescript
 * import { Handler } from "aws-lambda";
 * import { serve } from "@a2a-js/sdk/serverless";
 * 
 * const handler: Handler = serve({
 *   agent: cr8("MyAgent")
 *     .text("Hello, world!")
 *     .agent,
 *   basePath: "/a2a",
 * }, { provider: "aws" });
 * ```
 * @returns - {@link serverless.Handler}
 */
export function serve(params: ServerParams, options: serverless.Options): serverless.Handler {
    if(typeof params.agent.agentCard !== "string" && params.agent.agentCard.capabilities?.streaming === true) {
        logger.warn("Streaming capabilities are not supported in serverless handlers");
    }
    const { app } = serveExpress(params);
    return serverless(app, {
        ...options,
        provider: options.provider ?? "aws",
    });
}

/**
 * @deprecated Use `serve` instead.
 */
export const createServerlessHandler = serve;