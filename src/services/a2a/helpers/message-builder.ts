/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2A } from "~/types/index.js";
import { v4 as uuidv4 } from "uuid";

export class MessageBuilder {
  message: A2A.Message = {
    role: "user",
    parts: [],
    metadata: undefined,
    extensions: undefined,
    referenceTaskIds: undefined,
    messageId: uuidv4(),
    taskId: undefined,
    contextId: undefined,
    kind: "message",
  };
  constructor(message: Partial<A2A.Message> = {}) {
    this.message.role = message.role ?? this.message.role;
    this.message.parts = message.parts ?? this.message.parts;
    this.message.metadata = message.metadata ?? this.message.metadata;
    this.message.extensions = message.extensions ?? this.message.extensions;
    this.message.referenceTaskIds =
      message.referenceTaskIds ?? this.message.referenceTaskIds;
    this.message.messageId = message.messageId ?? this.message.messageId;
    this.message.taskId = message.taskId ?? this.message.taskId;
    this.message.contextId = message.contextId ?? this.message.contextId;
  }
  valueOf(): A2A.Message {
    return this.message;
  }
}

export class MessageSendConfigurationBuilder {
  configuration: A2A.MessageSendConfiguration = {
    acceptedOutputModes: undefined,
    historyLength: undefined,
    pushNotificationConfig: undefined,
    blocking: undefined,
  };
  constructor(
    configuration: Partial<A2A.MessageSendConfiguration> | null = {}
  ) {
    this.configuration.acceptedOutputModes =
      configuration?.acceptedOutputModes ??
      this.configuration.acceptedOutputModes;
    this.configuration.historyLength =
      configuration?.historyLength ?? this.configuration.historyLength;
    this.configuration.pushNotificationConfig =
      configuration?.pushNotificationConfig ??
      this.configuration.pushNotificationConfig;
    this.configuration.blocking =
      configuration?.blocking ?? this.configuration.blocking;
  }
  valueOf(): A2A.MessageSendConfiguration {
    return this.configuration;
  }
}

export const createMessageSendParams = (
  messageSendParams: Partial<A2A.MessageSendParams> | string
): A2A.MessageSendParams => {
  const isString = typeof messageSendParams === "string";
  return {
    message: new MessageBuilder(
      isString
        ? { parts: [{ text: messageSendParams, kind: "text" }] }
        : messageSendParams.message
    ).valueOf(),
    configuration: new MessageSendConfigurationBuilder(
      isString ? undefined : messageSendParams.configuration
    ).valueOf(),
    metadata: isString ? undefined : messageSendParams.metadata,
  };
};
