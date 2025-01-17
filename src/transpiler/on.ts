import type { App } from "@/app.ts";

/**
 * Handle a possible `c-on` directive.
 *
 * @param node - The element node currently inspecting.
 * @param attributeName - The name of the attribute.
 * @param app - The app instance.
 */
export function handleOnDirective(
  node: HTMLElement,
  attributeName: string,
  app: App,
) {
  const isOnDirective =
    attributeName.startsWith("c-on") || attributeName.startsWith("@");

  if (!isOnDirective) {
    return;
  }

  const eventType = /^(?:(?:c-on:)|@)(.*)$/.exec(attributeName)?.at(1);

  if (!eventType) {
    return;
  }

  const path = node.getAttribute(attributeName);

  if (!path) {
    return;
  }

  if (app.methods[path]) {
    node.addEventListener(eventType, app.methods[path]);
  }

  node.removeAttribute(attributeName);
}
