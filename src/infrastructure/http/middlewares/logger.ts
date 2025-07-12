import type { NextFunction, Request, Response } from "express";
import { pino } from "pino";
import { pinoHttp } from "pino-http";
import { uuid } from "zod/v4";
import { env, isDevelopment } from "@/config/env";

const logger = pino({
  level: isDevelopment ? "debug" : "info",
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  base: {
    env: env.NODE_ENV,
  },
  timestamp: true,
});

const pinoHttpMiddleware = pinoHttp({
  logger: logger,
  genReqId: (_req: Request, _res: Response) => {
    return `req_${Date.now()}_${uuid()}`;
  },

  customProps: (req: Request, _res: Response) => {
    return {
      ip: getClientIp(req),
    };
  },
});

function getClientIp(req: Request): string {
  return (
    req.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    req.get("X-Real-IP") ||
    req.socket.remoteAddress ||
    req.ip ||
    "unknown"
  );
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return pinoHttpMiddleware(req, res, next);
};

export { logger };
