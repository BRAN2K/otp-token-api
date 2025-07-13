import type { VerifyOtpTokenResult } from "@/core/domain/entities/OtpToken";

export interface VerifyOtpTokenPort {
  execute(userId: string, token: string): Promise<VerifyOtpTokenResult>;
}
