import { Subscriptors } from "./subscriptors";

/**
 * Make a value deeply reactive.
 *
 * @param value - The value to make deeply reactive.
 * @returns Deeply reactive value.
 *
 * @internal
 */
export function toDeeplyReactive(value: Record<string, any>) {
  // Stop recursion if the value is not object type.
  if (!value || typeof value !== "object") {
    return value;
  }

  // Otherwise, make all its child fields deeply reactive.
  //
  // This recursion should be put before the processing of itself.
  // If not, operations on child fields will repeatedly invoke its own proxy,
  // leading to performance issues.
  Object.entries(value).forEach(([key, val]) => {
    value[key] = toDeeplyReactive(val);
  });

  // Make itself deeply reactive.
  return toReactive(value);
}

/**
 * Make a value reactive.
 *
 * @param value - The value to make reactive.
 * @returns Reactive value.
 */
function toReactive(value: Record<string, any>) {
  // Maintain a subscriptor list inside,
  // who can subscript to its updates.
  const subscriptors = new Subscriptors();

  // Proxy itself to hack into data operation.
  return new Proxy(value, {
    get(target, key) {
      // If a waiting subscritor is detected when the data is fetched,
      // that means the fetcher is exactly the waiting subscriptor.
      // Add it to the subscriptor list.
      if (Subscriptors.waitingSubscriptor) {
        subscriptors.add(Subscriptors.waitingSubscriptor);
      }
      return target[String(key)];
    },
    set(target, key, val) {
      // Make the new value deeply reactive.
      target[String(key)] = toDeeplyReactive(val);

      // Notify all subscriptors of its update.
      subscriptors.notify();
      return true;
    },
  });
}
