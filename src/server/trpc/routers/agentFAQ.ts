import { AgentCardSchema } from "../../../types/index.js";
import { agentProcedure } from "../procedures/service.js";

export const agentInfoRoute = agentProcedure
  .output(AgentCardSchema)
  .query(async ({ ctx }) => {
    return ctx.service.getAgentCard();
  });
