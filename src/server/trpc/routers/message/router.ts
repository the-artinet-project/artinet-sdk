import { INVALID_PARAMS } from "../../../../utils/index.js";
import { router } from "../../transport.js";
import { serviceProcedure } from "../../procedures/service.js";
import { zAsyncIterable } from "../../zAsyncIterable.js";
import {
  MessageSendParamsSchema,
  SendMessageSuccessResultSchema,
  SendStreamingMessageSuccessResultSchema,
} from "../../../../types/index.js";
import { A2AServiceImpl } from "../../protocol/index.js";

const sendMessageRoute = serviceProcedure
  .input(MessageSendParamsSchema)
  .output(SendMessageSuccessResultSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    if (!input) {
      throw INVALID_PARAMS({ input: "No input" });
    }
    return await (opts.ctx.service as A2AServiceImpl).sendMessage(
      input,
      opts.signal
    );
  });

const streamMessageRoute = serviceProcedure
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
    yield* (opts.ctx.service as A2AServiceImpl).streamMessage(
      input,
      opts.signal
    );
  });

export const messageRouter = router({
  send: sendMessageRoute,
  stream: streamMessageRoute,
});
