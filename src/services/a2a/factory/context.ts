/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Command,
  ReceiveCommandProxyInterface,
  State,
  Update,
  Context,
  A2AServiceInterface,
  ContextManagerInterface,
  EventManagerOptions,
} from "~/types/index.js";
import { createEventManager } from "./event.js";
import { v4 as uuidv4 } from "uuid";
import { CommandChannel } from "../../core/managers/command.js";

export function createCommandChannel<TCommand extends Command = Command>(
  request: TCommand
): ReceiveCommandProxyInterface<TCommand> {
  return CommandChannel.create<TCommand>(request);
}

export function createContext<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
>(
  request: TCommand,
  service: A2AServiceInterface<TCommand, TState, TUpdate>,
  contextManager: ContextManagerInterface<TCommand, TState, TUpdate>,
  abortSignal: AbortSignal = new AbortController().signal,
  contextId: string = uuidv4(),
  eventOverrides?: EventManagerOptions<TCommand, TState, TUpdate>
): Context<TCommand, TState, TUpdate> {
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
  const context: Context<TCommand, TState, TUpdate> = {
    contextId: contextId,
    command: createCommandChannel<TCommand>(request),
    events: createEventManager<TCommand, TState, TUpdate>(
      service,
      contextId,
      eventOverrides
    ),
    signal: abortSignal,
    isCancelled: () => abortSignal?.aborted || service.isCancelled(contextId),
  };
  contextManager.setContext(contextId, context);
  return context;
}
