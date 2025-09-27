import type { TrackedEnvelope } from "@trpc/server";
import { z } from "zod";
/**
 * A Zod schema helper designed specifically for validating async iterables. This schema ensures that:
 * 1. The value being validated is an async iterable.
 * 2. Each item yielded by the async iterable conforms to a specified type.
 * 3. The return value of the async iterable, if any, also conforms to a specified type.
 */
export declare function zAsyncIterable<TYieldIn, TYieldOut, TReturnIn = void, TReturnOut = void, Tracked extends boolean = false>(opts: {
    /**
     * Validate the value yielded by the async generator
     */
    yield: z.ZodType<TYieldIn, any, TYieldOut>;
    /**
     * Validate the return value of the async generator
     * @remark not applicable for subscriptions
     */
    return?: z.ZodType<TReturnIn, any, TReturnOut>;
    /**
     * Whether if the yielded values are tracked
     * @remark only applicable for subscriptions
     */
    tracked?: Tracked;
}): z.ZodType<AsyncIterable<Tracked extends true ? TrackedEnvelope<TYieldIn> : TYieldIn, TReturnIn, unknown>, any, AsyncIterable<Tracked extends true ? TrackedEnvelope<TYieldOut> : TYieldOut, TReturnOut, unknown>>;
//# sourceMappingURL=zAsyncIterable-v3.d.ts.map