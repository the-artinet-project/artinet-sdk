import { describe, it, expect } from "@jest/globals";
import { describe as des6, A2A } from "../../src/index.js";

describe("Message Builder Tests", () => {
  it("should create MessageSendParams", () => {
    const params: A2A.MessageSendParams = des6.messageSendParams("hello there");
    expect(params).toBeDefined();
    expect(params.message).toBeDefined();
    // Note: Message.create defaults to "agent" role - see TODO in message-builder.ts
    expect(params.message.role).toBe("agent");
    expect(params.message.kind).toBe("message");
    expect(params.message.messageId).toBeDefined();
    expect(params.message.parts).toBeDefined();
    expect(params.message.parts.length).toBe(1);
    expect((params.message.parts[0] as A2A.TextPart).text).toBe("hello there");
  });

  it("should create MessageSendParams with explicit user role", () => {
    const params: A2A.MessageSendParams = des6.messageSendParams({
      message: {
        role: "user",
        parts: [{ kind: "text", text: "hello there" }],
      },
    });
    expect(params).toBeDefined();
    expect(params.message.role).toBe("user");
  });
  it("should create full MessageSendParams", () => {
    const params: A2A.MessageSendParams = des6.messageSendParams({
      message: {
        role: "user",
        kind: "message",
        parts: [{ text: "hello there", kind: "text" }],
        messageId: "123",
        metadata: {
          foo: "bar",
        },
        extensions: ["baz"],
        referenceTaskIds: ["456"],
        contextId: "789",
        taskId: "101",
      },
      configuration: {
        acceptedOutputModes: ["text"],
        historyLength: 10,
        pushNotificationConfig: {
          url: "https://example.com",
          id: "123",
          token: "456",
          authentication: {
            schemes: ["bearer"],
          },
        },
        blocking: true,
      },
      metadata: {
        foo: "bar",
      },
    });
    expect(params).toBeDefined();
    expect(params.message).toBeDefined();
    expect(params.message.role).toBe("user");
    expect(params.message.parts).toBeDefined();
    expect(params.message.parts.length).toBe(1);
    expect((params.message.parts[0] as A2A.TextPart).text).toBe("hello there");
    expect(params.message.messageId).toBe("123");
    expect(params.message.metadata).toBeDefined();
    expect(params.message.metadata?.foo).toBe("bar");
    expect(params.message.extensions).toBeDefined();
    expect(params.message.extensions?.length).toBe(1);
    expect(params.message.extensions?.[0]).toBe("baz");
    expect(params.message.referenceTaskIds).toBeDefined();
    expect(params.message.referenceTaskIds?.length).toBe(1);
    expect(params.message.referenceTaskIds?.[0]).toBe("456");
    expect(params.message.contextId).toBe("789");
    expect(params.message.taskId).toBe("101");
    expect(params.configuration).toBeDefined();
    expect(params.configuration?.acceptedOutputModes).toBeDefined();
    expect(params.configuration?.acceptedOutputModes?.length).toBe(1);
    expect(params.configuration?.acceptedOutputModes?.[0]).toBe("text");
    expect(params.configuration?.historyLength).toBe(10);
    expect(params.configuration?.pushNotificationConfig).toBeDefined();
    expect(params.configuration?.pushNotificationConfig?.url).toBe(
      "https://example.com"
    );
    expect(params.configuration?.pushNotificationConfig?.id).toBe("123");
    expect(params.configuration?.pushNotificationConfig?.token).toBe("456");
    expect(
      params.configuration?.pushNotificationConfig?.authentication
    ).toBeDefined();
    expect(
      params.configuration?.pushNotificationConfig?.authentication?.schemes
    ).toBeDefined();
    expect(
      params.configuration?.pushNotificationConfig?.authentication?.schemes
        ?.length
    ).toBe(1);
    expect(
      params.configuration?.pushNotificationConfig?.authentication?.schemes?.[0]
    ).toBe("bearer");
    expect(params.configuration?.blocking).toBe(true);
  });
});
