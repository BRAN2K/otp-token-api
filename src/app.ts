import express from "express";
import { otpRoutes } from "@/infrastructure/container";
import { errorHandler } from "@/infrastructure/http/middlewares/error";
import { requestLogger } from "@/infrastructure/http/middlewares/logger";

export function createApp(): express.Application {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(requestLogger);

  // Rotas
  app.use("/api/otp", otpRoutes);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  app.use(errorHandler);

  return app;
}
