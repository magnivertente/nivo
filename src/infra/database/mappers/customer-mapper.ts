import { Customer, CustomerStatus } from "@/domain/entities/customer";
import { Customer as DatabaseCustomer } from "@prisma/client";

export class CustomerMapper {
  static toDatabase(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password,
      phone: customer.phone,
      taxNumber: customer.taxNumber,
      address: customer.address,
      status: customer.status,
      createdAt: customer.createdAt,
    };
  }

  static toDomain(customer: DatabaseCustomer) {
    return Customer.create(
      {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        taxNumber: customer.taxNumber,
        address: customer.address,
        status: CustomerStatus[customer.status as keyof typeof CustomerStatus],
        createdAt: customer.createdAt,
      },
      customer.id,
    );
  }
}
