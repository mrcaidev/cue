import type { App } from "@/app.ts";
import { registerCallback } from "@/reactive.ts";

/**
 * Handle a possible `c-show` directive.
 *
 * @param node - The element node currently inspecting.
 * @param attributeName - The name of the attribute.
 * @param app - The app instance.
 */
export function handleShowDirective(
  node: HTMLElement,
  attributeName: string,
  app: App,
) {
  const isShowDirective = attributeName.startsWith("c-show");

  if (!isShowDirective) {
    return;
  }

  const path = node.getAttribute(attributeName);

  if (!path) {
    return;
  }

  registerCallback(app.data, path, (newValue) => {
    node.style.display = newValue ? "" : "none";
  });

  node.removeAttribute(attributeName);
}
