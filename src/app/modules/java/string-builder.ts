import * as _ from "lodash";

export class StringBuilder {
  private _internalString: string = "";

  constructor(initial?: string) {
    if (initial != null) {
      this.append(initial);
    }
  }

  append(str: string | StringBuilder) {
    if (str instanceof StringBuilder) {
      this._internalString = this._internalString + str.toString();
    } else {
      this._internalString = this._internalString + str;
    }
    return this;
  }

  toString() {
    return this._internalString;
  }

  clear() {
    this._internalString = "";
    return this;
  }

  destroy() {
    this.clear();
  }

  indexOf(str: string): number {
    return this._internalString.indexOf(str);
  }

  substring(startIdx: number, endIdx?: number): string {
    if (endIdx != null) {
      return this._internalString.substring(startIdx, endIdx);
    }

    return this._internalString.substring(startIdx);
  }

  replace(startIdx: number, endIdex: number, replaceStr: string): StringBuilder {
    const b = this._internalString.substring(0, startIdx);
    const e = this._internalString.substring(endIdex);

    this._internalString = b + replaceStr + e;
    return this;
  }

  length() {
    return this._internalString.length;
  }

  charAt(i: number): string {
    if (i < this._internalString.length) {
      return this._internalString.charAt(i);
    }

    return null;
  }

  setCharAt(idx: number, val: number | string): void {
    if (typeof val === "number") {
      this.insert(idx, String.fromCharCode(val));
    } else {
      this.insert(idx, val);
    }
  }

  deleteCharAt(i: number): StringBuilder {
    this.replace(i, i, '');
    return this;
  }

  insert(index: number, str: string): StringBuilder {
    if (index <= this._internalString.length) {
      this._internalString = this._internalString.substring(0, index - 1) + str + this._internalString.substring(index);
    }

    return this;
  }

  lastIndexOf(chr: string) {
    if (this._internalString != null) {
      return _.lastIndexOf(this._internalString, chr);
    }

    return -1;
  }
}
