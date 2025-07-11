import type {
  CreateOtpTokenData,
  OtpToken,
} from "@/core/domain/entities/OtpToken";

export interface OtpTokenRepository {
  create(data: CreateOtpTokenData): Promise<OtpToken>;
  findById(tokenId: string): Promise<OtpToken>;
  findByUserId(userId: string): Promise<OtpToken[]>;
  markAsUsed(tokenId: string): Promise<OtpToken>;
  deleteExpired(): Promise<number>;
  deleteById(tokenId: string): Promise<boolean>;
}
