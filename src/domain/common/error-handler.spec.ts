import { ErrorHandler, error, resolved } from "./error-handler";

const doSomething = (shouldSuccess: boolean): ErrorHandler<string, null> => {
  if (!shouldSuccess) {
    return error("error");
  }

  return resolved(null);
};

test("error result", () => {
  const result = doSomething(false);

  expect(result.isError()).toBe(true);
  expect(result.isResolved()).toBe(false);
});

test("resolved result", () => {
  const result = doSomething(true);

  expect(result.isError()).toBe(false);
  expect(result.isResolved()).toBe(true);
});
