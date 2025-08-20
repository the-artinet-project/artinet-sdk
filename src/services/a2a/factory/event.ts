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
} from "~types/index.js";
import {
  INTERNAL_ERROR,
  INVALID_PARAMS,
  CANCEL_UPDATE,
  FAILED_UPDATE,
} from "~/utils/index.js";
import { loadState, processUpdate } from "../state/index.js";
import { v4 as uuidv4 } from "uuid";

export async function createEventManager<
  TCommand extends Command = Command,
  TState extends State = State,
  TUpdate extends Update = Update,
>(
  service: A2AServiceInterface<TCommand, TState, TUpdate>,
  id?: string,
  additionalOptions?: EventManagerOptions<TCommand, TState, TUpdate>
): Promise<EventManager<TCommand, TState, TUpdate>> {
  const contextId = id ?? uuidv4();
  /**
   * Needed inorder to bind to legacy update logic
   */
  const taskStore: TaskStore = {
    save: async (data: TState) => {
      if (!data.task?.id) {
        console.error("save: data", data);
        throw INTERNAL_ERROR({
          data: {
            message: "Task ID is required",
          },
        });
      }
      service.setState(data.task.id, data);
    },
    load: async (taskId: string) => {
      return service.getState(taskId) ?? null;
    },
  };

  const options: EventManagerOptions<TCommand, TState, TUpdate> = {
    onStart: async (request?: TCommand): Promise<TState> => {
      if (!request || !("message" in request)) {
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
      const localTaskId = (update as any).taskId ?? (update as any).id;
      service.addCancellation(localContextId);
      let cancellation: TaskStatusUpdateEvent = CANCEL_UPDATE(
        localTaskId,
        localContextId
      );
      const cancelUpdate: TaskStatusUpdateEvent = {
        ...update,
        ...cancellation,
        status: {
          ...(update as any).status,
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
          history: current.history,
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
            history: [],
          },
          current: current,
          update: update,
        })) as TState;
        return currentState;
      } catch (error) {
        console.error(`onUpdate[${contextId}]:`, error);
        throw error;
      }
    },

    onError: async (current: TState, error: any): Promise<void> => {
      console.error(`onError[${contextId}]`, current, error);
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
          history: current.history,
        },
        current: current,
        update: failedUpdate,
      });
    },

    onComplete: async (): Promise<void> => {
      service.removeCancellation(contextId);
      service.removeConnection(contextId);
    },
    /**
     * Disabling this for now, because state is based on the taskId, not the contextId
     */
    // getState: (): TState => {
    //   const state = service.getState(contextId) ?? ({} as TState);
    //   return state;
    // },
  };

  return new EventManager(contextId, {
    ...options,
    ...additionalOptions,
  });
}
