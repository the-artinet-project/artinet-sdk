/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { isTrackedEnvelope, tracked } from "@trpc/server";
import { z } from "zod/v4";
// v4 version of: https://trpc.io/docs/server/subscriptions#output-validation
function isAsyncIterable(value) {
    return !!value && typeof value === "object" && Symbol.asyncIterator in value;
}
const trackedEnvelopeSchema = z.custom(isTrackedEnvelope);
/**
 * Implementation of the async iterable validator
 */
export function zAsyncIterable(opts) {
    return z
        .custom((val) => isAsyncIterable(val))
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
            return undefined;
        }
        finally {
            await iterator.return?.();
        }
    });
}
//# sourceMappingURL=zAsyncIterable.js.map