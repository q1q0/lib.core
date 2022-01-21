import * as momentImported from 'moment';

const moment = momentImported;

/**
 * Java DateFormat
 */
export class DateFormat {
    static readonly SHORT: string = 'M/D/YY';
    static readonly MEDIUM: string = 'MMM D, YYYY';
    static readonly LONG: string = 'MMMM D, YYYY';

    private calendar: momentImported.Moment;

    static getDateInstance(pattern: string) {
        return new DateFormat(pattern);
    }

    //if not lenient and date is invalid after being parsed, we throw error
    private isLenient: boolean = true;

    constructor(public formatPattern: string = null) {
    }

    static javaToMomentDateFormat(fm: string): string {
        const s = fm.replace(/y/g, 'Y');
        return s.replace(/d/g, 'D');
        //the above is needed b/c ng-packagr is being a b***
        //it doesn't like return fm.replace(/y/g, 'Y').replace(/d/g, 'D');
    }

    static now(): momentImported.Moment {
      return moment();
    }

    format(date: Date | momentImported.Moment): string {
        if (date === null) return null;
        if (date === undefined) return undefined;
        return this.formatPattern == null ? moment(date).format(): moment(date).format(this.formatPattern);
    }

    parse(dateString: string): momentImported.Moment {
        let momentDate: momentImported.Moment = this.formatPattern ? moment(dateString, this.formatPattern) : moment(dateString);

        if (this.isLenient === false && momentDate.isValid() === false) {
            throw new Error(`Unable to parse date string: ${dateString}, using format: ${this.formatPattern}`);
        }

        this.calendar = momentDate;

        return momentDate;
    }

    setLenient(lenient: boolean) {
        this.isLenient = lenient;
    }

    setCalendar(date: Date | momentImported.Moment) {
      this.calendar = moment(date);
    }

    getCalendar(): momentImported.Moment {
      return this.calendar;
    }
}
