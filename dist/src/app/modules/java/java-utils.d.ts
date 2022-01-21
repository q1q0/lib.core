export declare class JavaUtils {
    static readonly NUMERIC: RegExp;
    static isNumber(str: string): boolean;
    static booleanToString(boo: boolean): string;
    static equals(a: any, b: any): boolean;
    static parseBoolean(val: any): boolean;
    static stringValue(val: any): string;
    static longValue(str: any): number;
    static doubleValue(str: string): number;
    static intValue(str: any): number;
    static toString(val: any): string;
    static compareTo(a: string, b: string): number;
    static bigDecimal(val: number | string, scale?: number, roundingMode?: number): number;
    static signum(num: number): number;
    static floatValue(str: string): number;
    static lessThan(a: any, b: any): boolean;
}
