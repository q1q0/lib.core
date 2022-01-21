import { Iterator } from './iterator';
import { ListIterator } from './list-iterator';
import { Iterable } from './iterable';
import * as _ from 'lodash';

//emulvate Java vector (somewhat)
export class Vector<E = any> implements Iterable {
  private data: Array<E> = [];

  constructor(size?: number | Array<E>) {
    if (Array.isArray(size)) {
      this.data = size;
    }
  }

  toArray(): Array<E> {
    return this.data;
  }

  setData(data: Array<E>) {
    this.data = data;
  }

  size(): number {
    return this.data == null ? 0 : this.data.length;
  }

  get<T extends E> (idx: number): T {
    if (this.size() > idx) {
      return this.data[idx] as T;
    }

    return null;
  }

  add(element: E, insertionIndex: number = -1): number {
    if (insertionIndex === -1) {
      return this.data.push(element);
    } else {
      this.data.splice(insertionIndex, 0, element);
      return insertionIndex;
    }
  }

  delete(idx: number): void {
    if (this.get(idx)) {
      this.data.splice(idx, 1);
    }
  }

  addElement(element: E): number {
    return this.add(element);
  }

  addAll(vec: Vector<E>) {
    let it: Iterator<E> = vec.iterator();
    while(it.hasNext()) {
      this.add(it.next());
    }
  }

  firstElement(): E {
    return this.data != null && this.data.length > 0 ? this.data[0] : null;
  }

  lastElement(): E {
    return this.data != null && this.data.length > 0 ? this.data[this.data.length - 1] : null;
  }

  contains(element: E): boolean {
    return this.data != null && this.data.indexOf(element) >= 0 ? true: false;
  }

  elementAt(idx: number): E {
    return this.get(idx);
  }

  isEmpty(): boolean {
    return this.data == null || this.data.length === 0;
  }

  iterator(): Iterator<E> {
    return new ListIterator<E>(_.clone(this.data));
  }
}
