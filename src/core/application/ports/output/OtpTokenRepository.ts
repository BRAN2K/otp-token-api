import type {
  CreateOtpTokenData,
  OtpToken,
} from "@/core/domain/entities/OtpToken";

export interface OtpTokenRepository {
  create(tokenData: CreateOtpTokenData): Promise<OtpToken>;
  findById(tokenId: string): Promise<OtpToken | null>;
  findByUserId(userId: string): Promise<OtpToken[]>;
  markAsUsed(tokenId: string): Promise<void>;
  deleteExpired(): Promise<number>;
  deleteById(tokenId: string): Promise<void>;
}
