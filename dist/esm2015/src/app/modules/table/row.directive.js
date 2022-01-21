/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, QueryList, Input } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
export class RowDirective {
}
RowDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-row'
            },] }
];
RowDirective.propDecorators = {
    customAttributes: [{ type: Input }],
    id: [{ type: Input }],
    cssClass: [{ type: Input }],
    cellTemplates: [{ type: ContentChildren, args: [TableCellDirective, { read: TableCellDirective },] }]
};
if (false) {
    /** @type {?} */
    RowDirective.prototype.customAttributes;
    /** @type {?} */
    RowDirective.prototype.id;
    /** @type {?} */
    RowDirective.prototype.cssClass;
    /** @type {?} */
    RowDirective.prototype.cellTemplates;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvcm93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBNkIsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFLNUQsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2FBQ25COzs7K0JBRUUsS0FBSztpQkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBRUwsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYmxlQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY2VsbC5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd2dC1yb3cnXG59KVxuZXhwb3J0IGNsYXNzIFJvd0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGN1c3RvbUF0dHJpYnV0ZXM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfTtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgY3NzQ2xhc3M6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKFRhYmxlQ2VsbERpcmVjdGl2ZSwge3JlYWQ6IFRhYmxlQ2VsbERpcmVjdGl2ZX0pXG4gIGNlbGxUZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUYWJsZUNlbGxEaXJlY3RpdmU+O1xufVxuIl19