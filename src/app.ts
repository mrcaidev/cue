import { toDeepReactive } from "./reactive.ts";
import { transpile } from "./transpiler/transpile.ts";

/**
 * Options of a Cue app.
 */
interface Options {
  /**
   * The identifier of the root node, where the app mounts to.
   *
   * @default "body"
   *
   * @example "#app", "#root"
   */
  root?: string;

  /**
   * Data source of the app.
   */
  // biome-ignore lint/suspicious/noExplicitAny: For easier usage.
  data?: Record<string, any>;

  /**
   * Methods that can manipulate the data, or trigger some side effects.
   */
  methods?: Record<string, (...args: unknown[]) => unknown>;
}

/**
 * A View-Model that realizes the two-way binding of View and Model.
 */
export class App {
  public data: NonNullable<Options["data"]> = {};
  public methods: NonNullable<Options["methods"]> = {};

  constructor(options: Options) {
    const { root = "body", data = {}, methods = {} } = options;

    this.data = toDeepReactive(data);
    this.methods = methods;

    transpile(document.querySelector(root) ?? document.body, this);
  }
}

/**
 * Create a Cue app.
 *
 * @param options - Options of the app.
 * @returns The created app.
 */
export function createApp(options: Options) {
  return new App(options);
}
