import {
  createConfig,
  defaultEndpointsFactory,
  Routing,
  createServer,
} from "express-zod-api";
import {
  JSONRPCRequestSchema,
  JSONRPCResponseSchema,
  JSONRPCResponse,
} from "../../types/extended-schema.js";

const config = createConfig({
  http: {
    listen: 3000,
  },
  cors: false,
});

const rpcEndpoint = defaultEndpointsFactory.build({
  input: JSONRPCRequestSchema,
  output: JSONRPCResponseSchema,
  handler: async ({ input, options, logger }) => {
    logger.info("request", input);
    logger.info("options", options);
    logger.info("logger", logger);
    const dummyResponse: JSONRPCResponse = {
      jsonrpc: "2.0",
      id: input.id,
      result: "hello world",
    };
    return dummyResponse;
  },
});

const routing: Routing = {
  v1: {
    "/": rpcEndpoint,
  },
};

const server = createServer(config, routing);

server.start();
