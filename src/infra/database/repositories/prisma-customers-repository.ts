import { Customer } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { CustomerMapper } from "../mappers/customer-mapper";
import { Prisma } from "../prisma";

export class PrismaCustomersRepository implements CustomersRepository {
  private prisma = Prisma.client;

  async create(customer: Customer) {
    await this.prisma.customer.create({
      data: CustomerMapper.toDatabase(customer),
    });
  }

  async findById(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    return customer ? CustomerMapper.toDomain(customer) : null;
  }

  async findByEmail(email: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    return customer ? CustomerMapper.toDomain(customer) : null;
  }

  async findByPhone(phone: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { phone },
    });

    return customer ? CustomerMapper.toDomain(customer) : null;
  }

  async findByTaxNumber(taxNumber: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { taxNumber },
    });

    return customer ? CustomerMapper.toDomain(customer) : null;
  }

  async update(id: string, customer: Customer) {
    await this.prisma.customer.update({
      where: { id },
      data: CustomerMapper.toDatabase(customer),
    });
  }
}
