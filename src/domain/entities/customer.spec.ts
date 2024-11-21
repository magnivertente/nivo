import { CustomerStatus } from "./customer";
import { CustomerFactory } from "@spec/factories/customer-factory";
import { randomUUID } from "node:crypto";

describe("customer entity", () => {
  it("should create a customer with random id, status as pending and creation date as current date", () => {
    const customer = CustomerFactory.create();

    expect(customer).toHaveProperty("id");
    expect(customer.status).toBe(CustomerStatus.PENDING);
    expect(customer).toHaveProperty("createdAt");
  });

  it("should create a customer with provided id, status and creation date", () => {
    const id = randomUUID();
    const status = CustomerStatus.ACCEPTED;
    const createdAt = new Date();

    const customer = CustomerFactory.create({ status, createdAt }, id);

    expect(customer.id).toBe(id);
    expect(customer.status).toBe(status);
    expect(customer.createdAt).toBe(createdAt);
  });

  it("should change the customer status to accepted", () => {
    const customer = CustomerFactory.create();

    customer.accept();

    expect(customer.status).toBe(CustomerStatus.ACCEPTED);
  });

  it("should change the customer status to refused", () => {
    const customer = CustomerFactory.create();

    customer.refuse();

    expect(customer.status).toBe(CustomerStatus.REFUSED);
  });
});
