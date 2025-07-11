import type { OtpTokenValidationResult } from "@/core/domain/entities/OtpToken";

export interface VerifyOtpTokenPort {
  execute(token: string): Promise<OtpTokenValidationResult>;
}
