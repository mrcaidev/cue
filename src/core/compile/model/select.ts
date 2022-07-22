import { type App } from "app";
import { Watcher } from "core/watcher";
import { setValueByPath } from "utils";

/**
 * Handle `model` directive on select.
 *
 * @internal
 */
export const selectHandler = { bindModelToView, bindViewToModel };

function bindModelToView(node: HTMLElement, app: App, field: string) {
  const select = node as HTMLSelectElement;
  new Watcher(app.data, field, (newValue) => {
    select.value = newValue;
  });
}

function bindViewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("change", (e: Event) => {
    const select = e.target as HTMLSelectElement;
    setValueByPath(app.data, field, select.value);
  });
}
