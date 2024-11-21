import { Encoder, Payload } from "@/app/abstractions/encoder";

export class MockEncoder implements Encoder {
  async encode(payload: Payload) {
    return JSON.stringify(payload);
  }
}
