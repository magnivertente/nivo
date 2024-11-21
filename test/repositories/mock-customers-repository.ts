import { Customer } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";

export class MockCustomersRepository implements CustomersRepository {
  private customers: Customer[] = [];

  async create(customer: Customer) {
    this.customers.push(customer);
  }

  async findById(id: string) {
    const customer = this.customers.find((customer) => customer.id === id);

    return customer ?? null;
  }

  async findByEmail(email: string) {
    const customer = this.customers.find(
      (customer) => customer.email === email,
    );

    return customer ?? null;
  }

  async findByPhone(phone: string) {
    const customer = this.customers.find(
      (customer) => customer.phone === phone,
    );

    return customer ?? null;
  }

  async findByTaxNumber(taxNumber: string) {
    const customer = this.customers.find(
      (customer) => customer.taxNumber === taxNumber,
    );

    return customer ?? null;
  }

  async update(id: string, customer: Customer) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );

    this.customers[customerIndex] = customer;
  }
}
