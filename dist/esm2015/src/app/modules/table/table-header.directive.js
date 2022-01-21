/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, Input } from '@angular/core';
/**
 * This template is used to render header if a customer rendering is needed, by default, header can be passed in
 * to the TableColumnDirective as a string
 */
export class TableHeaderDirective {
    /**
     *
     * @param {?} template Template on how to render the header, we will forward row, column, etc to the template
     */
    constructor(template) {
        this.template = template;
    }
}
TableHeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-table-header]'
            },] }
];
/** @nocollapse */
TableHeaderDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TableHeaderDirective.propDecorators = {
    id: [{ type: Input }],
    autoWrap: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TableHeaderDirective.prototype.id;
    /** @type {?} */
    TableHeaderDirective.prototype.autoWrap;
    /** @type {?} */
    TableHeaderDirective.prototype.template;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQVM5RCxNQUFNOzs7OztJQU9GLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0tBRTVDOzs7WUFaSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7OztZQVJtQixXQUFXOzs7aUJBVTFCLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhpcyB0ZW1wbGF0ZSBpcyB1c2VkIHRvIHJlbmRlciBoZWFkZXIgaWYgYSBjdXN0b21lciByZW5kZXJpbmcgaXMgbmVlZGVkLCBieSBkZWZhdWx0LCBoZWFkZXIgY2FuIGJlIHBhc3NlZCBpblxuICogdG8gdGhlIFRhYmxlQ29sdW1uRGlyZWN0aXZlIGFzIGEgc3RyaW5nXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3Z0LXRhYmxlLWhlYWRlcl0nXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyRGlyZWN0aXZlIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGF1dG9XcmFwOiBib29sZWFuIHwgc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBvbiBob3cgdG8gcmVuZGVyIHRoZSBoZWFkZXIsIHdlIHdpbGwgZm9yd2FyZCByb3csIGNvbHVtbiwgZXRjIHRvIHRoZSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICBcbiAgICB9XG59XG4iXX0=