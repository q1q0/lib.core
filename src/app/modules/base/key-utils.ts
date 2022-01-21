export class KeyUtils {
  /**
   * Make key case insensitive
   * @param key
   */
  static toMapKey(key: string): string {
    if (key != null) {
      return key.toLowerCase();
    }

    return null;
  }

  static toJsonValue(val: any): string {
    if (typeof val === "number" || typeof val === "boolean") {
      return val + "";
    } else {
      return val;
    }
  }
}
