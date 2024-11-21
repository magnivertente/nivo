import { Hasher } from "@/app/abstractions/hasher";

export class MockHasher implements Hasher {
  async hash(plain: string) {
    return plain.concat("_hashed");
  }
}
