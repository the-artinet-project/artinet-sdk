import { Command, State, Update } from "~/types/index.js";
import { A2AServiceInterface } from "~/types/index.js";
import { ContextManagerInterface } from "~/types/index.js";
import { EventManagerOptions } from "~/types/index.js";
import { createEventManager } from "./event.js";
import { v4 as uuidv4 } from "uuid";
import { EventManager } from "~/services/core/managers/event.js";
import { CoreContext } from "~/types/index.js";

export async function createContext<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
>(
  request: TCommand,
  service: A2AServiceInterface<TCommand, TState, TUpdate>,
  contextManager: ContextManagerInterface<TCommand, TState, TUpdate>,
  abortSignal?: AbortSignal,
  contextId?: string,
  eventOverrides?: EventManagerOptions<TCommand, TState, TUpdate>
): Promise<CoreContext<TCommand, TState, TUpdate>> {
  //   if (contextId && contextId.length > 0) {
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
  const contextId_ =
    !contextId || contextId.length === 0 ? uuidv4() : contextId;
  const signal = abortSignal ?? new AbortController().signal; //do we need to cancel a task when the client disconnects?
  const events: EventManager<TCommand, TState, TUpdate> =
    await createEventManager<TCommand, TState, TUpdate>(
      service,
      contextId_,
      eventOverrides
    );
  const context = {
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
