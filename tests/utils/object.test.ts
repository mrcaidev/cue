import { getValueByPath, setValueByPath } from "src/utils/object";
import { describe, expect, test } from "vitest";

describe("getValueByPath", () => {
  test("It returns the correct value if the path exists", () => {
    const object = { foo: { a: "hello", b: "world" } };
    const result = getValueByPath(object, "foo.a");
    expect(result).toEqual("hello");
  });

  test("It returns undefined if the path does not exist", () => {
    const object = { foo: { a: "hello", b: "world" } };
    const result = getValueByPath(object, "foo.c");
    expect(result).toEqual(undefined);
  });

  test("It returns undefined if there is a non-object value in the path", () => {
    const object = "foo";
    const result = getValueByPath(object, "foo.a");
    expect(result).toEqual(undefined);
  });

  test("Object does not get mutated", () => {
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

  test("It does nothing if there is a non-object value in the path", () => {
    const object = "foo";
    setValueByPath(object, "foo.a", "hello");
    expect(object).toEqual("foo");
  });
});
