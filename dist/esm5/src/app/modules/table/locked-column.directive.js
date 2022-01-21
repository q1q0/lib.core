/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import { TableColumnDirective } from './table-column.directive';
var LockedColumnDirective = /** @class */ (function (_super) {
    tslib_1.__extends(LockedColumnDirective, _super);
    function LockedColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    LockedColumnDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.locked = true;
    };
    LockedColumnDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-locked-column',
                    providers: [
                        {
                            provide: TableColumnDirective,
                            useExisting: forwardRef(function () { return LockedColumnDirective; })
                        }
                    ]
                },] }
    ];
    return LockedColumnDirective;
}(TableColumnDirective));
export { LockedColumnDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ja2VkLWNvbHVtbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RhYmxlL2xvY2tlZC1jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQWNyQixpREFBb0I7Ozs7Ozs7SUFDN0Qsd0NBQVE7OztJQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDcEI7O2dCQWpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxvQkFBb0I7NEJBQzdCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBSSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixDQUFDO3lCQUNuRDtxQkFDRjtpQkFDRjs7Z0NBWEQ7RUFlMkMsb0JBQW9CO1NBQWxELHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQ29udGVudENoaWxkLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY29sdW1uLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3Z0LWxvY2tlZC1jb2x1bW4nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5Mb2NrZWRDb2x1bW5EaXJlY3RpdmUpXG4gICAgfVxuICBdXG59KVxuLyoqXG4gKiBKdXN0IGFsaWFzaW5nIHZ0LXRhYmxlLWNvbHVtbiBmb3IgbG9ja2VkIGNvbHVtblxuICovXG5leHBvcnQgY2xhc3MgTG9ja2VkQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgVGFibGVDb2x1bW5EaXJlY3RpdmUge1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=