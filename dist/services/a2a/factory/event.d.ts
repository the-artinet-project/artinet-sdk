/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview A2A Event Manager Factory
 *
 * This module provides factory functions for creating A2A-specific event managers
 * that handle the complete lifecycle of agent-to-agent communication tasks.
 * It integrates with the core event management system while providing A2A-specific
 * behavior for state management, task tracking, and error handling.
 *
 * @module A2AEventFactory
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */
import { EventManager } from "../../core/managers/event.js";
import { Command, State, Update, A2AServiceInterface, EventManagerOptions } from "../../../types/index.js";
/**
 * Creates an A2A-specific event manager with integrated task and state management.
 *
 * This factory function creates an event manager tailored for A2A operations,
 * providing comprehensive lifecycle management for agent-to-agent communication
 * tasks. It handles state persistence, task tracking, error scenarios, and
 * cancellation while integrating with the broader A2A service framework.
 *
 * @template TCommand - The command type, must extend Command
 * @template TState - The state type, must extend State
 * @template TUpdate - The update type, must extend Update
 *
 * @param service - The A2A service instance for state and connection management
 * @param id - Optional context ID (generates UUID if not provided)
 * @param eventOverrides - Optional event handling overrides
 * @returns Configured EventManager instance for A2A operations
 *
 * @example
 * ```typescript
 * const eventManager = createEventManager(
 *   a2aService,
 *   'context-123',
 *   {
 *     onStart: async (context) => {
 *       console.log('A2A task starting');
 *       return await initializeA2AState(context);
 *     },
 *     onComplete: async (finalState) => {
 *       console.log('A2A task completed');
 *       await notifyCompletion(finalState);
 *     }
 *   }
 * );
 * ```
 *
 * @public
 * @since 0.5.6
 */
export declare function createEventManager<TCommand extends Command = Command, TState extends State = State, TUpdate extends Update = Update>(service: A2AServiceInterface<TCommand, TState, TUpdate>, id?: string, eventOverrides?: EventManagerOptions<TCommand, TState, TUpdate>): EventManager<TCommand, TState, TUpdate>;
