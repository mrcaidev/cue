import type { App } from "@/app.ts";
import { registerCallback } from "@/reactive.ts";

/**
 * Handle a possible mustache-syntax text.
 *
 * @param node - The text node currently inspecting.
 * @param app - The app instance.
 */
export function handleMustache(node: Text, app: App) {
  const template = parseRawText(node.textContent ?? "");

  const uniquePaths = new Set(
    template
      .filter((part) => part.type === "mustache")
      .map((part) => part.path),
  );

  for (const path of uniquePaths) {
    registerCallback(app.data, path, (newValue) => {
      for (const segment of template) {
        if (segment.type === "mustache" && segment.path === path) {
          segment.text = String(newValue);
        }
      }

      node.textContent = template.map((part) => part.text).join("");
    });
  }
}

/**
 * Parse the raw text with mustache syntaxes into a template.
 *
 * @param text - The raw text to be parsed.
 * @returns The parsed template.
 *
 * @example
 * parseRawText("status: {{ status }}, username: {{ user.name }}")
 * // [
 * //   { type: "plain", text: "status: " }
 * //   { type: "mustache", path: "status", text: "" }
 * //   { type: "plain", text: ", message: " }
 * //   { type: "mustache", path: "user.name", text: "" }
 * // ]
 */
function parseRawText(text: string) {
  const template: (
    | { type: "plain"; text: string }
    | { type: "mustache"; path: string; text: string }
  )[] = [];

  let cursorIndex = 0;

  for (const matchResult of text.matchAll(/\{\{\s*(.+?)\s*\}\}/g)) {
    const { 0: mustache, 1: path, index: mustacheIndex } = matchResult;

    if (mustacheIndex !== cursorIndex) {
      template.push({
        type: "plain",
        text: text.slice(cursorIndex, mustacheIndex),
      });
    }

    template.push({ type: "mustache", path: path ?? "", text: "" });

    cursorIndex = mustacheIndex + mustache.length;
  }

  if (cursorIndex < text.length) {
    template.push({ type: "plain", text: text.slice(cursorIndex) });
  }

  return template;
}
