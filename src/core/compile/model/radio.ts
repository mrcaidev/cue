import { type App } from "app";
import { Watcher } from "core/watcher";
import { setValueByPath } from "utils";

/**
 * Handle `model` directive on radio.
 *
 * @internal
 */
export const radioHandler = { bindModelToView, bindViewToModel };

function bindModelToView(node: HTMLElement, app: App, field: string) {
  const radio = node as HTMLInputElement;
  new Watcher(app.data, field, (newValue) => {
    radio.checked = newValue === radio.value;
  });
}

function bindViewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("change", (e: Event) => {
    const radio = e.target as HTMLInputElement;
    setValueByPath(app.data, field, radio.value);
  });
}
