/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { CoreCommand } from "./types.js";
import { EventEmitter } from "events";
export interface CommandChannelMap<TCommand extends CoreCommand = CoreCommand> {
    send: [TCommand];
    close: [];
}
export interface SendCommandInterface<TCommand extends CoreCommand = CoreCommand> {
    isOpen: boolean;
    send(command: TCommand): void;
}
export interface ReceiveCommandInterface<TCommand extends CoreCommand = CoreCommand> extends AsyncIterable<TCommand, TCommand, TCommand | undefined>, EventEmitter<CommandChannelMap<TCommand>> {
    command: TCommand;
    commandList: TCommand[];
    close(): void;
    next(): Promise<IteratorResult<TCommand>>;
    return(value: TCommand): Promise<IteratorResult<TCommand>>;
}
export type ReceiveCommandProxyInterface<TCommand extends CoreCommand = CoreCommand> = ReceiveCommandInterface<TCommand> & TCommand;
export interface CommandChannelInterface<TCommand extends CoreCommand = CoreCommand> extends ReceiveCommandInterface<TCommand>, SendCommandInterface<TCommand> {
}
export type CommandChannelProxyInterface<TCommand extends CoreCommand = CoreCommand> = CommandChannelInterface<TCommand> & TCommand;
