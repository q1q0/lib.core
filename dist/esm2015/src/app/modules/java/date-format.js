/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as momentImported from 'moment';
/** @type {?} */
const moment = momentImported;
/**
 * Java DateFormat
 */
export class DateFormat {
    /**
     * @param {?=} formatPattern
     */
    constructor(formatPattern = null) {
        this.formatPattern = formatPattern;
        this.isLenient = true;
    }
    /**
     * @param {?} pattern
     * @return {?}
     */
    static getDateInstance(pattern) {
        return new DateFormat(pattern);
    }
    /**
     * @param {?} fm
     * @return {?}
     */
    static javaToMomentDateFormat(fm) {
        /** @type {?} */
        const s = fm.replace(/y/g, 'Y');
        return s.replace(/d/g, 'D');
        //the above is needed b/c ng-packagr is being a b***
        //it doesn't like return fm.replace(/y/g, 'Y').replace(/d/g, 'D');
    }
    /**
     * @return {?}
     */
    static now() {
        return moment();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    format(date) {
        if (date === null)
            return null;
        if (date === undefined)
            return undefined;
        return this.formatPattern == null ? moment(date).format() : moment(date).format(this.formatPattern);
    }
    /**
     * @param {?} dateString
     * @return {?}
     */
    parse(dateString) {
        /** @type {?} */
        let momentDate = this.formatPattern ? moment(dateString, this.formatPattern) : moment(dateString);
        if (this.isLenient === false && momentDate.isValid() === false) {
            throw new Error(`Unable to parse date string: ${dateString}, using format: ${this.formatPattern}`);
        }
        this.calendar = momentDate;
        return momentDate;
    }
    /**
     * @param {?} lenient
     * @return {?}
     */
    setLenient(lenient) {
        this.isLenient = lenient;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setCalendar(date) {
        this.calendar = moment(date);
    }
    /**
     * @return {?}
     */
    getCalendar() {
        return this.calendar;
    }
}
DateFormat.SHORT = 'M/D/YY';
DateFormat.MEDIUM = 'MMM D, YYYY';
DateFormat.LONG = 'MMMM D, YYYY';
if (false) {
    /** @type {?} */
    DateFormat.SHORT;
    /** @type {?} */
    DateFormat.MEDIUM;
    /** @type {?} */
    DateFormat.LONG;
    /** @type {?} */
    DateFormat.prototype.calendar;
    /** @type {?} */
    DateFormat.prototype.isLenient;
    /** @type {?} */
    DateFormat.prototype.formatPattern;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2phdmEvZGF0ZS1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxjQUFjLE1BQU0sUUFBUSxDQUFDOztBQUV6QyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7Ozs7QUFLOUIsTUFBTTs7OztJQWNGLFlBQW1CLGdCQUF3QixJQUFJO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO3lCQUZsQixJQUFJO0tBR2hDOzs7OztJQVJELE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZTtRQUNsQyxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQVFELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFVOztRQUNwQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7S0FHL0I7Ozs7SUFFRCxNQUFNLENBQUMsR0FBRztRQUNSLE9BQU8sTUFBTSxFQUFFLENBQUM7S0FDakI7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQWtDO1FBQ3JDLElBQUksSUFBSSxLQUFLLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixJQUFJLElBQUksS0FBSyxTQUFTO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN0Rzs7Ozs7SUFFRCxLQUFLLENBQUMsVUFBa0I7O1FBQ3BCLElBQUksVUFBVSxHQUEwQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpILElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLEtBQUssRUFBRTtZQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxVQUFVLG1CQUFtQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztTQUN0RztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBRTNCLE9BQU8sVUFBVSxDQUFDO0tBQ3JCOzs7OztJQUVELFVBQVUsQ0FBQyxPQUFnQjtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztLQUM1Qjs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBa0M7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7Ozs7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzttQkF2RCtCLFFBQVE7b0JBQ1AsYUFBYTtrQkFDZixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9tZW50SW1wb3J0ZWQgZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50SW1wb3J0ZWQ7XG5cbi8qKlxuICogSmF2YSBEYXRlRm9ybWF0XG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgU0hPUlQ6IHN0cmluZyA9ICdNL0QvWVknO1xuICAgIHN0YXRpYyByZWFkb25seSBNRURJVU06IHN0cmluZyA9ICdNTU0gRCwgWVlZWSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IExPTkc6IHN0cmluZyA9ICdNTU1NIEQsIFlZWVknO1xuXG4gICAgcHJpdmF0ZSBjYWxlbmRhcjogbW9tZW50SW1wb3J0ZWQuTW9tZW50O1xuXG4gICAgc3RhdGljIGdldERhdGVJbnN0YW5jZShwYXR0ZXJuOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlRm9ybWF0KHBhdHRlcm4pO1xuICAgIH1cblxuICAgIC8vaWYgbm90IGxlbmllbnQgYW5kIGRhdGUgaXMgaW52YWxpZCBhZnRlciBiZWluZyBwYXJzZWQsIHdlIHRocm93IGVycm9yXG4gICAgcHJpdmF0ZSBpc0xlbmllbnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGZvcm1hdFBhdHRlcm46IHN0cmluZyA9IG51bGwpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgamF2YVRvTW9tZW50RGF0ZUZvcm1hdChmbTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcyA9IGZtLnJlcGxhY2UoL3kvZywgJ1knKTtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvZC9nLCAnRCcpO1xuICAgICAgICAvL3RoZSBhYm92ZSBpcyBuZWVkZWQgYi9jIG5nLXBhY2thZ3IgaXMgYmVpbmcgYSBiKioqXG4gICAgICAgIC8vaXQgZG9lc24ndCBsaWtlIHJldHVybiBmbS5yZXBsYWNlKC95L2csICdZJykucmVwbGFjZSgvZC9nLCAnRCcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBub3coKTogbW9tZW50SW1wb3J0ZWQuTW9tZW50IHtcbiAgICAgIHJldHVybiBtb21lbnQoKTtcbiAgICB9XG5cbiAgICBmb3JtYXQoZGF0ZTogRGF0ZSB8IG1vbWVudEltcG9ydGVkLk1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChkYXRlID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKGRhdGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0UGF0dGVybiA9PSBudWxsID8gbW9tZW50KGRhdGUpLmZvcm1hdCgpOiBtb21lbnQoZGF0ZSkuZm9ybWF0KHRoaXMuZm9ybWF0UGF0dGVybik7XG4gICAgfVxuXG4gICAgcGFyc2UoZGF0ZVN0cmluZzogc3RyaW5nKTogbW9tZW50SW1wb3J0ZWQuTW9tZW50IHtcbiAgICAgICAgbGV0IG1vbWVudERhdGU6IG1vbWVudEltcG9ydGVkLk1vbWVudCA9IHRoaXMuZm9ybWF0UGF0dGVybiA/IG1vbWVudChkYXRlU3RyaW5nLCB0aGlzLmZvcm1hdFBhdHRlcm4pIDogbW9tZW50KGRhdGVTdHJpbmcpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTGVuaWVudCA9PT0gZmFsc2UgJiYgbW9tZW50RGF0ZS5pc1ZhbGlkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBwYXJzZSBkYXRlIHN0cmluZzogJHtkYXRlU3RyaW5nfSwgdXNpbmcgZm9ybWF0OiAke3RoaXMuZm9ybWF0UGF0dGVybn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBtb21lbnREYXRlO1xuXG4gICAgICAgIHJldHVybiBtb21lbnREYXRlO1xuICAgIH1cblxuICAgIHNldExlbmllbnQobGVuaWVudDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzTGVuaWVudCA9IGxlbmllbnQ7XG4gICAgfVxuXG4gICAgc2V0Q2FsZW5kYXIoZGF0ZTogRGF0ZSB8IG1vbWVudEltcG9ydGVkLk1vbWVudCkge1xuICAgICAgdGhpcy5jYWxlbmRhciA9IG1vbWVudChkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRDYWxlbmRhcigpOiBtb21lbnRJbXBvcnRlZC5Nb21lbnQge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXI7XG4gICAgfVxufVxuIl19