/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Command,
  CommandChannelInterface,
  State,
  Update,
  Context,
} from "~/types/index.js";
import { A2AServiceInterface } from "~/types/index.js";
import { ContextManagerInterface } from "~/types/index.js";
import { EventManagerOptions } from "~/types/index.js";
import { createEventManager } from "./event.js";
import { v4 as uuidv4 } from "uuid";
import { EventManager } from "~/services/core/managers/event.js";
import { CommandChannel } from "~/services/core/managers/command.js";

export async function createCommandChannel<TCommand extends Command = Command>(
  request: TCommand
): Promise<CommandChannelInterface<TCommand>> {
  return CommandChannel.create<TCommand>(request);
}

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
): Promise<Context<TCommand, TState, TUpdate>> {
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
  const contextId_: string =
    !contextId || contextId.length === 0 ? uuidv4() : contextId;
  const signal: AbortSignal = abortSignal ?? new AbortController().signal; //do we need to cancel a task when the client disconnects?
  const events: EventManager<TCommand, TState, TUpdate> =
    await createEventManager<TCommand, TState, TUpdate>(
      service,
      contextId_,
      eventOverrides
    );
  const context: Context<TCommand, TState, TUpdate> = {
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
