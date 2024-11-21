import { Customer, CustomerProps } from "@/domain/entities/customer";

export class CustomerFactory {
  static create(override?: Partial<CustomerProps>, id?: string) {
    return Customer.create(
      {
        name: "Mark Davis",
        email: "test@domain.com",
        password: "PassW0rd",
        phone: "+351 920 600 800",
        taxNumber: "320 900 600",
        address: "Some Street, 123, Some City, Some District",
        ...override,
      },
      id,
    );
  }
}
