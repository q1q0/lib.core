export interface Iterator<E = any> {
    hasNext(): boolean;
    next<T extends E>(): E;
}
