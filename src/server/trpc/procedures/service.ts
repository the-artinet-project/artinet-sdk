import {
  A2AServiceInterface,
  Context,
  createEventManager,
  EventManagerOptions,
} from "../protocol/index.js";
import { globalRepository } from "../repository.js";
import { publicProcedure } from "../transport.js";
import { v4 as uuidv4 } from "uuid";

export const serviceProcedure = publicProcedure.use(
  async function createContext(opts) {
    if (opts.path.includes("message") || opts.path.includes("task")) {
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
export { globalRepository };

export async function createExecutionContext(
  request: any,
  abortSignal?: AbortSignal,
  contextId?: string,
  service?: A2AServiceInterface,
  additionalOptions?: EventManagerOptions<any, any>
): Promise<Context<any, any>> {
  //   if (contextId) {
  //     //disable for testing
  //     const context = globalRepository.getContextManager().getContext(contextId);
  //     if (!context) {
  //       console.error("createExecutionContext", contextId, "Context not found");
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Context not found",
  //       });
  //     }
  //     return context;
  //   }
  const serviceImpl = service ?? globalRepository.getService();
  const contextId_ = contextId ?? uuidv4();
  const signal = abortSignal ?? new AbortController().signal;
  let events = await createEventManager<any>(
    contextId_,
    serviceImpl,
    additionalOptions
  );
  const context: Context<any, any> = {
    contextId: contextId_,
    command: request,
    events: events,
    signal,
    isCancelled: () => {
      return signal.aborted || serviceImpl.isCancelled(contextId_);
    },
  };
  globalRepository.getContextManager().setContext(contextId_, context);
  return context;
}
