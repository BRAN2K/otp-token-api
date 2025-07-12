import type { VerifyOtpTokenResult } from "@/core/domain/entities/OtpToken";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";
import { isExpired } from "@/core/shared/utils/date";
import type { VerifyOtpTokenPort } from "../ports/input/VerifyOtpTokenPort";
import type { OtpTokenRepository } from "../ports/output/OtpTokenRepository";

export class VerifyOtpTokenUseCase implements VerifyOtpTokenPort {
  constructor(private otpTokenRepository: OtpTokenRepository) {}

  async execute(tokenId: string): Promise<VerifyOtpTokenResult> {
    // Buscar token no repositório
    const otpToken = await this.otpTokenRepository.findById(tokenId);
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
