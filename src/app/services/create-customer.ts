import { Customer } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ErrorHandler, error, resolved } from "@/domain/common/error-handler";
import { ResourceConflictError } from "@/domain/errors/resource-conflict-error";
import { Hasher } from "../abstractions/hasher";

export type CreateCostumerRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  taxNumber: string;
  address: string;
};

type CreateCostumerResponse = ErrorHandler<ResourceConflictError, null>;

export class CreateCostumer {
  constructor(
    private customersRepo: CustomersRepository,
    private hasher: Hasher,
  ) {}

  async execute(
    request: CreateCostumerRequest,
  ): Promise<CreateCostumerResponse> {
    const { email, password, phone, taxNumber } = request;

    const [isEmailUsed, isPhoneUsed, isTaxNumberUsed] = await Promise.all([
      this.customersRepo.findByEmail(email),
      this.customersRepo.findByPhone(phone),
      this.customersRepo.findByTaxNumber(taxNumber),
    ]);

    if (isEmailUsed) {
      return error(new ResourceConflictError("email"));
    }

    if (isPhoneUsed) {
      return error(new ResourceConflictError("phone"));
    }

    if (isTaxNumberUsed) {
      return error(new ResourceConflictError("tax number"));
    }

    const hashedPassword = await this.hasher.hash(password);

    const newCostumer = Customer.create({
      ...request,
      password: hashedPassword,
    });

    await this.customersRepo.create(newCostumer);

    return resolved(null);
  }
}
