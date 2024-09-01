import { getValueByPath, isObject } from "./utils/object";

/**
 * For a proxy setter, if the intercepted key equals to this special string,
 * it means that the caller does not truly intend to set some value,
 * but instead to register a callback for another field.
 */
const __CUE_INTERNAL_REGISTER_CALLBACK__ = "__CUE_INTERNAL_REGISTER_CALLBACK__";

/**
 * An object.
 */
type Obj = Record<string | symbol, any>;

/**
 * A callback is a function, registered for a certain field,
 * and triggered every time this field is set to a new value.
 */
type Callback = (newValue: any) => any;

/**
 * Make an object reactive.
 *
 * In other words, turn the object into a proxy,
 * so that every time a certain field is set to a new value,
 * the callbacks registered for this field are triggered.
 *
 * @param object - The object to be made reactive.
 * @returns The reactive version of the object.
 */
function toReactive<T extends Obj>(object: T) {
  const callbackRegistry: Record<keyof Obj, Callback[]> = {};

  return new Proxy(object, {
    set(target, key, newValue) {
      // If the caller wants to register a callback.
      if (key === __CUE_INTERNAL_REGISTER_CALLBACK__) {
        const { field, callback } = newValue as {
          field: string;
          callback: Callback;
        };

        if (callbackRegistry[field]) {
          callbackRegistry[field].push(callback);
        } else {
          callbackRegistry[field] = [callback];
        }

        // The newly registered callback is triggered immediately.
        callback(target[field]);

        return true;
      }

      // If the new value is the same as the old one.
      if (target[key] === newValue) {
        return true;
      }

      // Otherwise, update the field and trigger the callbacks.
      // TODO: Callback registries should be migrated to the new object.
      (target as Obj)[key] = toDeepReactive(newValue);
      callbackRegistry[key]?.forEach((callback) => callback(target[key]));

      return true;
    },
  });
}

/**
 * Make a value deeply reactive.
 *
 * @param value - The value to be made deeply reactive.
 * @returns The deeply reactive version of the value.
 */
export function toDeepReactive<T>(value: T) {
  // Stop the recursion if the value is not an object.
  if (!isObject(value)) {
    return value;
  }

  // Otherwise, make all of its fields deeply reactive.
  //
  // The fields should be proxified before itself, because otherwise,
  // its own proxy setter will be frequently invoked
  // when its fields are being set to their proxified version,
  // which can cause a great performance loss.
  Object.entries(value).forEach(([key, val]) => {
    (value as Obj)[key] = toDeepReactive(val);
  });

  // Make itself deeply reactive.
  return toReactive(value as Obj) as T;
}

/**
 * Register a callback for a certain field of a reactive object.
 *
 * @param object - The reactive object.
 * @param path - The path of the field, separated by dots.
 * @param callback - The callback to be registered.
 */
export function registerCallback(
  object: Obj,
  path: string,
  callback: Callback,
) {
  // "a.b.c" -> { reactiveObjectPath: "a.b", field: "c" }
  const regExp = /^(?:(?<reactiveObjectPath>.*)\.)?(?<field>.+)$/;
  const regExpGroups = regExp.exec(path)?.groups;

  if (!regExpGroups) {
    return;
  }

  const { reactiveObjectPath, field } = regExpGroups;

  if (!field) {
    return;
  }

  const reactiveObject = reactiveObjectPath
    ? getValueByPath(object, reactiveObjectPath)
    : object;

  if (!isObject(reactiveObject)) {
    return;
  }

  reactiveObject[__CUE_INTERNAL_REGISTER_CALLBACK__] = { field, callback };
}
