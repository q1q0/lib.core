/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from "lodash";
export class StringBuilder {
    /**
     * @param {?=} initial
     */
    constructor(initial) {
        this._internalString = "";
        if (initial != null) {
            this.append(initial);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    append(str) {
        if (str instanceof StringBuilder) {
            this._internalString = this._internalString + str.toString();
        }
        else {
            this._internalString = this._internalString + str;
        }
        return this;
    }
    /**
     * @return {?}
     */
    toString() {
        return this._internalString;
    }
    /**
     * @return {?}
     */
    clear() {
        this._internalString = "";
        return this;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.clear();
    }
    /**
     * @param {?} str
     * @return {?}
     */
    indexOf(str) {
        return this._internalString.indexOf(str);
    }
    /**
     * @param {?} startIdx
     * @param {?=} endIdx
     * @return {?}
     */
    substring(startIdx, endIdx) {
        if (endIdx != null) {
            return this._internalString.substring(startIdx, endIdx);
        }
        return this._internalString.substring(startIdx);
    }
    /**
     * @param {?} startIdx
     * @param {?} endIdex
     * @param {?} replaceStr
     * @return {?}
     */
    replace(startIdx, endIdex, replaceStr) {
        /** @type {?} */
        const b = this._internalString.substring(0, startIdx);
        /** @type {?} */
        const e = this._internalString.substring(endIdex);
        this._internalString = b + replaceStr + e;
        return this;
    }
    /**
     * @return {?}
     */
    length() {
        return this._internalString.length;
    }
    /**
     * @param {?} i
     * @return {?}
     */
    charAt(i) {
        if (i < this._internalString.length) {
            return this._internalString.charAt(i);
        }
        return null;
    }
    /**
     * @param {?} idx
     * @param {?} val
     * @return {?}
     */
    setCharAt(idx, val) {
        if (typeof val === "number") {
            this.insert(idx, String.fromCharCode(val));
        }
        else {
            this.insert(idx, val);
        }
    }
    /**
     * @param {?} i
     * @return {?}
     */
    deleteCharAt(i) {
        this.replace(i, i, '');
        return this;
    }
    /**
     * @param {?} index
     * @param {?} str
     * @return {?}
     */
    insert(index, str) {
        if (index <= this._internalString.length) {
            this._internalString = this._internalString.substring(0, index - 1) + str + this._internalString.substring(index);
        }
        return this;
    }
    /**
     * @param {?} chr
     * @return {?}
     */
    lastIndexOf(chr) {
        if (this._internalString != null) {
            return _.lastIndexOf(this._internalString, chr);
        }
        return -1;
    }
}
if (false) {
    /** @type {?} */
    StringBuilder.prototype._internalString;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2phdmEvc3RyaW5nLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE1BQU07Ozs7SUFHSixZQUFZLE9BQWdCOytCQUZNLEVBQUU7UUFHbEMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEI7S0FDRjs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBMkI7UUFDaEMsSUFBSSxHQUFHLFlBQVksYUFBYSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUQ7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7O0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUM3Qjs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztLQUNiOzs7O0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNkOzs7OztJQUVELE9BQU8sQ0FBQyxHQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxRQUFnQixFQUFFLE1BQWU7UUFDekMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqRDs7Ozs7OztJQUVELE9BQU8sQ0FBQyxRQUFnQixFQUFFLE9BQWUsRUFBRSxVQUFrQjs7UUFDM0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztRQUN0RCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztLQUNwQzs7Ozs7SUFFRCxNQUFNLENBQUMsQ0FBUztRQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQW9CO1FBQ3pDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkI7S0FDRjs7Ozs7SUFFRCxZQUFZLENBQUMsQ0FBUztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBRUQsTUFBTSxDQUFDLEtBQWEsRUFBRSxHQUFXO1FBQy9CLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkg7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQUVELFdBQVcsQ0FBQyxHQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDaEMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ1g7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgY2xhc3MgU3RyaW5nQnVpbGRlciB7XG4gIHByaXZhdGUgX2ludGVybmFsU3RyaW5nOiBzdHJpbmcgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKGluaXRpYWw/OiBzdHJpbmcpIHtcbiAgICBpZiAoaW5pdGlhbCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChpbml0aWFsKTtcbiAgICB9XG4gIH1cblxuICBhcHBlbmQoc3RyOiBzdHJpbmcgfCBTdHJpbmdCdWlsZGVyKSB7XG4gICAgaWYgKHN0ciBpbnN0YW5jZW9mIFN0cmluZ0J1aWxkZXIpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsU3RyaW5nID0gdGhpcy5faW50ZXJuYWxTdHJpbmcgKyBzdHIudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW50ZXJuYWxTdHJpbmcgPSB0aGlzLl9pbnRlcm5hbFN0cmluZyArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxTdHJpbmc7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9pbnRlcm5hbFN0cmluZyA9IFwiXCI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxuXG4gIGluZGV4T2Yoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFN0cmluZy5pbmRleE9mKHN0cik7XG4gIH1cblxuICBzdWJzdHJpbmcoc3RhcnRJZHg6IG51bWJlciwgZW5kSWR4PzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoZW5kSWR4ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFN0cmluZy5zdWJzdHJpbmcoc3RhcnRJZHgsIGVuZElkeCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludGVybmFsU3RyaW5nLnN1YnN0cmluZyhzdGFydElkeCk7XG4gIH1cblxuICByZXBsYWNlKHN0YXJ0SWR4OiBudW1iZXIsIGVuZElkZXg6IG51bWJlciwgcmVwbGFjZVN0cjogc3RyaW5nKTogU3RyaW5nQnVpbGRlciB7XG4gICAgY29uc3QgYiA9IHRoaXMuX2ludGVybmFsU3RyaW5nLnN1YnN0cmluZygwLCBzdGFydElkeCk7XG4gICAgY29uc3QgZSA9IHRoaXMuX2ludGVybmFsU3RyaW5nLnN1YnN0cmluZyhlbmRJZGV4KTtcblxuICAgIHRoaXMuX2ludGVybmFsU3RyaW5nID0gYiArIHJlcGxhY2VTdHIgKyBlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFN0cmluZy5sZW5ndGg7XG4gIH1cblxuICBjaGFyQXQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoaSA8IHRoaXMuX2ludGVybmFsU3RyaW5nLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsU3RyaW5nLmNoYXJBdChpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldENoYXJBdChpZHg6IG51bWJlciwgdmFsOiBudW1iZXIgfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy5pbnNlcnQoaWR4LCBTdHJpbmcuZnJvbUNoYXJDb2RlKHZhbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluc2VydChpZHgsIHZhbCk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlQ2hhckF0KGk6IG51bWJlcik6IFN0cmluZ0J1aWxkZXIge1xuICAgIHRoaXMucmVwbGFjZShpLCBpLCAnJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpbnNlcnQoaW5kZXg6IG51bWJlciwgc3RyOiBzdHJpbmcpOiBTdHJpbmdCdWlsZGVyIHtcbiAgICBpZiAoaW5kZXggPD0gdGhpcy5faW50ZXJuYWxTdHJpbmcubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFN0cmluZyA9IHRoaXMuX2ludGVybmFsU3RyaW5nLnN1YnN0cmluZygwLCBpbmRleCAtIDEpICsgc3RyICsgdGhpcy5faW50ZXJuYWxTdHJpbmcuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxhc3RJbmRleE9mKGNocjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2ludGVybmFsU3RyaW5nICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBfLmxhc3RJbmRleE9mKHRoaXMuX2ludGVybmFsU3RyaW5nLCBjaHIpO1xuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxufVxuIl19