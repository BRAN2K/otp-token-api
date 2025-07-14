import crypto from "node:crypto";

export function generateToken(length: number = 6): string {
  const digits = "0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    token += digits[crypto.randomInt(0, digits.length)];
  }

  return token;
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
