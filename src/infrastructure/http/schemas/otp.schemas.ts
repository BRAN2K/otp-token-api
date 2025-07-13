import { z } from "zod";

export const createOtpTokenSchema = z.object({
  body: z.object({
    userId: z.string().uuid("ID do usuário deve ser um UUID válido"),
    expiresInMinutes: z.number().min(1).max(60).optional().default(10),
  }),
});

export const verifyOtpTokenSchema = z.object({
  body: z.object({
    userId: z.string().uuid("ID do usuário deve ser um UUID válido"),
    token: z.string().regex(/^\d{6}$/, "O token deve ter exatamente 6 números"),
  }),
});

export const revokeOtpTokenSchema = z.object({
  params: z.object({
    tokenId: z.string().uuid("ID do token deve ser um UUID válido"),
  }),
});
