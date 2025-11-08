import { isTrackedEnvelope, tracked } from "@trpc/server";
import { z } from "zod";
// v3 version of: https://trpc.io/docs/server/subscriptions#output-validation
function isAsyncIterable(value) {
    return !!value && typeof value === "object" && Symbol.asyncIterator in value;
}
const trackedEnvelopeSchema = z.custom(isTrackedEnvelope);
/**
 * A Zod schema helper designed specifically for validating async iterables. This schema ensures that:
 * 1. The value being validated is an async iterable.
 * 2. Each item yielded by the async iterable conforms to a specified type.
 * 3. The return value of the async iterable, if any, also conforms to a specified type.
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
                    yield tracked(id, await opts.yield.parseAsync(data));
                    continue;
                }
                yield opts.yield.parseAsync(next.value);
            }
            if (opts.return) {
                return await opts.return.parseAsync(next.value);
            }
            return;
        }
        finally {
            await iterator.return?.();
        }
    });
}
