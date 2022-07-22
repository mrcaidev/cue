import { type App } from "app";
import { checkboxHandler } from "./checkbox";
import { inputHandler } from "./input";
import { invalidHandler } from "./invalid";
import { multiCheckboxHandler } from "./multi-checkbox";
import { radioHandler } from "./radio";
import { selectHandler } from "./select";
import { getModelType, ModelType } from "./type";

const handlerMap = {
  [ModelType.INPUT]: inputHandler,
  [ModelType.CHECKBOX]: checkboxHandler,
  [ModelType.MULTI_CHECKBOX]: multiCheckboxHandler,
  [ModelType.RADIO]: radioHandler,
  [ModelType.SELECT]: selectHandler,
  [ModelType.INVALID]: invalidHandler,
};

/**
 * Handle `model` directive.
 *
 * @param node - Current element.
 * @param attr - Current attribute.
 * @param app - App instance.
 *
 * @internal
 */
export function handleModel(node: HTMLElement, attr: string, app: App) {
  // c-model="title" -> field = title.
  const hasDirective = attr.startsWith("c-model");
  const field = node.getAttribute(attr);
  if (!hasDirective || !field) {
    return;
  }

  // Two-bind View and Model.
  const modelType = getModelType(node, app, field);
  const { modelToView, viewToModel } = handlerMap[modelType];
  modelToView(node, app, field);
  viewToModel(node, app, field);

  // Remove directive.
  node.removeAttribute(attr);
}
