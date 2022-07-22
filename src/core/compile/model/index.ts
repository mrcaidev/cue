import { type App } from "app";
import { checkboxHandler } from "./checkbox";
import { inputHandler } from "./input";
import { multiCheckboxHandler } from "./multi-checkbox";
import { radioHandler } from "./radio";
import { selectHandler } from "./select";
import { getModelType, ModelType } from "./type";

const handlerMap: Record<
  Exclude<ModelType, ModelType.INVALID>,
  {
    bindModelToView: (node: HTMLElement, app: App, field: string) => void;
    bindViewToModel: (node: HTMLElement, app: App, field: string) => void;
  }
> = {
  [ModelType.INPUT]: inputHandler,
  [ModelType.CHECKBOX]: checkboxHandler,
  [ModelType.MULTI_CHECKBOX]: multiCheckboxHandler,
  [ModelType.RADIO]: radioHandler,
  [ModelType.SELECT]: selectHandler,
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
  const isDirective = attr.startsWith("c-model");
  if (!isDirective) return;

  const field = node.getAttribute(attr);
  if (!field) return;

  const modelType = getModelType(node, app, field);
  if (modelType === ModelType.INVALID) return;

  const { bindModelToView, bindViewToModel } = handlerMap[modelType];
  bindModelToView(node, app, field);
  bindViewToModel(node, app, field);

  node.removeAttribute(attr);
}
