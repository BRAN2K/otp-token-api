import type { NextFunction, Request, Response } from "express";
import { pinoHttp } from "pino-http";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@/config/logger";

const pinoHttpMiddleware = pinoHttp({
  logger: logger,
  genReqId: (_req: Request, _res: Response) => {
    return `req_${Date.now()}_${uuidv4()}`;
  },
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return pinoHttpMiddleware(req, res, next);
};
