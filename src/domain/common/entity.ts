import { randomUUID } from "node:crypto";

export abstract class Entity<T> {
  protected props: T;
  private readonly _id: string;

  protected constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
}
