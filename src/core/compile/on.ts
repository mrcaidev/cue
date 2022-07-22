import { type App } from "app";

/**
 * Handle `on` directive.
 *
 * @param node - Current element.
 * @param attr - Current attribute.
 * @param app - App instance.
 *
 * @internal
 */
export function handleOn(node: HTMLElement, attr: string, app: App) {
  const isDirective = attr.startsWith("c-on") || attr.startsWith("@");
  if (!isDirective) return;

  const event = attr.match(/^(?:(?:c-on:)|@)(.*)$/)?.at(1);
  if (!event) return;

  const field = node.getAttribute(attr);
  if (!field) return;

  viewToModel(node, event, app, field);

  node.removeAttribute(attr);
}

function viewToModel(
  node: HTMLElement,
  event: string,
  app: App,
  field: string
) {
  const method = app[field] as (...args: any) => any;
  node.addEventListener(event, method.bind(app));
}
