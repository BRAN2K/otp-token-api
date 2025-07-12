import { DomainException } from "@/core/domain/exceptions/DomainException";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof DomainException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }

  // Erro inesperado
  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
};
