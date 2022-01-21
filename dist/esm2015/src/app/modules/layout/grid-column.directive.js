/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
export class GridColumnDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * Init lifecycle. Set grid column css class
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let cssClass = this.vtGridColumn ? `col-sm-${this.vtGridColumn}` : 'col-sm';
        this.el.nativeElement.classList.add(cssClass);
    }
}
GridColumnDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vtGridColumn]'
            },] }
];
/** @nocollapse */
GridColumnDirective.ctorParameters = () => [
    { type: ElementRef }
];
GridColumnDirective.propDecorators = {
    vtGridColumn: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    GridColumnDirective.prototype.vtGridColumn;
    /** @type {?} */
    GridColumnDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1jb2x1bW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvZ3JpZC1jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFLckUsTUFBTTs7OztJQUlKLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0tBQ2pDOzs7OztJQUtELFFBQVE7O1FBQ04sSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUM1RSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQy9DOzs7WUFoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7WUFKMEIsVUFBVTs7OzJCQU9sQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t2dEdyaWRDb2x1bW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBHcmlkQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLy8gQ29sdW1uU3BhbiBvZiBlbGVtZW50XG4gIEBJbnB1dCgpIHZ0R3JpZENvbHVtbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gU2V0IGdyaWQgY29sdW1uIGNzcyBjbGFzc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGNzc0NsYXNzID0gdGhpcy52dEdyaWRDb2x1bW4gPyBgY29sLXNtLSR7dGhpcy52dEdyaWRDb2x1bW59YCA6ICdjb2wtc20nO1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgfVxuXG59XG4iXX0=