import * as momentImported from 'moment-timezone';
/**
 * Simple util to parse moment into proper zone (if needed)
 */
export declare class MomentUtils {
    static timeZone: string;
    static moment(dateString: string, format?: string): momentImported.Moment;
}
