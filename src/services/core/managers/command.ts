/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Core,
  CommandChannelInterface,
  CommandChannelProxyInterface,
  CommandChannelMap,
} from "~/types/index.js";
import { EventEmitter } from "events";

export class CommandChannel<TCommand extends Core["command"] = Core["command"]>
  extends EventEmitter<CommandChannelMap<TCommand>>
  implements CommandChannelInterface<TCommand>
{
  private commands: TCommand[] = [];
  private resolvers: ((command: IteratorResult<TCommand>) => void)[] = [];
  private done = false;

  /**
   * @param command - The initial command to send
   * @note The initial command is tied to the channel and cannot be changed
   */
  constructor(private readonly _command: TCommand) {
    super();
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
  get commandList(): TCommand[] {
    return this.commands;
  }

  /**
   * @returns The current command
   */
  get command(): TCommand {
    return this.commands[0] ?? this._command;
  }

  /**
   * @returns The command channel as an async iterable
   */
  [Symbol.asyncIterator](): AsyncIterableIterator<
    TCommand,
    TCommand,
    TCommand | undefined
  > {
    return this;
  }

  valueOf(): TCommand {
    return this.command;
  }

  send(command: TCommand) {
    if (this.done) {
      throw new Error("Command channel is closed");
    }
    const resolver = this.resolvers.shift();
    if (resolver) {
      resolver({ value: command, done: false });
    } else {
      this.commands.push(command);
    }
    this.emit("send", command);
  }

  close() {
    this.done = true;
    this.resolvers.forEach((resolver) =>
      resolver({ value: undefined, done: true })
    );
    this.resolvers = [];
    this.emit("close");
  }

  async next(): Promise<IteratorResult<TCommand>> {
    if (this.commands.length)
      return Promise.resolve({ value: this.commands.shift()!, done: false });
    if (this.done) return Promise.resolve({ value: undefined, done: true });
    return new Promise((resolve) => {
      this.resolvers.push(resolve);
    });
  }

  return(value: TCommand): Promise<IteratorResult<TCommand>> {
    this.close();
    this.commands = [];
    return Promise.resolve({ value, done: true });
  }

  static create<TCommand extends Core["command"] = Core["command"]>(
    command: TCommand
  ): CommandChannelProxyInterface<TCommand> {
    const instance = new CommandChannel<TCommand>(command);
    return new Proxy(instance, {
      get(target: CommandChannel<TCommand>, prop: string | symbol, _): any {
        if (prop in target.command) {
          return target.command[prop as keyof TCommand];
        } else if (prop in target) {
          return target[prop as keyof CommandChannel<TCommand>];
        }
        return undefined;
      },
    }) as CommandChannel<TCommand> & TCommand;
  }
}
