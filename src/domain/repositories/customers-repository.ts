import { Customer } from "../entities/customer";

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract findById(id: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract findByPhone(phone: string): Promise<Customer | null>;
  abstract findByTaxNumber(taxNumber: string): Promise<Customer | null>;
  abstract update(id: string, customer: Customer): Promise<void>;
}
