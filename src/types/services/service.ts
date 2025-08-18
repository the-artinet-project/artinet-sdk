import { Context } from "../../server/trpc/protocol/context.js";
import { ServiceInterface } from "../../server/trpc/services/interfaces/service.js";

export type Service<TContext extends Context = Context> =
  ServiceInterface<TContext>;
