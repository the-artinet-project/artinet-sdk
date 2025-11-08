/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Core Service Interface Definition
 *
 * This module defines the fundamental service interface that all core services
 * must implement. It provides the contract for executing commands through
 * execution engines and managing service lifecycle.
 *
 * @module CoreService
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */
import { CoreContext, CoreCommand, CoreState, CoreUpdate } from "./context/index.js";
import { ExecutionEngine } from "./execution/index.js";
/**
 * Core service interface defining the contract for all service implementations.
 *
 * Services are responsible for orchestrating command execution through execution
 * engines, managing the execution lifecycle, and providing a consistent interface
 * for starting and stopping operations. This interface serves as the foundation
 * for all service types in the core framework.
 *
 * The service acts as a coordinator between execution engines and the broader
 * system, handling concerns like resource management, execution tracking, and
 * graceful shutdown while delegating the actual command processing to engines.
 *
 * @public
 * @since 0.5.6
 */
export interface ServiceInterface<TCommand extends CoreCommand = CoreCommand, TState extends CoreState = CoreState, TUpdate extends CoreUpdate = CoreUpdate> {
    /**
     * Executes a command using the provided execution engine and context.
     *
     * This is the primary method for processing commands. The service receives
     * an execution engine (which defines how to process the command) and a
     * context (which contains the command, state, and execution environment).
     *
     * The service is responsible for:
     * - Coordinating the execution process
     * - Managing resources during execution
     * - Handling the stream of updates from the engine
     * - Ensuring proper cleanup on completion or failure
     *
     * @param engine - The execution engine that will process the command
     * @param context - The execution context containing command and environment
     * @returns Promise that resolves when execution is complete
     *
     * @throws Should handle and wrap any execution errors appropriately
     *
     * @example
     * ```typescript
     * // Basic execution
     * await service.execute(myEngine, executionContext);
     *
     * // With error handling
     * try {
     *   await service.execute(myEngine, executionContext);
     * } catch (error) {
     *   console.error('Execution failed:', error);
     *   await handleExecutionError(error, executionContext);
     * }
     * ```
     *
     * @example
     * ```typescript
     * // Service implementation with update handling
     * async execute(engine, context) {
     *   const updates: TUpdate[] = [];
     *
     *   try {
     *     for await (const update of engine(context)) {
     *       updates.push(update);
     *       await this.notifySubscribers(update);
     *
     *       if (context.isCancelled()) {
     *         console.log('Execution cancelled');
     *         break;
     *       }
     *     }
     *   } catch (error) {
     *     await this.handleExecutionError(error, context);
     *     throw error;
     *   }
     *
     *   console.log(`Execution completed with ${updates.length} updates`);
     * }
     * ```
     */
    execute: (engine: ExecutionEngine<TCommand, TState, TUpdate>, context: CoreContext<TCommand, TState, TUpdate>) => Promise<void>;
    /**
     * Stops the service and performs cleanup operations.
     *
     * This method is called to gracefully shut down the service, ensuring that
     * all active executions are properly terminated and resources are cleaned up.
     * Implementation should handle stopping active executions, releasing resources,
     * and preparing for service shutdown.
     *
     * The stop method should be idempotent - calling it multiple times should
     * not cause errors or unexpected behavior.
     *
     * @returns Promise that resolves when the service has been stopped and cleaned up
     *
     * @example
     * ```typescript
     * // Graceful shutdown
     * await service.stop();
     * console.log('Service stopped successfully');
     * ```
     */
    stop: () => Promise<void>;
}
