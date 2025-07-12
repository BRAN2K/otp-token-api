import type { CreateUserData, User } from "@/core/domain/entities/User";

export interface UserRepository {
  findById(userId: string): Promise<User | null>;
  findByEmail(userEmail: string): Promise<User | null>;
  create(userData: CreateUserData): Promise<User>;
  update(userId: string, userData: Partial<CreateUserData>): Promise<User>;
}
