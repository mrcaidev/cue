import { getValueByPath, setValueByPath } from "utils";

describe("getValueByPath", () => {
  it("returns value given correct path", () => {
    const obj1 = { message: "foo" };
    const result1 = getValueByPath(obj1, "message");
    expect(result1).toEqual("foo");

    const obj2 = { message: { foo: "bar" } };
    const result2 = getValueByPath(obj2, "message.foo");
    expect(result2).toEqual("bar");

    const obj3 = { message: { foo: { bar: "baz" } } };
    const result3 = getValueByPath(obj3, "message.foo.bar");
    expect(result3).toEqual("baz");
  });

  it("returns undefined given incorrect path", () => {
    const obj1 = {};
    const result1 = getValueByPath(obj1, "message");
    expect(result1).toEqual(undefined);

    const obj2 = { message: "foo" };
    const result2 = getValueByPath(obj2, "foo");
    expect(result2).toEqual(undefined);

    const obj3 = { message: { foo: "bar" } };
    const result3 = getValueByPath(obj3, "message.bar");
    expect(result3).toEqual(undefined);
  });
});

describe("setValueByPath", () => {
  it("sets new value given new path", () => {
    const obj1 = {};
    setValueByPath(obj1, "message", "foo");
    expect(obj1).toEqual({ message: "foo" });

    const obj2 = { message: "foo" };
    setValueByPath(obj2, "bar", "baz");
    expect(obj2).toEqual({ message: "foo", bar: "baz" });

    const obj3 = { message: { foo: "bar" } };
    setValueByPath(obj3, "message.baz", "hello");
    expect(obj3).toEqual({ message: { foo: "bar", baz: "hello" } });
  });

  it("modifies value given existing path", () => {
    const obj1 = { message: "foo" };
    setValueByPath(obj1, "message", "bar");
    expect(obj1).toEqual({ message: "bar" });

    const obj2 = { message: { foo: "bar" } };
    setValueByPath(obj2, "message.foo", "baz");
    expect(obj2).toEqual({ message: { foo: "baz" } });

    const obj3 = { message: { foo: { bar: "baz" } } };
    setValueByPath(obj3, "message.foo", { hello: "world" });
    expect(obj3).toEqual({ message: { foo: { hello: "world" } } });
  });
});
