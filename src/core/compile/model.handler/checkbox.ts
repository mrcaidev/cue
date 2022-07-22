import { type App } from "app";
import { Watcher } from "core/watcher";
import { setValueByPath } from "utils";

/**
 * Handle `model` directive on checkbox.
 *
 * @internal
 */
export const checkboxHandler = { modelToView, viewToModel };

/**
 * Bind model to view.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: HTMLElement, app: App, field: string) {
  const checkbox = node as HTMLInputElement;
  new Watcher(app.data, field, (newChecked) => {
    checkbox.checked = newChecked;
  });
}

/**
 * Bind view to model.
 *
 * @param node - Current element.
 * @param app - Data source from VM.
 * @param field - Field to bind.
 */
function viewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("change", (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setValueByPath(app.data, field, checked);
  });
}
