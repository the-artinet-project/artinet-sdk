import { describe, it, expect, jest } from "@jest/globals";
import { Messenger } from "../../src/index.js";
import { A2A } from "../../src/types/index.js";
import { describe as des6 } from "../../src/index.js";

// Helper to create a stable message with a fixed messageId for testing
const createTestMessage = (text: string, messageId = "test-message-id") => {
  const params = des6.messageSendParams(text);
  params.message.messageId = messageId;
  return params;
};

describe("Messenger", () => {
  it("should create messenger", () => {
    const msg = createTestMessage("test-message");
    const messenger = Messenger.create(msg);
    expect(messenger).toBeDefined();
    expect(messenger.messages).toHaveLength(1);
    // Use toEqual for deep comparison, not toBe for reference equality
    expect(messenger.messages[0]).toEqual(msg);
  });

  it("should be open by default", () => {
    const msg = createTestMessage("test-message");
    const messenger = Messenger.create(msg);
    expect(messenger.isOpen).toBe(true);
  });

  it("should close messenger", () => {
    const msg = createTestMessage("test-message");
    const messenger = Messenger.create(msg);
    messenger.close();
    expect(messenger.messages).toHaveLength(1);
    expect(messenger.isOpen).toBe(false);
  });

  it("should get message", () => {
    const msg = createTestMessage("test-message");
    const messenger = Messenger.create(msg);
    // Note: Due to Proxy behavior, messenger.message returns the inner Message object,
    // not the full MessageSendParams. Use messenger.messages[0] for full MessageSendParams.
    const value = messenger.message;
    expect(value).toEqual(msg.message);
  });

  it("should send message", () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const messenger = Messenger.create(msg1);
    messenger.send(msg2);
    expect(messenger.messages).toHaveLength(2);
    expect(messenger.messages[0]).toEqual(msg1);
    expect(messenger.messages[1]).toEqual(msg2);
  });

  it("should get next message", async () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const messenger = Messenger.create(msg1);
    messenger.send(msg2);
    const result = await messenger.next();
    expect(result).toEqual({
      value: msg1,
      done: false,
    });
    expect(messenger.messages).toHaveLength(1);
    expect(messenger.messages[0]).toEqual(msg2);
  });

  it("should get current message", async () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const messenger = Messenger.create(msg1);
    messenger.send(msg2);
    const result = await messenger.next();
    expect(result).toEqual({
      value: msg1,
      done: false,
    });
    // Note: Due to Proxy behavior, messenger.message returns the inner Message object
    expect(messenger.message).toEqual(msg2.message);
  });

  it("should emit send event", () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const messenger = Messenger.create(msg1);
    const spy = jest.spyOn(messenger, "send");
    messenger.send(msg2);
    expect(spy).toHaveBeenCalledWith(msg2);
  });

  it("should emit close event", () => {
    const msg = createTestMessage("test-message");
    const messenger = Messenger.create(msg);
    const spy = jest.spyOn(messenger, "close");
    messenger.close();
    expect(spy).toHaveBeenCalled();
  });

  it("should emit next event", async () => {
    const msg = createTestMessage("test-message");
    const messenger = Messenger.create(msg);
    const spy = jest.spyOn(messenger, "next");
    const result = await messenger.next();
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual({
      value: msg,
      done: false,
    });
    expect(messenger.messages).toHaveLength(0);
  });

  it("should return message", async () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const messenger = Messenger.create(msg1);
    const result = await messenger.return(msg2);
    expect(result).toEqual({
      value: msg2,
      done: true,
    });
    expect(messenger.messages).toHaveLength(0);
  });

  it("should be iterable", async () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const msg3 = createTestMessage("test-message-3", "msg-id-3");
    const messenger = Messenger.create(msg1);
    messenger.send(msg2);
    messenger.send(msg3);
    messenger.close();
    const result: A2A.MessageSendParams[] = [];
    for await (const message of messenger) {
      result.push(message);
    }
    expect(result).toEqual([msg1, msg2, msg3]);
  });

  it("should access messenger properties", async () => {
    const msg1 = createTestMessage("test-message", "msg-id-1");
    const msg2 = createTestMessage("test-message-2", "msg-id-2");
    const msg3 = createTestMessage("test-message-3", "msg-id-3");
    const messenger = Messenger.create(msg1);
    messenger.send(msg2);
    messenger.send(msg3);
    messenger.close();
    // Note: Due to Proxy behavior, messenger.message returns the inner Message object
    expect(messenger.message).toEqual(msg1.message);
  });
});
