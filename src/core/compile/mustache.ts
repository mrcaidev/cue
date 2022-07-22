import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath } from "utils";

/** Regular expression of mustache syntax. */
const mustacheRegex = /\{\{\s*(.+?)\s*\}\}/g;

/**
 * Handle mustache syntax.
 *
 * @param node - Current node.
 * @param app - App instance.
 *
 * @internal
 */
export function handleMustache(node: Text, app: App) {
  // Save original text as template of updating afterwards.
  const template = node.textContent ?? "";

  // Place a watcher on each field.
  [...template.matchAll(mustacheRegex)].forEach((group) => {
    new Watcher(app.data, group[1] ?? "", () => {
      node.textContent = template.replace(mustacheRegex, (...regexGroup) => {
        const field = regexGroup[1];
        return getValueByPath(app.data, field);
      });
    });
  });
}
