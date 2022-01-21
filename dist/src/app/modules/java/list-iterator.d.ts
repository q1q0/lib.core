import { Iterator } from './iterator';
export declare class ListIterator<E = any> implements Iterator<E> {
    private data;
    private currentIndex;
    constructor(data: Array<E>);
    hasNext(): boolean;
    next<T extends E>(): E;
}
