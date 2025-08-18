import {
  A2AServiceInterface,
  Context,
  ContextManagerInterface,
  createA2AEventManager,
  EventManagerOptions,
} from "../protocol/index.js";
import { globalRepository } from "../repository.js";
import { publicProcedure } from "../transport.js";
import { v4 as uuidv4 } from "uuid";

export const createA2AEnviroment = (opts: any) => {
  console.log("createEnviroment", opts.path);
  return opts;
};
// if (opts.path.includes("message") || opts.path.includes("task")) {
//   return opts.next({
//     ctx: {
//       ...opts.ctx,
//       service: globalRepository.getService(), //todo: remove this
//     },
//   });
// }

export const agentProcedure = publicProcedure.use(
  async function createContext(opts) {
    console.log("createContext", opts.path);
    if (opts.ctx.service) {
      return opts.next({ ctx: opts.ctx });
    }

    if (
      opts.path.includes("message") ||
      opts.path.includes("task") ||
      opts.path.includes("agentCard")
    ) {
      return opts.next({
        ctx: {
          ...opts.ctx,
          service: globalRepository.getService(),
        },
      });
    }
    return opts.next({ ctx: opts.ctx });
  }
);

export async function createExecutionContext(
  request: any,
  service: A2AServiceInterface,
  contextManager: ContextManagerInterface,
  abortSignal?: AbortSignal,
  contextId?: string,
  additionalOptions?: EventManagerOptions<any, any>
): Promise<Context<any, any>> {
  //   if (contextId) {
  //     //disable for testing
  //     const context = contextManager.getContext(contextId);
  //     if (!context) {
  //       console.error("createExecutionContext", contextId, "Context not found");
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Context not found",
  //       });
  //     }
  //     return context;
  //   }
  const contextId_ = contextId ?? uuidv4();
  const signal = abortSignal ?? new AbortController().signal;
  let events = await createA2AEventManager<any>(
    contextId_,
    service,
    additionalOptions
  );
  const context: Context<any, any> = {
    contextId: contextId_,
    command: request,
    events: events,
    signal,
    isCancelled: () => {
      return signal.aborted || service.isCancelled(contextId_);
    },
  };
  contextManager.setContext(contextId_, context);
  return context;
}
