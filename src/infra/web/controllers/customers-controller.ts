import { CreateCustomerFactory } from "../factories/create-customer-factory";
import { ChangeCustomerStatusFactory } from "../factories/change-customer-status-factory";
import { AuthenticateCustomerFactory } from "../factories/authenticate-customer-factory";
import { GetUniqueCustomerFactory } from "../factories/get-unique-customer-factory";
import { CustomerPresenter } from "../presenters/customer-presenter";
import { RequestWithId } from "../middlewares/validate-token";
import { Request, Response } from "express";

const successMessage = "Request was processed successfully";

export class CustomersController {
  static async create(req: Request, res: Response) {
    const createCustomerService = CreateCustomerFactory.create();

    const result = await createCustomerService.execute(req.body);

    if (result.isError()) {
      const error = result.result.message;

      res.status(409).send({ error, code: 409 });

      return;
    }

    res.status(201).send({ message: successMessage, code: 201 });
  }

  static async accept(req: Request, res: Response) {
    const changeCustomerStatusService = ChangeCustomerStatusFactory.create();

    const result = await changeCustomerStatusService.execute({
      id: req.params.id,
      shouldAccept: true,
    });

    if (result.isError()) {
      const error = result.result.message;

      res.status(404).send({ error, code: 404 });

      return;
    }

    res.status(200).send({ message: successMessage, code: 200 });
  }

  static async refuse(req: Request, res: Response) {
    const changeCustomerStatusService = ChangeCustomerStatusFactory.create();

    const result = await changeCustomerStatusService.execute({
      id: req.params.id,
      shouldAccept: false,
    });

    if (result.isError()) {
      const error = result.result.message;

      res.status(404).send({ error, code: 404 });

      return;
    }

    res.status(200).send({ message: successMessage, code: 200 });
  }

  static async authenticate(req: Request, res: Response) {
    const authenticateCustomerService = AuthenticateCustomerFactory.create();

    const result = await authenticateCustomerService.execute(req.body);

    if (result.isError()) {
      const error = result.result.message;

      res.status(401).send({ error, code: 401 });

      return;
    }

    const accessToken = result.result.accessToken;

    res.status(200).send({ message: successMessage, accessToken, code: 200 });
  }

  static async getUnique(req: Request, res: Response) {
    const getUniqueCustomerService = GetUniqueCustomerFactory.create();

    const result = await getUniqueCustomerService.execute({
      id: (req as RequestWithId).id,
    });

    if (result.isError()) {
      const error = result.result.message;

      res.status(404).send({ error, code: 404 });

      return;
    }

    const customer = result.result;

    res.status(200).send({
      message: successMessage,
      customer: CustomerPresenter.toPresentation(customer),
      code: 200,
    });
  }
}
