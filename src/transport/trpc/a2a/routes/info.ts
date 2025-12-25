/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { A2AProcedure } from "../trpc.js";

export const agentCardRoute = A2AProcedure.output(A2A.AgentCardSchema).query(
  async ({ ctx }) => {
    return ctx.service.agentCard;
  }
);
/**
 * @deprecated use agentCardRoute instead
 */
export const agentInfoRoute = agentCardRoute;
