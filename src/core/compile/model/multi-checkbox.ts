import { type App } from "app";
import { Watcher } from "core/watcher";
import { getValueByPath, setValueByPath } from "utils";

/**
 * Handle `model` directive on multi-checkbox.
 *
 * @internal
 */
export const multiCheckboxHandler = { bindModelToView, bindViewToModel };

function bindModelToView(node: HTMLElement, app: App, field: string) {
  const checkbox = node as HTMLInputElement;
  new Watcher(app.data, field, (newList) => {
    checkbox.checked = newList.includes(checkbox.value);
  });
}

function bindViewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("change", (e: Event) => {
    const checkbox = e.target as HTMLInputElement;

    const currentValues = Array.from(getValueByPath(app.data, field));
    const isIncluded = currentValues.includes(checkbox.value);

    if (checkbox.checked && !isIncluded) {
      setValueByPath(app.data, field, [...currentValues, checkbox.value]);
    } else if (!checkbox.checked && isIncluded) {
      const index = currentValues.indexOf(checkbox.value);
      currentValues.splice(index, 1);
      setValueByPath(app.data, field, currentValues);
    }
  });
}
