import { type App } from "app";
import { findElement, isElementNode, isTextNode, prepareFragment } from "utils";
import { handleBind } from "./bind.handler";
import { handleModel } from "./model.handler";
import { handleMustache } from "./mustache.handler";
import { handleOn } from "./on.handler";
import { handleShow } from "./show.handler";

/**
 * Transpile framework-specific syntax into common HTML.
 *
 * @param identifier - Identifier pointing to the root node.
 * @param app - App instance.
 *
 * @internal
 */
export function compile(identifier: string, app: App) {
  const root = findElement(identifier);
  const fragment = prepareFragment(root);
  compileNode(fragment, app);
  root.appendChild(fragment);
}

/**
 * Compile a node recursively.
 *
 * @param node - The node to compile.
 * @param app - App instance.
 *
 * @internal
 */
function compileNode(node: Node, app: App) {
  node.childNodes.forEach((child) => {
    if (isTextNode(child)) {
      compileTextNode(child, app);
    } else if (isElementNode(child)) {
      compileElementNode(child, app);
      compileNode(child, app);
    }
  });
}

/**
 * Compile text node.
 *
 * @param node - The text node to compile.
 * @param app - App instance.
 *
 * @internal
 */
function compileTextNode(node: Text, app: App) {
  handleMustache(node, app);
}

/**
 * Compile element node.
 *
 * @param node - The element node to compile.
 * @param app - App instance.
 *
 * @internal
 */
function compileElementNode(node: HTMLElement, app: App) {
  // Handle all attributes of the element.
  node.getAttributeNames().forEach((attr) => {
    handleBind(node, attr, app);
    handleOn(node, attr, app);
    handleModel(node, attr, app);
    handleShow(node, attr, app);
  });
}
