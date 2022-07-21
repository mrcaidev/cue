import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath, setValueByPath } from "utils";

/**
 * Handle `model` directive on radiobox.
 *
 * @internal
 */
export const radioHandler = { modelToView, viewToModel };

/**
 * Bind model to view.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: HTMLElement, app: App, field: string) {
  const radio = node as HTMLInputElement;
  radio.checked = getValueByPath(app.data, field) === radio.value;
  new Watcher(app.data, field, (newValue) => {
    radio.checked = newValue === radio.value;
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
  node.addEventListener("change", (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setValueByPath(app.data, field, value);
  });
}
