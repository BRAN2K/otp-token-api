import { mock } from "jest-mock-extended";
import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import { RevokeOtpTokenUseCase } from "@/core/application/use-cases/RevokeOtpTokenUseCase";
import { ValidationException } from "@/core/domain/exceptions/ValidationException";

describe("RevokeOtpTokenUseCase", () => {
  const otpTokenRepository = mock<OtpTokenRepository>();
  const useCase = new RevokeOtpTokenUseCase(otpTokenRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve lançar exceção se tokenId não for informado", async () => {
    await expect(useCase.execute("")).rejects.toThrow(
      new ValidationException("ID do token é obrigatório"),
    );
  });

  it("deve lançar exceção se token não for encontrado", async () => {
    otpTokenRepository.deleteById.mockRejectedValue(
      new Error("Token não encontrado"),
    );
    await expect(useCase.execute("token-id")).rejects.toThrow(
      new ValidationException("Erro ao revogar o token OTP"),
    );
  });

  it("deve revogar token com sucesso", async () => {
    otpTokenRepository.deleteById.mockResolvedValue();
    await expect(useCase.execute("token-id")).resolves.toBeUndefined();
    expect(otpTokenRepository.deleteById).toHaveBeenCalledWith("token-id");
  });
});
