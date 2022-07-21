import { compile } from "./core/compile";
import { toDeeplyReactive } from "./core/reactive";

/**
 * Options to create an app.
 *
 * @public
 */
export interface AppOptions extends Record<string, any> {
  /**
   * An identifier pointing to the root element of the app.
   *
   * @example
   * "#app", "#root"
   */
  root: string;

  /**
   * Data source of the whole app.
   */
  data: Record<string, any>;
}

/**
 * App on View-Model layer, allowing the two-way binding of View and Model.
 *
 * @public
 */
export class App {
  /** Data. */
  data: Record<string, any>;

  /** Methods. */
  [key: string]: any;

  constructor(options: AppOptions) {
    const { root, data, ...rest } = options;

    // Make data deeply reactive, and mount it onto app.
    this.data = toDeeplyReactive(data);

    // Mount methods onto app.
    Object.entries(rest).forEach(([key, method]) => {
      this[key] = method;
    });

    // Parse DOM.
    compile(root, this);
  }
}

/**
 * Create an app.
 *
 * @param options - Options to create an app.
 * @returns Created app.
 *
 * @public
 */
export function createApp(options: AppOptions) {
  return new App(options);
}
