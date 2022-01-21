export declare class HashMap<K, V> implements Map<K, V> {
    private _internalMap;
    constructor();
    readonly size: number;
    put(key: K, value: V): void;
    get(key: K): V;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    remove(key: K): void;
    clear(): void;
    entries(): IterableIterator<[K, V]>;
    forEach(cb: (value: V, key: K, map: Map<K, V>) => void, thisArg: any): void;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    toJson(): {
        [name: string]: any;
    };
    readonly [Symbol.iterator]: () => IterableIterator<[K, V]>;
    readonly [Symbol.toStringTag]: "Map";
}
