import { Router } from "express";
import type { OtpTokenController } from "@/infrastructure/http/controllers/OtpTokenController";
import { validateRequest } from "@/infrastructure/http/middlewares/validation";
import {
  createOtpTokenSchema,
  revokeOtpTokenSchema,
  verifyOtpTokenSchema,
} from "@/infrastructure/http/schemas/otp.schemas";

export function createOtpRoutes(
  OtpTokenController: OtpTokenController,
): Router {
  const router = Router();

  /**
   * @swagger
   * /api/otp/create:
   *   post:
   *     summary: Criar um novo token OTP
   *     description: Cria um token OTP único para um usuário específico
   *     tags: [OTP Tokens]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateOtpTokenRequest'
   *     responses:
   *       201:
   *         description: Token OTP criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateOtpTokenResponse'
   *       400:
   *         description: Erro de validação
   *       500:
   *         description: Erro interno do servidor
   */
  router.post(
    "/create",
    validateRequest(createOtpTokenSchema),
    OtpTokenController.createToken.bind(OtpTokenController),
  );

  /**
   * @swagger
   * /api/otp/verify:
   *   post:
   *     summary: Verificar um token OTP
   *     description: Verifica se um token OTP é válido para um usuário específico
   *     tags: [OTP Tokens]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VerifyOtpTokenRequest'
   *     responses:
   *       200:
   *         description: Token verificado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/VerifyOtpTokenResponse'
   *       400:
   *         description: Erro de validação
   *       500:
   *         description: Erro interno do servidor
   */
  router.post(
    "/verify",
    validateRequest(verifyOtpTokenSchema),
    OtpTokenController.verifyToken.bind(OtpTokenController),
  );

  /**
   * @swagger
   * /api/otp/revoke/{tokenId}:
   *   delete:
   *     summary: Revogar um token OTP
   *     description: Revoga um token OTP específico, invalidando-o permanentemente
   *     tags: [OTP Tokens]
   *     parameters:
   *       - in: path
   *         name: tokenId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do token OTP a ser revogado
   *         example: "123e4567-e89b-12d3-a456-426614174001"
   *     responses:
   *       200:
   *         description: Token revogado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RevokeOtpTokenResponse'
   *       400:
   *         description: Erro de validação
   *       500:
   *         description: Erro interno do servidor
   */
  router.delete(
    "/revoke/:tokenId",
    validateRequest(revokeOtpTokenSchema),
    OtpTokenController.revokeToken.bind(OtpTokenController),
  );

  return router;
}
