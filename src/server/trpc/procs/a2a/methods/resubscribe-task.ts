import {
  TaskIdParams,
  Task,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
  TaskState,
} from "../../../../../types/index.js";
import { createExecutionContext } from "../../../procedures/service.js";
import {
  FINAL_STATES,
  INVALID_REQUEST,
  TASK_NOT_FOUND,
  FAILED_UPDATE,
} from "../../../../../utils/index.js";
import { ExecutionStream } from "../../../protocol/stream.js";
import { TaskAndHistory } from "../../../../interfaces/store.js";
import { A2AServiceInterface } from "../interfaces/service.js";
import { ContextManager, ExecutionEngine } from "../../../protocol/index.js";

export async function* resubscribe(
  input: TaskIdParams,
  signal: AbortSignal,
  service: A2AServiceInterface,
  engine: ExecutionEngine,
  contextManager: ContextManager
) {
  const stream = new ExecutionStream();
  const context = await createExecutionContext(
    input,
    service,
    contextManager,
    signal,
    input.id,
    {
      onStart: async (request?: any): Promise<any> => {
        //custom onStart that will throw if the task is not found
        const state = service.getState(request.id ?? input.id); //equivalent to loadState but will not create a new context
        if (!state || !((state as TaskAndHistory).task as Task)) {
          throw TASK_NOT_FOUND({ taskId: input.id });
        }
        const task: Task = (state as TaskAndHistory).task;
        const statusUpdate: TaskStatusUpdateEvent = {
          kind: "status-update",
          taskId: task.id,
          contextId: stream.getContextId(),
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
                taskId: task.id,
                contextId: stream.getContextId(),
                artifact,
                lastChunk: task.artifacts.length === 1,
                metadata: task.metadata,
              };
              stream.addUpdate(artifactUpdate);
              task.artifacts.shift();
            }
          }
          stream.setCompleted();
          return state;
        }
        const latestUserMessage = task.history
          ?.filter((msg) => msg.role === "user")
          ?.pop();
        if (!latestUserMessage) {
          throw INVALID_REQUEST("No user message found");
        }
        context.command = latestUserMessage; //todo does this work?
        return state;
      },
    }
  );
  context.events.on("error", () => {
    context.events.onComplete();
  });
  //todo: move this to executionStream stream function
  context.events.on("update", async (currentState, nextState) => {
    if (signal?.aborted) {
      return;
    }
    stream.addUpdate(nextState);
  });
  stream.setExecutionContext(context);
  yield* stream.stream(engine, service);
}
