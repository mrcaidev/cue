import { type App } from "app";
import { Watcher } from "core/watcher";
import { setValueByPath } from "utils";

/**
 * Handle `model` directive on checkbox.
 *
 * @internal
 */
export const checkboxHandler = { bindModelToView, bindViewToModel };

function bindModelToView(node: HTMLElement, app: App, field: string) {
  const checkbox = node as HTMLInputElement;
  new Watcher(app.data, field, (newChecked) => {
    checkbox.checked = newChecked;
  });
}

function bindViewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("change", (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    setValueByPath(app.data, field, checkbox.checked);
  });
}
