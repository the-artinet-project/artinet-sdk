/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * We're starting with simple base types for the core context.
 * The base types will expand as we determine what is common across all services.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CoreCommand<TCommand extends {} = {}> = TCommand;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CoreState<TState extends {} = {}> = TState;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CoreUpdate<TUpdate extends {} = {}> = TUpdate;
