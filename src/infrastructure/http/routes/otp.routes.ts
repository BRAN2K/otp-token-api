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

  router.post(
    "/create",
    validateRequest(createOtpTokenSchema),
    OtpTokenController.createToken.bind(OtpTokenController),
  );

  router.post(
    "/verify",
    validateRequest(verifyOtpTokenSchema),
    OtpTokenController.verifyToken.bind(OtpTokenController),
  );

  router.delete(
    "/:id",
    validateRequest(revokeOtpTokenSchema),
    OtpTokenController.revokeToken.bind(OtpTokenController),
  );

  return router;
}
