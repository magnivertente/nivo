import { Encoder, Payload } from "@/app/abstractions/encoder";
import { env } from "../env";
import { sign } from "jsonwebtoken";

export class JWTEncoder implements Encoder {
  async encode(payload: Payload): Promise<string> {
    return sign(payload, env.JWT_SECRET, { expiresIn: "10h" });
  }
}
