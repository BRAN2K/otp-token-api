import { mock } from "jest-mock-extended";
import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import { VerifyOtpTokenUseCase } from "@/core/application/use-cases/VerifyOtpTokenUseCase";
import type { OtpToken } from "@/core/domain/entities/OtpToken";

describe("VerifyOtpTokenUseCase", () => {
  const otpTokenRepository = mock<OtpTokenRepository>();
  const useCase = new VerifyOtpTokenUseCase(otpTokenRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar inválido se token não for encontrado", async () => {
    otpTokenRepository.findById.mockResolvedValue(null);
    const result = await useCase.execute("token-id");
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

    otpTokenRepository.findById.mockResolvedValue(mockOtpToken);
    const result = await useCase.execute(mockOtpToken.id);
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

    otpTokenRepository.findById.mockResolvedValue(mockOtpToken);
    const result = await useCase.execute(mockOtpToken.id);
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

    otpTokenRepository.findById.mockResolvedValue(mockOtpToken);
    otpTokenRepository.markAsUsed.mockResolvedValue();
    const result = await useCase.execute(mockOtpToken.id);
    expect(result.isValid).toBe(true);
    expect(otpTokenRepository.markAsUsed).toHaveBeenCalledWith(mockOtpToken.id);
  });
});
