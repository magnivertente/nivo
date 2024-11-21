import { CustomersController } from "../controllers/customers-controller";
import { schemaParser } from "../middlewares/schema-parser";
import { createCustomerSchema } from "../schemas/create-customer-schema";
import { authenticateCustomerSchema } from "../schemas/authenticate-customer-schema";
import { Router } from "express";
import { validateToken } from "../middlewares/validate-token";

export const router = Router();

router.post(
  "/customers",
  schemaParser(createCustomerSchema),
  CustomersController.create,
);

router.patch("/customers/:id/accept", CustomersController.accept);

router.patch("/customers/:id/refuse", CustomersController.refuse);

router.post(
  "/customers/auth",
  schemaParser(authenticateCustomerSchema),
  CustomersController.authenticate,
);

router.get("/customers", validateToken, CustomersController.getUnique);
