import { globalRepository } from "./procedures/service.js";
import { agentFAQRouter } from "./routers/agentFAQ.js";
import { messageRouter } from "./routers/message/router.js";
import { taskRouter } from "./routers/tasks/router.js";
import { router } from "./transport.js";

export const agentRouter = router({
  agentCard: agentFAQRouter,
  message: messageRouter,
  tasks: taskRouter,
});
export type AgentRouter = typeof agentRouter;

const agent = agentRouter.createCaller({
  session: {
    id: "test",
  },
  auth: {
    userId: "test",
  },
  service: globalRepository.getService(),
});

agent.message.send({
  message: {
    messageId: "test",
    kind: "message",
    role: "user",
    parts: [{ kind: "text", text: "hello world" }],
  },
});
