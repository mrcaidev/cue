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
  // c-on:click="handler" -> event = "click", field = "handler".
  const event = attr.match(/^(?:(?:c-on:)|@)(.*)$/)?.at(1);
  const field = node.getAttribute(attr);
  if (!event || !field) {
    return;
  }

  // View -> Model.
  viewToModel(node, event, app, field);

  // Remove directive.
  node.removeAttribute(attr);
}

/**
 * Bind view to model.
 *
 * @param node - Node to bind.
 * @param event - Event to listen.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function viewToModel(
  node: HTMLElement,
  event: string,
  app: App,
  field: string
) {
  const method = app[field] as (...args: any) => any;
  node.addEventListener(event, method.bind(app));
}
