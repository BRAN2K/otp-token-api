import type { OtpToken } from "@/core/domain/entities/OtpToken";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";
import { generateToken } from "@/core/shared/utils/crypto";
import { addMinutes } from "@/core/shared/utils/date";
import type { CreateOtpTokenPort } from "../ports/input/CreateOtpTokenPort";
import type { OtpTokenRepository } from "../ports/output/OtpTokenRepository";
import type { UserRepository } from "../ports/output/UserRepository";

export class CreateOtpTokenUseCase implements CreateOtpTokenPort {
  constructor(
    private otpTokenRepository: OtpTokenRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    userId: string,
    expiresInMinutes: number = 10,
  ): Promise<OtpToken> {
    // Validar parâmetros
    if (!userId) {
      throw new ValidationException("ID do usuário é obrigatório");
    }

    if (expiresInMinutes < 1 || expiresInMinutes > 60) {
      throw new ValidationException(
        "Tempo de expiração deve estar entre 1 e 60 minutos",
      );
    }

    // Verificar se o usuário existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ValidationException("Usuário não encontrado");
    }

    // Gerar token OTP
    const token = generateToken();
    const expiresAt = addMinutes(new Date(), expiresInMinutes);

    // Criar o token no repositório
    const otpToken = await this.otpTokenRepository.create({
      userId,
      expiresAt,
      token,
    });

    return otpToken;
  }
}
