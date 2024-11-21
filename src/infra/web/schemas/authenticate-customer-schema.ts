import { z } from "zod";

export const authenticateCustomerSchema = z.object({
  email: z
    .string({ message: "Email must be a valid string" })
    .min(1, "Email is required. Please enter your email")
    .email("Please enter a valid email address"),
  password: z
    .string({ message: "Password must be a valid string." })
    .min(1, "Password is required. Please enter your password"),
});
