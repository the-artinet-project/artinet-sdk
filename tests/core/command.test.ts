import { describe, it, expect, jest } from "@jest/globals";
import { CommandChannel } from "../../src/index.js";

describe.skip("CommandChannel", () => {
  it("should create channel", () => {
    const command = new CommandChannel("test-command");
    expect(command).toBeDefined();
    expect(command.commandList).toHaveLength(1);
    expect(command.commandList[0]).toBe("test-command");
  });

  it("should be open by default", () => {
    const command = new CommandChannel("test-command");
    expect(command.isOpen).toBe(true);
  });

  it("should close channel", () => {
    const channel = new CommandChannel("test-command");
    channel.close();
    expect(channel.commandList).toHaveLength(1);
    expect(channel.isOpen).toBe(false);
  });

  it("should get command", () => {
    const command = new CommandChannel<string>("test-command");
    const value: string = command.command;
    expect(value).toBe("test-command");
  });

  it("should send command", () => {
    const channel = new CommandChannel("test-command");
    channel.send("test-command-2");
    expect(channel.commandList).toHaveLength(2);
    expect(channel.commandList[0]).toBe("test-command");
    expect(channel.commandList[1]).toBe("test-command-2");
  });

  it("should get next command", async () => {
    const channel = new CommandChannel("test-command");
    channel.send("test-command-2");
    const result = await channel.next();
    expect(result).toEqual({ value: "test-command", done: false });
    expect(channel.commandList).toHaveLength(1);
    expect(channel.commandList[0]).toBe("test-command-2");
  });

  it("should get current command", async () => {
    const channel = new CommandChannel("test-command");
    channel.send("test-command-2");
    const result = await channel.next();
    expect(result).toEqual({ value: "test-command", done: false });
    expect(channel.command).toBe("test-command-2");
  });

  it("should emit send event", () => {
    const command = new CommandChannel("test-command");
    const spy = jest.spyOn(command, "send");
    command.send("test-command-2");
    expect(spy).toHaveBeenCalledWith("test-command-2");
  });

  it("should emit close event", () => {
    const command = new CommandChannel("test-command");
    const spy = jest.spyOn(command, "close");
    command.close();
    expect(spy).toHaveBeenCalled();
  });

  it("should emit next event", async () => {
    const command = new CommandChannel("test-command");
    const spy = jest.spyOn(command, "next");
    const result = await command.next();
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual({ value: "test-command", done: false });
    expect(command.commandList).toHaveLength(0);
  });

  it("should return command", async () => {
    const command = new CommandChannel("test-command");
    const result = await command.return("test-command-2");
    expect(result).toEqual({ value: "test-command-2", done: true });
    expect(command.commandList).toHaveLength(0);
  });

  it("should be iterable", async () => {
    const channel = new CommandChannel("test-command");
    channel.send("test-command-2");
    channel.send("test-command-3");
    channel.close();
    const result: string[] = [];
    for await (const command of channel) {
      result.push(command);
    }
    expect(result).toEqual([
      "test-command",
      "test-command-2",
      "test-command-3",
    ]);
  });

  it("should access command properties", async () => {
    const command = {
      message: "test-command",
    };
    const channel = CommandChannel.create<{ message: string }>(command);
    channel.send({ message: "test-command-2" });
    channel.send({ message: "test-command-3" });
    channel.close();
    expect(channel.message).toBe("test-command");
  });
});
