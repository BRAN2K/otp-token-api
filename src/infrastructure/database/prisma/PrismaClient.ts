import { isProduction } from "@/config/env";
import { PrismaClient as BasePrismaClient } from "./generated/prisma/client";

export class PrismaClient extends BasePrismaClient {
  constructor() {
    super({
      log: isProduction
        ? ["warn", "error"]
        : ["query", "info", "warn", "error"],
      errorFormat: "pretty",
    });
  }
}

export const prisma = new PrismaClient();
