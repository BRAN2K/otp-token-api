import { z } from "zod";

export const createOtpTokenSchema = z.object({
  body: z.object({
    userId: z.string().uuid("ID do usuário deve ser um UUID válido"),
    expiresInMinutes: z.number().min(1).max(60).optional().default(10),
  }),
});

export const verifyOtpTokenSchema = z.object({
  body: z.object({
    tokenId: z.string().uuid("ID do token deve ser um UUID válido"),
  }),
});

export const revokeOtpTokenSchema = z.object({
  params: z.object({
    tokenId: z.string().uuid("ID do token deve ser um UUID válido"),
  }),
});
