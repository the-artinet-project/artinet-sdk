/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from "zod";
/**
 * Defines parameters for fetching a specific push notification configuration for a task.
 */
export declare const GetTaskPushNotificationConfigParamSchema: z.ZodObject<{
    id: z.ZodString;
    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
} & {
    /**
     * @optional The ID of the push notification configuration to retrieve.
     */
    pushNotificationConfigId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
    pushNotificationConfigId?: string | undefined;
}, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
    pushNotificationConfigId?: string | undefined;
}>;
export type GetTaskPushNotificationConfigParam = z.infer<typeof GetTaskPushNotificationConfigParamSchema>;
export declare const GetTaskPushNotificationConfigParamsSchema: z.ZodUnion<[z.ZodObject<{
    id: z.ZodString;
    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
} & {
    /**
     * @optional The ID of the push notification configuration to retrieve.
     */
    pushNotificationConfigId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
    pushNotificationConfigId?: string | undefined;
}, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
    pushNotificationConfigId?: string | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
}, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
}>]>;
export type GetTaskPushNotificationConfigParams = z.infer<typeof GetTaskPushNotificationConfigParamsSchema>;
/**
 * Defines parameters for listing all push notification configurations for a task.
 */
export declare const ListTaskPushNotificationConfigsParamsSchema: z.ZodObject<{
    id: z.ZodString;
    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
}, {
    id: string;
    metadata?: Record<string, unknown> | null | undefined;
}>;
export type ListTaskPushNotificationConfigsParams = z.infer<typeof ListTaskPushNotificationConfigsParamsSchema>;
/**
 * Defines parameters for deleting a specific push notification configuration for a task.
 */
export declare const DeleteTaskPushNotificationConfigParamsSchema: z.ZodObject<{
    id: z.ZodString;
    metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
} & {
    /**
     * @required The ID of the push notification configuration to delete.
     */
    pushNotificationConfigId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    pushNotificationConfigId: string;
    metadata?: Record<string, unknown> | null | undefined;
}, {
    id: string;
    pushNotificationConfigId: string;
    metadata?: Record<string, unknown> | null | undefined;
}>;
export type DeleteTaskPushNotificationConfigParams = z.infer<typeof DeleteTaskPushNotificationConfigParamsSchema>;
/**
 * @description Defines authentication details for a push notification endpoint.
 */
export declare const PushNotificationAuthenticationInfoSchema: z.ZodObject<{
    /**
     * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
     */
    schemes: z.ZodArray<z.ZodString, "many">;
    /**
     * @optional Optional credentials required by the push notification endpoint.
     */
    credentials: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    schemes: string[];
    credentials?: string | undefined;
}, {
    schemes: string[];
    credentials?: string | undefined;
}>;
export type PushNotificationAuthenticationInfo = z.infer<typeof PushNotificationAuthenticationInfoSchema>;
/**
 * @description Defines the configuration for setting up push notifications for task updates.
 */
export declare const PushNotificationConfigSchema: z.ZodObject<{
    /**
     * @optional A unique ID for the push notification configuration, created by the server
     * to support multiple notification callbacks.
     */
    id: z.ZodOptional<z.ZodString>;
    /**
     * @required The callback URL where the agent should send push notifications.
     */
    url: z.ZodString;
    /**
     * @optional A unique token for this task or session to validate incoming push notifications.
     */
    token: z.ZodOptional<z.ZodString>;
    /**
     * @optional Authentication details for the agent to use when calling the notification URL.
     */
    authentication: z.ZodOptional<z.ZodObject<{
        /**
         * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
         */
        schemes: z.ZodArray<z.ZodString, "many">;
        /**
         * @optional Optional credentials required by the push notification endpoint.
         */
        credentials: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        schemes: string[];
        credentials?: string | undefined;
    }, {
        schemes: string[];
        credentials?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    id?: string | undefined;
    token?: string | undefined;
    authentication?: {
        schemes: string[];
        credentials?: string | undefined;
    } | undefined;
}, {
    url: string;
    id?: string | undefined;
    token?: string | undefined;
    authentication?: {
        schemes: string[];
        credentials?: string | undefined;
    } | undefined;
}>;
export type PushNotificationConfig = z.infer<typeof PushNotificationConfigSchema>;
/**
 * @description A container associating a push notification configuration with a specific task.
 */
export declare const TaskPushNotificationConfigSchema: z.ZodObject<{
    /**
     * @required The ID of the task to associate with the push notification configuration.
     */
    taskId: z.ZodString;
    /**
     * @required The push notification configuration to associate with the task.
     */
    pushNotificationConfig: z.ZodObject<{
        /**
         * @optional A unique ID for the push notification configuration, created by the server
         * to support multiple notification callbacks.
         */
        id: z.ZodOptional<z.ZodString>;
        /**
         * @required The callback URL where the agent should send push notifications.
         */
        url: z.ZodString;
        /**
         * @optional A unique token for this task or session to validate incoming push notifications.
         */
        token: z.ZodOptional<z.ZodString>;
        /**
         * @optional Authentication details for the agent to use when calling the notification URL.
         */
        authentication: z.ZodOptional<z.ZodObject<{
            /**
             * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
             */
            schemes: z.ZodArray<z.ZodString, "many">;
            /**
             * @optional Optional credentials required by the push notification endpoint.
             */
            credentials: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            schemes: string[];
            credentials?: string | undefined;
        }, {
            schemes: string[];
            credentials?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    }, {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    taskId: string;
    pushNotificationConfig: {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    };
}, {
    taskId: string;
    pushNotificationConfig: {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    };
}>;
export type TaskPushNotificationConfig = z.infer<typeof TaskPushNotificationConfigSchema>;
/**
 * @description Request to set or update the push notification config for a task.
 */
export declare const SetTaskPushNotificationConfigRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/set">;
    params: z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/set";
    params: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/set";
    params: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    jsonrpc: "2.0";
}>;
export type SetTaskPushNotificationConfigRequest = z.infer<typeof SetTaskPushNotificationConfigRequestSchema>;
/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/set' method.
 */
export declare const SetTaskPushNotificationConfigSuccessResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}>;
export type SetTaskPushNotificationConfigSuccessResponse = z.infer<typeof SetTaskPushNotificationConfigSuccessResponseSchema>;
/**
 * @description Response to a `tasks/pushNotificationConfig/set` request.
 */
export declare const SetTaskPushNotificationConfigResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}>]>;
export type SetTaskPushNotificationConfigResponse = z.infer<typeof SetTaskPushNotificationConfigResponseSchema>;
/**
 * @description Request to retrieve the currently configured push notification configuration for a task.
 */
export declare const GetTaskPushNotificationConfigRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/get">;
    params: z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    } & {
        /**
         * @optional The ID of the push notification configuration to retrieve.
         */
        pushNotificationConfigId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/get";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/get";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    } | {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
        pushNotificationConfigId?: string | undefined;
    };
    jsonrpc: "2.0";
}>;
export type GetTaskPushNotificationConfigRequest = z.infer<typeof GetTaskPushNotificationConfigRequestSchema>;
/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/get' method.
 */
export declare const GetTaskPushNotificationConfigSuccessResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}>;
export type GetTaskPushNotificationConfigSuccessResponse = z.infer<typeof GetTaskPushNotificationConfigSuccessResponseSchema>;
/**
 * @description Response to a `tasks/pushNotificationConfig/get` request.
 */
export declare const GetTaskPushNotificationConfigResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    };
    error?: undefined;
    id?: string | number | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}>]>;
export type GetTaskPushNotificationConfigResponse = z.infer<typeof GetTaskPushNotificationConfigResponseSchema>;
/**
 * @description Request to list all push notification configurations for a task.
 */
export declare const ListTaskPushNotificationConfigRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/list">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/list";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/list";
    params: {
        id: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}>;
export type ListTaskPushNotificationConfigRequest = z.infer<typeof ListTaskPushNotificationConfigRequestSchema>;
export declare const ListTaskPushNotificationConfigResultSchema: z.ZodArray<z.ZodObject<{
    /**
     * @required The ID of the task to associate with the push notification configuration.
     */
    taskId: z.ZodString;
    /**
     * @required The push notification configuration to associate with the task.
     */
    pushNotificationConfig: z.ZodObject<{
        /**
         * @optional A unique ID for the push notification configuration, created by the server
         * to support multiple notification callbacks.
         */
        id: z.ZodOptional<z.ZodString>;
        /**
         * @required The callback URL where the agent should send push notifications.
         */
        url: z.ZodString;
        /**
         * @optional A unique token for this task or session to validate incoming push notifications.
         */
        token: z.ZodOptional<z.ZodString>;
        /**
         * @optional Authentication details for the agent to use when calling the notification URL.
         */
        authentication: z.ZodOptional<z.ZodObject<{
            /**
             * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
             */
            schemes: z.ZodArray<z.ZodString, "many">;
            /**
             * @optional Optional credentials required by the push notification endpoint.
             */
            credentials: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            schemes: string[];
            credentials?: string | undefined;
        }, {
            schemes: string[];
            credentials?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    }, {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    taskId: string;
    pushNotificationConfig: {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    };
}, {
    taskId: string;
    pushNotificationConfig: {
        url: string;
        id?: string | undefined;
        token?: string | undefined;
        authentication?: {
            schemes: string[];
            credentials?: string | undefined;
        } | undefined;
    };
}>, "many">;
export type ListTaskPushNotificationConfigResult = z.infer<typeof ListTaskPushNotificationConfigResultSchema>;
/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/list' method.
 */
export declare const ListTaskPushNotificationConfigSuccessResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodArray<z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    error?: undefined;
    id?: string | number | undefined;
}>;
export type ListTaskPushNotificationConfigSuccessResponse = z.infer<typeof ListTaskPushNotificationConfigSuccessResponseSchema>;
/**
 * @description Response to a `tasks/pushNotificationConfig/list` request.
 */
export declare const ListTaskPushNotificationConfigResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodArray<z.ZodObject<{
        /**
         * @required The ID of the task to associate with the push notification configuration.
         */
        taskId: z.ZodString;
        /**
         * @required The push notification configuration to associate with the task.
         */
        pushNotificationConfig: z.ZodObject<{
            /**
             * @optional A unique ID for the push notification configuration, created by the server
             * to support multiple notification callbacks.
             */
            id: z.ZodOptional<z.ZodString>;
            /**
             * @required The callback URL where the agent should send push notifications.
             */
            url: z.ZodString;
            /**
             * @optional A unique token for this task or session to validate incoming push notifications.
             */
            token: z.ZodOptional<z.ZodString>;
            /**
             * @optional Authentication details for the agent to use when calling the notification URL.
             */
            authentication: z.ZodOptional<z.ZodObject<{
                /**
                 * @required A list of supported authentication schemes (e.g., 'Basic', 'Bearer').
                 */
                schemes: z.ZodArray<z.ZodString, "many">;
                /**
                 * @optional Optional credentials required by the push notification endpoint.
                 */
                credentials: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                schemes: string[];
                credentials?: string | undefined;
            }, {
                schemes: string[];
                credentials?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }, {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }, {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: {
        taskId: string;
        pushNotificationConfig: {
            url: string;
            id?: string | undefined;
            token?: string | undefined;
            authentication?: {
                schemes: string[];
                credentials?: string | undefined;
            } | undefined;
        };
    }[];
    error?: undefined;
    id?: string | number | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}>]>;
export type ListTaskPushNotificationConfigResponse = z.infer<typeof ListTaskPushNotificationConfigResponseSchema>;
/**
 * @description Request to delete a specific push notification configuration for a task.
 */
export declare const DeleteTaskPushNotificationConfigRequestSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
} & {
    method: z.ZodLiteral<"tasks/pushNotificationConfig/delete">;
    params: z.ZodObject<{
        id: z.ZodString;
        metadata: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    } & {
        /**
         * @required The ID of the push notification configuration to delete.
         */
        pushNotificationConfigId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    }, {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string | number;
    method: "tasks/pushNotificationConfig/delete";
    params: {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}, {
    id: string | number;
    method: "tasks/pushNotificationConfig/delete";
    params: {
        id: string;
        pushNotificationConfigId: string;
        metadata?: Record<string, unknown> | null | undefined;
    };
    jsonrpc: "2.0";
}>;
export type DeleteTaskPushNotificationConfigRequest = z.infer<typeof DeleteTaskPushNotificationConfigRequestSchema>;
/**
 * @description JSON-RPC success response model for the 'tasks/pushNotificationConfig/delete' method.
 */
export declare const DeleteTaskPushNotificationConfigSuccessResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: null;
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: null;
    error?: undefined;
    id?: string | number | undefined;
}>;
export type DeleteTaskPushNotificationConfigSuccessResponse = z.infer<typeof DeleteTaskPushNotificationConfigSuccessResponseSchema>;
/**
 * @description Response to a `tasks/pushNotificationConfig/delete` request.
 */
export declare const DeleteTaskPushNotificationConfigResponseSchema: z.ZodUnion<[z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    error: z.ZodOptional<z.ZodNever>;
} & {
    result: z.ZodNull;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    result: null;
    error?: undefined;
    id?: string | number | undefined;
}, {
    jsonrpc: "2.0";
    result: null;
    error?: undefined;
    id?: string | number | undefined;
}>, z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
} & {
    result: z.ZodOptional<z.ZodNever>;
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        data: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        data?: unknown;
    }, {
        code: number;
        message: string;
        data?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}, {
    error: {
        code: number;
        message: string;
        data?: unknown;
    };
    jsonrpc: "2.0";
    id?: string | number | undefined;
    result?: undefined;
}>]>;
export type DeleteTaskPushNotificationConfigResponse = z.infer<typeof DeleteTaskPushNotificationConfigResponseSchema>;
