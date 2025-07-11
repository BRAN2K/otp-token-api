import { mock } from "jest-mock-extended";
import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import type { UserRepository } from "@/core/application/ports/output/UserRepository";
import { CreateOtpTokenUseCase } from "@/core/application/use-cases/CreateOtpTokenUseCase";
import type { OtpToken } from "@/core/domain/entities/OtpToken";
import type { User } from "@/core/domain/entities/User";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";

describe("CreateOtpTokenUseCase", () => {
  const otpTokenRepository = mock<OtpTokenRepository>();
  const userRepository = mock<UserRepository>();
  const useCase = new CreateOtpTokenUseCase(otpTokenRepository, userRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve lançar exceção se userId não for informado", async () => {
    await expect(useCase.execute("")).rejects.toThrow(
      new ValidationException("ID do usuário é obrigatório")
    );
  });

  it("deve lançar exceção se expiresInMinutes for inválido", async () => {
    const mockUser: User = {
      id: "user-id",
      email: "test@test.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepository.findById.mockResolvedValue(mockUser);
    await expect(useCase.execute(mockUser.id, 0)).rejects.toThrow(
      new ValidationException(
        "Tempo de expiração deve estar entre 1 e 60 minutos"
      )
    );

    await expect(useCase.execute(mockUser.id, 61)).rejects.toThrow(
      new ValidationException(
        "Tempo de expiração deve estar entre 1 e 60 minutos"
      )
    );
  });

  it("deve lançar exceção se usuário não for encontrado", async () => {
    userRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute("user-id", 10)).rejects.toThrow(
      new ValidationException("Usuário não encontrado")
    );
  });

  it("deve criar token OTP com sucesso", async () => {
    const mockUser: User = {
      id: "user-id",
      email: "test@test.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockOtpToken: OtpToken = {
      id: "token-id",
      token: "123456",
      userId: "user-id",
      expiresAt: new Date(),
      createdAt: new Date(),
    };

    userRepository.findById.mockResolvedValue(mockUser);
    otpTokenRepository.create.mockResolvedValue(mockOtpToken);

    const result = await useCase.execute(mockUser.id, 10);
    expect(result).toHaveProperty("id", mockOtpToken.id);
    expect(result.token).toMatch(/^\d{6}$/);
    expect(otpTokenRepository.create).toHaveBeenCalled();
  });
});
