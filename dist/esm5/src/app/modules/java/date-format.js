/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as momentImported from 'moment';
/** @type {?} */
var moment = momentImported;
/**
 * Java DateFormat
 */
var DateFormat = /** @class */ (function () {
    function DateFormat(formatPattern) {
        if (formatPattern === void 0) { formatPattern = null; }
        this.formatPattern = formatPattern;
        this.isLenient = true;
    }
    /**
     * @param {?} pattern
     * @return {?}
     */
    DateFormat.getDateInstance = /**
     * @param {?} pattern
     * @return {?}
     */
    function (pattern) {
        return new DateFormat(pattern);
    };
    /**
     * @param {?} fm
     * @return {?}
     */
    DateFormat.javaToMomentDateFormat = /**
     * @param {?} fm
     * @return {?}
     */
    function (fm) {
        /** @type {?} */
        var s = fm.replace(/y/g, 'Y');
        return s.replace(/d/g, 'D');
        //the above is needed b/c ng-packagr is being a b***
        //it doesn't like return fm.replace(/y/g, 'Y').replace(/d/g, 'D');
    };
    /**
     * @return {?}
     */
    DateFormat.now = /**
     * @return {?}
     */
    function () {
        return moment();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormat.prototype.format = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date === null)
            return null;
        if (date === undefined)
            return undefined;
        return this.formatPattern == null ? moment(date).format() : moment(date).format(this.formatPattern);
    };
    /**
     * @param {?} dateString
     * @return {?}
     */
    DateFormat.prototype.parse = /**
     * @param {?} dateString
     * @return {?}
     */
    function (dateString) {
        /** @type {?} */
        var momentDate = this.formatPattern ? moment(dateString, this.formatPattern) : moment(dateString);
        if (this.isLenient === false && momentDate.isValid() === false) {
            throw new Error("Unable to parse date string: " + dateString + ", using format: " + this.formatPattern);
        }
        this.calendar = momentDate;
        return momentDate;
    };
    /**
     * @param {?} lenient
     * @return {?}
     */
    DateFormat.prototype.setLenient = /**
     * @param {?} lenient
     * @return {?}
     */
    function (lenient) {
        this.isLenient = lenient;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormat.prototype.setCalendar = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.calendar = moment(date);
    };
    /**
     * @return {?}
     */
    DateFormat.prototype.getCalendar = /**
     * @return {?}
     */
    function () {
        return this.calendar;
    };
    DateFormat.SHORT = 'M/D/YY';
    DateFormat.MEDIUM = 'MMM D, YYYY';
    DateFormat.LONG = 'MMMM D, YYYY';
    return DateFormat;
}());
export { DateFormat };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtYXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2phdmEvZGF0ZS1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxjQUFjLE1BQU0sUUFBUSxDQUFDOztBQUV6QyxJQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7Ozs7O0lBbUIxQixvQkFBbUIsYUFBNEI7NERBQUE7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7eUJBRmxCLElBQUk7S0FHaEM7Ozs7O0lBUk0sMEJBQWU7Ozs7SUFBdEIsVUFBdUIsT0FBZTtRQUNsQyxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQVFNLGlDQUFzQjs7OztJQUE3QixVQUE4QixFQUFVOztRQUNwQyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7S0FHL0I7Ozs7SUFFTSxjQUFHOzs7SUFBVjtRQUNFLE9BQU8sTUFBTSxFQUFFLENBQUM7S0FDakI7Ozs7O0lBRUQsMkJBQU07Ozs7SUFBTixVQUFPLElBQWtDO1FBQ3JDLElBQUksSUFBSSxLQUFLLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixJQUFJLElBQUksS0FBSyxTQUFTO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN0Rzs7Ozs7SUFFRCwwQkFBSzs7OztJQUFMLFVBQU0sVUFBa0I7O1FBQ3BCLElBQUksVUFBVSxHQUEwQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpILElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLEtBQUssRUFBRTtZQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFnQyxVQUFVLHdCQUFtQixJQUFJLENBQUMsYUFBZSxDQUFDLENBQUM7U0FDdEc7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUUzQixPQUFPLFVBQVUsQ0FBQztLQUNyQjs7Ozs7SUFFRCwrQkFBVTs7OztJQUFWLFVBQVcsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7S0FDNUI7Ozs7O0lBRUQsZ0NBQVc7Ozs7SUFBWCxVQUFZLElBQWtDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCOzs7O0lBRUQsZ0NBQVc7OztJQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCO3VCQXZEK0IsUUFBUTt3QkFDUCxhQUFhO3NCQUNmLGNBQWM7cUJBVmpEOztTQU9hLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtb21lbnRJbXBvcnRlZCBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRJbXBvcnRlZDtcblxuLyoqXG4gKiBKYXZhIERhdGVGb3JtYXRcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXQge1xuICAgIHN0YXRpYyByZWFkb25seSBTSE9SVDogc3RyaW5nID0gJ00vRC9ZWSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IE1FRElVTTogc3RyaW5nID0gJ01NTSBELCBZWVlZJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTE9ORzogc3RyaW5nID0gJ01NTU0gRCwgWVlZWSc7XG5cbiAgICBwcml2YXRlIGNhbGVuZGFyOiBtb21lbnRJbXBvcnRlZC5Nb21lbnQ7XG5cbiAgICBzdGF0aWMgZ2V0RGF0ZUluc3RhbmNlKHBhdHRlcm46IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IERhdGVGb3JtYXQocGF0dGVybik7XG4gICAgfVxuXG4gICAgLy9pZiBub3QgbGVuaWVudCBhbmQgZGF0ZSBpcyBpbnZhbGlkIGFmdGVyIGJlaW5nIHBhcnNlZCwgd2UgdGhyb3cgZXJyb3JcbiAgICBwcml2YXRlIGlzTGVuaWVudDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZm9ybWF0UGF0dGVybjogc3RyaW5nID0gbnVsbCkge1xuICAgIH1cblxuICAgIHN0YXRpYyBqYXZhVG9Nb21lbnREYXRlRm9ybWF0KGZtOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzID0gZm0ucmVwbGFjZSgveS9nLCAnWScpO1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9kL2csICdEJyk7XG4gICAgICAgIC8vdGhlIGFib3ZlIGlzIG5lZWRlZCBiL2MgbmctcGFja2FnciBpcyBiZWluZyBhIGIqKipcbiAgICAgICAgLy9pdCBkb2Vzbid0IGxpa2UgcmV0dXJuIGZtLnJlcGxhY2UoL3kvZywgJ1knKS5yZXBsYWNlKC9kL2csICdEJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdygpOiBtb21lbnRJbXBvcnRlZC5Nb21lbnQge1xuICAgICAgcmV0dXJuIG1vbWVudCgpO1xuICAgIH1cblxuICAgIGZvcm1hdChkYXRlOiBEYXRlIHwgbW9tZW50SW1wb3J0ZWQuTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGRhdGUgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoZGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRQYXR0ZXJuID09IG51bGwgPyBtb21lbnQoZGF0ZSkuZm9ybWF0KCk6IG1vbWVudChkYXRlKS5mb3JtYXQodGhpcy5mb3JtYXRQYXR0ZXJuKTtcbiAgICB9XG5cbiAgICBwYXJzZShkYXRlU3RyaW5nOiBzdHJpbmcpOiBtb21lbnRJbXBvcnRlZC5Nb21lbnQge1xuICAgICAgICBsZXQgbW9tZW50RGF0ZTogbW9tZW50SW1wb3J0ZWQuTW9tZW50ID0gdGhpcy5mb3JtYXRQYXR0ZXJuID8gbW9tZW50KGRhdGVTdHJpbmcsIHRoaXMuZm9ybWF0UGF0dGVybikgOiBtb21lbnQoZGF0ZVN0cmluZyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNMZW5pZW50ID09PSBmYWxzZSAmJiBtb21lbnREYXRlLmlzVmFsaWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHBhcnNlIGRhdGUgc3RyaW5nOiAke2RhdGVTdHJpbmd9LCB1c2luZyBmb3JtYXQ6ICR7dGhpcy5mb3JtYXRQYXR0ZXJufWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG1vbWVudERhdGU7XG5cbiAgICAgICAgcmV0dXJuIG1vbWVudERhdGU7XG4gICAgfVxuXG4gICAgc2V0TGVuaWVudChsZW5pZW50OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNMZW5pZW50ID0gbGVuaWVudDtcbiAgICB9XG5cbiAgICBzZXRDYWxlbmRhcihkYXRlOiBEYXRlIHwgbW9tZW50SW1wb3J0ZWQuTW9tZW50KSB7XG4gICAgICB0aGlzLmNhbGVuZGFyID0gbW9tZW50KGRhdGUpO1xuICAgIH1cblxuICAgIGdldENhbGVuZGFyKCk6IG1vbWVudEltcG9ydGVkLk1vbWVudCB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxlbmRhcjtcbiAgICB9XG59XG4iXX0=