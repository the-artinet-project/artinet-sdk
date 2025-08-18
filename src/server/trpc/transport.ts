import { A2AServiceInterface, ExecutionEngine } from "./protocol/index.js";
import { initTRPC } from "@trpc/server";
import { Context } from "./protocol/context.js";
import { CombinedDataTransformer } from "@trpc/server";

export interface ExecutionEnvironment {
  session?: {
    id: string;
  };
  auth?: {
    userId: string;
  };
  service: A2AServiceInterface;
  engine?: ExecutionEngine<Context>;
  jsonrpcContext?: {
    id: string;
    method: string;
  };
}

const JSONRPCTransformer: CombinedDataTransformer = {
  input: {
    serialize: (obj: any) => obj,
    deserialize: (obj: any) => obj,
  },
  output: {
    serialize: (obj: any) => {
      console.log("serialize", obj);
      return obj;
    },
    deserialize: (obj: any) => obj,
  },
};

const transport = initTRPC.context<ExecutionEnvironment>().create({
  transformer: JSONRPCTransformer,
});

export const router = transport.router;
export const jsonRPCProcedure = transport.procedure.use(async (opts) => {
  console.log("jsonRPCProcedure", opts);
  const result = await opts.next({
    ctx: {
      ...opts.ctx,
    },
  });
  console.log(" jsonRPCProcedure result", result);
  return result;
});

export const publicProcedure = jsonRPCProcedure;
