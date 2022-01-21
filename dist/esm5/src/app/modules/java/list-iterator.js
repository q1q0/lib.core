/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template E
 */
var /**
 * @template E
 */
ListIterator = /** @class */ (function () {
    function ListIterator(data) {
        this.data = data;
        this.currentIndex = 0;
    }
    /**
     * @return {?}
     */
    ListIterator.prototype.hasNext = /**
     * @return {?}
     */
    function () {
        return this.data != null && this.data.length > this.currentIndex;
    };
    /**
     * @template T
     * @return {?}
     */
    ListIterator.prototype.next = /**
     * @template T
     * @return {?}
     */
    function () {
        if (this.currentIndex < this.data.length) {
            return this.data[this.currentIndex++];
        }
        throw new Error('No such element');
    };
    return ListIterator;
}());
/**
 * @template E
 */
export { ListIterator };
if (false) {
    /** @type {?} */
    ListIterator.prototype.currentIndex;
    /** @type {?} */
    ListIterator.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvamF2YS9saXN0LWl0ZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7O0FBQUE7SUFHSSxzQkFBb0IsSUFBYztRQUFkLFNBQUksR0FBSixJQUFJLENBQVU7NEJBRkgsQ0FBQztLQUcvQjs7OztJQUVELDhCQUFPOzs7SUFBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUNwRTs7Ozs7SUFFRCwyQkFBSTs7OztJQUFKO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUN6QztRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUN0Qzt1QkFsQkw7SUFtQkMsQ0FBQTs7OztBQWpCRCx3QkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJdGVyYXRvciB9IGZyb20gJy4vaXRlcmF0b3InO1xuXG5leHBvcnQgY2xhc3MgTGlzdEl0ZXJhdG9yPEUgPSBhbnk+IGltcGxlbWVudHMgSXRlcmF0b3I8RT57XG4gICAgcHJpdmF0ZSBjdXJyZW50SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGE6IEFycmF5PEU+KSB7XG4gICAgfVxuXG4gICAgaGFzTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsICYmIHRoaXMuZGF0YS5sZW5ndGggPiB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9XG5cbiAgICBuZXh0PFQgZXh0ZW5kcyBFPigpOiBFIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVt0aGlzLmN1cnJlbnRJbmRleCsrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc3VjaCBlbGVtZW50Jyk7XG4gICAgfVxufSJdfQ==