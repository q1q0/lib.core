/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template E
 */
export class ListIterator {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.currentIndex = 0;
    }
    /**
     * @return {?}
     */
    hasNext() {
        return this.data != null && this.data.length > this.currentIndex;
    }
    /**
     * @template T
     * @return {?}
     */
    next() {
        if (this.currentIndex < this.data.length) {
            return this.data[this.currentIndex++];
        }
        throw new Error('No such element');
    }
}
if (false) {
    /** @type {?} */
    ListIterator.prototype.currentIndex;
    /** @type {?} */
    ListIterator.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvamF2YS9saXN0LWl0ZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxNQUFNOzs7O0lBR0YsWUFBb0IsSUFBYztRQUFkLFNBQUksR0FBSixJQUFJLENBQVU7NEJBRkgsQ0FBQztLQUcvQjs7OztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDcEU7Ozs7O0lBRUQsSUFBSTtRQUNBLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDekM7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDdEM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZXJhdG9yIH0gZnJvbSAnLi9pdGVyYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBMaXN0SXRlcmF0b3I8RSA9IGFueT4gaW1wbGVtZW50cyBJdGVyYXRvcjxFPntcbiAgICBwcml2YXRlIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YTogQXJyYXk8RT4pIHtcbiAgICB9XG5cbiAgICBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhICE9IG51bGwgJiYgdGhpcy5kYXRhLmxlbmd0aCA+IHRoaXMuY3VycmVudEluZGV4O1xuICAgIH1cblxuICAgIG5leHQ8VCBleHRlbmRzIEU+KCk6IEUge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMuY3VycmVudEluZGV4KytdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzdWNoIGVsZW1lbnQnKTtcbiAgICB9XG59Il19