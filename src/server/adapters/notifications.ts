/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  PushNotificationStore,
  PushNotificationSender,
  InMemoryPushNotificationStore,
} from "@a2a-js/sdk/server";
import { A2A, core } from "~/types/index.js";
import { Manager } from "~/services/core/manager.js";

export interface Notifications
  extends core.Manager<A2A.PushNotificationConfig[]> {
  save: (
    taskId: string,
    pushNotificationConfig: A2A.PushNotificationConfig
  ) => Promise<void>;
  load: (taskId: string) => Promise<A2A.PushNotificationConfig[]>;
  delete: (taskId: string, configId?: string) => Promise<void>;
  send: (task: A2A.Task) => Promise<void>;
}

/** Cached Push Notifications Manager */
export class PushNotifications
  //May be more efficient to use a Record/Map instead of an array
  extends Manager<A2A.PushNotificationConfig[]>
  implements Notifications
{
  private readonly _store: PushNotificationStore | undefined;
  private _sender: PushNotificationSender | undefined;
  constructor(store?: PushNotificationStore, sender?: PushNotificationSender) {
    if (store && store instanceof InMemoryPushNotificationStore) {
      /** We snatch its internal store to avoid creating a new Map and doubling memory usage */
      super((store as any)?.store as Map<string, A2A.PushNotificationConfig[]>);
    } else {
      super();
    }
    this._store = store;
    this._sender = sender;
  }
  get store(): PushNotificationStore | undefined {
    return this._store;
  }

  get sender(): PushNotificationSender | undefined {
    return this._sender;
  }
  set sender(sender: PushNotificationSender | undefined) {
    this._sender = sender;
  }

  async save(
    taskId: string,
    pushNotificationConfig: A2A.PushNotificationConfig
  ): Promise<void> {
    pushNotificationConfig.id = pushNotificationConfig.id ?? taskId;
    /**Cache the configs in memory for faster access */
    const configs = await this.get(taskId);
    await this.set(taskId, [
      ...(configs?.filter(
        /**Since this is pure memory we can stomach the heavy filter operation for now*/
        // and its unlikely that an individual task will have excessive configs
        (config) => config.id !== pushNotificationConfig.id
      ) ?? []),
      pushNotificationConfig,
    ]);
    return await this.store?.save(taskId, pushNotificationConfig);
  }

  async load(taskId: string): Promise<A2A.PushNotificationConfig[]> {
    let configs: A2A.PushNotificationConfig[] | undefined = await this.get(
      taskId
    );
    /**Cache the configs in memory for faster access */
    if (!configs || configs.length === 0) {
      configs = await this.store?.load(taskId);
      if (configs && configs.length > 0) {
        await this.set(taskId, configs);
      }
    }
    return configs ?? [];
  }

  async delete(taskId: string, configId?: string): Promise<void> {
    if (configId) {
      await this.set(
        taskId,
        (await this.get(taskId))?.filter((config) => config.id !== configId) ??
          []
      );
    } else {
      /**We dont need to maintain backward compatibility, so we can just delete all configs for the task*/
      await super.delete(taskId);
    }
    await this.store?.delete(taskId, configId);
  }

  async send(task: A2A.Task): Promise<void> {
    return await this.sender?.send(task);
  }
}
