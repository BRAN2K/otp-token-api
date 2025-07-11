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
  expiresAt: Date;
  token: string;
}

export interface VerifyOtpTokenResult {
  isValid: boolean;
  error?: string;
}
