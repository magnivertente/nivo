import { ChangeCustomerStatus } from "@/app/services/change-customer-status";
import { PrismaCustomersRepository } from "@/infra/database/repositories/prisma-customers-repository";

export class ChangeCustomerStatusFactory {
  static create() {
    const customersRepo = new PrismaCustomersRepository();

    return new ChangeCustomerStatus(customersRepo);
  }
}
