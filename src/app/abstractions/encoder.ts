export type Payload = Record<string, unknown>;

export abstract class Encoder {
  abstract encode(payload: Payload): Promise<string>;
}
