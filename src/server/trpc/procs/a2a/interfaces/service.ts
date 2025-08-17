import { ServiceInterface } from "../../../services/interfaces/service.js";
import { AgentCard } from "../../../../../types/index.js";
import { TaskAndHistory } from "../../../../interfaces/store.js";
import { Context } from "../../../protocol/context.js";

export interface A2AServiceInterface<
  TRequest extends {} = any,
  TState extends TaskAndHistory = TaskAndHistory,
> extends ServiceInterface<Context<TRequest, TState>> {
  getAgentCard: () => AgentCard;
  addConnection: (id: string) => void;
  removeConnection: (id: string) => void;
  isCancelled: (id: string) => boolean;
  addCancellation: (id: string) => void;
  removeCancellation: (id: string) => void;
  getState: (id: string) => TState | undefined;
  setState: (id: string, data: TState) => void;
}
