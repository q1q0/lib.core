/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template K, V
 */
export class HashMap {
    constructor() {
        this._internalMap = new Map();
    }
    /**
     * @return {?}
     */
    get size() {
        return this._internalMap.size;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    put(key, value) {
        this._internalMap.set(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this._internalMap.get(key);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this._internalMap.set(key, value);
        return this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        return this._internalMap.delete(key);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        this.delete(key);
    }
    /**
     * @return {?}
     */
    clear() {
        return this._internalMap.clear();
    }
    /**
     * @return {?}
     */
    entries() {
        return this._internalMap.entries();
    }
    /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    forEach(cb, thisArg) {
        return this._internalMap.forEach(cb, thisArg);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    has(key) {
        return this._internalMap.has(key);
    }
    /**
     * @return {?}
     */
    keys() {
        return this._internalMap.keys();
    }
    /**
     * @return {?}
     */
    values() {
        return this._internalMap.values();
    }
    /**
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = {};
        /** @type {?} */
        const keys = this.keys();
        /** @type {?} */
        let key = keys.next();
        while (key.done !== true) {
            json[/** @type {?} */ (key.value)] = this.get(key.value);
            key = keys.next();
        }
        return json;
    }
    /**
     * @return {?}
     */
    get [Symbol.iterator]() {
        return this._internalMap[Symbol.iterator];
    }
    /**
     * @return {?}
     */
    get [Symbol.toStringTag]() {
        return this._internalMap[Symbol.toStringTag];
    }
}
if (false) {
    /** @type {?} */
    HashMap.prototype._internalMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC1tYXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2phdmEvaGFzaC1tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQU07SUFHRjs0QkFGa0MsSUFBSSxHQUFHLEVBQVE7S0FJaEQ7Ozs7SUFFRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0tBQ2pDOzs7Ozs7SUFFRCxHQUFHLENBQUMsR0FBTSxFQUFFLEtBQVE7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUVELEdBQUcsQ0FBQyxHQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQzs7Ozs7O0lBRUQsR0FBRyxDQUFDLEdBQU0sRUFBRSxLQUFRO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQztLQUNmOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBTTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEI7Ozs7SUFFRCxLQUFLO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3BDOzs7O0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN0Qzs7Ozs7O0lBRUQsT0FBTyxDQUFDLEVBQTRDLEVBQUUsT0FBWTtRQUM5RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFRCxHQUFHLENBQUMsR0FBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckM7Ozs7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ25DOzs7O0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNyQzs7OztJQUVELE1BQU07O1FBQ0osTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDOztRQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O1FBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV0QixPQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLElBQUksbUJBQUMsR0FBRyxDQUFDLEtBQVksRUFBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkI7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7O0lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM3Qzs7OztJQUVELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDaEQ7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBIYXNoTWFwPEssIFY+IGltcGxlbWVudHMgTWFwPEssIFY+IHtcbiAgICBwcml2YXRlIF9pbnRlcm5hbE1hcDogTWFwPEssIFY+ID0gbmV3IE1hcDxLLCBWPigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuc2l6ZTtcbiAgICB9XG5cbiAgICBwdXQoa2V5OiBLLCB2YWx1ZTogVikge1xuICAgICAgICB0aGlzLl9pbnRlcm5hbE1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0KGtleTogSyk6IFYge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgc2V0KGtleTogSywgdmFsdWU6IFYpIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxNYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG5cbiAgICByZW1vdmUoa2V5OiBLKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcC5jbGVhcigpO1xuICAgIH1cblxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcC5lbnRyaWVzKCk7XG4gICAgfVxuXG4gICAgZm9yRWFjaChjYjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogTWFwPEssIFY+KT0+dm9pZCwgdGhpc0FyZzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcC5mb3JFYWNoKGNiLCB0aGlzQXJnKTtcbiAgICB9XG5cbiAgICBoYXMoa2V5OiBLKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcm5hbE1hcC5oYXMoa2V5KTtcbiAgICB9XG5cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXAua2V5cygpO1xuICAgIH1cblxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsTWFwLnZhbHVlcygpO1xuICAgIH1cblxuICAgIHRvSnNvbigpOiB7W25hbWU6IHN0cmluZ106IGFueX0ge1xuICAgICAgY29uc3QganNvbiA9IHt9O1xuICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cygpO1xuICAgICAgbGV0IGtleSA9IGtleXMubmV4dCgpO1xuXG4gICAgICB3aGlsZShrZXkuZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICBqc29uW2tleS52YWx1ZSBhcyBhbnldID0gdGhpcy5nZXQoa2V5LnZhbHVlKTtcbiAgICAgICAga2V5ID0ga2V5cy5uZXh0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cblxuICAgIGdldCBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVybmFsTWFwW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgfVxuXG4gICAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxNYXBbU3ltYm9sLnRvU3RyaW5nVGFnXTtcbiAgICB9XG59XG4iXX0=