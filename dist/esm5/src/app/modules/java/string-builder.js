/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from "lodash";
var StringBuilder = /** @class */ (function () {
    function StringBuilder(initial) {
        this._internalString = "";
        if (initial != null) {
            this.append(initial);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    StringBuilder.prototype.append = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str instanceof StringBuilder) {
            this._internalString = this._internalString + str.toString();
        }
        else {
            this._internalString = this._internalString + str;
        }
        return this;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.toString = /**
     * @return {?}
     */
    function () {
        return this._internalString;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._internalString = "";
        return this;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.clear();
    };
    /**
     * @param {?} str
     * @return {?}
     */
    StringBuilder.prototype.indexOf = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this._internalString.indexOf(str);
    };
    /**
     * @param {?} startIdx
     * @param {?=} endIdx
     * @return {?}
     */
    StringBuilder.prototype.substring = /**
     * @param {?} startIdx
     * @param {?=} endIdx
     * @return {?}
     */
    function (startIdx, endIdx) {
        if (endIdx != null) {
            return this._internalString.substring(startIdx, endIdx);
        }
        return this._internalString.substring(startIdx);
    };
    /**
     * @param {?} startIdx
     * @param {?} endIdex
     * @param {?} replaceStr
     * @return {?}
     */
    StringBuilder.prototype.replace = /**
     * @param {?} startIdx
     * @param {?} endIdex
     * @param {?} replaceStr
     * @return {?}
     */
    function (startIdx, endIdex, replaceStr) {
        /** @type {?} */
        var b = this._internalString.substring(0, startIdx);
        /** @type {?} */
        var e = this._internalString.substring(endIdex);
        this._internalString = b + replaceStr + e;
        return this;
    };
    /**
     * @return {?}
     */
    StringBuilder.prototype.length = /**
     * @return {?}
     */
    function () {
        return this._internalString.length;
    };
    /**
     * @param {?} i
     * @return {?}
     */
    StringBuilder.prototype.charAt = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        if (i < this._internalString.length) {
            return this._internalString.charAt(i);
        }
        return null;
    };
    /**
     * @param {?} idx
     * @param {?} val
     * @return {?}
     */
    StringBuilder.prototype.setCharAt = /**
     * @param {?} idx
     * @param {?} val
     * @return {?}
     */
    function (idx, val) {
        if (typeof val === "number") {
            this.insert(idx, String.fromCharCode(val));
        }
        else {
            this.insert(idx, val);
        }
    };
    /**
     * @param {?} i
     * @return {?}
     */
    StringBuilder.prototype.deleteCharAt = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        this.replace(i, i, '');
        return this;
    };
    /**
     * @param {?} index
     * @param {?} str
     * @return {?}
     */
    StringBuilder.prototype.insert = /**
     * @param {?} index
     * @param {?} str
     * @return {?}
     */
    function (index, str) {
        if (index <= this._internalString.length) {
            this._internalString = this._internalString.substring(0, index - 1) + str + this._internalString.substring(index);
        }
        return this;
    };
    /**
     * @param {?} chr
     * @return {?}
     */
    StringBuilder.prototype.lastIndexOf = /**
     * @param {?} chr
     * @return {?}
     */
    function (chr) {
        if (this._internalString != null) {
            return _.lastIndexOf(this._internalString, chr);
        }
        return -1;
    };
    return StringBuilder;
}());
export { StringBuilder };
if (false) {
    /** @type {?} */
    StringBuilder.prototype._internalString;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2phdmEvc3RyaW5nLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLElBQUE7SUFHRSx1QkFBWSxPQUFnQjsrQkFGTSxFQUFFO1FBR2xDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RCO0tBQ0Y7Ozs7O0lBRUQsOEJBQU07Ozs7SUFBTixVQUFPLEdBQTJCO1FBQ2hDLElBQUksR0FBRyxZQUFZLGFBQWEsRUFBRTtZQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlEO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjs7OztJQUVELGdDQUFROzs7SUFBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUM3Qjs7OztJQUVELDZCQUFLOzs7SUFBTDtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7SUFFRCwrQkFBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDZDs7Ozs7SUFFRCwrQkFBTzs7OztJQUFQLFVBQVEsR0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFDOzs7Ozs7SUFFRCxpQ0FBUzs7Ozs7SUFBVCxVQUFVLFFBQWdCLEVBQUUsTUFBZTtRQUN6QyxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekQ7UUFFRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pEOzs7Ozs7O0lBRUQsK0JBQU87Ozs7OztJQUFQLFVBQVEsUUFBZ0IsRUFBRSxPQUFlLEVBQUUsVUFBa0I7O1FBQzNELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzs7UUFDdEQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQztLQUNiOzs7O0lBRUQsOEJBQU07OztJQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztLQUNwQzs7Ozs7SUFFRCw4QkFBTTs7OztJQUFOLFVBQU8sQ0FBUztRQUNkLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7SUFFRCxpQ0FBUzs7Ozs7SUFBVCxVQUFVLEdBQVcsRUFBRSxHQUFvQjtRQUN6QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0tBQ0Y7Ozs7O0lBRUQsb0NBQVk7Ozs7SUFBWixVQUFhLENBQVM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7OztJQUVELDhCQUFNOzs7OztJQUFOLFVBQU8sS0FBYSxFQUFFLEdBQVc7UUFDL0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuSDtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLEdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksRUFBRTtZQUNoQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDt3QkE1Rkg7SUE2RkMsQ0FBQTtBQTNGRCx5QkEyRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcblxuZXhwb3J0IGNsYXNzIFN0cmluZ0J1aWxkZXIge1xuICBwcml2YXRlIF9pbnRlcm5hbFN0cmluZzogc3RyaW5nID0gXCJcIjtcblxuICBjb25zdHJ1Y3Rvcihpbml0aWFsPzogc3RyaW5nKSB7XG4gICAgaWYgKGluaXRpYWwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQoaW5pdGlhbCk7XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kKHN0cjogc3RyaW5nIHwgU3RyaW5nQnVpbGRlcikge1xuICAgIGlmIChzdHIgaW5zdGFuY2VvZiBTdHJpbmdCdWlsZGVyKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFN0cmluZyA9IHRoaXMuX2ludGVybmFsU3RyaW5nICsgc3RyLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ludGVybmFsU3RyaW5nID0gdGhpcy5faW50ZXJuYWxTdHJpbmcgKyBzdHI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVybmFsU3RyaW5nO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5faW50ZXJuYWxTdHJpbmcgPSBcIlwiO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cblxuICBpbmRleE9mKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxTdHJpbmcuaW5kZXhPZihzdHIpO1xuICB9XG5cbiAgc3Vic3RyaW5nKHN0YXJ0SWR4OiBudW1iZXIsIGVuZElkeD86IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKGVuZElkeCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0SWR4LCBlbmRJZHgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFN0cmluZy5zdWJzdHJpbmcoc3RhcnRJZHgpO1xuICB9XG5cbiAgcmVwbGFjZShzdGFydElkeDogbnVtYmVyLCBlbmRJZGV4OiBudW1iZXIsIHJlcGxhY2VTdHI6IHN0cmluZyk6IFN0cmluZ0J1aWxkZXIge1xuICAgIGNvbnN0IGIgPSB0aGlzLl9pbnRlcm5hbFN0cmluZy5zdWJzdHJpbmcoMCwgc3RhcnRJZHgpO1xuICAgIGNvbnN0IGUgPSB0aGlzLl9pbnRlcm5hbFN0cmluZy5zdWJzdHJpbmcoZW5kSWRleCk7XG5cbiAgICB0aGlzLl9pbnRlcm5hbFN0cmluZyA9IGIgKyByZXBsYWNlU3RyICsgZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxTdHJpbmcubGVuZ3RoO1xuICB9XG5cbiAgY2hhckF0KGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKGkgPCB0aGlzLl9pbnRlcm5hbFN0cmluZy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbFN0cmluZy5jaGFyQXQoaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZXRDaGFyQXQoaWR4OiBudW1iZXIsIHZhbDogbnVtYmVyIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuaW5zZXJ0KGlkeCwgU3RyaW5nLmZyb21DaGFyQ29kZSh2YWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnNlcnQoaWR4LCB2YWwpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUNoYXJBdChpOiBudW1iZXIpOiBTdHJpbmdCdWlsZGVyIHtcbiAgICB0aGlzLnJlcGxhY2UoaSwgaSwgJycpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaW5zZXJ0KGluZGV4OiBudW1iZXIsIHN0cjogc3RyaW5nKTogU3RyaW5nQnVpbGRlciB7XG4gICAgaWYgKGluZGV4IDw9IHRoaXMuX2ludGVybmFsU3RyaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5faW50ZXJuYWxTdHJpbmcgPSB0aGlzLl9pbnRlcm5hbFN0cmluZy5zdWJzdHJpbmcoMCwgaW5kZXggLSAxKSArIHN0ciArIHRoaXMuX2ludGVybmFsU3RyaW5nLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsYXN0SW5kZXhPZihjaHI6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9pbnRlcm5hbFN0cmluZyAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gXy5sYXN0SW5kZXhPZih0aGlzLl9pbnRlcm5hbFN0cmluZywgY2hyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cbn1cbiJdfQ==