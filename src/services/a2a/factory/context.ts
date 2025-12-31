/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A2A Context Factory Functions
 *
 * This module provides factory functions for creating A2A execution contexts
 * and command channels. It handles the composition of various context components
 * including command proxies, event managers, and cancellation mechanisms.
 *
 * @module A2AContextFactory
 * @version 0.6.0-preview
 * @since 0.5.6
 * @author The Artinet Project
 */

import { createStateMachine } from "./state-machine.js";
import { v4 as uuidv4 } from "uuid";
import { A2A } from "~/types/index.js";
import { StateMachine } from "~/services/a2a/state-machine.js";

export function createBaseContext({
  contextId = uuidv4(),
  service,
  task,
  overrides,
  abortSignal = new AbortController().signal,
}: {
  contextId: string;
  service: A2A.Service;
  task: A2A.Task;
  overrides?: Partial<Omit<A2A.EventConsumer, "contextId">>;
  abortSignal?: AbortSignal;
}): A2A.BaseContext {
  const isCancelled = async () =>
    (await service.cancellations.has(task.id)) || abortSignal.aborted;

  const getState = async (args?: string) =>
    args ? await service.tasks.get(args) : task;

  const context: A2A.BaseContext = {
    contextId: contextId,
    service: service,
    publisher: createStateMachine({ contextId, service, task, overrides }),
    isCancelled,
    abortSignal: abortSignal,
    getState,
  };
  return context;
}

export function createContext({
  baseContext,
  taskId,
  messenger,
  extensions,
  references,
}: {
  baseContext: A2A.BaseContext;
  taskId: string;
  messenger: A2A.MessageConsumerProxy;
  extensions?: A2A.AgentExtension[];
  references?: A2A.Task[];
}): A2A.Context {
  const getTask = async () =>
    (baseContext.publisher as StateMachine).currentTask;

  const context: A2A.Context = {
    ...baseContext,
    taskId,
    userMessage: messenger.message,
    messages: messenger,
    getTask,
    extensions: extensions,
    references: references,
  };
  return context;
}
