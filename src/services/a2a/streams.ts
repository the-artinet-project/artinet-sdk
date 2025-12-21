import { A2A } from "~/types/index.js";
import { sleep } from "~/utils/common/utils.js";
const STREAM_INTERVAL = 10;

export class Stream implements A2A.Stream {
  protected running: AsyncGenerator<A2A.Update> | null = null;
  constructor(
    private _contextId: string,
    private _context: A2A.Context,
    private _updates: A2A.Update[] = [],
    private _completed: boolean = false
  ) {}
  get contextId(): string {
    return this._contextId;
  }
  get isAlive(): boolean {
    return !this._completed;
  }
  async kill(): Promise<void> {
    this._completed = true;
  }
  get context(): A2A.Context {
    return this._context;
  }
  set context(context: A2A.Context) {
    this._context = context;
    this._contextId = context.contextId;
  }
  get updates(): A2A.Update[] {
    return this._updates;
  }

  async *run({
    service,
  }: {
    service: A2A.Service;
  }): AsyncGenerator<A2A.Update> {
    this.context.publisher.on("complete", () => {
      this.running = null;
    });

    this.context.publisher.on("error", (_) => {
      this.context.publisher.onComplete();
    });

    this.running = this.running ?? this._run({ service });

    yield* this.running;
  }

  async *_run({
    service,
  }: {
    service: A2A.Service;
  }): AsyncGenerator<A2A.Update> {
    let executionError: Error | null = null;
    const context = this.context;

    context.publisher.on("update", (_, update) => {
      if (!context.isCancelled()) {
        this.updates.push(update);
      }
    });

    const executePromise = service
      .execute({ engine: service.engine, context })
      .catch((error: Error) => {
        executionError = error;
      })
      .finally(() => {
        this._completed = true;
      });

    while (!this._completed || this.updates.length > 0) {
      if (executionError) {
        throw executionError;
      }
      if (this.updates.length > 0) {
        yield this.updates.shift()!;
      }
      await sleep(STREAM_INTERVAL);
    }

    await executePromise;
    this._completed = true;

    if (executionError) {
      throw executionError;
    }
  }
}
