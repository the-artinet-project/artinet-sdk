import { A2A } from "~/types/index.js";
import { EventEmitter } from "events";

export class Messenger
  extends EventEmitter<A2A.MessageMap>
  implements A2A.MessageProducer, A2A.MessageConsumer
{
  private _message: A2A.MessageSendParams;
  private _messages: A2A.MessageSendParams[] = [];
  private resolvers: ((
    message: IteratorResult<A2A.MessageSendParams>
  ) => void)[] = [];
  private done = false;

  /**
   * @param message - The initial message to send
   * @note The initial message is tied to the messenger and cannot be changed
   */
  constructor(message: A2A.MessageSendParams) {
    super();
    this._message = message;
    this._messages.push(message);
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
  get message(): A2A.MessageSendParams {
    return this._messages[0] ?? this._message;
  }

  /**
   * @returns The current message
   */
  get messages(): A2A.MessageSendParams[] {
    return this._messages;
  }

  /**
   * @returns The command channel as an async iterable
   */
  [Symbol.asyncIterator](): AsyncIterableIterator<
    A2A.MessageSendParams,
    A2A.MessageSendParams,
    A2A.MessageSendParams | undefined
  > {
    return this;
  }

  valueOf(): A2A.MessageSendParams {
    return this.message;
  }

  async send(message: A2A.MessageSendParams): Promise<void> {
    if (this.done) {
      throw new Error("Messenger is closed");
    }
    const resolver = this.resolvers.shift();
    if (resolver) {
      resolver({ value: message, done: false });
    } else {
      this._messages.push(message);
    }
    this.emit("message", message);
  }

  async close(): Promise<void> {
    this.done = true;
    this.resolvers.forEach((resolver) =>
      resolver({ value: undefined, done: true })
    );
    this.resolvers = [];
    this.emit("close");
  }

  async next(): Promise<IteratorResult<A2A.MessageSendParams>> {
    if (this._messages.length)
      return Promise.resolve({ value: this._messages.shift()!, done: false });
    if (this.done) return Promise.resolve({ value: undefined, done: true });
    return new Promise((resolve) => {
      this.resolvers.push(resolve);
    });
  }

  return(
    value: A2A.MessageSendParams
  ): Promise<IteratorResult<A2A.MessageSendParams>> {
    this.close();
    this._messages = [];
    return Promise.resolve({ value, done: true });
  }

  static create(
    messageParams: A2A.MessageSendParams
  ): A2A.MessageConsumerProxy {
    const instance = new Messenger(messageParams);
    return new Proxy(instance, {
      get(target: Messenger, prop: string | symbol, _): any {
        if (prop in target.message) {
          return target.message[prop as keyof A2A.MessageSendParams];
        } else if (prop in target) {
          return target[prop as keyof Messenger];
        }
        return undefined;
      },
    }) as Messenger & A2A.MessageSendParams;
  }
}
