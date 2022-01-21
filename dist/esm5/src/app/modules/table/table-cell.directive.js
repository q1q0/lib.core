/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, Input } from '@angular/core';
/**
 * This directive serve as a template for rendering table cell.
 */
var TableCellDirective = /** @class */ (function () {
    /**
     *
     * @param template Template on how to render the cell, we will forward row, column, etc to the template
     */
    function TableCellDirective(template) {
        this.template = template;
    }
    TableCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-table-cell]'
                },] }
    ];
    /** @nocollapse */
    TableCellDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TableCellDirective.propDecorators = {
        onContextMenuCb: [{ type: Input }],
        alignHorizontal: [{ type: Input }]
    };
    return TableCellDirective;
}());
export { TableCellDirective };
if (false) {
    /** @type {?} */
    TableCellDirective.prototype.onContextMenuCb;
    /**
     * Horizontal alignment (center, left, right)
     * @type {?}
     */
    TableCellDirective.prototype.alignHorizontal;
    /** @type {?} */
    TableCellDirective.prototype.template;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2VsbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RhYmxlL3RhYmxlLWNlbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0lBZ0IxRDs7O09BR0c7SUFDSCw0QkFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7S0FFNUM7O2dCQWpCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUI7Ozs7Z0JBUG1CLFdBQVc7OztrQ0FTMUIsS0FBSztrQ0FLTCxLQUFLOzs2QkFkVjs7U0FRYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIHNlcnZlIGFzIGEgdGVtcGxhdGUgZm9yIHJlbmRlcmluZyB0YWJsZSBjZWxsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2dC10YWJsZS1jZWxsXSdcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDZWxsRGlyZWN0aXZlIHtcbiAgICBASW5wdXQoKSBvbkNvbnRleHRNZW51Q2I6IChwYXJlbnRWaWV3OiBhbnkpPT52b2lkO1xuXG4gICAgLyoqXG4gICAgICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgKGNlbnRlciwgbGVmdCwgcmlnaHQpXG4gICAgICovXG4gICAgQElucHV0KCkgYWxpZ25Ib3Jpem9udGFsOiBzdHJpbmc7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIFRlbXBsYXRlIG9uIGhvdyB0byByZW5kZXIgdGhlIGNlbGwsIHdlIHdpbGwgZm9yd2FyZCByb3csIGNvbHVtbiwgZXRjIHRvIHRoZSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xuXG4gICAgfVxufVxuIl19