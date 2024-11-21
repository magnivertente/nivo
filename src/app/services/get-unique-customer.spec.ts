import { GetUniqueCustomer } from "./get-unique-customer";
import { Customer } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { CustomerFactory } from "@spec/factories/customer-factory";
import { MockCustomersRepository } from "@spec/repositories/mock-customers-repository";
import { randomUUID } from "node:crypto";

describe("get unique customer service", () => {
  let customersRepo: CustomersRepository;
  let sut: GetUniqueCustomer;

  beforeEach(() => {
    customersRepo = new MockCustomersRepository();
    sut = new GetUniqueCustomer(customersRepo);
  });

  const customerId = randomUUID();

  it("should find an existing customer", async () => {
    await customersRepo.create(CustomerFactory.create({}, customerId));

    const result = await sut.execute({ id: customerId });

    expect(result.isResolved()).toBe(true);
    expect(result.result).toBeInstanceOf(Customer);
  });

  it("should not find a non-existing customer", async () => {
    const result = await sut.execute({ id: customerId });

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceNotFoundError);
  });
});
