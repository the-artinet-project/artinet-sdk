import { EventEmitter } from "events";
import { EventManager, EventManagerOptions } from "./event-manager.js";

export class StateManager<TRequest extends {} = any, TState extends {} = any>
  extends EventEmitter
  implements EventManager<TRequest, TState>
{
  public readonly contextId: string;
  private currentState: TState = {} as TState;
  private options: EventManagerOptions<TRequest, TState>;

  constructor(
    contextId: string,
    options: EventManagerOptions<TRequest, TState> = {}
  ) {
    super();
    this.contextId = contextId;
    this.options = options;
  }

  onStart = async (request?: TRequest): Promise<TState> => {
    if (this.options.onStart) {
      this.currentState = await this.options.onStart(request);
    }
    this.emit("start", request, this.currentState);
    return this.currentState;
  };

  onCancel = async (nextState: TState): Promise<void> => {
    if (this.options.onCancel) {
      await this.options.onCancel(nextState);
    }
    this.emit("cancel", nextState);
  };

  onUpdate = async (nextState: TState): Promise<TState> => {
    if (this.options.onUpdate) {
      this.currentState = await this.options.onUpdate(
        this.currentState,
        nextState
      );
    } else {
      this.currentState = nextState;
    }
    this.emit("update", this.currentState, nextState);
    return this.currentState;
  };

  onError = async (error: any): Promise<void> => {
    if (this.options.onError) {
      await this.options.onError(this.currentState, error);
    }
    this.emit("error", error, this.currentState);
  };

  onComplete = async (): Promise<void> => {
    if (this.options.onComplete) {
      await this.options.onComplete(this.currentState);
    }
    this.emit("complete", this.currentState);
  };

  getState = (): TState => {
    if (this.options.getState) {
      return this.options.getState();
    }
    return this.currentState;
  };
}
