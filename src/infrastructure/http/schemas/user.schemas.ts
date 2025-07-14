import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email("Email deve ser válido"),
    name: z.string().min(1, "Nome é obrigatório").optional(),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID do usuário deve ser um UUID válido"),
  }),
});
