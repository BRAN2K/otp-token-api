import swaggerJsdoc from "swagger-jsdoc";
import { env } from "@/config/env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OTP Token API",
      version: "1.0.0",
      description: "API para gerenciamento de tokens OTP (One-Time Password)",
      contact: {
        name: "Guilherme Brante Cavequia",
        email: "guilherme.cavequia@gmail.com",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: `${env.HOST}:${env.PORT}`,
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        CreateOtpTokenRequest: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: {
              type: "string",
              description: "ID do usuário",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            expiresInMinutes: {
              type: "number",
              description: "Tempo de expiração em minutos (padrão: 15)",
              example: 15,
              minimum: 1,
              maximum: 1440,
            },
          },
        },
        CreateOtpTokenResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Token OTP criado com sucesso",
            },
            data: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "123e4567-e89b-12d3-a456-426614174001",
                },
                token: {
                  type: "string",
                  description: "Token OTP gerado",
                  example: "123456",
                },
                userId: {
                  type: "string",
                  example: "123e4567-e89b-12d3-a456-426614174000",
                },
                expiresAt: {
                  type: "string",
                  format: "date-time",
                  example: "2024-01-15T10:30:00.000Z",
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  example: "2024-01-15T10:15:00.000Z",
                },
              },
            },
          },
        },
        VerifyOtpTokenRequest: {
          type: "object",
          required: ["userId", "token"],
          properties: {
            userId: {
              type: "string",
              description: "ID do usuário",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            token: {
              type: "string",
              description: "Token OTP para verificação",
              example: "123456",
            },
          },
        },
        VerifyOtpTokenResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
              properties: {
                isValid: {
                  type: "boolean",
                  example: true,
                },
                message: {
                  type: "string",
                  example: "Token válido",
                },
                tokenId: {
                  type: "string",
                  example: "123e4567-e89b-12d3-a456-426614174001",
                },
              },
            },
          },
        },
        RevokeOtpTokenResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Token OTP revogado com sucesso",
            },
          },
        },
        HealthCheckResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "OK",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:15:00.000Z",
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/infrastructure/http/routes/*.ts",
    "./src/infrastructure/http/controllers/*.ts",
    "./src/app.ts",
  ],
};

export const specs = swaggerJsdoc(options);
