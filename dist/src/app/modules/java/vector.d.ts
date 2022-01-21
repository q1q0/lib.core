import { Iterator } from './iterator';
import { Iterable } from './iterable';
export declare class Vector<E = any> implements Iterable {
    private data;
    constructor(size?: number | Array<E>);
    toArray(): Array<E>;
    setData(data: Array<E>): void;
    size(): number;
    get<T extends E>(idx: number): T;
    add(element: E, insertionIndex?: number): number;
    delete(idx: number): void;
    addElement(element: E): number;
    addAll(vec: Vector<E>): void;
    firstElement(): E;
    lastElement(): E;
    contains(element: E): boolean;
    elementAt(idx: number): E;
    isEmpty(): boolean;
    iterator(): Iterator<E>;
}
