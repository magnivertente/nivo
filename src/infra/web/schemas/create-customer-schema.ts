import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z
    .string({ message: "Name must be a valid string" })
    .min(1, "Name is required. Please enter your name"),
  email: z
    .string({ message: "Email must be a valid string" })
    .min(1, "Email is required. Please enter your email")
    .email("Please enter a valid email address"),
  password: z
    .string({ message: "Password must be a valid string." })
    .min(1, "Password is required. Please enter a password")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long, including uppercase letters, lowercase letters, and numbers",
    ),
  phone: z
    .string({ message: "Phone must be a valid string" })
    .min(1, "Phone number is required. Please enter your phone number")
    .regex(
      /^\+351\s\d{3}\s\d{3}\s\d{3}$/,
      "Please enter a valid phone number in the format +351 XXX XXX XXX",
    ),
  taxNumber: z
    .string({ message: "Tax number must be a valid string" })
    .min(1, "Tax number is required. Please enter your tax number")
    .regex(
      /^\d{3}\s\d{3}\s\d{3}$/,
      "Please enter a valid tax number in the format XXX XXX XXX",
    ),
  address: z
    .string({ message: "Address must be a valid string" })
    .min(1, "Address is required. Please enter your address"),
});
