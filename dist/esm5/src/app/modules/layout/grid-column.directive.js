/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
var GridColumnDirective = /** @class */ (function () {
    function GridColumnDirective(el) {
        this.el = el;
    }
    /**
     * Init lifecycle. Set grid column css class
     */
    /**
     * Init lifecycle. Set grid column css class
     * @return {?}
     */
    GridColumnDirective.prototype.ngOnInit = /**
     * Init lifecycle. Set grid column css class
     * @return {?}
     */
    function () {
        /** @type {?} */
        var cssClass = this.vtGridColumn ? "col-sm-" + this.vtGridColumn : 'col-sm';
        this.el.nativeElement.classList.add(cssClass);
    };
    GridColumnDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vtGridColumn]'
                },] }
    ];
    /** @nocollapse */
    GridColumnDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    GridColumnDirective.propDecorators = {
        vtGridColumn: [{ type: Input }]
    };
    return GridColumnDirective;
}());
export { GridColumnDirective };
if (false) {
    /** @type {?} */
    GridColumnDirective.prototype.vtGridColumn;
    /** @type {?} */
    GridColumnDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1jb2x1bW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvZ3JpZC1jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7O0lBU25FLDZCQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtLQUNqQztJQUVEOztPQUVHOzs7OztJQUNILHNDQUFROzs7O0lBQVI7O1FBQ0UsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBVSxJQUFJLENBQUMsWUFBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQzs7Z0JBaEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjs7OztnQkFKMEIsVUFBVTs7OytCQU9sQyxLQUFLOzs4QkFQUjs7U0FLYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Z0R3JpZENvbHVtbl0nXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvLyBDb2x1bW5TcGFuIG9mIGVsZW1lbnRcbiAgQElucHV0KCkgdnRHcmlkQ29sdW1uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgbGlmZWN5Y2xlLiBTZXQgZ3JpZCBjb2x1bW4gY3NzIGNsYXNzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgY3NzQ2xhc3MgPSB0aGlzLnZ0R3JpZENvbHVtbiA/IGBjb2wtc20tJHt0aGlzLnZ0R3JpZENvbHVtbn1gIDogJ2NvbC1zbSc7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICB9XG5cbn1cbiJdfQ==