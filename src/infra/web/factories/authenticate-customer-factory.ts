import { AuthenticateCustomer } from "@/app/services/authenticate-customer";
import { PrismaCustomersRepository } from "@/infra/database/repositories/prisma-customers-repository";
import { BcryptHasher } from "@/infra/security/bcrypt-hasher";
import { JWTEncoder } from "@/infra/security/jwt-encoder";

export class AuthenticateCustomerFactory {
  static create() {
    const customersRepo = new PrismaCustomersRepository();
    const hasher = new BcryptHasher();
    const encoder = new JWTEncoder();

    return new AuthenticateCustomer(customersRepo, hasher, encoder);
  }
}
