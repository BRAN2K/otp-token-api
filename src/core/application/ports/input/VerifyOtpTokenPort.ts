import type { VerifyOtpTokenResult } from "@/core/domain/entities/OtpToken";

export interface VerifyOtpTokenPort {
  execute(tokenId: string): Promise<VerifyOtpTokenResult>;
}
