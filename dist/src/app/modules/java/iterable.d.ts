import { Iterator } from './iterator';
export interface Iterable {
    iterator(): Iterator;
}
