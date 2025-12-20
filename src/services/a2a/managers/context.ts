/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2ARuntime, Core, ContextManagerInterface } from "~/types/index.js";
//todo move to core
export class ContextManager<
  TCommand extends A2ARuntime["command"] = A2ARuntime["command"],
  TState extends A2ARuntime["state"] = A2ARuntime["state"],
  TUpdate extends A2ARuntime["update"] = A2ARuntime["update"]
> implements ContextManagerInterface<TCommand, TState, TUpdate>
{
  private contexts: Map<string, Core<TCommand, TState, TUpdate>["context"]> =
    new Map();
  deleteContext(id: string) {
    this.contexts.delete(id);
  }
  setContext(id: string, context: Core<TCommand, TState, TUpdate>["context"]) {
    this.contexts.set(id, context);
  }
  getContext(id: string) {
    return this.contexts.get(id);
  }
}
