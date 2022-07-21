/**
 * Get value from nested object based on the given path.
 *
 * @param obj An object.
 * @param path A string pointing to a field.
 * @returns Value of that field.
 *
 * @example
 * const obj = { message: { foo: "hello", bar: "world" } };
 * const result = getValueByPath(obj, "message.foo");
 * console.log(result); // "hello"
 *
 * @internal
 */
export function getValueByPath(obj: Record<string, any>, path: string) {
  return path.split(".").reduce((pre, cur) => {
    try {
      return pre[cur];
    } catch {
      return undefined;
    }
  }, obj) as any;
}

/**
 * Set value in nested object based on path string.
 *
 * @param obj An object.
 * @param path Path string to set value.
 * @param value New value.
 *
 * @example
 * const obj = { message: { foo: "hello", bar: "world" } };
 * setValueByPath(obj, "message.foo", "example");
 * console.log(obj); // { message: { foo: "example", bar: "world" } };
 *
 * @internal
 */
export function setValueByPath(
  obj: Record<string, any>,
  path: string,
  value: any
) {
  path.split(".").reduce((pre, cur, index, array) => {
    if (index !== array.length - 1) {
      return pre[cur];
    } else {
      pre[cur] = value;
      return;
    }
  }, obj);
}

/**
 * Check if a node is an element node.
 *
 * @param node - A node.
 * @returns `true` if it is an element node, or `false` otherwise.
 *
 * @internal
 */
export function isElementNode(node: Node) {
  return node instanceof Element;
}

/**
 * Check if a node is a text node.
 *
 * @param node - A node.
 * @returns `true` if it is a text node, or `false` otherwise.
 *
 * @internal
 */
export function isTextNode(node: Node) {
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
