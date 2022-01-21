import * as momentImported from 'moment';
/**
 * Java DateFormat
 */
export declare class DateFormat {
    formatPattern: string;
    static readonly SHORT: string;
    static readonly MEDIUM: string;
    static readonly LONG: string;
    private calendar;
    static getDateInstance(pattern: string): DateFormat;
    private isLenient;
    constructor(formatPattern?: string);
    static javaToMomentDateFormat(fm: string): string;
    static now(): momentImported.Moment;
    format(date: Date | momentImported.Moment): string;
    parse(dateString: string): momentImported.Moment;
    setLenient(lenient: boolean): void;
    setCalendar(date: Date | momentImported.Moment): void;
    getCalendar(): momentImported.Moment;
}
