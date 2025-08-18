import { globalRepository } from "./repository.js";
import { agentInfoRoute } from "./routers/agentFAQ.js";
import { messageRouter } from "./routers/message/router.js";
import { taskRouter } from "./routers/tasks/router.js";
import { publicProcedure, router } from "./transport.js";

export interface CreateAgentRouterParams {}

export const createAgentRouter = (params: CreateAgentRouterParams) => {
  console.log("createAgentRouter", params);
  return router({
    test: publicProcedure.query(() => "Hello, world!"),
    agentCard: agentInfoRoute,
    message: messageRouter,
    tasks: taskRouter,
  });
};

export type AgentRouter = Awaited<ReturnType<typeof createAgentRouter>>;
export { globalRepository };
