import { Hasher } from "@/app/abstractions/hasher";
import { hash, compare } from "bcryptjs";

export class BcryptHasher implements Hasher {
  private salt = 8;

  async hash(plain: string) {
    return hash(plain, this.salt);
  }

  async compare(plain: string, hash: string) {
    return compare(plain, hash);
  }
}
