/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { Core } from "../context/index.js";

/**
 * @description The context manager interface.
 * @type {ContextManagerInterface<TCommand, TState>}
 * @note This will become an increasingly important part of the system as Context Engineering becomes more important.
 * currently it is used to store & retrieve contexts from storage but greater degrees of control may be needed.
 * ex. forking/merging contexts, forwarding contexts to other services, nesting contexts, etc.
 */
export interface ContextManagerInterface<
  TCommand extends Core["command"] = Core["command"],
  TState extends Core["state"] = Core["state"],
  TUpdate extends Core["update"] = Core["update"]
> {
  getContext: (
    id: string
  ) => Core<TCommand, TState, TUpdate>["context"] | undefined;
  setContext: (
    id: string,
    context: Core<TCommand, TState, TUpdate>["context"]
  ) => void;
  deleteContext: (id: string) => void;
}
