import { CreateCostumer, CreateCostumerRequest } from "./create-customer";
import { Customer } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ResourceConflictError } from "@/domain/errors/resource-conflict-error";
import { Hasher } from "../abstractions/hasher";
import { CustomerFactory } from "@spec/factories/customer-factory";
import { MockCustomersRepository } from "@spec/repositories/mock-customers-repository";
import { MockHasher } from "@spec/security/mock-hasher";

describe("create costumer service", () => {
  let customersRepo: CustomersRepository;
  let hasher: Hasher;
  let sut: CreateCostumer;

  beforeEach(() => {
    customersRepo = new MockCustomersRepository();
    hasher = new MockHasher();
    sut = new CreateCostumer(customersRepo, hasher);
  });

  const request: CreateCostumerRequest = {
    name: "Mark Davis",
    email: "test@domain.com",
    password: "PassW0rd",
    phone: "+351 920 600 800",
    taxNumber: "320 900 600",
    address: "Some Street, 123, Some City, Some District",
  };

  it("should successfully create a new customer", async () => {
    const result = await sut.execute(request);
    const createdCustomer = await customersRepo.findByEmail(request.email);

    expect(result.isResolved()).toBe(true);
    expect(result.result).toBeNull();
    expect(createdCustomer).toBeInstanceOf(Customer);
  });

  it("should not create a new customer if the email is already in use", async () => {
    await customersRepo.create(CustomerFactory.create());

    const result = await sut.execute(request);

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceConflictError);
  });

  it("should not create a new customer if the phone is already in use", async () => {
    await customersRepo.create(
      CustomerFactory.create({ email: "spec@domain.com" }),
    );

    const result = await sut.execute(request);

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceConflictError);
  });

  it("should not create a new customer if the tax number is already in use", async () => {
    await customersRepo.create(
      CustomerFactory.create({
        email: "spec@domain.com",
        phone: "+351 920 600 400",
      }),
    );

    const result = await sut.execute(request);

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceConflictError);
  });
});
