class Err<T, K> {
  readonly result: T;

  constructor(result: T) {
    this.result = result;
  }

  isError(): this is Err<T, K> {
    return true;
  }

  isResolved(): this is Resolved<T, K> {
    return false;
  }
}

class Resolved<T, K> {
  readonly result: K;

  constructor(result: K) {
    this.result = result;
  }

  isError(): this is Err<T, K> {
    return false;
  }

  isResolved(): this is Resolved<T, K> {
    return true;
  }
}

export type ErrorHandler<T, K> = Err<T, K> | Resolved<T, K>;

export const error = <T, K>(result: T): ErrorHandler<T, K> => {
  return new Err(result);
};

export const resolved = <T, K>(result: K): ErrorHandler<T, K> => {
  return new Resolved(result);
};
