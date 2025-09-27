/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { initTRPC, TRPCError } from "@trpc/server";
const trpc = initTRPC.context().create({});
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const createA2AEnviroment = (opts) => {
    return opts;
};
export const A2AProcedure = publicProcedure.use(async function createContext(opts) {
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
});
//# sourceMappingURL=trpc.js.map