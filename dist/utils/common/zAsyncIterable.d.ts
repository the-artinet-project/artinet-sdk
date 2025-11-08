/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import type { TrackedEnvelope } from "@trpc/server";
import { z } from "zod/v4";
/**
 * A Zod schema helper for validating async iterables with tracked envelopes.
 */
export declare function zAsyncIterable<TYieldIn, TYieldOut, TReturnIn = void, TReturnOut = void>(opts: {
    yield: z.ZodType<TYieldIn, TYieldOut>;
    return?: z.ZodType<TReturnIn, TReturnOut>;
    tracked: true;
}): z.ZodPipe<z.ZodCustom<AsyncIterable<TrackedEnvelope<TYieldIn>, TReturnIn>>, z.ZodTransform<AsyncGenerator<TrackedEnvelope<TYieldOut>, TReturnOut, unknown>, AsyncIterable<TrackedEnvelope<TYieldIn>, TReturnIn>>>;
/**
 * A Zod schema helper for validating async iterables without tracking.
 */
export declare function zAsyncIterable<TYieldIn, TYieldOut, TReturnIn = void, TReturnOut = void>(opts: {
    yield: z.ZodType<TYieldIn, TYieldOut>;
    return?: z.ZodType<TReturnIn, TReturnOut>;
    tracked?: false;
}): z.ZodPipe<z.ZodCustom<AsyncIterable<TYieldIn, TReturnIn>>, z.ZodTransform<AsyncGenerator<TYieldOut, TReturnOut, unknown>, AsyncIterable<TYieldIn, TReturnIn>>>;
