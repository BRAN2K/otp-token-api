import { DomainException } from "@/core/domain/exceptions/DomainException";

describe("DomainException", () => {
  it("deve criar uma exceção com mensagem, código e statusCode", () => {
    class TestException extends DomainException {
      constructor() {
        super("Mensagem de erro", "TEST_CODE", 418);
      }
    }
    const err = new TestException();
    expect(err).toBeInstanceOf(DomainException);
    expect(err.message).toBe("Mensagem de erro");
    expect(err.code).toBe("TEST_CODE");
    expect(err.statusCode).toBe(418);
    expect(err.name).toBe("TestException");
  });
});
