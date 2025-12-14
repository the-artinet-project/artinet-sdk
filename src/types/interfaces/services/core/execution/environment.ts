/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { Core } from "../context/index.js";
import { ServiceInterface } from "../service.js";
import { ExecutionEngine } from "./engine.js";

export interface ExecutionEnvironment<
  TCommand extends Core["command"] = Core["command"],
  TState extends Core["state"] = Core["state"],
  TUpdate extends Core["update"] = Core["update"]
> {
  service: ServiceInterface<TCommand, TState, TUpdate>;
  engine?: ExecutionEngine<TCommand, TState, TUpdate>;
}
