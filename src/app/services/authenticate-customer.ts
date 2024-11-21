import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ErrorHandler, error, resolved } from "@/domain/common/error-handler";
import { ResourceUnauthorizedError } from "@/domain/errors/resource-unauthorized-error";
import { Hasher } from "../abstractions/hasher";
import { Encoder } from "../abstractions/encoder";

export type AuthenticateCustomerRequest = {
  email: string;
  password: string;
};

type AuthenticateCustomerResponse = ErrorHandler<
  ResourceUnauthorizedError,
  {
    accessToken: string;
  }
>;

export class AuthenticateCustomer {
  constructor(
    private customersRepo: CustomersRepository,
    private hasher: Hasher,
    private encoder: Encoder,
  ) {}

  async execute(
    request: AuthenticateCustomerRequest,
  ): Promise<AuthenticateCustomerResponse> {
    const { email, password } = request;

    const customer = await this.customersRepo.findByEmail(email);

    if (!customer) {
      return error(new ResourceUnauthorizedError());
    }

    const isPasswordValid = await this.hasher.compare(
      password,
      customer.password,
    );

    if (!isPasswordValid) {
      return error(new ResourceUnauthorizedError());
    }

    const accessToken = await this.encoder.encode({ sub: customer.id });

    return resolved({ accessToken });
  }
}
