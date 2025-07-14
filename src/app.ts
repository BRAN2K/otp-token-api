import express from "express";
import swaggerUi from "swagger-ui-express";
import { isDevelopment } from "@/config/env";
import { otpRoutes } from "@/infrastructure/container";
import { errorHandler } from "@/infrastructure/http/middlewares/error";
import { requestLogger } from "@/infrastructure/http/middlewares/logger";
import { specs } from "@/infrastructure/http/swagger/swagger.config";

export function createApp(): express.Application {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(requestLogger);

  // Swagger Documentation
  if (isDevelopment) {
    app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "OTP Token API Documentation",
        swaggerOptions: {
          docExpansion: "list",
          filter: true,
          showRequestHeaders: true,
        },
      }),
    );
  }

  // Rotas
  app.use("/api/otp", otpRoutes);

  /**
   * @swagger
   * /api/health:
   *   get:
   *     summary: Verificar status da API
   *     description: Endpoint para verificar se a API está funcionando corretamente
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: API funcionando normalmente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HealthCheckResponse'
   *       500:
   *         description: Erro interno do servidor
   */
  app.get("/api/health", (_req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  app.use(errorHandler);

  return app;
}
