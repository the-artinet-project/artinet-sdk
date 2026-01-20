import serverless from "serverless-http";
import { ServerParams, serve } from "../server.js";
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
 * import { createServerlessHandler } from "@a2a-js/sdk/serverless";
 * 
 * const handler: Handler = createServerlessHandler({
 *   agent: cr8("MyAgent")
 *     .text("Hello, world!")
 *     .agent,
 *   basePath: "/a2a",
 * }, { provider: "aws" });
 * ```
 * @returns - {@link serverless.Handler}
 */
export function createServerlessHandler(params: ServerParams, options: serverless.Options): serverless.Handler {
    if(typeof params.agent.agentCard !== "string" && params.agent.agentCard.capabilities?.streaming) {
        logger.warn("Streaming capabilities are not supported in serverless handlers");
    }
    const { app } = serve(params);
    return serverless(app, {
        ...options,
        provider: options.provider ?? "aws",
    });
}