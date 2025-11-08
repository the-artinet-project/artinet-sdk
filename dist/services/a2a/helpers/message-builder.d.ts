import { MessageSendParams, Message as MessageType, MessageSendConfiguration } from "../../../types/index.js";
export declare class MessageBuilder {
    message: MessageType;
    constructor(message?: Partial<MessageType>);
    valueOf(): MessageType;
}
export declare class MessageSendConfigurationBuilder {
    configuration: MessageSendConfiguration;
    constructor(configuration?: Partial<MessageSendConfiguration> | null);
    valueOf(): MessageSendConfiguration;
}
export declare const createMessageSendParams: (messageSendParams: Partial<MessageSendParams> | string) => MessageSendParams;
