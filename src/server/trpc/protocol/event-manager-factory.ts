import { A2AServiceInterface } from "./a2a-service.js";
import { EventManager, EventManagerOptions } from "./event-manager.js";
import { v4 as uuidv4 } from "uuid";
import { loadState, processUpdate } from "../../lib/state.js";
import {
  TaskStatusUpdateEvent,
  Task,
  Message,
  UpdateEvent,
} from "../../../types/index.js";
import { CANCEL_UPDATE } from "../../../utils/common/constants.js";
import { TaskState } from "../../../types/schemas/index.js";
import { TaskAndHistory, TaskStore } from "../../interfaces/store.js";
import { StateManager } from "./state-manager.js";
import { FAILED_UPDATE } from "../../../utils/index.js";

export async function createEventManager<TState extends {} = any>(
  id?: string,
  service: A2AServiceInterface<TState> = {} as A2AServiceInterface<TState>,
  additionalOptions?: EventManagerOptions<any, TState>
): Promise<EventManager<any, TState>> {
  const contextId = id ?? uuidv4();

  const taskStore: TaskStore = {
    save: async (data: any) => {
      service.setState(contextId, data);
    },
    load: async (taskId: string) => {
      return service.getState(taskId) as unknown as TaskAndHistory;
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
      )) as unknown as TState; //!TODO: fix this
      return currentState;
    },

    onCancel: async (nextState: TState): Promise<void> => {
      const localContextId = (nextState as any).contextId ?? contextId; //TODO: fix this
      service.addCancellation(localContextId);
      let cancellation: TaskStatusUpdateEvent = CANCEL_UPDATE(
        (nextState as any).taskId ?? //TODO: fix this
          (nextState as any).task?.id ?? //TODO: fix this
          (nextState as any).id, //TODO: fix this
        localContextId
      );
      const cancelUpdate: TaskStatusUpdateEvent = {
        ...nextState,
        ...cancellation,
        status: {
          ...(nextState as any).status, //TODO: fix this
          ...cancellation.status,
          state: TaskState.canceled,
        },
        final: true,
      };
      await processUpdate(taskStore, {
        context: {
          contextId: localContextId,
          task: (nextState as any).task ?? ({} as Task), //TODO: fix this
          userMessage: (nextState as any).message ?? ({} as Message), //TODO: fix this
          isCancelled: () => service.isCancelled(localContextId),
          history:
            (nextState as any).history ?? //TODO: fix this
            (nextState as any).task?.history ?? //TODO: fix this
            [],
        },
        current: nextState as unknown as TaskAndHistory, //TODO: fix this
        update: cancelUpdate as unknown as UpdateEvent, //TODO: fix this
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
            task: (current as any).task ?? ({} as Task), //TODO: fix this
            userMessage: (current as any).message ?? ({} as Message), //TODO: fix this
            isCancelled: () => service.isCancelled(contextId),
            history: [],
          },
          current: current as unknown as TaskAndHistory, //TODO: fix this
          update: nextState as unknown as UpdateEvent, //TODO: fix this
        })) as unknown as TState; //!TODO: fix this
        return currentState;
      } catch (error) {
        console.error(`onUpdate[${contextId}]:`, error);
        throw error;
      }
    },

    onError: async (current: TState, error: any): Promise<void> => {
      console.log(`onError[${contextId}]`, current, error);
      const failedUpdate = FAILED_UPDATE(
        (current as any).taskId ?? (current as any).task?.id ?? contextId,
        (current as any).contextId ?? contextId,
        "failed-update",
        error instanceof Error ? error.message : String(error)
      );
      await processUpdate(taskStore, {
        context: {
          contextId: (current as any).contextId ?? contextId,
          task: (current as any).task ?? ({} as Task), //TODO: fix this
          userMessage: (current as any).message ?? ({} as Message), //TODO: fix this
          isCancelled: () => service.isCancelled(contextId),
          history:
            (current as any).history ?? //TODO: fix this
            (current as any).task?.history ?? //TODO: fix this
            [],
        },
        current: current as unknown as TaskAndHistory, //TODO: fix this
        update: failedUpdate as unknown as UpdateEvent, //TODO: fix this
      });
      console.error(`onError[${contextId}]`, error);
    },

    onComplete: async (): Promise<void> => {
      service.removeCancellation(contextId);
      service.removeConnection(contextId);
    },

    getState: (): TState => {
      const state = service.getState(contextId) as unknown as TState; //!TODO: fix this
      return state;
    },
  };

  return new StateManager<any, TState>(contextId, {
    ...options,
    ...additionalOptions,
  });
}
