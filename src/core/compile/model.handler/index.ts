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
  // c-model="title" -> hasDirective = true, modelField = title.
  const hasDirective = attr.startsWith("c-model");
  const modelField = node.getAttribute(attr);
  if (!hasDirective || !modelField) {
    return;
  }

  // Two-bind View and Model.
  const modelType = getModelType(node, app, modelField);
  const { modelToView, viewToModel } = handlerMap[modelType];
  modelToView(node, app, modelField);
  viewToModel(node, app, modelField);

  // Remove directive.
  node.removeAttribute(attr);
}
