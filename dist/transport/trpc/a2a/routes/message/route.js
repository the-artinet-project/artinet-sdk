/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { router, A2AProcedure } from "../../trpc.js";
import { INVALID_PARAMS, zAsyncIterable } from "../../../../../utils/index.js";
import { MessageSendParamsSchema, SendMessageSuccessResultSchema, SendStreamingMessageSuccessResultSchema, } from "../../../../../types/index.js";
const sendMessageRoute = A2AProcedure.input(MessageSendParamsSchema)
    .output(SendMessageSuccessResultSchema)
    .mutation(async (opts) => {
    const { input } = opts;
    if (!input) {
        throw INVALID_PARAMS({ input: "No request detected" });
    }
    return await opts.ctx.service.sendMessage(input, {
        engine: opts.ctx.engine,
        signal: opts.signal,
    });
});
const streamMessageRoute = A2AProcedure.input(MessageSendParamsSchema)
    .output(zAsyncIterable({
    yield: SendStreamingMessageSuccessResultSchema,
}))
    .subscription(async function* (opts) {
    const { input } = opts;
    if (!input) {
        throw INVALID_PARAMS({ input: "No request detected" });
    }
    yield* opts.ctx.service.streamMessage(input, {
        engine: opts.ctx.engine,
        signal: opts.signal,
    });
});
export const messageRouter = router({
    send: sendMessageRoute,
    stream: streamMessageRoute,
});
