import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaParser = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).send({
          error: "The provided data failed validation",
          code: 400,
          details: err.errors.map((err) => err.message),
        });
      }
    }
  };
};
