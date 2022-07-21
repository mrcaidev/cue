import { getValueByPath } from "utils";
import { Subscriptors, type Subscriptor } from "./subscriptors";

/**
 * Watcher of a specific field in data source.
 *
 * When the field it watches has any updates,
 * it will be notified and trigger its callback.
 *
 * @internal
 */
export class Watcher implements Subscriptor {
  /** Data it depends on. */
  data: Record<string, any>;

  /** Field it watches. */
  field: string;

  /** Current saved value. */
  currentValue: any;

  /** Callback function to trigger on updates. */
  callback: (newValue: any) => void;

  constructor(
    data: Record<string, any>,
    target: string,
    callback: (newValue: any) => void
  ) {
    this.data = data;
    this.field = target;
    this.callback = callback;

    // When a new watcher is created,
    // let it fetch its target value at once.
    // And the target will add the new watcher
    // to its subscription list at the same time.
    Subscriptors.waitingSubscriptor = this;
    this.currentValue = getValueByPath(this.data, this.field);
    Subscriptors.waitingSubscriptor = null;
  }

  /**
   * Update method exposed to the subscription source.
   *
   * Every time the target updates, the target will trigger
   * the update method of all its subscriptors.
   */
  update() {
    // Fetch new value after update.
    const newValue = getValueByPath(this.data, this.field);

    // If value changes, trigger callback and save new value.
    if (this.currentValue !== newValue) {
      this.callback(newValue);
      this.currentValue = newValue;
    }
  }
}
