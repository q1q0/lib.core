export class HashMap<K, V> implements Map<K, V> {
    private _internalMap: Map<K, V> = new Map<K, V>();

    constructor() {

    }

    get size(): number {
        return this._internalMap.size;
    }

    put(key: K, value: V) {
        this._internalMap.set(key, value);
    }

    get(key: K): V {
        return this._internalMap.get(key);
    }

    set(key: K, value: V) {
        this._internalMap.set(key, value);
        return this;
    }

    delete(key: K): boolean {
        return this._internalMap.delete(key);
    }

    remove(key: K): void {
        this.delete(key);
    }

    clear() {
        return this._internalMap.clear();
    }

    entries() {
        return this._internalMap.entries();
    }

    forEach(cb: (value: V, key: K, map: Map<K, V>)=>void, thisArg: any) {
        return this._internalMap.forEach(cb, thisArg);
    }

    has(key: K) {
        return this._internalMap.has(key);
    }

    keys() {
        return this._internalMap.keys();
    }

    values() {
        return this._internalMap.values();
    }

    toJson(): {[name: string]: any} {
      const json = {};
      const keys = this.keys();
      let key = keys.next();

      while(key.done !== true) {
        json[key.value as any] = this.get(key.value);
        key = keys.next();
      }

      return json;
    }

    get [Symbol.iterator]() {
        return this._internalMap[Symbol.iterator];
    }

    get [Symbol.toStringTag]() {
        return this._internalMap[Symbol.toStringTag];
    }
}
