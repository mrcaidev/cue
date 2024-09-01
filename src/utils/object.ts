/**
 * Check if a value is an object.
 *
 * @param value - The value to check.
 * @returns `true` if it is an object, or `false` otherwise.
 *
 * @example
 * isObject({}); // true
 * isObject([]); // true
 * isObject(null); // false
 * isObject(1); // false
 */
export function isObject(value: any): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

/**
 * Get the value at a given path of an object.
 *
 * @param object The object to query.
 * @param path The path to the field, separated by dots.
 * @returns The resolved value.
 *
 * @example
 * const object = { foo: { a: "hello", b: "world" } };
 * getValueByPath(object, "foo.a"); // "hello"
 * getValueByPath(object, "foo.c"); // undefined
 */
export function getValueByPath(object: any, path: string) {
  const segments = path.split(".");

  let result = object;

  for (const segment of segments) {
    if (!isObject(result)) {
      return undefined;
    }

    result = result[segment];
  }

  return result;
}

/**
 * Set the value at a given path of an object.
 *
 * @param object An object to modify.
 * @param path The path to the field, separated by dots.
 * @param value The new value.
 *
 * @example
 * const object = { foo: { a: "hello", b: "world" } };
 * setValueByPath(object, "foo.a", "goodbye"); // { foo: { a: "goodbye", b: "world" } };
 * setValueByPath(object, "foo.c", "yeah"); // { foo: { a: "hello", b: "world", c: "yeah" } };
 */
export function setValueByPath(object: any, path: string, value: any) {
  const segments = path.split(".");
  const field = segments.pop()!;

  let result = object;

  for (const segment of segments) {
    if (!isObject(result)) {
      return;
    }

    if (!(segment in result)) {
      result[segment] = {};
    }

    result = result[segment];
  }

  if (!isObject(result)) {
    return;
  }

  result[field] = value;
}
