import { A2AServiceInterface } from "./protocol/index.js";
import { initTRPC } from "@trpc/server";

export interface ExecutionEnvironment {
  session?: {
    id: string;
  };
  auth: {
    userId: string;
  } | null;
  service: A2AServiceInterface;
}

const transport = initTRPC.context<ExecutionEnvironment>().create();
export const router = transport.router;
export const publicProcedure = transport.procedure;
