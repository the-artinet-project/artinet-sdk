import {
  MessageSendParams,
  MessageSendParamsSchema,
  SendStreamingMessageSuccessResultSchema,
  TaskState,
} from "../../../../types/index.js";
import { ExecutionEnvironment } from "../../transport.js";
import { ExecutionStream } from "../stream.js";
import {
  createExecutionContext,
  serviceProcedure,
} from "../../procedures/service.js";
import { globalRepository } from "../../repository.js";
import {
  INVALID_PARAMS,
  SUBMITTED_UPDATE,
  WORKING_UPDATE,
} from "../../../../utils/index.js";
import { engine } from "../../repository.js";
import { zAsyncIterable } from "../../zAsyncIterable.js";

export async function* streamMessage(
  input: MessageSendParams,
  signal: AbortSignal,
  ctx: ExecutionEnvironment
) {
  let contextId = input.message.contextId;
  const executionContext = await createExecutionContext(
    input.message,
    signal,
    contextId,
    ctx.service
  );

  const executionStream = new ExecutionStream(executionContext);
  contextId = executionStream.getContextId();

  executionContext.events.on("update", async (currentState, nextState) => {
    if (signal?.aborted) {
      ctx.service?.addCancellation(contextId);
      return;
    }
    executionStream.addUpdate(nextState);
  });

  executionContext.events.on("complete", () => {
    globalRepository.getContextManager().deleteContext(contextId);
    executionStream.setCompleted();
  });

  executionContext.events.on("error", (error) => {
    console.error("message/stream/error", error);
  });

  executionContext.events.on("start", (request, currentState) => {
    let update =
      currentState?.task ??
      SUBMITTED_UPDATE(executionContext.command.taskId, contextId);
    executionStream.addUpdate({
      ...update,
      status: {
        ...update.status,
        state: TaskState.submitted,
      },
    });
    executionStream.addUpdate(
      WORKING_UPDATE(executionContext.command.taskId, contextId)
    ); //don't know why I was sending this working update here
  });
  for await (const update of executionStream.stream(engine)) {
    yield update;
  }
}

export const streamMessageRoute = serviceProcedure
  .input(MessageSendParamsSchema)
  .output(
    zAsyncIterable({
      yield: SendStreamingMessageSuccessResultSchema,
    })
  )
  .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
      throw INVALID_PARAMS({ input: "No input" });
    }
    for await (const update of streamMessage(
      input,
      opts.signal ?? new AbortController().signal,
      opts.ctx
    )) {
      yield update;
    }
  });
