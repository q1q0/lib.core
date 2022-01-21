/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template K, V
 */
var /**
 * @template K, V
 */
HashMap = /** @class */ (function () {
    function HashMap() {
        this._internalMap = new Map();
    }
    Object.defineProperty(HashMap.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._internalMap.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    HashMap.prototype.put = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this._internalMap.set(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._internalMap.get(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    HashMap.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this._internalMap.set(key, value);
        return this;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.delete = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._internalMap.delete(key);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.delete(key);
    };
    /**
     * @return {?}
     */
    HashMap.prototype.clear = /**
     * @return {?}
     */
    function () {
        return this._internalMap.clear();
    };
    /**
     * @return {?}
     */
    HashMap.prototype.entries = /**
     * @return {?}
     */
    function () {
        return this._internalMap.entries();
    };
    /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    HashMap.prototype.forEach = /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    function (cb, thisArg) {
        return this._internalMap.forEach(cb, thisArg);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    HashMap.prototype.has = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._internalMap.has(key);
    };
    /**
     * @return {?}
     */
    HashMap.prototype.keys = /**
     * @return {?}
     */
    function () {
        return this._internalMap.keys();
    };
    /**
     * @return {?}
     */
    HashMap.prototype.values = /**
     * @return {?}
     */
    function () {
        return this._internalMap.values();
    };
    /**
     * @return {?}
     */
    HashMap.prototype.toJson = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = {};
        /** @type {?} */
        var keys = this.keys();
        /** @type {?} */
        var key = keys.next();
        while (key.done !== true) {
            json[/** @type {?} */ (key.value)] = this.get(key.value);
            key = keys.next();
        }
        return json;
    };
    Object.defineProperty(HashMap.prototype, Symbol.iterator, {
        get: /**
         * @return {?}
         */
        function () {
            return this._internalMap[Symbol.iterator];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashMap.prototype, Symbol.toStringTag, {
        get: /**
         * @return {?}
         */
        function () {
            return this._internalMap[Symbol.toStringTag];
        },
        enumerable: true,
        configurable: true
    });
    return HashMap;
}());
/**
 * @template K, V
 */
export { HashMap };
if (false) {
    /** @type {?} */
    HashMap.prototype._internalMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC1tYXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2phdmEvaGFzaC1tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7QUFBQTtJQUdJOzRCQUZrQyxJQUFJLEdBQUcsRUFBUTtLQUloRDtJQUVELHNCQUFJLHlCQUFJOzs7O1FBQVI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1NBQ2pDOzs7T0FBQTs7Ozs7O0lBRUQscUJBQUc7Ozs7O0lBQUgsVUFBSSxHQUFNLEVBQUUsS0FBUTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDckM7Ozs7O0lBRUQscUJBQUc7Ozs7SUFBSCxVQUFJLEdBQU07UUFDTixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7SUFFRCxxQkFBRzs7Ozs7SUFBSCxVQUFJLEdBQU0sRUFBRSxLQUFRO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQztLQUNmOzs7OztJQUVELHdCQUFNOzs7O0lBQU4sVUFBTyxHQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFFRCx3QkFBTTs7OztJQUFOLFVBQU8sR0FBTTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7Ozs7SUFFRCx1QkFBSzs7O0lBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDcEM7Ozs7SUFFRCx5QkFBTzs7O0lBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDdEM7Ozs7OztJQUVELHlCQUFPOzs7OztJQUFQLFVBQVEsRUFBNEMsRUFBRSxPQUFZO1FBQzlELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEOzs7OztJQUVELHFCQUFHOzs7O0lBQUgsVUFBSSxHQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQzs7OztJQUVELHNCQUFJOzs7SUFBSjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQzs7OztJQUVELHdCQUFNOzs7SUFBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNyQzs7OztJQUVELHdCQUFNOzs7SUFBTjs7UUFDRSxJQUFNLElBQUksR0FBRyxFQUFFLENBQUM7O1FBQ2hCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7UUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXRCLE9BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDdkIsSUFBSSxtQkFBQyxHQUFHLENBQUMsS0FBWSxFQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuQjtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxzQkFBSSxtQkFBQyxNQUFNLENBQUMsUUFBUzs7OztRQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7OztPQUFBO0lBRUQsc0JBQUksbUJBQUMsTUFBTSxDQUFDLFdBQVk7Ozs7UUFBeEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2hEOzs7T0FBQTtrQkEzRUw7SUE0RUMsQ0FBQTs7OztBQTVFRCxtQkE0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSGFzaE1hcDxLLCBWPiBpbXBsZW1lbnRzIE1hcDxLLCBWPiB7XG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxNYXA6IE1hcDxLLCBWPiA9IG5ldyBNYXA8SywgVj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsTWFwLnNpemU7XG4gICAgfVxuXG4gICAgcHV0KGtleTogSywgdmFsdWU6IFYpIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxNYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldChrZXk6IEspOiBWIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsTWFwLmdldChrZXkpO1xuICAgIH1cblxuICAgIHNldChrZXk6IEssIHZhbHVlOiBWKSB7XG4gICAgICAgIHRoaXMuX2ludGVybmFsTWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVsZXRlKGtleTogSyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuZGVsZXRlKGtleSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGtleTogSyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlbGV0ZShrZXkpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuZW50cmllcygpO1xuICAgIH1cblxuICAgIGZvckVhY2goY2I6ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE1hcDxLLCBWPik9PnZvaWQsIHRoaXNBcmc6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuZm9yRWFjaChjYiwgdGhpc0FyZyk7XG4gICAgfVxuXG4gICAgaGFzKGtleTogSykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuaGFzKGtleSk7XG4gICAgfVxuXG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsTWFwLmtleXMoKTtcbiAgICB9XG5cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcC52YWx1ZXMoKTtcbiAgICB9XG5cbiAgICB0b0pzb24oKToge1tuYW1lOiBzdHJpbmddOiBhbnl9IHtcbiAgICAgIGNvbnN0IGpzb24gPSB7fTtcbiAgICAgIGNvbnN0IGtleXMgPSB0aGlzLmtleXMoKTtcbiAgICAgIGxldCBrZXkgPSBrZXlzLm5leHQoKTtcblxuICAgICAgd2hpbGUoa2V5LmRvbmUgIT09IHRydWUpIHtcbiAgICAgICAganNvbltrZXkudmFsdWUgYXMgYW55XSA9IHRoaXMuZ2V0KGtleS52YWx1ZSk7XG4gICAgICAgIGtleSA9IGtleXMubmV4dCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG5cbiAgICBnZXQgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcFtTeW1ib2wuaXRlcmF0b3JdO1xuICAgIH1cblxuICAgIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsTWFwW1N5bWJvbC50b1N0cmluZ1RhZ107XG4gICAgfVxufVxuIl19