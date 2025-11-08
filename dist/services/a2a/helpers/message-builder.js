import { v4 as uuidv4 } from "uuid";
export class MessageBuilder {
    message = {
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
    constructor(message = {}) {
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
    valueOf() {
        return this.message;
    }
}
export class MessageSendConfigurationBuilder {
    configuration = {
        acceptedOutputModes: undefined,
        historyLength: undefined,
        pushNotificationConfig: undefined,
        blocking: undefined,
    };
    constructor(configuration = {}) {
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
    valueOf() {
        return this.configuration;
    }
}
export const createMessageSendParams = (messageSendParams) => {
    const isString = typeof messageSendParams === "string";
    return {
        message: new MessageBuilder(isString
            ? { parts: [{ text: messageSendParams, kind: "text" }] }
            : messageSendParams.message).valueOf(),
        configuration: new MessageSendConfigurationBuilder(isString ? undefined : messageSendParams.configuration).valueOf(),
        metadata: isString ? undefined : messageSendParams.metadata,
    };
};
