/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { router, A2AProcedure } from "../../trpc.js";
import { INVALID_PARAMS } from "~/utils/common/errors.js";
import { zAsyncIterable } from "~/utils/common/zAsyncIterable.js";
import { A2A } from "~/types/index.js";

const sendMessageRoute = A2AProcedure.input(A2A.MessageSendParamsSchema)
  .output(A2A.SendMessageSuccessResultSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    if (!input) {
      throw INVALID_PARAMS({ input: "No request detected" });
    }
    return await opts.ctx.service.sendMessage(input, opts.ctx.context);
  });

const streamMessageRoute = A2AProcedure.input(A2A.MessageSendParamsSchema)
  .output(
    zAsyncIterable({
      yield: A2A.SendStreamingMessageSuccessResultSchema,
    })
  )
  .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
      throw INVALID_PARAMS({ input: "No request detected" });
    }
    yield* opts.ctx.service.streamMessage(input, opts.ctx.context);
  });

export const messageRouter = router({
  send: sendMessageRoute,
  stream: streamMessageRoute,
});
