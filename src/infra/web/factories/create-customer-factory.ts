import { CreateCostumer } from "@/app/services/create-customer";
import { PrismaCustomersRepository } from "@/infra/database/repositories/prisma-customers-repository";
import { BcryptHasher } from "@/infra/security/bcrypt-hasher";

export class CreateCustomerFactory {
  static create() {
    const customersRepo = new PrismaCustomersRepository();
    const hasher = new BcryptHasher();

    return new CreateCostumer(customersRepo, hasher);
  }
}
