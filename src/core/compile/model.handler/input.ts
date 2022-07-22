import { type App } from "app";
import { Watcher } from "core/watcher";
import { setValueByPath } from "utils";

/**
 * Handle `model` directive on input or textarea.
 *
 * @internal
 */
export const inputHandler = { modelToView, viewToModel };

/**
 * Bind model to view.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: HTMLElement, app: App, field: string) {
  const input = node as HTMLInputElement;
  new Watcher(app.data, field, (newValue) => {
    input.value = newValue;
  });
}

/**
 * Bind view to model.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function viewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("input", (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setValueByPath(app.data, field, value);
  });
}
