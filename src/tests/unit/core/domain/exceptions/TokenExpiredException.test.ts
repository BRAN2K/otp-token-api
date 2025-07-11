import { TokenExpiredException } from "@/core/domain/exceptions/TokenExpiredException";

describe("TokenExpiredException", () => {
  it("deve criar uma exceção de token expirado com mensagem, código e statusCode", () => {
    const err = new TokenExpiredException();
    expect(err).toBeInstanceOf(TokenExpiredException);
    expect(err.message).toBe("Token OTP expirado");
    expect(err.code).toBe("TOKEN_EXPIRED");
    expect(err.statusCode).toBe(400);
    expect(err.name).toBe("TokenExpiredException");
  });
});
