import {
  AuthenticateCustomer,
  AuthenticateCustomerRequest,
} from "./authenticate-customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ResourceUnauthorizedError } from "@/domain/errors/resource-unauthorized-error";
import { Hasher } from "../abstractions/hasher";
import { Encoder } from "../abstractions/encoder";
import { CustomerFactory } from "@spec/factories/customer-factory";
import { MockCustomersRepository } from "@spec/repositories/mock-customers-repository";
import { MockHasher } from "@spec/security/mock-hasher";
import { MockEncoder } from "@spec/security/mock-encoder";

describe("authenticate customer service", () => {
  let customersRepo: CustomersRepository;
  let hasher: Hasher;
  let encoder: Encoder;
  let sut: AuthenticateCustomer;

  beforeEach(() => {
    customersRepo = new MockCustomersRepository();
    hasher = new MockHasher();
    encoder = new MockEncoder();
    sut = new AuthenticateCustomer(customersRepo, hasher, encoder);
  });

  const request: AuthenticateCustomerRequest = {
    email: "test@domain.com",
    password: "PassW0rd",
  };

  it("should authenticate an existing customer", async () => {
    await customersRepo.create(
      CustomerFactory.create({ password: await hasher.hash(request.password) }),
    );

    const result = await sut.execute(request);

    expect(result.isResolved()).toBe(true);
    expect(result.result).toEqual({ accessToken: expect.any(String) });
  });

  it("should not authenticate a customer if the email is incorrect", async () => {
    const result = await sut.execute(request);

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceUnauthorizedError);
  });

  it("should not authenticate a customer if the password is incorrect", async () => {
    await customersRepo.create(
      CustomerFactory.create({ password: await hasher.hash(request.password) }),
    );

    const result = await sut.execute({ ...request, password: "P4ssWord" });

    expect(result.isError()).toBe(true);
    expect(result.result).toBeInstanceOf(ResourceUnauthorizedError);
  });
});
