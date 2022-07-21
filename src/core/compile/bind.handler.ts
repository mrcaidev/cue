import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath } from "utils";
import { booleanAttrs } from "../../constants";

/**
 * Handle `bind` directive.
 *
 * @param node - Current element.
 * @param attr - Current attribute.
 * @param app - App instance.
 *
 * @internal
 */
export function handleBind(node: HTMLElement, attr: string, app: App) {
  // c-bind:class="title" -> bindAttr = "class", field = "title".
  const bindAttr = attr.match(/^(?:c-bind)?:(.*)$/)?.at(1);
  const field = node.getAttribute(attr);
  if (!bindAttr || !field) {
    return;
  }

  // Model -> View.
  modelToView(node, bindAttr, app, field);

  // Remove directive.
  node.removeAttribute(attr);
}

/**
 * Bind model to view.
 *
 * @param node - Node to bind.
 * @param attr - Attribute to bind.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: HTMLElement, attr: string, app: App, field: string) {
  if (booleanAttrs.includes(attr)) {
    node.toggleAttribute(attr, Boolean(getValueByPath(app.data, field)));
    new Watcher(app.data, field, (newValue) => {
      node.toggleAttribute(attr, Boolean(newValue));
    });
  } else {
    node.setAttribute(attr, getValueByPath(app.data, field));
    new Watcher(app.data, field, (newValue) => {
      node.setAttribute(attr, newValue);
    });
  }
}
