import type { App } from "@/app.ts";
import { registerCallback } from "@/reactive.ts";

/**
 * HTML Attributes that can only be either true or false.
 *
 * @see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
 */
const booleanAttributeNames = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "truespeed",
];

/**
 * Handle a possible `c-bind` directive.
 *
 * @param node - The element node currently inspecting.
 * @param attributeName - The name of the attribute.
 * @param app - The app instance.
 */
export function handleBindDirective(
  node: HTMLElement,
  attributeName: string,
  app: App,
) {
  const isBindDirective =
    attributeName.startsWith("c-bind") || attributeName.startsWith(":");

  if (!isBindDirective) {
    return;
  }

  const boundAttributeName = /^(?:(?:c-bind:)|:)(.*)$/.exec(attributeName)?.[1];

  if (!boundAttributeName) {
    return;
  }

  const path = node.getAttribute(attributeName);

  if (!path) {
    return;
  }

  if (booleanAttributeNames.includes(boundAttributeName)) {
    registerCallback(app.data, path, (newValue) => {
      node.toggleAttribute(boundAttributeName, Boolean(newValue));
    });
  } else {
    registerCallback(app.data, path, (newValue) => {
      node.setAttribute(boundAttributeName, String(newValue));
    });
  }

  node.removeAttribute(attributeName);
}
