import { initTRPC, TRPCError } from "@trpc/server";
import {
  A2AServiceInterface,
  Command,
  ExecutionEnvironment,
  State,
  Update,
} from "~/types/index.js";

export interface A2AExecutionEnvironment<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
> extends ExecutionEnvironment<TCommand, TState, TUpdate> {
  /**
   * The service is the main interface for the A2A protocol.
   * It is used to send messages, get tasks, and cancel tasks.
   * In the future, we may want to dynamically change the service based on the path.
   * (e.g. multiple services for different paths/agents. an MCP Service. a factory function. etc.)
   */
  service: A2AServiceInterface<TCommand, TState, TUpdate>;
}

const trpc = initTRPC.context<A2AExecutionEnvironment>().create({});
export const router = trpc.router;
export const publicProcedure = trpc.procedure;

export const createA2AEnviroment = (opts: any) => {
  return opts;
};

export const A2AProcedure = publicProcedure.use(
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
