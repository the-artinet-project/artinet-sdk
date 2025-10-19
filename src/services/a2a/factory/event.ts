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

import { EventManager } from "~/services/core/managers/event.js";
import {
  Command,
  State,
  Update,
  A2AServiceInterface,
  EventManagerOptions,
  TaskStore,
  TaskStatusUpdateEvent,
  TaskState,
  Message,
  Context,
  Task,
} from "~/types/index.js";
import {
  INTERNAL_ERROR,
  INVALID_PARAMS,
  CANCEL_UPDATE,
  FAILED_UPDATE,
  logError,
} from "~/utils/index.js";
import { loadState, processUpdate } from "../state/index.js";
import { v4 as uuidv4 } from "uuid";

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
export function createEventManager<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
>(
  service: A2AServiceInterface<TCommand, TState, TUpdate>,
  id?: string,
  eventOverrides?: EventManagerOptions<TCommand, TState, TUpdate>
): EventManager<TCommand, TState, TUpdate> {
  const contextId = id ?? uuidv4();
  /**
   * Task store implementation that bridges between event management and A2A service state management.
   *
   * This store provides the interface needed by the legacy update processing logic
   * while integrating with the A2A service's state management capabilities.
   */
  const taskStore: TaskStore = {
    save: async (data: TState) => {
      if (!data.task?.id) {
        throw INTERNAL_ERROR({
          data: {
            message: "Task ID is required",
          },
        });
      }
      service.setState(data.task.id, data);
    },

    load: async (taskId: string) => {
      return (await service.getState(taskId).catch(() => null)) ?? null;
    },
  };

  // Configure A2A-specific event handling options
  const options: EventManagerOptions<TCommand, TState, TUpdate> = {
    onStart: async (
      context: Context<TCommand, TState, TUpdate>
    ): Promise<TState> => {
      const request = context.command;

      if (!request || (!request.message && !("message" in request))) {
        throw INVALID_PARAMS("No request detected");
      }

      let currentContextId = contextId;
      if (request.message.contextId) {
        currentContextId = request.message.contextId;
      }

      service.addConnection(currentContextId);

      const currentState = await loadState(
        taskStore,
        request.message,
        request.metadata,
        request.message.taskId,
        currentContextId
      );

      return currentState as TState;
    },

    onCancel: async (current: TState, update: TUpdate): Promise<void> => {
      const localContextId = update.contextId ?? contextId;
      const localTaskId =
        (update as TaskStatusUpdateEvent).taskId ?? (update as Task).id;

      service.addCancellation(localContextId);

      const cancellation: TaskStatusUpdateEvent = CANCEL_UPDATE(
        localTaskId,
        localContextId
      );

      const cancelUpdate: TaskStatusUpdateEvent = {
        ...update,
        ...cancellation,
        status: {
          ...(update as TaskStatusUpdateEvent).status,
          ...cancellation.status,
          state: TaskState.canceled,
        },
        final: true,
      };

      await processUpdate(taskStore, {
        context: {
          contextId: localContextId,
          task: current.task,
          userMessage: current.task?.status?.message ?? ({} as Message),
          isCancelled: () => service.isCancelled(localContextId),
          history: current.history ?? current.task?.history ?? [],
        },
        current: current,
        update: cancelUpdate,
      });
    },

    onUpdate: async (current: TState, update: TUpdate): Promise<TState> => {
      if (service.isCancelled(contextId)) {
        return current;
      }

      try {
        const currentState = (await processUpdate(taskStore, {
          context: {
            contextId: contextId,
            task: current.task,
            userMessage: current.task?.status?.message ?? ({} as Message),
            isCancelled: () => service.isCancelled(contextId),
            history: current.history ?? current.task?.history ?? [],
          },
          current: current,
          update: update,
        })) as TState;

        return currentState;
      } catch (error) {
        logError(`onUpdate[${contextId}]:`, "error detected", error, update);
        throw error;
      }
    },

    onError: async (current: TState, error: any): Promise<void> => {
      logError(`onError[${contextId}]`, "error detected", error, current);

      if (
        !current ||
        (!current.task?.contextId && !(current as any)?.contextId)
      ) {
        return;
      }

      const failedUpdate = FAILED_UPDATE(
        current.task?.id,
        current.task?.contextId ?? contextId,
        "failed-update",
        error instanceof Error ? error.message : String(error)
      );

      await processUpdate(taskStore, {
        context: {
          contextId: current.task?.contextId ?? contextId,
          task: current.task,
          userMessage: current.task?.status?.message ?? ({} as Message),
          isCancelled: () => service.isCancelled(contextId),
          history: current.history ?? current.task?.history ?? [],
        },
        current: current,
        update: failedUpdate,
      });
    },

    onComplete: async (): Promise<void> => {
      service.removeCancellation(contextId);
      service.removeConnection(contextId);
    },
  };

  return new EventManager(contextId, {
    ...options,
    ...eventOverrides, // Override options take precedence over defaults
  });
}
