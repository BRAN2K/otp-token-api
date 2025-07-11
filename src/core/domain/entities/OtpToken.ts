export interface OtpToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  usedAt?: Date;
  createdAt: Date;
}

export interface CreateOtpTokenData {
  userId: string;
  expiresInMinutes?: number;
}

export interface OtpTokenValidationResult {
  isValid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  error?: string;
}
