/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ListIterator } from './list-iterator';
import * as _ from 'lodash';
/**
 * @template E
 */
export class Vector {
    /**
     * @param {?=} size
     */
    constructor(size) {
        this.data = [];
        if (Array.isArray(size)) {
            this.data = size;
        }
    }
    /**
     * @return {?}
     */
    toArray() {
        return this.data;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.data = data;
    }
    /**
     * @return {?}
     */
    size() {
        return this.data == null ? 0 : this.data.length;
    }
    /**
     * @template T
     * @param {?} idx
     * @return {?}
     */
    get(idx) {
        if (this.size() > idx) {
            return /** @type {?} */ (this.data[idx]);
        }
        return null;
    }
    /**
     * @param {?} element
     * @param {?=} insertionIndex
     * @return {?}
     */
    add(element, insertionIndex = -1) {
        if (insertionIndex === -1) {
            return this.data.push(element);
        }
        else {
            this.data.splice(insertionIndex, 0, element);
            return insertionIndex;
        }
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    delete(idx) {
        if (this.get(idx)) {
            this.data.splice(idx, 1);
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    addElement(element) {
        return this.add(element);
    }
    /**
     * @param {?} vec
     * @return {?}
     */
    addAll(vec) {
        /** @type {?} */
        let it = vec.iterator();
        while (it.hasNext()) {
            this.add(it.next());
        }
    }
    /**
     * @return {?}
     */
    firstElement() {
        return this.data != null && this.data.length > 0 ? this.data[0] : null;
    }
    /**
     * @return {?}
     */
    lastElement() {
        return this.data != null && this.data.length > 0 ? this.data[this.data.length - 1] : null;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    contains(element) {
        return this.data != null && this.data.indexOf(element) >= 0 ? true : false;
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    elementAt(idx) {
        return this.get(idx);
    }
    /**
     * @return {?}
     */
    isEmpty() {
        return this.data == null || this.data.length === 0;
    }
    /**
     * @return {?}
     */
    iterator() {
        return new ListIterator(_.clone(this.data));
    }
}
if (false) {
    /** @type {?} */
    Vector.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9qYXZhL3ZlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7O0FBRzVCLE1BQU07Ozs7SUFHSixZQUFZLElBQXdCO29CQUZYLEVBQUU7UUFHekIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO0tBQ0Y7Ozs7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFjO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOzs7O0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDakQ7Ozs7OztJQUVELEdBQUcsQ0FBZSxHQUFXO1FBQzNCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUNyQix5QkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxFQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBRUQsR0FBRyxDQUFDLE9BQVUsRUFBRSxpQkFBeUIsQ0FBQyxDQUFDO1FBQ3pDLElBQUksY0FBYyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0MsT0FBTyxjQUFjLENBQUM7U0FDdkI7S0FDRjs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVztRQUNoQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFjOztRQUNuQixJQUFJLEVBQUUsR0FBZ0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLE9BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDckI7S0FDRjs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3hFOzs7O0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDM0Y7Ozs7O0lBRUQsUUFBUSxDQUFDLE9BQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQzNFOzs7OztJQUVELFNBQVMsQ0FBQyxHQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN0Qjs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztLQUNwRDs7OztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksWUFBWSxDQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDaEQ7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZXJhdG9yIH0gZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0SXRlcmF0b3IgfSBmcm9tICcuL2xpc3QtaXRlcmF0b3InO1xuaW1wb3J0IHsgSXRlcmFibGUgfSBmcm9tICcuL2l0ZXJhYmxlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuLy9lbXVsdmF0ZSBKYXZhIHZlY3RvciAoc29tZXdoYXQpXG5leHBvcnQgY2xhc3MgVmVjdG9yPEUgPSBhbnk+IGltcGxlbWVudHMgSXRlcmFibGUge1xuICBwcml2YXRlIGRhdGE6IEFycmF5PEU+ID0gW107XG5cbiAgY29uc3RydWN0b3Ioc2l6ZT86IG51bWJlciB8IEFycmF5PEU+KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2l6ZSkpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgdG9BcnJheSgpOiBBcnJheTxFPiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxuXG4gIHNldERhdGEoZGF0YTogQXJyYXk8RT4pIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGEgPT0gbnVsbCA/IDAgOiB0aGlzLmRhdGEubGVuZ3RoO1xuICB9XG5cbiAgZ2V0PFQgZXh0ZW5kcyBFPiAoaWR4OiBudW1iZXIpOiBUIHtcbiAgICBpZiAodGhpcy5zaXplKCkgPiBpZHgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFbaWR4XSBhcyBUO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWRkKGVsZW1lbnQ6IEUsIGluc2VydGlvbkluZGV4OiBudW1iZXIgPSAtMSk6IG51bWJlciB7XG4gICAgaWYgKGluc2VydGlvbkluZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wdXNoKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEuc3BsaWNlKGluc2VydGlvbkluZGV4LCAwLCBlbGVtZW50KTtcbiAgICAgIHJldHVybiBpbnNlcnRpb25JbmRleDtcbiAgICB9XG4gIH1cblxuICBkZWxldGUoaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5nZXQoaWR4KSkge1xuICAgICAgdGhpcy5kYXRhLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEVsZW1lbnQoZWxlbWVudDogRSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKGVsZW1lbnQpO1xuICB9XG5cbiAgYWRkQWxsKHZlYzogVmVjdG9yPEU+KSB7XG4gICAgbGV0IGl0OiBJdGVyYXRvcjxFPiA9IHZlYy5pdGVyYXRvcigpO1xuICAgIHdoaWxlKGl0Lmhhc05leHQoKSkge1xuICAgICAgdGhpcy5hZGQoaXQubmV4dCgpKTtcbiAgICB9XG4gIH1cblxuICBmaXJzdEVsZW1lbnQoKTogRSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsICYmIHRoaXMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5kYXRhWzBdIDogbnVsbDtcbiAgfVxuXG4gIGxhc3RFbGVtZW50KCk6IEUge1xuICAgIHJldHVybiB0aGlzLmRhdGEgIT0gbnVsbCAmJiB0aGlzLmRhdGEubGVuZ3RoID4gMCA/IHRoaXMuZGF0YVt0aGlzLmRhdGEubGVuZ3RoIC0gMV0gOiBudWxsO1xuICB9XG5cbiAgY29udGFpbnMoZWxlbWVudDogRSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGEgIT0gbnVsbCAmJiB0aGlzLmRhdGEuaW5kZXhPZihlbGVtZW50KSA+PSAwID8gdHJ1ZTogZmFsc2U7XG4gIH1cblxuICBlbGVtZW50QXQoaWR4OiBudW1iZXIpOiBFIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoaWR4KTtcbiAgfVxuXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YSA9PSBudWxsIHx8IHRoaXMuZGF0YS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBpdGVyYXRvcigpOiBJdGVyYXRvcjxFPiB7XG4gICAgcmV0dXJuIG5ldyBMaXN0SXRlcmF0b3I8RT4oXy5jbG9uZSh0aGlzLmRhdGEpKTtcbiAgfVxufVxuIl19