import { DomainException } from "./DomainException";

export class TokenExpiredException extends DomainException {
  constructor() {
    super("Token OTP expirado", "TOKEN_EXPIRED", 400);
  }
}
