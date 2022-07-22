import { type App } from "app";
import { Watcher } from "core/watcher";
import { setValueByPath } from "utils";

/**
 * Handle `model` directive on input or textarea.
 *
 * @internal
 */
export const inputHandler = { bindModelToView, bindViewToModel };

function bindModelToView(node: HTMLElement, app: App, field: string) {
  const input = node as HTMLInputElement;
  new Watcher(app.data, field, (newValue) => {
    input.value = newValue;
  });
}

function bindViewToModel(node: HTMLElement, app: App, field: string) {
  node.addEventListener("input", (e: Event) => {
    const input = e.target as HTMLInputElement;
    setValueByPath(app.data, field, input.value);
  });
}
