import type { RevokeOtpTokenPort } from "@/core/application/ports/input/RevokeOtpTokenPort";
import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";

export class RevokeOtpTokenUseCase implements RevokeOtpTokenPort {
  constructor(private otpTokenRepository: OtpTokenRepository) {}

  async execute(tokenId: string): Promise<void> {
    if (!tokenId) {
      throw new ValidationException("ID do token é obrigatório");
    }

    try {
      await this.otpTokenRepository.deleteById(tokenId);
    } catch {
      throw new ValidationException("Erro ao revogar o token OTP");
    }
  }
}
