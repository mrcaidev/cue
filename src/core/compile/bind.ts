import { type App } from "app";
import { Watcher } from "core/watcher";
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
  const isDirective = attr.startsWith("c-bind") || attr.startsWith(":");
  if (!isDirective) return;

  const targetAttr = attr.match(/^(?:(?:c-bind:)|:)(.*)$/)?.at(1);
  if (!targetAttr) return;

  const field = node.getAttribute(attr);
  if (!field) return;

  modelToView(node, targetAttr, app, field);

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
    new Watcher(app.data, field, (newValue) => {
      node.toggleAttribute(attr, Boolean(newValue));
    });
  } else {
    new Watcher(app.data, field, (newValue) => {
      node.setAttribute(attr, newValue);
    });
  }
}
