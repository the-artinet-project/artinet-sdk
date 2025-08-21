import {
  TaskIdParams,
  Task,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  MessageSendParams,
  Message,
  UpdateEvent,
  CoreContext,
  TaskAndHistory,
  MethodParams,
  Context,
} from "~/types/index.js";
import { createContext } from "../factory/context.js";
import {
  FINAL_STATES,
  INVALID_REQUEST,
  TASK_NOT_FOUND,
} from "~/utils/index.js";
import { StreamManager } from "~/services/core/managers/stream.js";

const createMessageParams = (task: Task) => {
  const latestUserMessage: Message | undefined = task.history
    ?.filter((msg) => msg.role === "user")
    ?.pop();

  if (!latestUserMessage) {
    throw INVALID_REQUEST("No user message found");
  }

  const messageParams: MessageSendParams = {
    message: {
      ...latestUserMessage,
      taskId: task.id,
      contextId: latestUserMessage.contextId ?? task.contextId,
    },
    metadata: task.metadata,
  };
  return messageParams;
};

export async function* resubscribe(input: TaskIdParams, params: MethodParams) {
  const { service, engine, contextManager, signal } = params;
  const state: TaskAndHistory | undefined = service.getState(input.id);
  if (!state || !((state as TaskAndHistory).task as Task)) {
    throw TASK_NOT_FOUND({ taskId: input.id });
  }
  const stream: StreamManager<MessageSendParams, TaskAndHistory, UpdateEvent> =
    new StreamManager();
  const context: CoreContext<MessageSendParams, TaskAndHistory, UpdateEvent> =
    await createContext(
      createMessageParams((state as TaskAndHistory).task),
      service,
      contextManager,
      signal,
      input.id,
      {
        ...service.eventOverrides,
        onStart: async (
          context: Context<MessageSendParams, TaskAndHistory, UpdateEvent>
        ): Promise<TaskAndHistory> => {
          const request = context.command;
          const task: Task = (state as TaskAndHistory).task;
          const statusUpdate: TaskStatusUpdateEvent = {
            kind: "status-update",
            taskId: request?.message.taskId ?? task.id,
            contextId:
              request?.message.contextId ??
              task.contextId ??
              stream.getContextId(),
            status: task.status,
            final: false,
            metadata: task.metadata,
          };

          stream.addUpdate(statusUpdate);

          if (FINAL_STATES.includes(task.status.state)) {
            if (task.artifacts && task.artifacts.length > 0) {
              for (const artifact of task.artifacts) {
                const artifactUpdate: TaskArtifactUpdateEvent = {
                  kind: "artifact-update",
                  taskId: request?.message.taskId ?? task.id,
                  contextId:
                    request?.message.contextId ??
                    task.contextId ??
                    stream.getContextId(),
                  artifact,
                  lastChunk: task.artifacts.length === 1,
                  metadata: task.metadata,
                };
                stream.addUpdate(artifactUpdate);
                task.artifacts.shift();
              }
            }
            stream.setCompleted();
          }
          return state;
        },
      }
    );
  context.events.on("error", () => {
    context.events.onComplete();
  });
  stream.setExecutionContext(context);
  yield* stream.stream(engine, service);
}
export type ResubscribeTaskMethod = typeof resubscribe;
