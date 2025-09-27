/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
export const coreExecute = async (engine, context) => {
    try {
        if (context.events.onStart) {
            await context.events.onStart(context);
        }
        for await (const update of engine(context)) {
            if (context.isCancelled() || context.signal.aborted) {
                await context.events.onCancel(update);
                break;
            }
            await context.events.onUpdate(update);
        }
    }
    catch (error) {
        context.events.onError(error);
        throw error;
    }
    finally {
        context.events.onComplete();
    }
};
//# sourceMappingURL=execute.js.map