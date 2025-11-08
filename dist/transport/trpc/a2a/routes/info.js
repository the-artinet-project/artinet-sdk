/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { AgentInfoSchema } from "../../../../types/index.js";
import { A2AProcedure } from "../trpc.js";
export const agentInfoRoute = A2AProcedure.output(AgentInfoSchema).query(async ({ ctx }) => {
    return ctx.service.agentCard;
});
