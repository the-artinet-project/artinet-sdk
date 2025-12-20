/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Core Event Manager Interface Definitions
 *
 * This module defines interfaces for managing events throughout the execution lifecycle
 * of core services. It provides type-safe event handling, lifecycle management, and
 * state transitions for command execution contexts.
 *
 * @module CoreEventManager
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */

import { EventEmitter } from "events";
import { Core } from "../context/index.js";

/**
 * Configuration options for EventManager lifecycle callbacks.
 *
 * This interface defines optional callback functions that are invoked during
 * different phases of command execution, providing hooks for custom logic
 * and state management throughout the execution lifecycle.
 *
 * @template TCommand - The command type, must extend CoreCommand
 * @template TState - The state type, must extend CoreState
 * @template TUpdate - The update type, must extend CoreUpdate
 *
 * @example
 * ```typescript
 * const eventOptions: EventManagerOptions<MyCommand, MyState, MyUpdate> = {
 *   onStart: async (context) => {
 *     console.log('Execution started for context:', context.contextId);
 *     return initialState;
 *   },
 *   onUpdate: async (current, update) => {
 *     console.log('Processing update:', update);
 *     return { ...current, lastUpdate: update };
 *   },
 *   onComplete: async (finalState) => {
 *     console.log('Execution completed successfully');
 *   }
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
//todo merge with EventManagerInterface
export interface EventManagerOptions<
  TCommand extends Core["command"] = Core["command"],
  TState extends Core["state"] = Core["state"],
  TUpdate extends Core["update"] = Core["update"]
> {
  /**
   * Called when execution starts for a new context.
   *
   * This callback is invoked at the beginning of command execution,
   * allowing for initialization of state and setup of execution context.
   *
   * @param context - The execution context containing command and environment data
   * @returns Promise resolving to the initial state for this execution
   *
   * @example
   * ```typescript
   * onStart: async (context) => {
   *   const userId = context.command.metadata?.userId;
   *   return {
   *     userId,
   *     startTime: new Date(),
   *     status: 'initializing'
   *   };
   * }
   * ```
   */
  readonly onStart?: (
    context: Core<TCommand, TState, TUpdate>["context"]
  ) => Promise<TState>;

  /**
   * Called when execution is cancelled.
   *
   * This callback handles cleanup and state updates when an execution
   * is cancelled before completion, ensuring proper resource cleanup.
   *
   * @param current - The current state at the time of cancellation
   * @param update - The update that triggered the cancellation
   * @returns Promise that resolves when cancellation handling is complete
   *
   * @example
   * ```typescript
   * onCancel: async (current, update) => {
   *   await cleanupResources(current.resourceIds);
   *   await logCancellation(current.userId, update.reason);
   * }
   * ```
   */
  readonly onCancel?: (current: TState, update: TUpdate) => Promise<void>;

  /**
   * Called for each update during execution.
   *
   * This is the primary callback for processing updates and evolving state
   * throughout the execution lifecycle. It receives the current state and
   * an update, returning the new state.
   *
   * @param current - The current state before applying the update
   * @param update - The update to be processed
   * @returns Promise resolving to the new state after applying the update
   *
   * @example
   * ```typescript
   * onUpdate: async (current, update) => {
   *   switch (update.type) {
   *     case 'progress':
   *       return { ...current, progress: update.progress };
   *     case 'data':
   *       return { ...current, data: [...current.data, update.data] };
   *     default:
   *       return current;
   *   }
   * }
   * ```
   */
  readonly onUpdate?: (current: TState, update: TUpdate) => Promise<TState>;

  /**
   * Called when an error occurs during execution.
   *
   * This callback handles error scenarios, allowing for custom error processing,
   * logging, and recovery strategies.
   *
   * @param current - The current state when the error occurred
   * @param error - The error that occurred (can be any type)
   * @returns Promise that resolves when error handling is complete
   *
   * @example
   * ```typescript
   * onError: async (current, error) => {
   *   console.error('Execution error:', error);
   *   await notifyAdministrators(error, current);
   *   await saveErrorLog(current.contextId, error);
   * }
   * ```
   */
  readonly onError?: (current: TState, error: any) => Promise<void>;

  /**
   * Called when execution completes successfully.
   *
   * This callback is invoked upon successful completion of command execution,
   * allowing for cleanup, final state processing, and completion notifications.
   *
   * @param current - The final state after successful completion
   * @returns Promise that resolves when completion handling is done
   *
   * @example
   * ```typescript
   * onComplete: async (finalState) => {
   *   await saveResults(finalState.results);
   *   await notifyCompletion(finalState.userId);
   *   await cleanupTemporaryResources();
   * }
   * ```
   */
  readonly onComplete?: (current: TState) => Promise<void>;

  /**
   * Optional state getter function.
   *
   * @deprecated This property may be removed in future versions.
   * Use the EventManagerInterface.getState method instead.
   *
   * @returns The current state
   */
  readonly getState?: () => TState; //May be removed soon
}

/**
 * Event map defining the structure of events emitted by EventManager.
 *
 * This interface maps event names to their corresponding argument tuples,
 * providing type safety for event emission and subscription.
 *
 * @template TCommand - The command type, must extend CoreCommand
 * @template TState - The state type, must extend CoreState
 * @template TUpdate - The update type, must extend CoreUpdate
 *
 * @example
 * ```typescript
 * // Event manager will emit these events with the specified argument types
 * eventManager.on('start', (command: TCommand, state: TState) => {
 *   console.log('Execution started');
 * });
 *
 * eventManager.on('update', (state: TState, update: TUpdate) => {
 *   console.log('State updated');
 * });
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface EventManagerMap<
  TCommand extends Core["command"] = Core["command"],
  TState extends Core["state"] = Core["state"],
  TUpdate extends Core["update"] = Core["update"]
> {
  /** Emitted when execution starts - [command, initialState] */
  start: [TCommand, TState];
  /** Emitted when execution is cancelled - [cancelUpdate] */
  cancel: [TUpdate];
  /** Emitted when state is updated - [currentState, update] */
  update: [TState, TUpdate];
  /** Emitted when an error occurs - [error, currentState] */
  error: [any, TState];
  /** Emitted when execution completes - [finalState] */
  complete: [TState];
}

/**
 * Main interface for EventManager implementations.
 *
 * This interface extends EventEmitter to provide typed event handling
 * and defines the contract for managing execution lifecycle events.
 * Implementations must handle state transitions, error scenarios, and
 * provide access to current execution state.
 *
 * @template TCommand - The command type, must extend CoreCommand
 * @template TState - The state type, must extend CoreState
 * @template TUpdate - The update type, must extend CoreUpdate
 *
 * @example
 * ```typescript
 * class MyEventManager implements EventManagerInterface<MyCommand, MyState, MyUpdate> {
 *   constructor(
 *     public readonly contextId: string,
 *     private options: EventManagerOptions<MyCommand, MyState, MyUpdate>
 *   ) {
 *     super();
 *   }
 *
 *   async onUpdate(update: MyUpdate): Promise<MyState> {
 *     const current = this.getState();
 *     const newState = await this.options.onUpdate?.(current, update) ?? current;
 *     this.emit('update', newState, update);
 *     return newState;
 *   }
 *
 *   // ... other method implementations
 * }
 * ```
 *
 * @public
 * @since 0.5.6
 */
//TODO: May be better to call this the State Handler
export interface EventManagerInterface<
  TCommand extends Core["command"] = Core["command"],
  TState extends Core["state"] = Core["state"],
  TUpdate extends Core["update"] = Core["update"]
> extends EventEmitter<EventManagerMap<TCommand, TState, TUpdate>> {
  /**
   * Unique identifier for this execution context.
   *
   * This ID is used to track and manage the specific execution instance
   * throughout its lifecycle.
   */
  readonly contextId: string;

  /**
   * Optional callback for handling execution start.
   *
   * When present, this function is called to initialize state for a new execution.
   *
   * @param context - The execution context
   * @returns Promise resolving to initial state
   */
  readonly onStart?: (
    context: Core<TCommand, TState, TUpdate>["context"]
  ) => Promise<TState>;

  /**
   * Handles execution cancellation.
   *
   * This method processes cancellation requests and performs necessary cleanup.
   *
   * @param update - The update that triggered cancellation
   * @returns Promise that resolves when cancellation is complete
   *
   * @example
   * ```typescript
   * await eventManager.onCancel(cancellationUpdate);
   * ```
   */
  readonly onCancel: (update: TUpdate) => Promise<void>;

  /**
   * Processes state updates during execution.
   *
   * This is the primary method for handling state evolution throughout
   * the execution lifecycle.
   *
   * @param update - The update to process
   * @returns Promise resolving to the new state
   *
   * @example
   * ```typescript
   * const newState = await eventManager.onUpdate(progressUpdate);
   * ```
   */
  readonly onUpdate: (update: TUpdate) => Promise<TState>;

  /**
   * Handles errors that occur during execution.
   *
   * This method processes error scenarios and performs error recovery logic.
   *
   * @param error - The error that occurred
   * @returns Promise that resolves when error handling is complete
   *
   * @example
   * ```typescript
   * await eventManager.onError(new Error('Something went wrong'));
   * ```
   */
  readonly onError: (error: any) => Promise<void>;

  /**
   * Handles successful completion of execution.
   *
   * This method is called when execution completes successfully and
   * performs final cleanup and notification tasks.
   *
   * @returns Promise that resolves when completion handling is done
   *
   * @example
   * ```typescript
   * await eventManager.onComplete();
   * ```
   */
  onComplete: () => Promise<void>;

  /**
   * Gets the current execution state.
   *
   * @deprecated This method may be removed in future versions.
   * Consider using state management through the context instead.
   *
   * @returns The current state
   *
   * @example
   * ```typescript
   * const currentState = eventManager.getState();
   * ```
   */
  readonly getState: () => TState; //May be removed soon
}
