import { A2AServiceInterface } from "../../procs/a2a/interfaces/service.js";
import { EventManager, EventManagerOptions } from "./manager.js";
import { v4 as uuidv4 } from "uuid";
import { loadState, processUpdate } from "../../../lib/state.js";
import { TaskStatusUpdateEvent, Message } from "../../../../types/index.js";
import { CANCEL_UPDATE } from "../../../../utils/common/constants.js";
import { TaskState } from "../../../../types/schemas/index.js";
import { TaskAndHistory, TaskStore } from "../../../interfaces/store.js";
import { StateManager } from "./state-manager.js";
import { FAILED_UPDATE } from "../../../../utils/index.js";

export async function createA2AEventManager<
  TState extends TaskAndHistory = TaskAndHistory,
>(
  id?: string,
  service: A2AServiceInterface<any, TState> = {} as A2AServiceInterface<
    any,
    TState
  >,
  additionalOptions?: EventManagerOptions<any, TState>
): Promise<EventManager<any, TState>> {
  const contextId = id ?? uuidv4();

  const taskStore: TaskStore = {
    save: async (data: TState) => {
      service.setState(contextId, data);
    },
    load: async (taskId: string) => {
      return service.getState(taskId) ?? null;
    },
  };

  const options: EventManagerOptions<any, TState> = {
    onStart: async (request?: any): Promise<TState> => {
      let currentContextId = contextId;
      if (request?.contextId) {
        currentContextId = request.contextId;
      }
      service.addConnection(currentContextId);
      const currentState = (await loadState(
        taskStore,
        request,
        request?.metadata,
        request?.taskId,
        currentContextId
      )) as TState;
      return currentState;
    },

    onCancel: async (nextState: TState): Promise<void> => {
      const localContextId = nextState.task.contextId ?? contextId;
      service.addCancellation(localContextId);
      let cancellation: TaskStatusUpdateEvent = CANCEL_UPDATE(
        nextState.task.id,
        localContextId
      );
      const cancelUpdate: TaskStatusUpdateEvent = {
        ...nextState.task,
        ...cancellation,
        status: {
          ...nextState.task.status,
          ...cancellation.status,
          state: TaskState.canceled,
        },
        final: true,
      };
      await processUpdate(taskStore, {
        context: {
          contextId: localContextId,
          task: nextState.task,
          userMessage: nextState.task.status.message ?? ({} as Message),
          isCancelled: () => service.isCancelled(localContextId),
          history: nextState.history,
        },
        current: nextState,
        update: cancelUpdate,
      });
    },

    onUpdate: async (current: TState, nextState: TState): Promise<TState> => {
      if (service.isCancelled(contextId)) {
        return nextState;
      }
      try {
        const currentState = (await processUpdate(taskStore, {
          context: {
            contextId: contextId,
            task: current.task,
            userMessage: current.task.status.message ?? ({} as Message),
            isCancelled: () => service.isCancelled(contextId),
            history: [],
          },
          current: current,
          update: nextState.task ?? nextState,
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
        current.task.id,
        current.task.contextId ?? contextId,
        "failed-update",
        error instanceof Error ? error.message : String(error)
      );
      await processUpdate(taskStore, {
        context: {
          contextId: current.task.contextId ?? contextId,
          task: current.task,
          userMessage: current.task.status.message ?? ({} as Message),
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

    getState: (): TState => {
      const state = service.getState(contextId) ?? ({} as TState);
      return state;
    },
  };

  return new StateManager<any, TState>(contextId, {
    ...options,
    ...additionalOptions,
  });
}
