import { type App } from "app";
import { getValueByPath } from "utils";

/**
 * Different types of elements with `model` directive.
 *
 * @internal
 */
export enum ModelType {
  INPUT,
  CHECKBOX,
  MULTI_CHECKBOX,
  RADIO,
  SELECT,
  INVALID,
}

/**
 * Get how to handle `model`.
 *
 * @param node - Current element.
 * @param app - App instance.
 * @param field - The field to bind.
 * @returns How to handle `model` directive.
 *
 * @internal
 */
export function getModelType(node: Element, app: App, field: string) {
  switch (node.tagName) {
    case "SELECT":
      return ModelType.SELECT;

    case "TEXTAREA":
      return ModelType.INPUT;

    case "INPUT":
      switch (node.getAttribute("type")) {
        case "checkbox": {
          const modelValue = getValueByPath(app.data, field);
          if (typeof modelValue === "boolean") {
            return ModelType.CHECKBOX;
          } else if (modelValue instanceof Array) {
            return ModelType.MULTI_CHECKBOX;
          } else {
            return ModelType.INVALID;
          }
        }

        case "radio":
          return ModelType.RADIO;

        case "text":
          return ModelType.INPUT;

        default:
          return ModelType.INVALID;
      }

    default:
      return ModelType.INVALID;
  }
}
