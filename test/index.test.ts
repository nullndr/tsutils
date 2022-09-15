import { assert, assertDefined } from "../src";

describe("test asserts functions", () => {
  test("test assertDefined function", () => {
    const a = null;
    const b = 1;

    expect(() => assertDefined(a)).toThrow();
    expect(() => assertDefined(b)).not.toThrow();
  });

  test("test assert function", () => {
    const a = Boolean(null);
    const b = Boolean(undefined);
    const c = false;
    const d = true;

    expect(() => assert(a)).toThrow();
    expect(() => assert(b)).toThrow();
    expect(() => assert(c)).toThrow();
    expect(() => assert(d)).not.toThrow();
  });

  // to test `assertNever` we have to test it on types
});
