export interface RevokeOtpTokenPort {
  execute(tokenId: string): Promise<void>;
}
