/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ListIterator } from './list-iterator';
import * as _ from 'lodash';
/**
 * @template E
 */
var /**
 * @template E
 */
Vector = /** @class */ (function () {
    function Vector(size) {
        this.data = [];
        if (Array.isArray(size)) {
            this.data = size;
        }
    }
    /**
     * @return {?}
     */
    Vector.prototype.toArray = /**
     * @return {?}
     */
    function () {
        return this.data;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Vector.prototype.setData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.data = data;
    };
    /**
     * @return {?}
     */
    Vector.prototype.size = /**
     * @return {?}
     */
    function () {
        return this.data == null ? 0 : this.data.length;
    };
    /**
     * @template T
     * @param {?} idx
     * @return {?}
     */
    Vector.prototype.get = /**
     * @template T
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (this.size() > idx) {
            return /** @type {?} */ (this.data[idx]);
        }
        return null;
    };
    /**
     * @param {?} element
     * @param {?=} insertionIndex
     * @return {?}
     */
    Vector.prototype.add = /**
     * @param {?} element
     * @param {?=} insertionIndex
     * @return {?}
     */
    function (element, insertionIndex) {
        if (insertionIndex === void 0) { insertionIndex = -1; }
        if (insertionIndex === -1) {
            return this.data.push(element);
        }
        else {
            this.data.splice(insertionIndex, 0, element);
            return insertionIndex;
        }
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    Vector.prototype.delete = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (this.get(idx)) {
            this.data.splice(idx, 1);
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Vector.prototype.addElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return this.add(element);
    };
    /**
     * @param {?} vec
     * @return {?}
     */
    Vector.prototype.addAll = /**
     * @param {?} vec
     * @return {?}
     */
    function (vec) {
        /** @type {?} */
        var it = vec.iterator();
        while (it.hasNext()) {
            this.add(it.next());
        }
    };
    /**
     * @return {?}
     */
    Vector.prototype.firstElement = /**
     * @return {?}
     */
    function () {
        return this.data != null && this.data.length > 0 ? this.data[0] : null;
    };
    /**
     * @return {?}
     */
    Vector.prototype.lastElement = /**
     * @return {?}
     */
    function () {
        return this.data != null && this.data.length > 0 ? this.data[this.data.length - 1] : null;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Vector.prototype.contains = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return this.data != null && this.data.indexOf(element) >= 0 ? true : false;
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    Vector.prototype.elementAt = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        return this.get(idx);
    };
    /**
     * @return {?}
     */
    Vector.prototype.isEmpty = /**
     * @return {?}
     */
    function () {
        return this.data == null || this.data.length === 0;
    };
    /**
     * @return {?}
     */
    Vector.prototype.iterator = /**
     * @return {?}
     */
    function () {
        return new ListIterator(_.clone(this.data));
    };
    return Vector;
}());
/**
 * @template E
 */
export { Vector };
if (false) {
    /** @type {?} */
    Vector.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9qYXZhL3ZlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7O0FBRzVCOzs7QUFBQTtJQUdFLGdCQUFZLElBQXdCO29CQUZYLEVBQUU7UUFHekIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO0tBQ0Y7Ozs7SUFFRCx3QkFBTzs7O0lBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDbEI7Ozs7O0lBRUQsd0JBQU87Ozs7SUFBUCxVQUFRLElBQWM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDbEI7Ozs7SUFFRCxxQkFBSTs7O0lBQUo7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ2pEOzs7Ozs7SUFFRCxvQkFBRzs7Ozs7SUFBSCxVQUFrQixHQUFXO1FBQzNCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUNyQix5QkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxFQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBRUQsb0JBQUc7Ozs7O0lBQUgsVUFBSSxPQUFVLEVBQUUsY0FBMkI7UUFBM0IsK0JBQUEsRUFBQSxrQkFBMEIsQ0FBQztRQUN6QyxJQUFJLGNBQWMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO0tBQ0Y7Ozs7O0lBRUQsdUJBQU07Ozs7SUFBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQjtLQUNGOzs7OztJQUVELDJCQUFVOzs7O0lBQVYsVUFBVyxPQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMxQjs7Ozs7SUFFRCx1QkFBTTs7OztJQUFOLFVBQU8sR0FBYzs7UUFDbkIsSUFBSSxFQUFFLEdBQWdCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxPQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCO0tBQ0Y7Ozs7SUFFRCw2QkFBWTs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3hFOzs7O0lBRUQsNEJBQVc7OztJQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUMzRjs7Ozs7SUFFRCx5QkFBUTs7OztJQUFSLFVBQVMsT0FBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDM0U7Ozs7O0lBRUQsMEJBQVM7Ozs7SUFBVCxVQUFVLEdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCOzs7O0lBRUQsd0JBQU87OztJQUFQO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7S0FDcEQ7Ozs7SUFFRCx5QkFBUTs7O0lBQVI7UUFDRSxPQUFPLElBQUksWUFBWSxDQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDaEQ7aUJBbkZIO0lBb0ZDLENBQUE7Ozs7QUE5RUQsa0JBOEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXRlcmF0b3IgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCB7IExpc3RJdGVyYXRvciB9IGZyb20gJy4vbGlzdC1pdGVyYXRvcic7XG5pbXBvcnQgeyBJdGVyYWJsZSB9IGZyb20gJy4vaXRlcmFibGUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG4vL2VtdWx2YXRlIEphdmEgdmVjdG9yIChzb21ld2hhdClcbmV4cG9ydCBjbGFzcyBWZWN0b3I8RSA9IGFueT4gaW1wbGVtZW50cyBJdGVyYWJsZSB7XG4gIHByaXZhdGUgZGF0YTogQXJyYXk8RT4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihzaXplPzogbnVtYmVyIHwgQXJyYXk8RT4pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzaXplKSkge1xuICAgICAgdGhpcy5kYXRhID0gc2l6ZTtcbiAgICB9XG4gIH1cblxuICB0b0FycmF5KCk6IEFycmF5PEU+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbiAgc2V0RGF0YShkYXRhOiBBcnJheTxFPikge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSA9PSBudWxsID8gMCA6IHRoaXMuZGF0YS5sZW5ndGg7XG4gIH1cblxuICBnZXQ8VCBleHRlbmRzIEU+IChpZHg6IG51bWJlcik6IFQge1xuICAgIGlmICh0aGlzLnNpemUoKSA+IGlkeCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVtpZHhdIGFzIFQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhZGQoZWxlbWVudDogRSwgaW5zZXJ0aW9uSW5kZXg6IG51bWJlciA9IC0xKTogbnVtYmVyIHtcbiAgICBpZiAoaW5zZXJ0aW9uSW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YS5zcGxpY2UoaW5zZXJ0aW9uSW5kZXgsIDAsIGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIGluc2VydGlvbkluZGV4O1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZShpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmdldChpZHgpKSB7XG4gICAgICB0aGlzLmRhdGEuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9XG5cbiAgYWRkRWxlbWVudChlbGVtZW50OiBFKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hZGQoZWxlbWVudCk7XG4gIH1cblxuICBhZGRBbGwodmVjOiBWZWN0b3I8RT4pIHtcbiAgICBsZXQgaXQ6IEl0ZXJhdG9yPEU+ID0gdmVjLml0ZXJhdG9yKCk7XG4gICAgd2hpbGUoaXQuaGFzTmV4dCgpKSB7XG4gICAgICB0aGlzLmFkZChpdC5uZXh0KCkpO1xuICAgIH1cbiAgfVxuXG4gIGZpcnN0RWxlbWVudCgpOiBFIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhICE9IG51bGwgJiYgdGhpcy5kYXRhLmxlbmd0aCA+IDAgPyB0aGlzLmRhdGFbMF0gOiBudWxsO1xuICB9XG5cbiAgbGFzdEVsZW1lbnQoKTogRSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsICYmIHRoaXMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGggLSAxXSA6IG51bGw7XG4gIH1cblxuICBjb250YWlucyhlbGVtZW50OiBFKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsICYmIHRoaXMuZGF0YS5pbmRleE9mKGVsZW1lbnQpID49IDAgPyB0cnVlOiBmYWxzZTtcbiAgfVxuXG4gIGVsZW1lbnRBdChpZHg6IG51bWJlcik6IEUge1xuICAgIHJldHVybiB0aGlzLmdldChpZHgpO1xuICB9XG5cbiAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhID09IG51bGwgfHwgdGhpcy5kYXRhLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIGl0ZXJhdG9yKCk6IEl0ZXJhdG9yPEU+IHtcbiAgICByZXR1cm4gbmV3IExpc3RJdGVyYXRvcjxFPihfLmNsb25lKHRoaXMuZGF0YSkpO1xuICB9XG59XG4iXX0=