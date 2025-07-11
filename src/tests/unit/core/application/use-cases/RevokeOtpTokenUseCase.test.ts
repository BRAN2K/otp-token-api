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
    otpTokenRepository.deleteById.mockResolvedValue(false);
    await expect(useCase.execute("token-id")).rejects.toThrow(
      new ValidationException("Token não encontrado"),
    );
  });

  it("deve revogar token com sucesso", async () => {
    otpTokenRepository.deleteById.mockResolvedValue(true);
    await expect(useCase.execute("token-id")).resolves.toBeUndefined();
    expect(otpTokenRepository.deleteById).toHaveBeenCalledWith("token-id");
  });
});
