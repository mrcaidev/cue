import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath } from "utils";

/**
 * Handle `show` directive.
 *
 * @param node - Current element.
 * @param attr - Current attribute.
 * @param app - App instance.
 *
 * @internal
 */
export function handleShow(node: Element, attr: string, app: App) {
  // c-show="shouldShow" -> field = "shouldShow".
  const hasDirective = attr.startsWith("c-show");
  const field = node.getAttribute(attr);
  if (!hasDirective || !field) {
    return;
  }

  // Model -> View.
  modelToView(node as HTMLElement, app, field);

  // Remove directive.
  node.removeAttribute(attr);
}

/**
 * Bind model to view.
 *
 * @param node - Node to bind.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: HTMLElement, app: App, field: string) {
  node.style.display = getValueByPath(app.data, field) ? "" : "none";
  new Watcher(app.data, field, (newValue) => {
    node.style.display = newValue ? "" : "none";
  });
}
