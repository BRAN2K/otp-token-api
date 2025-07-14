import { CreateOtpTokenUseCase } from "@/core/application/use-cases/CreateOtpTokenUseCase";
import { RevokeOtpTokenUseCase } from "@/core/application/use-cases/RevokeOtpTokenUseCase";
import { VerifyOtpTokenUseCase } from "@/core/application/use-cases/VerifyOtpTokenUseCase";
import { PrismaClient } from "./database/prisma/PrismaClient";
import { PrismaOtpTokenRepository } from "./database/prisma/PrismaOtpTokenRepository";
import { PrismaUserRepository } from "./database/prisma/PrismaUserRepository";
import { OtpTokenController } from "./http/controllers/OtpTokenController";
import { createOtpRoutes } from "./http/routes/otp.routes";

// Instâncias
const prismaClient = new PrismaClient();

// Repositórios
const otpTokenRepository = new PrismaOtpTokenRepository(prismaClient);
const userRepository = new PrismaUserRepository(prismaClient);

// Casos de uso
const createOtpTokenUseCase = new CreateOtpTokenUseCase(
  otpTokenRepository,
  userRepository,
);
const verifyOtpTokenUseCase = new VerifyOtpTokenUseCase(otpTokenRepository);
const revokeOtpTokenUseCase = new RevokeOtpTokenUseCase(otpTokenRepository);

// Controladores
const OtpController = new OtpTokenController(
  createOtpTokenUseCase,
  verifyOtpTokenUseCase,
  revokeOtpTokenUseCase,
);

// Rotas
const otpRoutes = createOtpRoutes(OtpController);

export {
  prismaClient,
  otpTokenRepository,
  userRepository,
  createOtpTokenUseCase,
  verifyOtpTokenUseCase,
  revokeOtpTokenUseCase,
  OtpController,
  otpRoutes,
};
