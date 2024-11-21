import { Customer } from "@/domain/entities/customer";
import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ErrorHandler, error, resolved } from "@/domain/common/error-handler";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

type GetUniqueCustomerRequest = {
  id: string;
};

type GetUniqueCustomerResponse = ErrorHandler<ResourceNotFoundError, Customer>;

export class GetUniqueCustomer {
  constructor(private customersRepo: CustomersRepository) {}

  async execute(
    request: GetUniqueCustomerRequest,
  ): Promise<GetUniqueCustomerResponse> {
    const { id } = request;

    const customer = await this.customersRepo.findById(id);

    if (!customer) {
      return error(new ResourceNotFoundError("customer"));
    }

    return resolved(customer);
  }
}
