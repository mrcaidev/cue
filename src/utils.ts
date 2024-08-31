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
export function isObject(value: unknown): value is Record<string, unknown> {
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
export function getValueByPath(object: unknown, path: string) {
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
export function setValueByPath(object: unknown, path: string, value: unknown) {
  const segments = path.split(".");

  let result = object;

  for (const segment of segments.slice(0, -1)) {
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  result[segments[segments.length - 1]!] = value;
}

/**
 * Check if a node is an element node.
 *
 * @param node - A node.
 * @returns `true` if it is an element node, or `false` otherwise.
 *
 * @internal
 */
export function isElementNode(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

/**
 * Check if a node is a text node.
 *
 * @param node - A node.
 * @returns `true` if it is a text node, or `false` otherwise.
 *
 * @internal
 */
export function isTextNode(node: Node): node is Text {
  return node instanceof Text;
}

/**
 * Find the element with its identifier.
 *
 * @param identifier - Identifier pointing to an element, e.g. id or class.
 * @returns Element found.
 *
 * @internal
 */
export function findElement(identifier: string) {
  const target = document.querySelector(identifier);
  if (!target) {
    throw new Error("identifier not found:" + identifier);
  }
  return target;
}

/**
 * Turn a part of DOM into fragment.
 *
 * Two reasons this should be done:
 *
 * 1. As a fragment is in memory instead of DOM,
 *    compilation can also take place in memory,
 *    without the trouble of DOM manipulation,
 *    accelerating the compilation.
 * 2. As such, the page will not be re-rendered repeatedly.
 *
 * @param root - The root node of the DOM to be moved into a fragment.
 * @returns Fragment result.
 *
 * @internal
 */
export function prepareFragment(root: Element) {
  const fragment = document.createDocumentFragment();

  // Common traversing methods like `forEach` is not applicable here,
  // as they are based on array index.
  // But `appendChild` will keep removing elements from original array,
  // changing elements' indexes.
  // In fact, they will skip all elements with odd index.
  //
  // So a primitive loop is used here,
  // continously fetching the first child of the root node,
  // and add it to the fragment, until there are no child left.
  while (root.firstChild) {
    fragment.appendChild(root.firstChild);
  }

  return fragment;
}
