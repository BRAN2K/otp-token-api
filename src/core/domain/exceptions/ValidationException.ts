import { DomainException } from "./DomainException";

export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
  }
}
