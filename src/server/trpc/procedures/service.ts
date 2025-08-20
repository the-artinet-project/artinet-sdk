import { publicProcedure } from "../transport.js";
import { TRPCError } from "@trpc/server";

export const createA2AEnviroment = (opts: any) => {
  return opts;
};

export const agentProcedure = publicProcedure.use(
  async function createContext(opts) {
    if (!opts.ctx.service) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Service not found" });
    }
    return opts.next({ ctx: opts.ctx });
    /**
     * while not currently used, this logic is for if we ever want to dynamically
     * change the service based on the path.
     * example: MCP Service
     */
    // if (
    //   opts.path.includes("message") ||
    //   opts.path.includes("task") ||
    //   opts.path.includes("agentCard")
    // ) {
    //   return opts.next({
    //     ctx: {
    //       ...opts.ctx,
    //       service: globalRepository.getService(),
    //     },
    //   });
    // }
    // return opts.next({ ctx: opts.ctx });
  }
);
