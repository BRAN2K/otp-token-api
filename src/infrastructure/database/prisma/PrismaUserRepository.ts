import type { UserRepository } from "@/core/application/ports/output/UserRepository";
import type { CreateUserData, User } from "@/core/domain/entities/User";
import type { PrismaClient } from "./PrismaClient";

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(userData: CreateUserData): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(
    userId: string,
    userData: Partial<CreateUserData>,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: userData,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
