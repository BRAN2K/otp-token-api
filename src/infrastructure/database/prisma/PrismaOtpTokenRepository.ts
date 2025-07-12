import type { OtpTokenRepository } from "@/core/application/ports/output/OtpTokenRepository";
import type {
  CreateOtpTokenData,
  OtpToken,
} from "@/core/domain/entities/OtpToken";
import type { PrismaClient } from "./PrismaClient";

export class PrismaOtpTokenRepository implements OtpTokenRepository {
  constructor(private prisma: PrismaClient) {}

  async create(tokenData: CreateOtpTokenData): Promise<OtpToken> {
    const otpToken = await this.prisma.otpVerification.create({
      data: {
        token: tokenData.token,
        userId: tokenData.userId,
        expiresAt: tokenData.expiresAt,
      },
    });

    return {
      id: otpToken.id,
      token: otpToken.token,
      userId: otpToken.userId,
      expiresAt: otpToken.expiresAt,
      usedAt: otpToken.usedAt || undefined,
      createdAt: otpToken.createdAt,
    };
  }

  async findById(tokenId: string): Promise<OtpToken | null> {
    const otpToken = await this.prisma.otpVerification.findUnique({
      where: { id: tokenId },
    });

    if (!otpToken) return null;

    return {
      id: otpToken.id,
      token: otpToken.token,
      userId: otpToken.userId,
      expiresAt: otpToken.expiresAt,
      usedAt: otpToken.usedAt || undefined,
      createdAt: otpToken.createdAt,
    };
  }

  async findByUserId(userId: string): Promise<OtpToken[]> {
    const otpTokens = await this.prisma.otpVerification.findMany({
      where: { userId: userId },
    });

    return otpTokens.map((token) => ({
      id: token.id,
      token: token.token,
      userId: token.userId,
      expiresAt: token.expiresAt,
      usedAt: token.usedAt || undefined,
      createdAt: token.createdAt,
    }));
  }

  async markAsUsed(tokenId: string): Promise<void> {
    await this.prisma.otpVerification.update({
      where: { id: tokenId },
      data: { usedAt: new Date() },
    });
  }

  async deleteExpired(): Promise<number> {
    const result = await this.prisma.otpVerification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return result.count;
  }

  async deleteById(tokenId: string): Promise<void> {
    await this.prisma.otpVerification.delete({
      where: { id: tokenId },
    });
  }
}
