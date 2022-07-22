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
  const isDirective = attr.startsWith("c-html");
  if (!isDirective) return;

  const field = node.getAttribute(attr);
  if (!field) return;

  modelToView(node, app, field);

  node.removeAttribute(attr);
}

function modelToView(node: HTMLElement, app: App, field: string) {
  new Watcher(app.data, field, (newValue) => {
    node.innerHTML = newValue;
  });
}
