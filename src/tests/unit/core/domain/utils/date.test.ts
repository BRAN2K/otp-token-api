import { addMinutes, isExpired } from "@/core/shared/utils/date";

describe("date utils", () => {
  it("addMinutes deve adicionar minutos corretamente", () => {
    const now = new Date();
    const result = addMinutes(now, 10);
    expect(result.getTime()).toBe(now.getTime() + 10 * 60 * 1000);
  });

  it("isExpired deve retornar true para datas passadas", () => {
    const past = new Date(Date.now() - 10000);
    expect(isExpired(past)).toBe(true);
  });

  it("isExpired deve retornar false para datas futuras", () => {
    const future = new Date(Date.now() + 10000);
    expect(isExpired(future)).toBe(false);
  });
});
