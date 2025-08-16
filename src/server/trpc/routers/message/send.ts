import {
  createExecutionContext,
  serviceProcedure,
} from "../../procedures/service.js";
import { ExecutionEnvironment } from "../../transport.js";
import {
  MessageSendParams,
  MessageSendParamsSchema,
  SendMessageSuccessResultSchema,
} from "../../../../types/index.js";
import { globalRepository } from "../../repository.js";
import { execute } from "../../protocol/index.js";
import { engine } from "../../repository.js";
import { INVALID_PARAMS } from "../../../../utils/index.js";

export async function sendMessage(
  input: MessageSendParams,
  signal: AbortSignal,
  ctx: ExecutionEnvironment
) {
  const contextId = input.message.contextId;
  const context = await createExecutionContext(
    input.message,
    signal,
    contextId,
    ctx.service
  );

  context.events.on("complete", () => {
    globalRepository
      .getContextManager()
      .deleteContext(context.events.contextId);
  });

  await execute(engine, context);
  const state = context.events.getState();
  return state?.task ?? state;
}

export const sendMessageRoute = serviceProcedure
  .input(MessageSendParamsSchema)
  .output(SendMessageSuccessResultSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    if (!input) {
      throw INVALID_PARAMS({ input: "No input" });
    }
    return await sendMessage(
      input,
      opts.signal ?? new AbortController().signal,
      opts.ctx
    );
  });
