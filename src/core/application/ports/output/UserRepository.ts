import type { CreateUserData, User } from "@/core/domain/entities/User";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: Partial<CreateUserData>): Promise<User>;
}
