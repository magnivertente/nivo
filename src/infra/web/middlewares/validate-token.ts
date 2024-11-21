import { env } from "@/infra/env";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export type RequestWithId = Request & {
  id: string;
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .send({ error: "Access denied. No token provided", code: 401 });

    return;
  }

  try {
    const decoded = verify(token, env.JWT_SECRET);

    (req as RequestWithId).id = decoded.sub as string;

    next();
  } catch (error) {
    res.status(401).send({
      error: "Authentication failed. Invalid or expired token",
      code: 401,
    });
  }
};
