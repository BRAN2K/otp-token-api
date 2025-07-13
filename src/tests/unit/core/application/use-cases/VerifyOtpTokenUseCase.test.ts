import { mock } from "jest-mock-extended";
import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import { VerifyOtpTokenUseCase } from "@/core/application/use-cases/VerifyOtpTokenUseCase";
import type { OtpToken } from "@/core/domain/entities/OtpToken";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";

describe("VerifyOtpTokenUseCase", () => {
  const otpTokenRepository = mock<OtpTokenRepository>();
  const useCase = new VerifyOtpTokenUseCase(otpTokenRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar inválido se token não for encontrado", async () => {
    otpTokenRepository.findByTokenAndUser.mockResolvedValue(null);
    const result = await useCase.execute("user-id", "123456");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Token inválido");
  });

  it("deve retornar inválido se token já foi utilizado", async () => {
    const mockOtpToken: OtpToken = {
      id: "token-id",
      token: "123456",
      userId: "user-id",
      expiresAt: new Date(Date.now() + 10000),
      createdAt: new Date(),
      usedAt: new Date(Date.now() + 5000),
    };

    otpTokenRepository.findByTokenAndUser.mockResolvedValue(mockOtpToken);
    const result = await useCase.execute(
      mockOtpToken.userId,
      mockOtpToken.token,
    );
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Token já foi utilizado");
  });

  it("deve retornar inválido se token expirou", async () => {
    const mockOtpToken: OtpToken = {
      id: "token-id",
      token: "123456",
      userId: "user-id",
      expiresAt: new Date(Date.now() - 10000),
      createdAt: new Date(),
    };

    otpTokenRepository.findByTokenAndUser.mockResolvedValue(mockOtpToken);
    const result = await useCase.execute(
      mockOtpToken.userId,
      mockOtpToken.token,
    );
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Token expirado");
  });

  it("deve marcar como usado e retornar válido se token está correto", async () => {
    const mockOtpToken: OtpToken = {
      id: "token-id",
      token: "123456",
      userId: "user-id",
      expiresAt: new Date(Date.now() + 10000),
      createdAt: new Date(),
    };

    otpTokenRepository.findByTokenAndUser.mockResolvedValue(mockOtpToken);
    otpTokenRepository.markAsUsed.mockResolvedValue();
    const result = await useCase.execute(
      mockOtpToken.userId,
      mockOtpToken.token,
    );
    expect(result.isValid).toBe(true);
    expect(otpTokenRepository.markAsUsed).toHaveBeenCalledWith(mockOtpToken.id);
  });

  it("deve lançar exceção se falhar ao marcar token como utilizado", async () => {
    const mockOtpToken: OtpToken = {
      id: "token-id",
      token: "123456",
      userId: "user-id",
      expiresAt: new Date(Date.now() + 10000),
      createdAt: new Date(),
    };

    otpTokenRepository.findByTokenAndUser.mockResolvedValue(mockOtpToken);
    otpTokenRepository.markAsUsed.mockRejectedValue(
      new Error("Erro de conexão"),
    );

    await expect(
      useCase.execute(mockOtpToken.userId, mockOtpToken.token),
    ).rejects.toThrow(
      new ValidationException("Erro ao marcar o token como utilizado"),
    );
  });
});
