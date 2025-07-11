import { ValidationException } from "@/core/domain/exceptions/ValidationException";

describe("ValidationException", () => {
  it("deve criar uma exceção de validação com mensagem, código e statusCode", () => {
    const err = new ValidationException("Campo obrigatório");
    expect(err).toBeInstanceOf(ValidationException);
    expect(err.message).toBe("Campo obrigatório");
    expect(err.code).toBe("VALIDATION_ERROR");
    expect(err.statusCode).toBe(400);
    expect(err.name).toBe("ValidationException");
  });
});
