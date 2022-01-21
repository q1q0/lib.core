/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, Input } from '@angular/core';
/**
 * This directive serve as a template for rendering table cell.
 */
export class TableCellDirective {
    /**
     *
     * @param {?} template Template on how to render the cell, we will forward row, column, etc to the template
     */
    constructor(template) {
        this.template = template;
    }
}
TableCellDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vt-table-cell]'
            },] }
];
/** @nocollapse */
TableCellDirective.ctorParameters = () => [
    { type: TemplateRef }
];
TableCellDirective.propDecorators = {
    onContextMenuCb: [{ type: Input }],
    alignHorizontal: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2VsbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RhYmxlL3RhYmxlLWNlbGwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFROUQsTUFBTTs7Ozs7SUFZRixZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtLQUU1Qzs7O1lBakJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7O1lBUG1CLFdBQVc7Ozs4QkFTMUIsS0FBSzs4QkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBzZXJ2ZSBhcyBhIHRlbXBsYXRlIGZvciByZW5kZXJpbmcgdGFibGUgY2VsbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdnQtdGFibGUtY2VsbF0nXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ2VsbERpcmVjdGl2ZSB7XG4gICAgQElucHV0KCkgb25Db250ZXh0TWVudUNiOiAocGFyZW50VmlldzogYW55KT0+dm9pZDtcblxuICAgIC8qKlxuICAgICAqIEhvcml6b250YWwgYWxpZ25tZW50IChjZW50ZXIsIGxlZnQsIHJpZ2h0KVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsaWduSG9yaXpvbnRhbDogc3RyaW5nO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBvbiBob3cgdG8gcmVuZGVyIHRoZSBjZWxsLCB3ZSB3aWxsIGZvcndhcmQgcm93LCBjb2x1bW4sIGV0YyB0byB0aGUgdGVtcGxhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHtcblxuICAgIH1cbn1cbiJdfQ==