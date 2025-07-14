import type { OtpToken } from "@/core/domain/entities/OtpToken";

export interface CreateOtpTokenPort {
  execute(userId: string, expiresInMinutes?: number): Promise<OtpToken>;
}
