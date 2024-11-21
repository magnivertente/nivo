import { CustomersRepository } from "@/domain/repositories/customers-repository";
import { ErrorHandler, error, resolved } from "@/domain/common/error-handler";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

type ChangeCustomerStatusRequest = {
  id: string;
  shouldAccept: boolean;
};

type ChangeCustomerStatusResponse = ErrorHandler<ResourceNotFoundError, null>;

export class ChangeCustomerStatus {
  constructor(private customersRepo: CustomersRepository) {}

  async execute(
    request: ChangeCustomerStatusRequest,
  ): Promise<ChangeCustomerStatusResponse> {
    const { id, shouldAccept } = request;

    const customer = await this.customersRepo.findById(id);

    if (!customer) {
      return error(new ResourceNotFoundError("customer"));
    }

    shouldAccept ? customer.accept() : customer.refuse();

    await this.customersRepo.update(id, customer);

    return resolved(null);
  }
}
