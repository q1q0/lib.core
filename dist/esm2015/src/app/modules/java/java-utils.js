/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import * as moment from 'moment';
import { IllegalArgumentException } from './illegal-argument-exception';
export class JavaUtils {
    /**
     * @param {?} str
     * @return {?}
     */
    static isNumber(str) {
        return str == null ? false : JavaUtils.NUMERIC.test(str);
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    static booleanToString(boo) {
        if (boo === true) {
            return 'true';
        }
        return 'false';
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equals(a, b) {
        return a == b;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static parseBoolean(val) {
        if (typeof val === 'boolean') {
            return val;
        }
        else if (typeof val === 'string') {
            return val === 'true' ? true : false;
        }
        else {
            throw new Error('Unsupport boolean value: ' + val);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static stringValue(val) {
        if (typeof val === 'string') {
            return val;
        }
        return val + '';
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static longValue(str) {
        if (str != null) {
            return _.parseInt(str);
        }
        return null;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static doubleValue(str) {
        if (str != null) {
            /** @type {?} */
            let result = str.indexOf(".") >= 0 ? parseFloat(str) : _.parseInt(str);
            if (isNaN(result)) {
                throw new IllegalArgumentException;
            }
            return result;
        }
        return null;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static intValue(str) {
        if (str != null) {
            return _.parseInt(str);
        }
        return null;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    static toString(val) {
        if (typeof val === 'number') {
            return val + '';
        }
        else if (typeof val === 'boolean') {
            return JavaUtils.booleanToString(val);
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static compareTo(a, b) {
        /** @type {?} */
        let retVal = null;
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
    }
    /**
     * @param {?} val
     * @param {?=} scale
     * @param {?=} roundingMode
     * @return {?}
     */
    static bigDecimal(val, scale = 0, roundingMode = -1) {
        /** @type {?} */
        const fixedValue = typeof val === 'number' ? val : parseFloat(val);
        if (scale > 0) {
            return parseFloat(`${fixedValue}.${_.padStart('', scale, '0')}`);
        }
        else {
            return fixedValue;
        }
    }
    /**
     * @param {?} num
     * @return {?}
     */
    static signum(num) {
        return num === 0 ? 0 : num > 0 ? 1 : -1;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static floatValue(str) {
        return parseFloat(str);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static lessThan(a, b) {
        if (moment.isMoment(a) && moment.isMoment(b)) {
            return (/** @type {?} */ (a)).isBefore(b);
        }
        return a < b;
    }
}
JavaUtils.NUMERIC = new RegExp("^[0-9]+$");
if (false) {
    /** @type {?} */
    JavaUtils.NUMERIC;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvamF2YS9qYXZhLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV4RSxNQUFNOzs7OztJQUdKLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVztRQUN6QixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUQ7Ozs7O0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFZO1FBQ2pDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7Ozs7OztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBTSxFQUFFLENBQU07UUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2Y7Ozs7O0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFRO1FBQzFCLElBQUksT0FBTyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQzVCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7YUFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUNsQyxPQUFPLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3BEO0tB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eEI7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBTSxFQUFFLENBQU07UUFDNUIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUMsT0FBTyxtQkFBQyxDQUFrQixFQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7O29CQWhIeUIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBJbGxlZ2FsQXJndW1lbnRFeGNlcHRpb24gfSBmcm9tICcuL2lsbGVnYWwtYXJndW1lbnQtZXhjZXB0aW9uJztcblxuZXhwb3J0IGNsYXNzIEphdmFVdGlscyB7XG4gIHN0YXRpYyByZWFkb25seSBOVU1FUklDID0gbmV3IFJlZ0V4cChcIl5bMC05XSskXCIpO1xuXG4gIHN0YXRpYyBpc051bWJlcihzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzdHIgPT0gbnVsbCA/IGZhbHNlIDogSmF2YVV0aWxzLk5VTUVSSUMudGVzdChzdHIpO1xuICB9XG5cbiAgc3RhdGljIGJvb2xlYW5Ub1N0cmluZyhib286IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmIChib28gPT09IHRydWUpIHtcbiAgICAgIHJldHVybiAndHJ1ZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuICdmYWxzZSc7XG4gIH1cblxuICBzdGF0aWMgZXF1YWxzKGE6IGFueSwgYjogYW55KSB7XG4gICAgcmV0dXJuIGEgPT0gYjtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUJvb2xlYW4odmFsOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWwgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnQgYm9vbGVhbiB2YWx1ZTogJyArIHZhbCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHN0cmluZ1ZhbHVlKHZhbDogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIHJldHVybiB2YWwgKyAnJztcbiAgfVxuXG4gIHN0YXRpYyBsb25nVmFsdWUoc3RyOiBhbnkpIHtcbiAgICBpZiAoc3RyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBfLnBhcnNlSW50KHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgZG91YmxlVmFsdWUoc3RyOiBzdHJpbmcpIHtcbiAgICBpZiAoc3RyICE9IG51bGwpIHtcblxuICAgICAgbGV0IHJlc3VsdCA6bnVtYmVyID0gc3RyLmluZGV4T2YoXCIuXCIpID49IDAgPyBwYXJzZUZsb2F0KHN0cikgOiBfLnBhcnNlSW50KHN0cik7XG5cbiAgICAgIGlmIChpc05hTihyZXN1bHQpKXtcbiAgICAgICAgdGhyb3cgbmV3IElsbGVnYWxBcmd1bWVudEV4Y2VwdGlvbjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIGludFZhbHVlKHN0cjogYW55KSB7XG4gICAgaWYgKHN0ciAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gXy5wYXJzZUludChzdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIHRvU3RyaW5nKHZhbDogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gdmFsICsgJyc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBKYXZhVXRpbHMuYm9vbGVhblRvU3RyaW5nKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNvbXBhcmVUbyhhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgbGV0IHJldFZhbCA9IG51bGw7XG5cbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgcmV0VmFsID0gMDtcbiAgICB9IGVsc2UgaWYgKGEgPiBiKSB7XG4gICAgICByZXRWYWwgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRWYWwgPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgc3RhdGljIGJpZ0RlY2ltYWwodmFsOiBudW1iZXIgfCBzdHJpbmcsIHNjYWxlOiBudW1iZXIgPSAwLCByb3VuZGluZ01vZGU6IG51bWJlciA9IC0xKSB7XG4gICAgLy9mb3Igbm93LCBqdXN0IHJldHJuIHRoZSBudW1iZXJcbiAgICBjb25zdCBmaXhlZFZhbHVlID0gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyB2YWwgOiBwYXJzZUZsb2F0KHZhbCk7XG5cbiAgICBpZiAoc2NhbGUgPiAwKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChgJHtmaXhlZFZhbHVlfS4ke18ucGFkU3RhcnQoJycsIHNjYWxlLCAnMCcpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZml4ZWRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2lnbnVtKG51bTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbnVtID09PSAwID8gMCA6IG51bSA+IDAgPyAxIDogLTE7XG4gIH1cblxuICBzdGF0aWMgZmxvYXRWYWx1ZShzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKTtcbiAgfVxuXG4gIHN0YXRpYyBsZXNzVGhhbihhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICAgIGlmIChtb21lbnQuaXNNb21lbnQoYSkgJiYgbW9tZW50LmlzTW9tZW50KGIpKSB7XG4gICAgICByZXR1cm4gKGEgYXMgbW9tZW50Lk1vbWVudCkuaXNCZWZvcmUoYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGEgPCBiO1xuICB9XG59XG4iXX0=