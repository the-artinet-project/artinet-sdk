import {
  AgentEngine,
  BaseExecutionContext,
  ExecutionContext,
} from "./context.js";
import { Protocol } from "./protocol.js";
import { Service } from "./service.js";
import { v4 as uuidv4 } from "uuid";

export interface DispatchOptions {
  services: Partial<Record<Protocol, Service>>; //string should be by protocol
  engine: AgentEngine;
}

export interface Dispatcher {
  addService(service: Service): void;
  onRequest<Req extends BaseExecutionContext>(req: Req): Promise<void>;
}

export class ServiceDispatcher implements Dispatcher {
  protected services: Partial<Record<Protocol, Service>>;
  protected engine: AgentEngine;

  constructor(options: DispatchOptions) {
    this.engine = options.engine;
    this.services = options.services;
  }

  static createExecutionContext<Req extends BaseExecutionContext>(
    req: Req
  ): ExecutionContext<Req> {
    return {
      id: req.id ?? uuidv4(),
      protocol: req.protocol,
      getRequestParams: () => req.params,
      isCancelled: () => false,
      requestContext: req,
    };
  }

  async onRequest<Req extends BaseExecutionContext>(req: Req): Promise<void> {
    const service = this.services[req.protocol];
    if (!service) {
      throw new Error(`Unknown service: ${req.protocol}`);
    }

    const executionContext: ExecutionContext<Req> =
      ServiceDispatcher.createExecutionContext(req);

    await service.execute({
      executionContext,
      engine: this.engine,
    });
  }

  addService(service: Service): void {
    this.services[service.protocol] = service;
  }
}
