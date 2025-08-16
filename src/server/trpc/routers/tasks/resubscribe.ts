import {
  TaskIdParams,
  SendStreamingMessageSuccessResultSchema,
  TaskIdParamsSchema,
  Task,
  TaskStatusUpdateEvent,
  TaskArtifactUpdateEvent,
} from "../../../../types/index.js";
import { ExecutionEnvironment } from "../../transport.js";
import {
  createExecutionContext,
  serviceProcedure,
} from "../../procedures/service.js";
import { engine } from "../../repository.js";
import {
  FINAL_STATES,
  INVALID_REQUEST,
  TASK_NOT_FOUND,
} from "../../../../utils/index.js";
import { ExecutionStream } from "../stream.js";
import { zAsyncIterable } from "../../zAsyncIterable.js";
import { TaskAndHistory } from "../../../interfaces/store.js";

export async function* resubscribe(
  input: TaskIdParams,
  signal: AbortSignal,
  ctx: ExecutionEnvironment
) {
  const executionStream = new ExecutionStream();
  const executionContext = await createExecutionContext(
    input,
    signal,
    input.id,
    ctx.service,
    {
      onStart: async (request?: any): Promise<any> => {
        //custom onStart that will throw if the task is not found
        const state = ctx.service.getState(request.id ?? input.id); //equivalent to loadState but will not create a new context
        if (!state || !((state as TaskAndHistory).task as Task)) {
          throw TASK_NOT_FOUND({ taskId: input.id });
        }
        const task: Task = (state as TaskAndHistory).task;
        const statusUpdate: TaskStatusUpdateEvent = {
          kind: "status-update",
          taskId: task.id,
          contextId: executionStream.getContextId(),
          status: task.status,
          final: false,
          metadata: task.metadata,
        };

        executionStream.addUpdate(statusUpdate);

        if (FINAL_STATES.includes(task.status.state)) {
          if (task.artifacts && task.artifacts.length > 0) {
            for (const artifact of task.artifacts) {
              const artifactUpdate: TaskArtifactUpdateEvent = {
                kind: "artifact-update",
                taskId: task.id,
                contextId: executionStream.getContextId(),
                artifact,
                lastChunk: task.artifacts.length === 1,
                metadata: task.metadata,
              };
              executionStream.addUpdate(artifactUpdate);
              task.artifacts.shift();
            }
          }
          executionStream.setCompleted();
          return state;
        }
        const latestUserMessage = task.history
          ?.filter((msg) => msg.role === "user")
          ?.pop();
        if (!latestUserMessage) {
          throw INVALID_REQUEST("No user message found");
        }
        executionContext.command = latestUserMessage; //todo does this work?
        return state;
      },
    }
  );
  executionContext.events.on("error", (error) => {
    console.error("task/resubscribe/error", error);
  });
  executionContext.events.on("update", async (currentState, nextState) => {
    if (signal?.aborted) {
      return;
    }
    executionStream.addUpdate(nextState);
  });
  executionStream.setExecutionContext(executionContext);
  for await (const update of executionStream.stream(engine)) {
    yield update;
  }
}

export const resubscribeRoute = serviceProcedure
  .input(TaskIdParamsSchema)
  .output(
    zAsyncIterable({
      yield: SendStreamingMessageSuccessResultSchema,
    })
  )
  .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
      throw INVALID_REQUEST({ input: "No input" });
    }
    for await (const update of resubscribe(
      input,
      opts.signal ?? new AbortController().signal,
      opts.ctx
    )) {
      yield update;
    }
  });
