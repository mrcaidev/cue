import { registerCallback, toDeepReactive } from "src/reactive";
import { describe, expect, test, vi } from "vitest";

describe("Reactive system", () => {
  test("Object is reactive at all nested level", () => {
    const fn = vi.fn();
    const data = toDeepReactive({ a: 0, b: { c: 0, d: { e: 0 } } });
    registerCallback(data, "a", fn);
    registerCallback(data, "b.c", fn);
    registerCallback(data, "b.d.e", fn);

    expect(data).toEqual({ a: 0, b: { c: 0, d: { e: 0 } } });
    expect(fn).toHaveBeenCalledTimes(3);

    data.a = 1;
    expect(data).toEqual({ a: 1, b: { c: 0, d: { e: 0 } } });
    expect(fn).toHaveBeenCalledTimes(4);

    data.b.c = 2;
    expect(data).toEqual({ a: 1, b: { c: 2, d: { e: 0 } } });
    expect(fn).toHaveBeenCalledTimes(5);

    data.b.d.e = 3;
    expect(data).toEqual({ a: 1, b: { c: 2, d: { e: 3 } } });
    expect(fn).toHaveBeenCalledTimes(6);
  });

  test("Multiple callbacks can be registered for the same field", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const data = toDeepReactive({ a: 0 });
    registerCallback(data, "a", fn1);
    registerCallback(data, "a", fn2);

    expect(data).toEqual({ a: 0 });
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);

    data.a = 1;
    expect(data).toEqual({ a: 1 });
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(2);
  });
});
