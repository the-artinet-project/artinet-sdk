/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventEmitter } from "events";
export class CommandChannel extends EventEmitter {
    _command;
    commands = [];
    resolvers = [];
    done = false;
    /**
     * @param command - The initial command to send
     * @note The initial command is tied to the channel and cannot be changed
     */
    constructor(_command) {
        super();
        this._command = _command;
        this.commands.push(_command);
    }
    /**
     * @returns True if the channel is open
     */
    get isOpen() {
        return !this.done;
    }
    /**
     * @returns The list of commands
     */
    get commandList() {
        return this.commands;
    }
    /**
     * @returns The current command
     */
    get command() {
        return this.commands[0] ?? this._command;
    }
    /**
     * @returns The command channel as an async iterable
     */
    [Symbol.asyncIterator]() {
        return this;
    }
    valueOf() {
        return this.command;
    }
    send(command) {
        if (this.done) {
            throw new Error("Command channel is closed");
        }
        const resolver = this.resolvers.shift();
        if (resolver) {
            resolver({ value: command, done: false });
        }
        else {
            this.commands.push(command);
        }
        this.emit("send", command);
    }
    close() {
        this.done = true;
        this.resolvers.forEach((resolver) => resolver({ value: undefined, done: true }));
        this.resolvers = [];
        this.emit("close");
    }
    async next() {
        if (this.commands.length)
            return Promise.resolve({ value: this.commands.shift(), done: false });
        if (this.done)
            return Promise.resolve({ value: undefined, done: true });
        return new Promise((resolve) => {
            this.resolvers.push(resolve);
        });
    }
    return(value) {
        this.close();
        this.commands = [];
        return Promise.resolve({ value, done: true });
    }
    static create(command) {
        const instance = new CommandChannel(command);
        return new Proxy(instance, {
            get(target, prop, _) {
                if (prop in target.command) {
                    return target.command[prop];
                }
                else if (prop in target) {
                    return target[prop];
                }
                return undefined;
            },
        });
    }
}
