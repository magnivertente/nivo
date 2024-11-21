import { ChangeCustomerStatus } from "./change-customer-status";
import { CustomerStatus } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { CustomerFactory } from "@spec/factories/customer-factory";
import { MockCustomersRepository } from "@spec/repositories/mock-customers-repository";
import { randomUUID } from "node:crypto";

describe("change customer status service", () => {
  let customersRepo: CustomersRepository;
  let sut: ChangeCustomerStatus;

  beforeEach(() => {
    customersRepo = new MockCustomersRepository();
    sut = new ChangeCustomerStatus(customersRepo);
  });

  const customerId = randomUUID();

  it("should change the customer status to accepted", async () => {
    await customersRepo.create(CustomerFactory.create({}, customerId));

    const result = await sut.execute({ id: customerId, shouldAccept: true });
    const acceptedCustomer = await customersRepo.findById(customerId);

    expect(result.isResolved()).toBe(true);
    expect(result.result).toBeNull();
    expect(acceptedCustomer?.status).toBe(CustomerStatus.ACCEPTED);
  });

  it("should change the customer status to refused", async () => {
    await customersRepo.create(CustomerFactory.create({}, customerId));

    const result = await sut.execute({ id: customerId, shouldAccept: false });
    const refusedCustomer = await customersRepo.findById(customerId);

    expect(result.isResolved()).toBe(true);
    expect(result.result).toBeNull();
    expect(refusedCustomer?.status).toBe(CustomerStatus.REFUSED);
  });

  it("should not change the status of a non-existing customer", async () => {
    const result = await sut.execute({ id: customerId, shouldAccept: true });

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceNotFoundError);
  });
});
