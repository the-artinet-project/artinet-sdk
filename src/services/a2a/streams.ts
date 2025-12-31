import { A2A } from "~/types/index.js";
import { sleep } from "~/utils/common/utils.js";
import { logger } from "~/config/index.js";
const STREAM_INTERVAL = 5;

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
    this.context.publisher.on("complete", async () => {
      logger.debug(`Stream[run:${this.contextId}]: complete`);
      await this.kill();
      this.running = null;
    });

    this.context.publisher.on("error", async (err) => {
      logger.error(`Stream[run:${this.contextId}]: error`, err);
      await this.context.publisher.onComplete();
    });

    if (!this.running) {
      this.running = this._run({ service });
      yield* this.running;
    }

    yield* this.subscribe();
  }

  async *subscribe(): AsyncGenerator<A2A.Update> {
    const subscription: A2A.Update[] = this.updates;

    this.context.publisher.on("update", async (_, update) => {
      subscription.push(update);
    });

    let updatesRead = 0;
    while (!this._completed || updatesRead < subscription.length) {
      if (updatesRead < subscription.length) {
        yield subscription[updatesRead++];
      }
      await sleep(STREAM_INTERVAL);
    }
  }

  async *_run({
    service,
  }: {
    service: A2A.Service;
  }): AsyncGenerator<A2A.Update> {
    let executionError: Error | null = null;
    const context = this.context;

    // NOTE: isCancelled() returns a Promise, so must be awaited.
    // Without async/await here, updates would never be pushed due to
    // Promise being truthy (making !Promise always false).
    context.publisher.on("update", async (_, update) => {
      if (!(await context.isCancelled())) {
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
