import { Iterator } from './iterator';

export class ListIterator<E = any> implements Iterator<E>{
    private currentIndex: number = 0;

    constructor(private data: Array<E>) {
    }

    hasNext(): boolean {
        return this.data != null && this.data.length > this.currentIndex;
    }

    next<T extends E>(): E {
        if (this.currentIndex < this.data.length) {
            return this.data[this.currentIndex++];
        }

        throw new Error('No such element');
    }
}