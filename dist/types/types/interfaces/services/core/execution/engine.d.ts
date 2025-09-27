/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Core Execution Engine Type Definition
 *
 * This module defines the fundamental execution engine type that serves as the
 * foundation for all command processing in the core service framework. Execution
 * engines are responsible for transforming commands into streams of updates.
 *
 * @module CoreExecutionEngine
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */
import { CoreCommand, CoreContext, CoreState, CoreUpdate } from "../context/index.js";
/**
 * Core execution engine function signature.
 *
 * An ExecutionEngine is a function that accepts a CoreContext and returns an
 * AsyncGenerator yielding updates. This pattern enables streaming execution
 * where commands can produce multiple updates over time, supporting both
 * real-time processing and long-running operations.
 *
 * The engine receives a complete execution context containing the command to
 * execute, current state, event management, and cancellation signals. It
 * processes the command and yields updates as execution progresses, allowing
 * consumers to receive real-time feedback about execution status.
 *
 * @template TCommand - The command type, must extend CoreCommand
 * @template TState - The state type, must extend CoreState
 * @template TUpdate - The update type, must extend CoreUpdate
 *
 * @param context - The execution context containing command, state, and environment
 * @returns AsyncGenerator that yields updates during execution
 *
 * @example
 * ```typescript
 * // Simple execution engine that processes a command
 * const simpleEngine: ExecutionEngine<MyCommand, MyState, MyUpdate> = async function* (context) {
 *   const { command, State } = context;
 *
 *   // Yield progress update
 *   yield {
 *     type: 'progress',
 *     message: 'Starting execution...',
 *     progress: 0
 *   };
 *
 *   // Process command
 *   const result = await processCommand(command);
 *
 *   // Yield intermediate results
 *   yield {
 *     type: 'data',
 *     data: result.intermediateData,
 *     progress: 0.5
 *   };
 *
 *   // Complete processing
 *   const finalResult = await finalizeResult(result);
 *
 *   // Yield final update
 *   yield {
 *     type: 'complete',
 *     data: finalResult,
 *     progress: 1.0
 *   };
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Execution engine with error handling and cancellation
 * const robustEngine: ExecutionEngine = async function* (context) {
 *   const { command, signal, isCancelled } = context;
 *
 *   try {
 *     for (let i = 0; i < command.steps.length; i++) {
 *       // Check for cancellation
 *       if (isCancelled() || signal.aborted) {
 *         yield { type: 'cancelled', step: i };
 *         return;
 *       }
 *
 *       // Process step
 *       const stepResult = await processStep(command.steps[i]);
 *
 *       yield {
 *         type: 'step-complete',
 *         step: i,
 *         result: stepResult,
 *         progress: (i + 1) / command.steps.length
 *       };
 *     }
 *   } catch (error) {
 *     yield { type: 'error', error: error.message };
 *   }
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type ExecutionEngine<TCommand extends CoreCommand = CoreCommand, TState extends CoreState = CoreState, TUpdate extends CoreUpdate = CoreUpdate> = (context: CoreContext<TCommand, TState, TUpdate>) => AsyncGenerator<TUpdate, void, unknown>;
//# sourceMappingURL=engine.d.ts.map