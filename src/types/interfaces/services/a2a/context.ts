/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A2A (Agent-to-Agent) Context Type Definitions
 *
 * This module provides type definitions for the Agent-to-Agent communication context,
 * extending the core context types with A2A-specific functionality for task handling,
 * message processing, and event management.
 *
 * @module A2AContext
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */

import { A2A } from "@artinet/types";
import { CoreCommand, CoreState, CoreUpdate } from "../core/context/types.js";
import { CoreContext, Core } from "../core/context/context.js";
import { TaskAndHistory } from "./legacy.js";

/**
 * Represents the possible types of updates that can be yielded by an A2AEngine.
 *
 * This union type encompasses all event types that can be emitted during A2A
 * task processing, providing a type-safe way to handle different update scenarios.
 *
 * @description Either a Message, Task, TaskStatusUpdateEvent, or TaskArtifactUpdateEvent.
 *
 * @public
 * @since 0.5.6
 */
export type UpdateEvent =
  | A2A.Message
  | A2A.Task
  | A2A.TaskStatusUpdateEvent
  | A2A.TaskArtifactUpdateEvent;

/**
 * A2A Command type that extends CoreCommand with A2A-specific parameter constraints.
 *
 * This generic type provides type-safe command handling for A2A operations,
 * ensuring that command parameters conform to the expected A2A request structure.
 *
 * @template TParams - The parameter type for the command, must extend A2A.Request params
 * @default MessageSendParams - Default parameter type for message sending operations
 *
 * @example
 * ```typescript
 * // Using default MessageSendParams
 * const messageCommand: Command = {
 *   type: 'send_message',
 *   params: { content: 'Hello', recipient: 'agent123' }
 * };
 *
 * // Using custom parameter type
 * interface CustomParams extends NonNullable<A2ARequest["params"]> {
 *   customField: string;
 * }
 * const customCommand: Command<CustomParams> = {
 *   type: 'custom_action',
 *   params: { customField: 'value' }
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type Command<
  TParams extends NonNullable<A2A.A2ARequest["params"]> = A2A.MessageSendParams
> = CoreCommand<TParams>;

/**
 * A2A State type that extends CoreState with task and history management.
 *
 * This type represents the state container for A2A operations, including
 * task tracking and historical data management capabilities.
 *
 * @example
 * ```typescript
 * const state: State = {
 *   data: {
 *     currentTask: taskInstance,
 *     history: [...previousTasks]
 *   },
 *   metadata: {
 *     lastUpdated: new Date(),
 *     version: '1.0.0'
 *   }
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type State = CoreState<TaskAndHistory>;

/**
 * A2A Update type that extends CoreUpdate with A2A-specific update events.
 *
 * This generic type provides type-safe update handling for A2A operations,
 * ensuring that updates conform to the expected UpdateEvent structure.
 *
 * @template TUpdate - The update event type, must extend UpdateEvent
 * @default UpdateEvent - Default update event type
 *
 * @example
 * ```typescript
 * // Using default UpdateEvent
 * const update: Update = {
 *   type: 'task_status_update',
 *   payload: statusUpdateEvent
 * };
 *
 * // Using specific update type
 * const messageUpdate: Update<Message> = {
 *   type: 'message',
 *   payload: messageEvent
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export type Update<TUpdate extends UpdateEvent = UpdateEvent> =
  CoreUpdate<TUpdate>;

/**
 * A2A Context type that combines Command, State, and Update types for complete context management.
 *
 * This is the main context type for A2A operations, providing a comprehensive
 * type-safe interface for handling commands, managing state, and processing updates
 * within the Agent-to-Agent communication framework.
 *
 * @template TCommand - The command type, must extend Command
 * @template TState - The state type, must extend State
 * @template TUpdate - The update type, must extend Update<UpdateEvent>
 *
 * @default TCommand - Command<MessageSendParams>
 * @default TState - State
 * @default TUpdate - Update<UpdateEvent>
 *
 * @example
 * ```typescript
 * // Using default types
 * const context: Context = {
 *   command: messageCommand,
 *   state: currentState,
 *   update: latestUpdate,
 *   // ... other context properties
 * };
 *
 * // Using custom types
 * interface CustomCommand extends Command<CustomParams> {
 *   priority: number;
 * }
 *
 * const customContext: Context<CustomCommand, State, Update<A2A.Task>> = {
 *   command: customCommand,
 *   state: currentState,
 *   update: taskUpdate,
 *   // ... other context properties
 * };
 * ```
 *
 * @remarks
 * This context type is designed to be the primary interface for A2A service
 * implementations, providing type safety and ensuring proper handling of
 * agent-to-agent communication patterns.
 *
 * @public
 * @since 0.5.6
 */
export type Context<
  TCommand extends Command = Command<A2A.MessageSendParams>,
  TState extends State = State,
  TUpdate extends Update<UpdateEvent> = Update<UpdateEvent>
> = CoreContext<TCommand, TState, TUpdate>;

export interface A2ARuntime<
  TCommand extends CoreCommand<NonNullable<A2A.A2ARequest["params"]>> = Command,
  TState extends CoreState<TaskAndHistory> = State,
  TUpdate extends CoreUpdate<UpdateEvent> = Update
> extends Core<TCommand, TState, TUpdate> {}
