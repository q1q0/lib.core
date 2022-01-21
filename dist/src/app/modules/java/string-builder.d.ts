export declare class StringBuilder {
    private _internalString;
    constructor(initial?: string);
    append(str: string | StringBuilder): this;
    toString(): string;
    clear(): this;
    destroy(): void;
    indexOf(str: string): number;
    substring(startIdx: number, endIdx?: number): string;
    replace(startIdx: number, endIdex: number, replaceStr: string): StringBuilder;
    length(): number;
    charAt(i: number): string;
    setCharAt(idx: number, val: number | string): void;
    deleteCharAt(i: number): StringBuilder;
    insert(index: number, str: string): StringBuilder;
    lastIndexOf(chr: string): number;
}
