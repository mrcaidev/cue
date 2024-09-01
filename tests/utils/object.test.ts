import { getValueByPath, isObject, setValueByPath } from "src/utils/object";
import { describe, expect, test } from "vitest";

describe("isObject", () => {
  test("It returns true if the value is an object", () => {
    const result = isObject({});
    expect(result).toEqual(true);
  });

  test("It returns true if the value is an array", () => {
    const result = isObject([]);
    expect(result).toEqual(true);
  });

  test("It returns false if the value is a function", () => {
    const result = isObject(() => 0);
    expect(result).toEqual(false);
  });

  test("It returns false if the value is null", () => {
    const result = isObject(null);
    expect(result).toEqual(false);
  });

  test("It returns false if the value is undefined", () => {
    const result = isObject(undefined);
    expect(result).toEqual(false);
  });

  test("It returns false if the value is a primitive", () => {
    const result = isObject(1);
    expect(result).toEqual(false);
  });
});

describe("getValueByPath", () => {
  test("It returns the value if the path exists", () => {
    const object = { foo: { a: "hello", b: "world" } };
    const result = getValueByPath(object, "foo.a");
    expect(result).toEqual("hello");
  });

  test("It returns undefined if the path does not exist", () => {
    const object = { foo: { a: "hello", b: "world" } };
    const result = getValueByPath(object, "foo.c");
    expect(result).toEqual(undefined);
  });

  test("It returns undefined if there is a non-object segment in the path", () => {
    const object = "foo";
    const result = getValueByPath(object, "foo.a");
    expect(result).toEqual(undefined);
  });

  test("Object is not mutated", () => {
    const object = { foo: { a: "hello", b: "world" } };
    getValueByPath(object, "foo.a");
    expect(object).toEqual({ foo: { a: "hello", b: "world" } });
  });
});

describe("setValueByPath", () => {
  test("It updates the value if the path exists", () => {
    const object = { foo: { a: "hello", b: "world" } };
    setValueByPath(object, "foo.a", "goodbye");
    expect(object).toEqual({ foo: { a: "goodbye", b: "world" } });
  });

  test("It adds the value if the path does not exist", () => {
    const object = {};
    setValueByPath(object, "foo.a", "hello");
    expect(object).toEqual({ foo: { a: "hello" } });
  });

  test("It does nothing if there is a non-object segment in the path", () => {
    const object = "foo";
    setValueByPath(object, "foo.a", "hello");
    expect(object).toEqual("foo");
  });
});
