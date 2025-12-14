/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A, Core, ContextManagerInterface } from "~/types/index.js";
//todo move to core
export class ContextManager<
  TCommand extends A2A["command"] = A2A["command"],
  TState extends A2A["state"] = A2A["state"],
  TUpdate extends A2A["update"] = A2A["update"]
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
