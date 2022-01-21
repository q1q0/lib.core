/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, Input } from '@angular/core';
/**
 * This template is used to render header if a customer rendering is needed, by default, header can be passed in
 * to the TableColumnDirective as a string
 */
var TableHeaderDirective = /** @class */ (function () {
    /**
     *
     * @param template Template on how to render the header, we will forward row, column, etc to the template
     */
    function TableHeaderDirective(template) {
        this.template = template;
    }
    TableHeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vt-table-header]'
                },] }
    ];
    /** @nocollapse */
    TableHeaderDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    TableHeaderDirective.propDecorators = {
        id: [{ type: Input }],
        autoWrap: [{ type: Input }]
    };
    return TableHeaderDirective;
}());
export { TableHeaderDirective };
if (false) {
    /** @type {?} */
    TableHeaderDirective.prototype.id;
    /** @type {?} */
    TableHeaderDirective.prototype.autoWrap;
    /** @type {?} */
    TableHeaderDirective.prototype.template;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGVhZGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvdGFibGUtaGVhZGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUFZMUQ7OztPQUdHO0lBQ0gsOEJBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0tBRTVDOztnQkFaSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtpQkFDaEM7Ozs7Z0JBUm1CLFdBQVc7OztxQkFVMUIsS0FBSzsyQkFDTCxLQUFLOzsrQkFYVjs7U0FTYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgdGVtcGxhdGUgaXMgdXNlZCB0byByZW5kZXIgaGVhZGVyIGlmIGEgY3VzdG9tZXIgcmVuZGVyaW5nIGlzIG5lZWRlZCwgYnkgZGVmYXVsdCwgaGVhZGVyIGNhbiBiZSBwYXNzZWQgaW5cbiAqIHRvIHRoZSBUYWJsZUNvbHVtbkRpcmVjdGl2ZSBhcyBhIHN0cmluZ1xuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2dC10YWJsZS1oZWFkZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckRpcmVjdGl2ZSB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBhdXRvV3JhcDogYm9vbGVhbiB8IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGUgb24gaG93IHRvIHJlbmRlciB0aGUgaGVhZGVyLCB3ZSB3aWxsIGZvcndhcmQgcm93LCBjb2x1bW4sIGV0YyB0byB0aGUgdGVtcGxhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgXG4gICAgfVxufVxuIl19