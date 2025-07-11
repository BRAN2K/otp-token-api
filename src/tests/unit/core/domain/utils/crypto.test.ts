import { generateToken, hashToken } from "@/core/shared/utils/crypto";

describe("crypto utils", () => {
  it("generateToken deve gerar um token numérico de 6 dígitos por padrão", () => {
    const token = generateToken();
    expect(token).toMatch(/^\d{6}$/);
  });

  it("generateToken deve gerar um token do tamanho especificado", () => {
    const token = generateToken(8);
    expect(token).toMatch(/^\d{8}$/);
  });

  it("hashToken deve gerar um hash SHA-256 do token", () => {
    const token = "123456";
    const hash = hashToken(token);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64); // SHA-256 em hex tem 64 caracteres
  });
});
