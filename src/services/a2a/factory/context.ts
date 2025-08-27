/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A2A Context Factory Functions
 *
 * This module provides factory functions for creating A2A execution contexts
 * and command channels. It handles the composition of various context components
 * including command proxies, event managers, and cancellation mechanisms.
 *
 * @module A2AContextFactory
 * @version 1.0.0
 * @since 0.5.6
 * @author The Artinet Project
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
  EventManagerInterface,
} from "~/types/index.js";
import { createEventManager } from "./event.js";
import { v4 as uuidv4 } from "uuid";
import { CommandChannel } from "../../core/managers/command.js";

/**
 * Creates a command channel proxy for the given command.
 *
 * This function wraps a command in a proxy interface that provides
 * controlled access to command data and may add additional functionality
 * such as validation, logging, or transformation.
 *
 * @template TCommand - The command type, must extend Command
 * @param request - The command to wrap in a proxy
 * @returns Command proxy interface for the request
 *
 * @example
 * ```typescript
 * const command: MessageSendParams = {
 *   message: {
 *     content: 'Hello, world!',
 *     recipient: 'agent-123'
 *   }
 * };
 *
 * const commandProxy = createCommandChannel(command);
 * // Use commandProxy to access command data safely
 * ```
 *
 * @public
 * @since 0.5.6
 */
export function createCommandChannel<TCommand extends Command = Command>(
  request: TCommand
): ReceiveCommandProxyInterface<TCommand> {
  return CommandChannel.create<TCommand>(request);
}

/**
 * Creates a complete A2A execution context for command processing.
 *
 * This is the main factory function for creating execution contexts in the A2A
 * framework. It assembles all the necessary components including command proxy,
 * event management, cancellation handling, and state management into a cohesive
 * execution environment.
 *
 * The context serves as the primary execution environment passed to execution
 * engines and provides access to all the resources and capabilities needed
 * for command processing.
 *
 * @template TCommand - The command type, must extend Command
 * @template TState - The state type, must extend State
 * @template TUpdate - The update type, must extend Update
 *
 * @param request - The command to execute
 * @param service - The A2A service instance
 * @param contextManager - Manager for context lifecycle
 * @param abortSignal - Optional abort signal for cancellation
 * @param contextId - Optional context ID (generates UUID if not provided)
 * @param eventOverrides - Optional event manager configuration overrides
 * @returns Fully configured execution context
 *
 * @example
 * ```typescript
 * // Basic context creation
 * const context = createContext(
 *   messageCommand,
 *   a2aService,
 *   contextManager
 * );
 *
 * // Execute with the context
 * for await (const update of engine(context)) {
 *   console.log('Update:', update);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Context creation with custom options
 * const abortController = new AbortController();
 * const customEventOptions = {
 *   onStart: async (ctx) => {
 *     console.log('Custom start handler');
 *     return initialState;
 *   }
 * };
 *
 * const context = createContext(
 *   command,
 *   service,
 *   contextManager,
 *   abortController.signal,
 *   'custom-context-id',
 *   customEventOptions
 * );
 *
 * // Cancel after 30 seconds
 * setTimeout(() => abortController.abort(), 30000);
 * ```
 *
 * @remarks
 * **Context Lifecycle:**
 * 1. Command proxy is created to wrap the incoming request
 * 2. Event manager is instantiated with service and override options
 * 3. Cancellation mechanisms are configured (abort signal + service cancellation)
 * 4. State accessor is bound to the event manager
 * 5. Complete context is registered with the context manager
 *
 * **Cancellation Handling:**
 * The context provides multiple cancellation mechanisms:
 * - AbortSignal for standard cancellation patterns
 * - Service-level cancellation tracking
 * - Combined cancellation status through isCancelled()
 *
 * **Event Management:**
 * The context includes an event manager that handles:
 * - Execution lifecycle events (start, update, complete, error)
 * - State transitions and persistence
 * - Custom event handling through overrides
 *
 * @public
 * @since 0.5.6
 */
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
  // Note: Context reuse logic is currently disabled for testing
  // Future versions may re-enable context reuse for performance optimization
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
  let newEventManager: EventManagerInterface<TCommand, TState, TUpdate>;
  const context: Context<TCommand, TState, TUpdate> = {
    contextId: contextId,
    command: createCommandChannel<TCommand>(request),
    events: (newEventManager = createEventManager<TCommand, TState, TUpdate>(
      service,
      contextId,
      eventOverrides
    )),
    signal: abortSignal,
    isCancelled: () => abortSignal?.aborted || service.isCancelled(contextId),
    State: () => newEventManager.getState(),
  };
  contextManager.setContext(contextId, context);
  return context;
}
