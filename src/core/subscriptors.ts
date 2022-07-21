/**
 * All subscriptors must expose `update()`,
 * in order to be notified of data update.
 *
 * @internal
 */
export interface Subscriptor {
  update(): void;
}

/**
 * List of subscriptors, each of which subscripts to
 * a certain field of data source.
 *
 * @internal
 */
export class Subscriptors {
  // Subscriptor waiting to be added to the list.
  //
  // This field will only be modified by a new watcher.
  // After a successful subscription,
  // the new watcher will and should reset this field to `null`.
  static waitingSubscriptor: Subscriptor | null = null;

  // Actual subscriptor list.
  pool: Subscriptor[] = [];

  /**
   * Add a new subscriptor to list.
   *
   * @param subscriptor - New subscriptor.
   */
  add(subscriptor: Subscriptor) {
    this.pool.push(subscriptor);
  }

  /**
   * Notify all subscriptors of the update.
   */
  notify() {
    this.pool.forEach((sub) => sub.update());
  }
}
