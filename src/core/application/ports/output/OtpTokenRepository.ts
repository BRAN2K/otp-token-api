import type {
  CreateOtpTokenData,
  OtpToken,
} from "@/core/domain/entities/OtpToken";

export interface OtpTokenRepository {
  create(data: CreateOtpTokenData): Promise<OtpToken>;
  findByUserId(userId: string): Promise<OtpToken[]>;
  markAsUsed(id: string): Promise<OtpToken>;
  deleteExpired(): Promise<number>;
  deleteById(id: string): Promise<void>;
}
