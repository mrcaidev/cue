import type { App } from "@/app.ts";
import { registerCallback } from "@/reactive.ts";

/**
 * Handle a possible `c-html` directive.
 *
 * @param node - The element node currently inspecting.
 * @param attributeName - The name of the attribute.
 * @param app - The app instance.
 */
export function handleHtmlDirective(
  node: HTMLElement,
  attributeName: string,
  app: App,
) {
  const isHtmlDirective = attributeName.startsWith("c-html");

  if (!isHtmlDirective) {
    return;
  }

  const path = node.getAttribute(attributeName);

  if (!path) {
    return;
  }

  registerCallback(app.data, path, (newValue) => {
    node.innerHTML = String(newValue);
  });

  node.removeAttribute(attributeName);
}
