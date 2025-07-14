import type { NextFunction, Request, Response } from "express";
import { ZodError, type z } from "zod";

export const validateRequest = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }));

        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: errorMessages,
        });
      }

      // Outros erros são passados para o próximo middleware
      return next(error);
    }
  };
};
