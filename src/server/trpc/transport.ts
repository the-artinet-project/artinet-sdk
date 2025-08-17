import { A2AServiceInterface, ExecutionEngine } from "./protocol/index.js";
import { initTRPC } from "@trpc/server";
import { Context } from "./protocol/context.js";

export interface ExecutionEnvironment {
  session?: {
    id: string;
  };
  auth: {
    userId: string;
  } | null;
  service: A2AServiceInterface;
  engine?: ExecutionEngine<Context>;
}

const transport = initTRPC.context<ExecutionEnvironment>().create();
export const router = transport.router;
export const publicProcedure = transport.procedure;
