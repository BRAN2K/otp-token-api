import type { NextFunction, Request, Response } from "express";
import type { CreateOtpTokenPort } from "@/core/application/ports/input/CreateOtpTokenPort";
import type { RevokeOtpTokenPort } from "@/core/application/ports/input/RevokeOtpTokenPort";
import type { VerifyOtpTokenPort } from "@/core/application/ports/input/VerifyOtpTokenPort";

export class OtpTokenController {
  constructor(
    private createOtpTokenPort: CreateOtpTokenPort,
    private verifyOtpTokenPort: VerifyOtpTokenPort,
    private revokeOtpTokenPort: RevokeOtpTokenPort,
  ) {}

  async createToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId, expiresInMinutes } = req.body;

      const otpToken = await this.createOtpTokenPort.execute(
        userId,
        expiresInMinutes,
      );

      res.status(201).json({
        success: true,
        message: "Token OTP criado com sucesso",
        data: otpToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId, token } = req.body;

      const result = await this.verifyOtpTokenPort.execute(userId, token);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async revokeToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { tokenId } = req.params;

      await this.revokeOtpTokenPort.execute(tokenId);

      res.status(200).json({
        success: true,
        message: "Token OTP revogado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}
