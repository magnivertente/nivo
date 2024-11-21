import { CustomersController } from "../controllers/customers-controller";
import { schemaParser } from "../middlewares/schema-parser";
import { createCustomerSchema } from "../schemas/create-customer-schema";
import { Router } from "express";

export const router = Router();

router.post(
  "/customers",
  schemaParser(createCustomerSchema),
  CustomersController.create,
);

router.patch("/customers/:id/accept", CustomersController.accept);

router.patch("/customers/:id/refuse", CustomersController.refuse);
