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

  node.textContent =
    // Replace all double curly brackets.
    template?.replace(mustacheRegex, (...regexGroup) => {
      // Watch the field specified in brackets.
      const field = regexGroup[1];
      new Watcher(app.data, field, () => {
        node.textContent = template?.replace(mustacheRegex, (...regexGroup) => {
          const field = regexGroup[1];
          return getValueByPath(app.data, field);
        });
      });

      // Fetch latest value on first replace.
      return getValueByPath(app.data, field);
    }) ?? null;
}
