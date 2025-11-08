/**
 * Copyright 2025 The Artinet Project
 * SPDX-License-Identifier: Apache-2.0
 */
import { NextFunction, Request, Response } from "express";
import { A2AServiceInterface } from "../../types/index.js";
export declare function jsonRPCMiddleware(service: A2AServiceInterface, req: Request, res: Response, next: NextFunction): Promise<void>;
