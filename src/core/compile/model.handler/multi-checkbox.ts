import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath, setValueByPath } from "utils";

/**
 * Handle `model` directive on multi-checkbox.
 *
 * @internal
 */
export const multiCheckboxHandler = { modelToView, viewToModel };

/**
 * Bind model to view.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - Field to bind.
 */
function modelToView(node: Element, app: App, field: string) {
  const checkbox = node as HTMLInputElement;
  checkbox.checked = getValueByPath(app.data, field).includes(checkbox.value);
  new Watcher(app.data, field, (newList) => {
    checkbox.checked = newList.includes(checkbox.value);
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
    const checked = (e.target as HTMLInputElement).checked;
    const value = (e.target as HTMLInputElement).value;

    const currentValues = Array.from(getValueByPath(app.data, field));
    const isIncluded = currentValues.includes(value);

    if (checked && !isIncluded) {
      setValueByPath(app.data, field, [...currentValues, value]);
    } else if (!checked && isIncluded) {
      const index = currentValues.indexOf(value);
      currentValues.splice(index, 1);
      setValueByPath(app.data, field, currentValues);
    }
  });
}
