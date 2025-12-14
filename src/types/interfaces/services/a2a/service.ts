/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A2A Service Interface Definitions
 *
 * This module defines interfaces for Agent-to-Agent (A2A) service implementations,
 * including factory parameters, method options, and the main service interface.
 * It extends the core service framework with A2A-specific functionality for
 * agent communication, task management, and message handling.
 *
 * @module A2AService
 * @version 0.5.7
 * @since 0.5.6
 * @author The Artinet Project
 */

import {
  ConnectionManagerInterface,
  CancellationManagerInterface,
  ContextManagerInterface,
  ServiceInterface,
  TaskManagerInterface,
  EventManagerOptions,
} from "../core/index.js";
import {
  AgentCard,
  MessageSendParams,
  SendMessageSuccessResult,
  Task,
  TaskIdParams,
  TaskQueryParams,
} from "@artinet/types";
import { UpdateEvent, Command, State, Update } from "./context.js";
import { A2AEngine } from "./engine.js";

export type AgentCardParams =
  | (Partial<AgentCard> & Required<Pick<AgentCard, "name">>)
  | string;
/**
 * Configuration parameters for creating A2A service instances.
 *
 * This interface defines the required and optional components needed to
 * instantiate an A2A service, including the agent identity, execution engine,
 * and various manager interfaces for handling different aspects of A2A operations.
 *
 * @example
 * ```typescript
 * const factoryParams: FactoryParams = {
 *   agentCard: {
 *     id: 'agent-123',
 *     name: 'MyAgent',
 *     capabilities: ['messaging', 'task-processing']
 *   },
 *   engine: createA2AEngine(),
 *   contexts: createContextManager(),
 *   connections: createConnectionManager(),
 *   methods: {
 *     sendMessage: customSendMessage,
 *     getTask: customGetTask
 *   }
 * };
 *
 * const service = createA2AService(factoryParams);
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface FactoryParams {
  /** Agent identity and capabilities information */
  agentCard: AgentCardParams;
  /** Execution engine for processing A2A commands */
  engine: A2AEngine;
  /** Optional context manager for execution state management */
  contexts?: ContextManagerInterface<Command, State, Update>;
  /** Optional connection manager for agent connections */
  connections?: ConnectionManagerInterface;
  /** Optional cancellation manager for handling operation cancellations */
  cancellations?: CancellationManagerInterface;
  /** Optional task manager for task lifecycle management */
  tasks?: TaskManagerInterface<State>;
  /** Optional custom method implementations */
  methods?: Partial<MethodOptions>;
  /** Optional event manager configuration overrides */
  events?: EventManagerOptions<Command, State, Update>;
  /** Enforce parameter validation */
  enforceParamValidation?: boolean;
}

/**
 * Parameters passed to A2A method implementations.
 *
 * This interface defines the dependencies and context information that
 * method implementations receive when they are invoked. It provides access
 * to the service instance, execution engine, context management, and
 * cancellation mechanisms.
 *
 * @example
 * ```typescript
 * const customSendMessage = async (
 *   message: MessageSendParams,
 *   params: MethodParams
 * ): Promise<SendMessageSuccessResult> => {
 *   const { service, engine, contextManager, signal } = params;
 *
 *   // Create execution context
 *   const context = contextManager.createContext(message);
 *
 *   // Check for cancellation
 *   if (signal.aborted) {
 *     throw new Error('Operation cancelled');
 *   }
 *
 *   // Execute message sending
 *   return await service.execute(engine, context);
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface MethodParams {
  /** The A2A service instance */
  service: A2AServiceInterface<Command, State, Update>;
  /** The execution engine for processing */
  engine: A2AEngine;
  /** Context manager for execution state */
  contextManager: ContextManagerInterface<Command, State, Update>;
  /** Abort signal for cancellation handling */
  signal: AbortSignal;
  /** Enforce input validation */
  enforceValidation?: boolean;
}

/**
 * Custom method implementation options for A2A services.
 *
 * This interface allows customization of core A2A operations by providing
 * alternative implementations for task management, message handling, and
 * streaming operations. Each method can be individually overridden to
 * provide custom behavior while maintaining the standard interface.
 *
 * @example
 * ```typescript
 * const customMethods: MethodOptions = {
 *   sendMessage: async (message, params) => {
 *     // Custom message sending logic
 *     console.log(`Sending message to: ${message.recipient}`);
 *     const result = await defaultSendMessage(message, params);
 *     console.log(`Message sent with ID: ${result.messageId}`);
 *     return result;
 *   },
 *
 *   getTask: async (input, params) => {
 *     // Custom task retrieval with caching
 *     const cached = taskCache.get(input.taskId);
 *     if (cached) return cached;
 *
 *     const task = await defaultGetTask(input, params);
 *     taskCache.set(input.taskId, task);
 *     return task;
 *   }
 * };
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface MethodOptions {
  /**
   * Custom task retrieval implementation.
   *
   * @param input - Task query parameters
   * @param params - Method execution parameters (without engine, contextManager, signal)
   * @returns Promise resolving to the requested task
   */
  getTask: (
    input: TaskQueryParams,
    params: Omit<MethodParams, "engine" | "contextManager" | "signal">
  ) => Promise<Task>;

  /**
   * Task cancellation.
   *
   * @param input - Task identification parameters
   * @param params - Method execution parameters (without engine, signal)
   * @returns Promise resolving to the cancelled task
   */
  cancelTask: (
    input: TaskIdParams,
    params: Omit<MethodParams, "engine" | "signal">
  ) => Promise<Task>;

  /**
   * Message sending.
   *
   * @param message - Message parameters to send
   * @param params - Full method execution parameters
   * @returns Promise resolving to send operation result
   */
  sendMessage: (
    message: MessageSendParams,
    params: MethodParams
  ) => Promise<SendMessageSuccessResult>;

  /**
   * Streaming messages.
   *
   * @param message - Message parameters to send
   * @param params - Full method execution parameters
   * @returns AsyncGenerator yielding update events
   */
  streamMessage: (
    message: MessageSendParams,
    params: MethodParams
  ) => AsyncGenerator<UpdateEvent>;

  /**
   * Resubscription.
   *
   * @param input - Task identification parameters
   * @param params - Full method execution parameters
   * @returns AsyncGenerator yielding update events
   */
  resubscribe: (
    input: TaskIdParams,
    params: MethodParams
  ) => AsyncGenerator<UpdateEvent>;
}

/**
 * Public interface for A2A service methods.
 *
 * This interface defines the public API that consumers of A2A services
 * can use to interact with agents. It provides simplified method signatures
 * that hide internal complexity while exposing the essential functionality
 * for agent-to-agent communication.
 *
 * @example
 * ```typescript
 * // Using the methods interface
 * const service: MethodsInterface = createA2AService(params);
 *
 * // Get a task
 * const task = await service.getTask({ taskId: 'task-123' });
 *
 * // Send a message
 * const result = await service.sendMessage({
 *   recipient: 'agent-456',
 *   content: 'Hello, how are you?'
 * });
 *
 * // Stream messages for real-time updates
 * for await (const update of service.streamMessage({
 *   recipient: 'agent-456',
 *   content: 'Processing your request...'
 * })) {
 *   console.log('Update:', update);
 * }
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface MethodsInterface {
  /**
   * Retrieves a task by its ID.
   *
   * @param input - Task identification parameters
   * @returns Promise resolving to the requested task
   */
  getTask: (input: TaskQueryParams) => Promise<Task>;

  /**
   * Cancels a task by its ID.
   *
   * @param input - Task identification parameters
   * @returns Promise resolving to the cancelled task
   */
  cancelTask: (input: TaskIdParams) => Promise<Task>;

  /**
   * Sends a message to another agent.
   *
   * @param message - Message parameters to send
   * @param params - Optional execution parameters
   * @returns Promise resolving to send operation result
   */
  sendMessage: (
    message: MessageSendParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) => Promise<SendMessageSuccessResult>;

  /**
   * Sends a message with streaming updates.
   *
   * @param message - Message parameters to send
   * @param params - Optional execution parameters
   * @returns AsyncGenerator yielding update events
   */
  streamMessage: (
    message: MessageSendParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) => AsyncGenerator<UpdateEvent>;

  /**
   * Resubscribes to updates for a specific task.
   *
   * @param input - Task identification parameters
   * @param params - Optional execution parameters
   * @returns AsyncGenerator yielding update events
   */
  resubscribe: (
    input: TaskIdParams,
    params?: Partial<Omit<MethodParams, "service" | "contextManager">>
  ) => AsyncGenerator<UpdateEvent>;
}

/**
 * Main interface for A2A service implementations.
 *
 * This interface extends the core ServiceInterface and MethodsInterface to provide
 * a complete A2A service implementation. It includes agent identity management,
 * connection tracking, cancellation handling, and state management capabilities
 * specific to agent-to-agent communication scenarios.
 *
 * @template TCommand - The command type, must extend Command
 * @template TState - The state type, must extend State
 * @template TUpdate - The update type, must extend Update
 *
 * @example
 * ```typescript
 * class MyA2AService implements A2AServiceInterface {
 *   constructor(
 *     public agentCard: AgentCard,
 *     private engine: A2AEngine
 *   ) {}
 *
 *   async execute(engine, context) {
 *     // Handle execution
 *   }
 *
 *   async sendMessage(message, params) {
 *     // Handle message sending
 *   }
 *
 *   addConnection(id: string) {
 *     this.connections.add(id);
 *     console.log(`Added connection: ${id}`);
 *   }
 *
 *   // ... implement other methods
 * }
 * ```
 *
 * @public
 * @since 0.5.6
 */
export interface A2AServiceInterface<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update
> extends ServiceInterface<TCommand, TState, TUpdate>,
    MethodsInterface {
  /**
   * Optional event manager configuration overrides.
   *
   * When present, these overrides customize the default event handling
   * behavior for this service instance.
   */
  readonly eventOverrides:
    | EventManagerOptions<TCommand, TState, TUpdate>
    | undefined;

  /**
   * Agent identity and capabilities information.
   *
   * This card identifies the agent and describes its capabilities,
   * which is used for agent discovery and capability matching.
   */
  agentCard: AgentCard;

  /**
   * Adds a connection to the active connections registry.
   *
   * @param id - Unique identifier for the connection
   *
   * @example
   * ```typescript
   * service.addConnection('connection-123');
   * ```
   */
  addConnection: (id: string) => void;

  /**
   * Removes a connection from the active connections registry.
   *
   * @param id - Unique identifier for the connection
   *
   * @example
   * ```typescript
   * service.removeConnection('connection-123');
   * ```
   */
  removeConnection: (id: string) => void;

  /**
   * Checks if a specific execution context has been cancelled.
   *
   * @param id - Context or execution identifier
   * @returns True if cancelled, false otherwise
   *
   * @example
   * ```typescript
   * if (service.isCancelled('context-123')) {
   *   console.log('Execution was cancelled');
   *   return;
   * }
   * ```
   */
  isCancelled: (id: string) => boolean;

  /**
   * Adds a cancellation marker for a specific execution context.
   *
   * @param id - Context or execution identifier to cancel
   *
   * @example
   * ```typescript
   * service.addCancellation('context-123');
   * ```
   */
  addCancellation: (id: string) => void;

  /**
   * Removes a cancellation marker for a specific execution context.
   *
   * @param id - Context or execution identifier
   *
   * @example
   * ```typescript
   * service.removeCancellation('context-123');
   * ```
   */
  removeCancellation: (id: string) => void;

  /**
   * Retrieves the current state for a specific Task.
   *
   * @param id - Task identifier
   * @returns Promise resolving to the state, or undefined if not found
   *
   * @example
   * ```typescript
   * const state = await service.getState('task-123');
   * if (state) {
   *   console.log('Current progress:', state.progress);
   * }
   * ```
   */
  getState: (id: string) => Promise<TState | undefined>;

  /**
   * Sets the state for a specific Task.
   *
   * @param id - Task identifier
   * @param data - The state data to store
   * @returns Promise that resolves when state is saved
   *
   * @example
   * ```typescript
   * await service.setState('task-123', {
   *   progress: 0.75,
   *   status: 'processing',
   *   data: processedResults
   * });
   * ```
   */
  setState: (id: string, data: TState) => Promise<void>;
}
