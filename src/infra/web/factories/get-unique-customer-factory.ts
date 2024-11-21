import { GetUniqueCustomer } from "@/app/services/get-unique-customer";
import { PrismaCustomersRepository } from "@/infra/database/repositories/prisma-customers-repository";

export class GetUniqueCustomerFactory {
  static create() {
    const customersRepo = new PrismaCustomersRepository();

    return new GetUniqueCustomer(customersRepo);
  }
}
