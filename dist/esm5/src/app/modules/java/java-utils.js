/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import * as moment from 'moment';
import { IllegalArgumentException } from './illegal-argument-exception';
var JavaUtils = /** @class */ (function () {
    function JavaUtils() {
    }
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.isNumber = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str == null ? false : JavaUtils.NUMERIC.test(str);
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    JavaUtils.booleanToString = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        if (boo === true) {
            return 'true';
        }
        return 'false';
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    JavaUtils.equals = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return a == b;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JavaUtils.parseBoolean = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === 'boolean') {
            return val;
        }
        else if (typeof val === 'string') {
            return val === 'true' ? true : false;
        }
        else {
            throw new Error('Unsupport boolean value: ' + val);
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JavaUtils.stringValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === 'string') {
            return val;
        }
        return val + '';
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.longValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str != null) {
            return _.parseInt(str);
        }
        return null;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.doubleValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str != null) {
            /** @type {?} */
            var result = str.indexOf(".") >= 0 ? parseFloat(str) : _.parseInt(str);
            if (isNaN(result)) {
                throw new IllegalArgumentException;
            }
            return result;
        }
        return null;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.intValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str != null) {
            return _.parseInt(str);
        }
        return null;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    JavaUtils.toString = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val === 'number') {
            return val + '';
        }
        else if (typeof val === 'boolean') {
            return JavaUtils.booleanToString(val);
        }
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    JavaUtils.compareTo = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var retVal = null;
        if (a === b) {
            retVal = 0;
        }
        else if (a > b) {
            retVal = 1;
        }
        else {
            retVal = -1;
        }
        return retVal;
    };
    /**
     * @param {?} val
     * @param {?=} scale
     * @param {?=} roundingMode
     * @return {?}
     */
    JavaUtils.bigDecimal = /**
     * @param {?} val
     * @param {?=} scale
     * @param {?=} roundingMode
     * @return {?}
     */
    function (val, scale, roundingMode) {
        if (scale === void 0) { scale = 0; }
        if (roundingMode === void 0) { roundingMode = -1; }
        /** @type {?} */
        var fixedValue = typeof val === 'number' ? val : parseFloat(val);
        if (scale > 0) {
            return parseFloat(fixedValue + "." + _.padStart('', scale, '0'));
        }
        else {
            return fixedValue;
        }
    };
    /**
     * @param {?} num
     * @return {?}
     */
    JavaUtils.signum = /**
     * @param {?} num
     * @return {?}
     */
    function (num) {
        return num === 0 ? 0 : num > 0 ? 1 : -1;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JavaUtils.floatValue = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return parseFloat(str);
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    JavaUtils.lessThan = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        if (moment.isMoment(a) && moment.isMoment(b)) {
            return (/** @type {?} */ (a)).isBefore(b);
        }
        return a < b;
    };
    JavaUtils.NUMERIC = new RegExp("^[0-9]+$");
    return JavaUtils;
}());
export { JavaUtils };
if (false) {
    /** @type {?} */
    JavaUtils.NUMERIC;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvamF2YS9qYXZhLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7Ozs7SUFLL0Qsa0JBQVE7Ozs7SUFBZixVQUFnQixHQUFXO1FBQ3pCLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxRDs7Ozs7SUFFTSx5QkFBZTs7OztJQUF0QixVQUF1QixHQUFZO1FBQ2pDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7Ozs7OztJQUVNLGdCQUFNOzs7OztJQUFiLFVBQWMsQ0FBTSxFQUFFLENBQU07UUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2Y7Ozs7O0lBRU0sc0JBQVk7Ozs7SUFBbkIsVUFBb0IsR0FBUTtRQUMxQixJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUM1QixPQUFPLEdBQUcsQ0FBQztTQUNaO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDbEMsT0FBTyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN0QzthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNwRDtLQUNGOzs7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LFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4Qjs7Ozs7O0lBRU0sa0JBQVE7Ozs7O0lBQWYsVUFBZ0IsQ0FBTSxFQUFFLENBQU07UUFDNUIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUMsT0FBTyxtQkFBQyxDQUFrQixFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7d0JBaEh5QixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUM7b0JBTGxEOztTQUlhLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IElsbGVnYWxBcmd1bWVudEV4Y2VwdGlvbiB9IGZyb20gJy4vaWxsZWdhbC1hcmd1bWVudC1leGNlcHRpb24nO1xuXG5leHBvcnQgY2xhc3MgSmF2YVV0aWxzIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5VTUVSSUMgPSBuZXcgUmVnRXhwKFwiXlswLTldKyRcIik7XG5cbiAgc3RhdGljIGlzTnVtYmVyKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHN0ciA9PSBudWxsID8gZmFsc2UgOiBKYXZhVXRpbHMuTlVNRVJJQy50ZXN0KHN0cik7XG4gIH1cblxuICBzdGF0aWMgYm9vbGVhblRvU3RyaW5nKGJvbzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKGJvbyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuICd0cnVlJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ2ZhbHNlJztcbiAgfVxuXG4gIHN0YXRpYyBlcXVhbHMoYTogYW55LCBiOiBhbnkpIHtcbiAgICByZXR1cm4gYSA9PSBiO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlQm9vbGVhbih2YWw6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHZhbCA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydCBib29sZWFuIHZhbHVlOiAnICsgdmFsKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc3RyaW5nVmFsdWUodmFsOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbCArICcnO1xuICB9XG5cbiAgc3RhdGljIGxvbmdWYWx1ZShzdHI6IGFueSkge1xuICAgIGlmIChzdHIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIF8ucGFyc2VJbnQoc3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBkb3VibGVWYWx1ZShzdHI6IHN0cmluZykge1xuICAgIGlmIChzdHIgIT0gbnVsbCkge1xuXG4gICAgICBsZXQgcmVzdWx0IDpudW1iZXIgPSBzdHIuaW5kZXhPZihcIi5cIikgPj0gMCA/IHBhcnNlRmxvYXQoc3RyKSA6IF8ucGFyc2VJbnQoc3RyKTtcblxuICAgICAgaWYgKGlzTmFOKHJlc3VsdCkpe1xuICAgICAgICB0aHJvdyBuZXcgSWxsZWdhbEFyZ3VtZW50RXhjZXB0aW9uO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgaW50VmFsdWUoc3RyOiBhbnkpIHtcbiAgICBpZiAoc3RyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBfLnBhcnNlSW50KHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgdG9TdHJpbmcodmFsOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB2YWwgKyAnJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIEphdmFVdGlscy5ib29sZWFuVG9TdHJpbmcodmFsKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY29tcGFyZVRvKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBsZXQgcmV0VmFsID0gbnVsbDtcblxuICAgIGlmIChhID09PSBiKSB7XG4gICAgICByZXRWYWwgPSAwO1xuICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgIHJldFZhbCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldFZhbCA9IC0xO1xuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBzdGF0aWMgYmlnRGVjaW1hbCh2YWw6IG51bWJlciB8IHN0cmluZywgc2NhbGU6IG51bWJlciA9IDAsIHJvdW5kaW5nTW9kZTogbnVtYmVyID0gLTEpIHtcbiAgICAvL2ZvciBub3csIGp1c3QgcmV0cm4gdGhlIG51bWJlclxuICAgIGNvbnN0IGZpeGVkVmFsdWUgPSB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IHZhbCA6IHBhcnNlRmxvYXQodmFsKTtcblxuICAgIGlmIChzY2FsZSA+IDApIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2ZpeGVkVmFsdWV9LiR7Xy5wYWRTdGFydCgnJywgc2NhbGUsICcwJyl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaXhlZFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzaWdudW0obnVtOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBudW0gPT09IDAgPyAwIDogbnVtID4gMCA/IDEgOiAtMTtcbiAgfVxuXG4gIHN0YXRpYyBmbG9hdFZhbHVlKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICB9XG5cbiAgc3RhdGljIGxlc3NUaGFuKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKG1vbWVudC5pc01vbWVudChhKSAmJiBtb21lbnQuaXNNb21lbnQoYikpIHtcbiAgICAgIHJldHVybiAoYSBhcyBtb21lbnQuTW9tZW50KS5pc0JlZm9yZShiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYSA8IGI7XG4gIH1cbn1cbiJdfQ==