/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import type { TrackedEnvelope } from "@trpc/server";
import { isTrackedEnvelope, tracked } from "@trpc/server";
import { z } from "zod/v4";

function isAsyncIterable<TValue, TReturn = unknown>(
  value: unknown
): value is AsyncIterable<TValue, TReturn> {
  return !!value && typeof value === "object" && Symbol.asyncIterator in value;
}

const trackedEnvelopeSchema =
  z.custom<TrackedEnvelope<unknown>>(isTrackedEnvelope);

/**
 * A Zod schema helper for validating async iterables with tracked envelopes.
 */
export function zAsyncIterable<
  TYieldIn,
  TYieldOut,
  TReturnIn = void,
  TReturnOut = void,
>(opts: {
  yield: z.ZodType<TYieldIn, TYieldOut>;
  return?: z.ZodType<TReturnIn, TReturnOut>;
  tracked: true;
}): z.ZodPipe<
  z.ZodCustom<AsyncIterable<TrackedEnvelope<TYieldIn>, TReturnIn>>,
  z.ZodTransform<
    AsyncGenerator<TrackedEnvelope<TYieldOut>, TReturnOut, unknown>,
    AsyncIterable<TrackedEnvelope<TYieldIn>, TReturnIn>
  >
>;

/**
 * A Zod schema helper for validating async iterables without tracking.
 */
export function zAsyncIterable<
  TYieldIn,
  TYieldOut,
  TReturnIn = void,
  TReturnOut = void,
>(opts: {
  yield: z.ZodType<TYieldIn, TYieldOut>;
  return?: z.ZodType<TReturnIn, TReturnOut>;
  tracked?: false;
}): z.ZodPipe<
  z.ZodCustom<AsyncIterable<TYieldIn, TReturnIn>>,
  z.ZodTransform<
    AsyncGenerator<TYieldOut, TReturnOut, unknown>,
    AsyncIterable<TYieldIn, TReturnIn>
  >
>;

/**
 * Implementation of the async iterable validator
 */
export function zAsyncIterable<
  TYieldIn,
  TYieldOut,
  TReturnIn = void,
  TReturnOut = void,
>(opts: {
  yield: z.ZodType<TYieldIn, TYieldOut>;
  return?: z.ZodType<TReturnIn, TReturnOut>;
  tracked?: boolean;
}) {
  return z
    .custom<AsyncIterable<TrackedEnvelope<TYieldIn> | TYieldIn, TReturnIn>>(
      (val) => isAsyncIterable(val)
    )
    .transform(async function* (iter) {
      const iterator = iter[Symbol.asyncIterator]();
      try {
        let next;
        while ((next = await iterator.next()) && !next.done) {
          if (opts.tracked) {
            const [id, data] = trackedEnvelopeSchema.parse(next.value);
            const parsedData = await opts.yield.parseAsync(data);
            yield tracked(id, parsedData);
            continue;
          }
          yield await opts.yield.parseAsync(next.value);
        }
        if (opts.return && next?.value !== undefined) {
          return await opts.return.parseAsync(next.value);
        }
        return undefined as TReturnOut;
      } finally {
        await iterator.return?.();
      }
    });
}
