/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { agentInfoRoute } from "../routes/info.js";
import { messageRouter } from "../routes/message/route.js";
import { taskRouter } from "../routes/tasks/route.js";
import { router } from "../trpc.js";
export const createA2ARouter = () => {
    return router({
        agentCard: agentInfoRoute,
        message: messageRouter,
        tasks: taskRouter,
    });
};
export const createAgentRouter = createA2ARouter;
//# sourceMappingURL=router.js.map