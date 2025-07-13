import type { VerifyOtpTokenPort } from "@/core/application/ports/input/VerifyOtpTokenPort";
import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import type { VerifyOtpTokenResult } from "@/core/domain/entities/OtpToken";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";
import { isExpired } from "@/core/shared/utils/date";

export class VerifyOtpTokenUseCase implements VerifyOtpTokenPort {
  constructor(private otpTokenRepository: OtpTokenRepository) {}

  async execute(userId: string, token: string): Promise<VerifyOtpTokenResult> {
    // Buscar token no repositório
    const otpToken = await this.otpTokenRepository.findByTokenAndUser(
      userId,
      token,
    );

    // Verificar se o token existe
    if (!otpToken) {
      return {
        isValid: false,
        error: "Token inválido",
      };
    }

    // Verificar se já foi usado
    if (otpToken.usedAt) {
      return {
        isValid: false,
        error: "Token já foi utilizado",
      };
    }

    // Verificar se expirou
    if (isExpired(otpToken.expiresAt)) {
      return {
        isValid: false,
        error: "Token expirado",
      };
    }

    try {
      await this.otpTokenRepository.markAsUsed(otpToken.id);
    } catch {
      throw new ValidationException("Erro ao marcar o token como utilizado");
    }

    return {
      isValid: true,
    };
  }
}
