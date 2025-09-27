/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { ServerDeploymentRequestParams } from "../../types/schemas/deployment/index.js";
/**
 * Sends a full deployment request to the server.
 * @param params The parameters to pass to the method.
 * @returns The response from the server.
 */
export declare function fullDeployment(params: ServerDeploymentRequestParams): Promise<{
    name: string;
    url: string;
    success: boolean;
    basePath: string;
    deploymentId: string;
}>;
//# sourceMappingURL=full-deployment.d.ts.map