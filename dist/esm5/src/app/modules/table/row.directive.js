/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, QueryList, Input } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
var RowDirective = /** @class */ (function () {
    function RowDirective() {
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
    return RowDirective;
}());
export { RowDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvcm93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBNkIsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O2dCQUUzRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7aUJBQ25COzs7bUNBRUUsS0FBSztxQkFDTCxLQUFLOzJCQUNMLEtBQUs7Z0NBRUwsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDOzt1QkFYakU7O1NBTWEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJsZUNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLWNlbGwuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndnQtcm93J1xufSlcbmV4cG9ydCBjbGFzcyBSb3dEaXJlY3RpdmUge1xuICBASW5wdXQoKSBjdXN0b21BdHRyaWJ1dGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ307XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNzc0NsYXNzOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihUYWJsZUNlbGxEaXJlY3RpdmUsIHtyZWFkOiBUYWJsZUNlbGxEaXJlY3RpdmV9KVxuICBjZWxsVGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGFibGVDZWxsRGlyZWN0aXZlPjtcbn1cbiJdfQ==