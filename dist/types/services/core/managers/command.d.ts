/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { CoreCommand, CommandChannelInterface, CommandChannelProxyInterface, CommandChannelMap } from "../../../types/index.js";
import { EventEmitter } from "events";
export declare class CommandChannel<TCommand extends CoreCommand = CoreCommand> extends EventEmitter<CommandChannelMap<TCommand>> implements CommandChannelInterface<TCommand> {
    private readonly _command;
    private commands;
    private resolvers;
    private done;
    /**
     * @param command - The initial command to send
     * @note The initial command is tied to the channel and cannot be changed
     */
    constructor(_command: TCommand);
    /**
     * @returns True if the channel is open
     */
    get isOpen(): boolean;
    /**
     * @returns The list of commands
     */
    get commandList(): TCommand[];
    /**
     * @returns The current command
     */
    get command(): TCommand;
    /**
     * @returns The command channel as an async iterable
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<TCommand, TCommand, TCommand | undefined>;
    valueOf(): TCommand;
    send(command: TCommand): void;
    close(): void;
    next(): Promise<IteratorResult<TCommand>>;
    return(value: TCommand): Promise<IteratorResult<TCommand>>;
    static create<TCommand extends CoreCommand = CoreCommand>(command: TCommand): CommandChannelProxyInterface<TCommand>;
}
//# sourceMappingURL=command.d.ts.map