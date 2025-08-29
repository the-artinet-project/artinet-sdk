/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Core Context Interface Definition
 *
 * This module defines the CoreContext interface, which serves as the central
 * execution environment for all command processing. The context encapsulates
 * the command, state management, event handling, and cancellation mechanisms
 * required for execution engine operations.
 *
 * @module CoreContext
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */

import { EventManagerInterface } from "../managers/event.js";
import { CoreCommand, CoreState, CoreUpdate } from "./types.js";
import { ReceiveCommandProxyInterface } from "./command.js";

/**
 * Core execution context interface that provide the complete environment for command execution.
 *
 * The CoreContext serves as the primary execution environment passed to execution engines.
 * It encapsulates all the necessary components for command processing, including the command
 * itself, state management, event handling, and cancellation signals. This design enables
 * execution engines to be stateless functions that receive everything they need through
 * the context parameter.
 *
 * The context is designed to support "Context Engineering" - the practice of carefully
 * constructing execution environments that contain all necessary information and capabilities
 * for effective command processing. As the system evolves, the context becomes increasingly
 * important for enabling sophisticated execution patterns.
 *
 * @template TCommand - The command type, must extend CoreCommand
 * @template TState - The state type, must extend CoreState
 * @template TUpdate - The update type, must extend CoreUpdate
 *
 * @example
 * ```typescript
 * // Using context in an execution engine
 * const myEngine: ExecutionEngine<MyCommand, MyState, MyUpdate> = async function* (context) {
 *   const { command, State, events, signal, isCancelled } = context;
 *
 *   // Get current state
 *   const currentState = State();
 *
 *   // Check for cancellation
 *   if (isCancelled() || signal.aborted) {
 *     yield { type: 'cancelled' };
 *     return;
 *   }
 *
 *   // Process command
 *   const result = await processCommand(command);
 *
 *   // Emit events and yield updates
 *   events.emit('progress', { progress: 0.5 });
 *   yield { type: 'progress', progress: 0.5, data: result };
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Creating and using a context
 * const context: CoreContext<MyCommand, MyState, MyUpdate> = {
 *   contextId: 'execution-123',
 *   command: createCommandProxy(myCommand),
 *   events: createEventManager(),
 *   signal: abortController.signal,
 *   isCancelled: () => abortController.signal.aborted,
 *   State: () => getCurrentState()
 * };
 *
 * // Execute with context
 * for await (const update of myEngine(context)) {
 *   console.log('Update:', update);
 * }
 * ```
 *
 * @remarks
 * **Design Philosophy:**
 * The context represents a shift toward functional execution patterns where execution
 * engines are pure functions that receive all necessary dependencies through the
 * context parameter. This approach enables:
 *
 * - **Testability**: Easy to mock and test individual components
 * - **Composability**: Different engines can work with the same context interface
 * - **Flexibility**: Context can be enhanced without changing engine signatures
 * - **Debugging**: Complete execution environment is visible and traceable
 *
 * **Context Engineering:**
 * As mentioned in the original note, Context Engineering is becoming increasingly
 * important. This involves carefully designing contexts that provide the right
 * level of abstraction and capability for specific execution scenarios.
 *
 * @public
 * @since 0.5.6
 */
export interface CoreContext<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  /**
   * Unique identifier for this execution context.
   *
   * This ID is used throughout the system to track and correlate execution
   * activities, logs, and state updates with specific command executions.
   *
   * @example
   * ```typescript
   * console.log(`Starting execution: ${context.contextId}`);
   * loggerService.info(`[${context.contextId}] Processing command`);
   * ```
   */
  readonly contextId: string;

  /**
   * Command proxy interface providing access to the command being executed.
   *
   * The command proxy wraps the original command and may provide additional
   * functionality such as validation, logging, or transformation. It allows
   * execution engines to access command data in a controlled manner.
   *
   * @example
   * ```typescript
   * const { command } = context;
   *
   * // Access command properties
   * const userId = command.metadata?.userId;
   * const taskType = command.type;
   * const parameters = command.params;
   *
   * // Use command data in processing
   * const result = await processTask(taskType, parameters, userId);
   * ```
   */
  command: ReceiveCommandProxyInterface<TCommand>;

  /**
   * Function to check if the execution has been cancelled.
   *
   * This function provides a convenient way to check cancellation status
   * throughout execution. It may aggregate multiple cancellation sources
   * including abort signals, service-level cancellation, and timeout conditions.
   *
   * @returns True if the execution should be cancelled, false otherwise
   *
   * @example
   * ```typescript
   * // Check before expensive operations
   * if (context.isCancelled()) {
   *   yield { type: 'cancelled', reason: 'User cancellation' };
   *   return;
   * }
   *
   * // Check in processing loops
   * for (const item of largeDataSet) {
   *   if (context.isCancelled()) break;
   *   await processItem(item);
   * }
   * ```
   */
  readonly isCancelled: () => boolean;

  /**
   * Abort signal for cancellation handling.
   *
   * This standard AbortSignal provides a way to handle cancellation in a
   * platform-standard manner. It can be passed to fetch requests, timeouts,
   * and other async operations that support cancellation.
   */
  readonly signal: AbortSignal;

  /**
   * Event manager for handling execution lifecycle events.
   *
   * The event manager provides event emission and subscription capabilities
   * for execution lifecycle events. It handles state transitions, error
   * scenarios, and completion notifications.
   *
   * @example
   * ```typescript
   * const { events } = context;
   *
   * // Listen for events
   * events.on('update', (state, update) => {
   *   console.log('State updated:', state);
   * });
   *
   * // Handle errors
   * events.on('error', (error, state) => {
   *   console.error('Execution error:', error);
   * });
   * ```
   */
  readonly events: EventManagerInterface<TCommand, TState, TUpdate>;

  /**
   * Function to get the current execution state.
   *
   * This function provides access to the current state of the execution.
   * The state represents the accumulated result of all updates processed
   * so far and serves as the foundation for decision-making in execution engines.
   *
   * @returns The current execution state
   *
   * @example
   * ```typescript
   * // Get current state for decision making
   * const currentState = context.State();
   * ```
   */
  readonly State: () => TState;
}
