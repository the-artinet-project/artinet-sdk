/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventEmitter } from "events";
import { Core } from "./context.js";
export interface CommandChannelMap<
  TCommand extends Core["command"] = Core["command"]
> {
  send: [TCommand]; //may change to recieved
  close: [];
}

export interface SendCommandInterface<
  TCommand extends Core["command"] = Core["command"]
> {
  isOpen: boolean;
  send(command: TCommand): void;
}

export interface ReceiveCommandInterface<
  TCommand extends Core["command"] = Core["command"]
> extends AsyncIterable<TCommand, TCommand, TCommand | undefined>,
    EventEmitter<CommandChannelMap<TCommand>> {
  command: TCommand;
  commandList: TCommand[];
  close(): void;
  next(): Promise<IteratorResult<TCommand>>;
  return(value: TCommand): Promise<IteratorResult<TCommand>>;
}

export type ReceiveCommandProxyInterface<
  TCommand extends Core["command"] = Core["command"]
> = ReceiveCommandInterface<TCommand> & TCommand;

export interface CommandChannelInterface<
  TCommand extends Core["command"] = Core["command"]
> extends ReceiveCommandInterface<TCommand>,
    SendCommandInterface<TCommand> {}

export type CommandChannelProxyInterface<
  TCommand extends Core["command"] = Core["command"]
> = CommandChannelInterface<TCommand> & TCommand;
