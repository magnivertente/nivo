import { Customer } from "@/domain/entities/customer";

export class CustomerPresenter {
  static toPresentation(customer: Customer) {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      taxNumber: customer.taxNumber,
      address: customer.address,
      status: customer.status,
      createdAt: customer.createdAt.toLocaleString("pt-PT"),
    };
  }
}
