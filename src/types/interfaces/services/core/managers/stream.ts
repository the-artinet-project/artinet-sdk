/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Core Stream Manager Interface Definition
 *
 * This module defines the interface for managing execution streams in the core service
 * framework. It provides functionality for handling async execution, update collection,
 * and streaming results from execution engines to consumers.
 *
 * @module CoreStreamManager
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */

import { CoreCommand, CoreState, CoreUpdate } from "~/types/index.js";
import { CoreContext } from "../context/index.js";
import { ExecutionEngine } from "../execution/index.js";
import { ServiceInterface } from "../service.js";

/**
 * Interface for managing execution streams and update collection.
 *
 * The StreamManager is responsible for coordinating the execution of commands
 * through execution engines, collecting updates as they are produced, and
 * providing a streaming interface for consumers to receive real-time updates.
 *
 * This interface supports both push-based update collection and pull-based
 * streaming, making it suitable for various execution patterns including
 * long-running tasks, batch operations, and real-time processing.
 *
 * @template TCommand - The command type, must extend CoreCommand
 * @template TState - The state type, must extend CoreState
 * @template TUpdate - The update type, must extend CoreUpdate
 *
 * @example
 * ```typescript
 * class MyStreamManager implements StreamManagerInterface<MyCommand, MyState, MyUpdate> {
 *   private updates: MyUpdate[] = [];
 *   private completed = false;
 *
 *   constructor(
 *     private contextId: string,
 *     private context: CoreContext<MyCommand, MyState, MyUpdate>
 *   ) {}
 *
 *   async *stream(engine: ExecutionEngine<MyCommand, MyState, MyUpdate>) {
 *     for await (const update of engine(this.context)) {
 *       this.addUpdate(update);
 *       yield update;
 *     }
 *     this.setCompleted();
 *   }
 *
 *   // ... implement other interface methods
 * }
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface StreamManagerInterface<
  TCommand extends CoreCommand = CoreCommand,
  TState extends CoreState = CoreState,
  TUpdate extends CoreUpdate = CoreUpdate,
> {
  /**
   * Gets the unique identifier for the execution context.
   *
   * This ID is used to track and correlate updates with their specific
   * execution instance across the system.
   *
   * @returns The context ID string
   *
   * @example
   * ```typescript
   * const contextId = streamManager.getContextId();
   * console.log(`Processing execution: ${contextId}`);
   * ```
   */
  getContextId(): string;

  /**
   * Adds an update to the internal update collection.
   *
   * This method is typically called by execution engines or other
   * components to record updates as they occur during execution.
   * Updates are stored in order and can be retrieved later.
   *
   * @param update - The update to add to the collection
   *
   * @example
   * ```typescript
   * const progressUpdate: MyUpdate = {
   *   type: 'progress',
   *   progress: 0.5,
   *   message: 'Halfway complete'
   * };
   * streamManager.addUpdate(progressUpdate);
   * ```
   */
  addUpdate(update: TUpdate): void;

  /**
   * Retrieves all updates that have been collected so far.
   *
   * Returns a copy of the internal update collection, providing
   * access to the complete execution history up to this point.
   *
   * @returns Array of all collected updates in chronological order
   *
   * @example
   * ```typescript
   * const allUpdates = streamManager.getUpdates();
   * console.log(`Collected ${allUpdates.length} updates so far`);
   *
   * // Process updates
   * for (const update of allUpdates) {
   *   processUpdate(update);
   * }
   * ```
   */
  getUpdates(): TUpdate[];

  /**
   * Checks whether the execution has completed.
   *
   * This flag indicates whether the execution engine has finished
   * processing and no more updates will be produced.
   *
   * @returns True if execution is complete, false if still running
   *
   * @example
   * ```typescript
   * if (streamManager.isCompleted()) {
   *   console.log('Execution finished');
   *   finalizeResults(streamManager.getUpdates());
   * } else {
   *   console.log('Execution still in progress...');
   * }
   * ```
   */
  isCompleted(): boolean;

  /**
   * Marks the execution as completed.
   *
   * This method is called when the execution engine has finished
   * processing, indicating that no more updates will be produced.
   * It triggers any completion-related cleanup or finalization.
   *
   * @example
   * ```typescript
   * // Called by execution engine when done
   * await executeTask();
   * streamManager.setCompleted();
   * ```
   */
  setCompleted(): void;

  /**
   * Gets the current execution context.
   *
   * Returns the context object that contains command, state, and
   * execution environment information for this stream.
   *
   * @returns The execution context
   *
   * @example
   * ```typescript
   * const context = streamManager.getExecutionContext();
   * const command = context.command;
   * const currentState = context.State();
   * ```
   */
  getExecutionContext(): CoreContext<TCommand, TState, TUpdate>;

  /**
   * Sets or updates the execution context.
   *
   * This method allows updating the context during execution,
   * which may be necessary for dynamic execution scenarios.
   *
   * @param executionContext - The new execution context to set
   *
   * @example
   * ```typescript
   * const updatedContext = createNewContext(command, newState);
   * streamManager.setExecutionContext(updatedContext);
   * ```
   */
  setExecutionContext(
    executionContext: CoreContext<TCommand, TState, TUpdate>
  ): void;

  /**
   * Creates an async generator stream for real-time update consumption.
   *
   * This is the primary method for executing commands and streaming results.
   * It runs the provided execution engine with the current context and
   * yields updates as they are produced, providing a real-time stream
   * of execution progress.
   *
   * @param engine - The execution engine to run
   * @param service - Optional service interface for additional functionality
   * @returns AsyncGenerator that yields updates as they occur
   *
   * @example
   * ```typescript
   * // Basic streaming
   * for await (const update of streamManager.stream(myEngine)) {
   *   console.log('Received update:', update);
   *   await processUpdate(update);
   * }
   *
   * // With service integration
   * const service = createMyService();
   * for await (const update of streamManager.stream(myEngine, service)) {
   *   await service.handleUpdate(update);
   *   yield update; // Re-yield to downstream consumers
   * }
   * ```
   *
   * @remarks
   * The stream will continue yielding updates until the execution engine
   * completes. The StreamManager automatically handles update collection
   * and completion status during streaming.
   */
  stream(
    engine: ExecutionEngine<TCommand, TState, TUpdate>,
    service?: ServiceInterface<TCommand, TState, TUpdate>
  ): AsyncGenerator<TUpdate>;
}
