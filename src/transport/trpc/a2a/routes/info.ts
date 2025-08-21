import { AgentInfoSchema } from "~/types/index.js";
import { A2AProcedure } from "../trpc.js";

export const agentInfoRoute = A2AProcedure.output(AgentInfoSchema).query(
  async ({ ctx }) => {
    return ctx.service.getAgentCard();
  }
);
