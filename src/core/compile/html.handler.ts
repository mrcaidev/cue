import { type App } from "app";
import { Watcher } from "core/watcher";

/**
 * Handle `html` directive.
 *
 * @param node - Current element.
 * @param attr - Current attribute.
 * @param app - App instance.
 *
 * @internal
 */
export function handleHtml(node: HTMLElement, attr: string, app: App) {
  // c-html="content" -> field = "content".
  const hasDirective = attr.startsWith("c-html");
  const field = node.getAttribute(attr);
  if (!hasDirective || !field) {
    return;
  }

  // Model -> View.
  modelToView(node, app, field);

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
  new Watcher(app.data, field, (newValue) => {
    node.innerHTML = newValue;
  });
}
