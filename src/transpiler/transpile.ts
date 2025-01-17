import type { App } from "@/app.ts";
import { handleBindDirective } from "./bind.ts";
import { handleHtmlDirective } from "./html.ts";
import { handleModelDirective } from "./model.ts";
import { handleMustache } from "./mustache.ts";
import { handleOnDirective } from "./on.ts";
import { handleShowDirective } from "./show.ts";

/**
 * Transpile Cue syntax into normal HTML syntax.
 *
 * @param root - The root node of the app.
 * @param app - The app instance.
 */
export function transpile(root: Node, app: App) {
  const fragment = prepareFragment(root);
  transpileNode(fragment, app);
  root.appendChild(fragment);
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
function prepareFragment(root: Node) {
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

/**
 * Transpile a node recursively.
 *
 * @param node - The node to be transpiled.
 * @param app - The app instance.
 */
function transpileNode(node: Node, app: App) {
  for (const childNode of node.childNodes) {
    if (
      childNode.nodeType === Node.TEXT_NODE &&
      childNode.textContent?.trim() !== ""
    ) {
      transpileTextNode(childNode as Text, app);
      continue;
    }

    if (childNode.nodeType === Node.ELEMENT_NODE) {
      transpileElementNode(childNode as HTMLElement, app);
      transpileNode(childNode, app);
    }
  }
}

/**
 * Transpile a text node.
 *
 * @param node - The text node to be transpiled.
 * @param app - The app instance.
 */
function transpileTextNode(node: Text, app: App) {
  handleMustache(node, app);
}

/**
 * Transpile an element node.
 *
 * @param node - The element node to be transpiled.
 * @param app - The app instance.
 */
function transpileElementNode(node: HTMLElement, app: App) {
  for (const attributeName of node.getAttributeNames()) {
    handleBindDirective(node, attributeName, app);
    handleOnDirective(node, attributeName, app);
    handleModelDirective(node, attributeName, app);
    handleShowDirective(node, attributeName, app);
    handleHtmlDirective(node, attributeName, app);
  }
}
