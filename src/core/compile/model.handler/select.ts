import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath, setValueByPath } from "utils";

/**
 * Handle `model` directive on select.
 *
 * @internal
 */
export const selectHandler = { modelToView, viewToModel };

/**
 * Bind model to view.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: Element, app: App, field: string) {
  const select = node as HTMLSelectElement;
  select.value = getValueByPath(app.data, field);
  new Watcher(app.data, field, (newValue) => {
    select.value = newValue;
  });
}

/**
 * Bind view to model.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function viewToModel(node: Element, app: App, field: string) {
  node.addEventListener("change", (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    setValueByPath(app.data, field, value);
  });
}
