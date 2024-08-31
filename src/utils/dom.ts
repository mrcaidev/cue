/**
 * Check if a node is an element node.
 *
 * @param node - The node to check.
 * @returns `true` if it is an element node, or `false` otherwise.
 */
export function isElementNode(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Check if a node is a text node.
 *
 * @param node - The node to check.
 * @returns `true` if it is a text node, or `false` otherwise.
 */
export function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE;
}

/**
 * Find an element with an identifier.
 *
 * @param identifier - The identifier of an element, such as an id or a class.
 * @returns The element found.
 */
export function findElement(identifier: string) {
  const target = document.querySelector(identifier);

  if (!target) {
    throw new Error("identifier not found: " + identifier);
  }

  return target;
}

/**
 * Turn a DOM (sub)tree into a fragment.
 *
 * Two reasons why this should be done:
 *
 * 1. A fragment exists in memory, rather than DOM. As such,
 *    the compilation process can also take place in memory,
 *    and do not need to manipulate the DOM directly, thus
 *    accelerating the compilation.
 * 2. Consequently, the page will not be frequently re-rendered.
 *
 * @param root - The root node of the DOM (sub)tree to be turned into a fragment.
 * @returns The result fragment.
 */
export function prepareFragment(root: Element) {
  const fragment = document.createDocumentFragment();

  // Common traversing methods like `forEach` is not applicable here,
  // because they depend on the underlying array index.
  //
  // But `appendChild` will remove the element from the original array,
  // thus changing the indexes of the original elements.
  // More specifically, they will skip all elements with odd index.
  //
  // As a result, a `while` loop is used here instead,
  // which keeps fetching the first child of the root node,
  // and append it to the fragment, until there is no child left.
  while (root.firstChild) {
    fragment.appendChild(root.firstChild);
  }

  return fragment;
}
