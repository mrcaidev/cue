import type { App } from "@/app.ts";
import { registerCallback } from "@/reactive.ts";
import { getValueByPath, setValueByPath } from "@/utils/object.ts";

/**
 * Handle a possible `c-model` directive.
 *
 * @param node - The element node currently inspecting.
 * @param attributeName - The name of the attribute.
 * @param app - The app instance.
 */
export function handleModelDirective(
  node: HTMLElement,
  attributeName: string,
  app: App,
) {
  const isModelDirective = attributeName.startsWith("c-model");

  if (!isModelDirective) {
    return;
  }

  const path = node.getAttribute(attributeName);

  if (!path) {
    return;
  }

  getStrategy(node, app, path)();

  node.removeAttribute(attributeName);
}

function getStrategy(node: HTMLElement, app: App, path: string) {
  switch (node.tagName) {
    case "SELECT":
      return () => {
        selectStrategy(node as HTMLSelectElement, app, path);
      };

    case "TEXTAREA":
      return () => {
        inputStrategy(node as HTMLInputElement, app, path);
      };

    case "INPUT":
      switch (node.getAttribute("type")) {
        case "checkbox": {
          const modelValue = getValueByPath(app.data, path);

          if (typeof modelValue === "boolean") {
            return () => {
              checkboxStrategy(node as HTMLInputElement, app, path);
            };
          }

          if (Array.isArray(modelValue)) {
            return () => {
              multiCheckboxStrategy(node as HTMLInputElement, app, path);
            };
          }

          return () => {};
        }

        case "radio":
          return () => {
            radioStrategy(node as HTMLInputElement, app, path);
          };

        case "text":
          return () => {
            inputStrategy(node as HTMLInputElement, app, path);
          };

        default:
          return () => {};
      }

    default:
      return () => {};
  }
}

function inputStrategy(input: HTMLInputElement, app: App, path: string) {
  registerCallback(app.data, path, (newValue) => {
    input.value = String(newValue);
  });
  input.addEventListener("change", () => {
    setValueByPath(app.data, path, input.value);
  });
}

function checkboxStrategy(checkbox: HTMLInputElement, app: App, path: string) {
  registerCallback(app.data, path, (newChecked) => {
    checkbox.checked = Boolean(newChecked);
  });
  checkbox.addEventListener("change", () => {
    setValueByPath(app.data, path, checkbox.checked);
  });
}

function multiCheckboxStrategy(
  checkbox: HTMLInputElement,
  app: App,
  path: string,
) {
  registerCallback(app.data, path, (newList) => {
    checkbox.checked =
      Array.isArray(newList) && newList.includes(checkbox.value);
  });

  checkbox.addEventListener("change", () => {
    const currentValues = Array.from(app.data[path]);
    const isIncluded = currentValues.includes(checkbox.value);

    if (checkbox.checked && !isIncluded) {
      setValueByPath(app.data, path, [...currentValues, checkbox.value]);
      return;
    }

    if (!checkbox.checked && isIncluded) {
      const index = currentValues.indexOf(checkbox.value);
      currentValues.splice(index, 1);
      setValueByPath(app.data, path, currentValues);
    }
  });
}

function radioStrategy(radio: HTMLInputElement, app: App, path: string) {
  registerCallback(app.data, path, (newValue) => {
    radio.checked = newValue === radio.value;
  });

  radio.addEventListener("change", () => {
    setValueByPath(app.data, path, radio.value);
  });
}

function selectStrategy(select: HTMLSelectElement, app: App, path: string) {
  registerCallback(app.data, path, (newValue) => {
    select.value = String(newValue);
  });

  select.addEventListener("change", () => {
    setValueByPath(app.data, path, select.value);
  });
}
