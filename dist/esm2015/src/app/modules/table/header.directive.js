/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
export class HeaderDirective {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.id == null) {
            this.id = BaseComponent.generateUniqueId("header");
        }
    }
}
HeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'vt-header'
            },] }
];
/** @nocollapse */
HeaderDirective.ctorParameters = () => [];
HeaderDirective.propDecorators = {
    text: [{ type: Input }],
    cssClass: [{ type: Input }],
    controlHeight: [{ type: Input }],
    controlWidth: [{ type: Input }],
    headerHeight: [{ type: Input }],
    autoWrap: [{ type: Input }],
    id: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    HeaderDirective.prototype.text;
    /** @type {?} */
    HeaderDirective.prototype.cssClass;
    /** @type {?} */
    HeaderDirective.prototype.controlHeight;
    /** @type {?} */
    HeaderDirective.prototype.controlWidth;
    /** @type {?} */
    HeaderDirective.prototype.headerHeight;
    /** @type {?} */
    HeaderDirective.prototype.autoWrap;
    /** @type {?} */
    HeaderDirective.prototype.id;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvaGVhZGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBS3ZELE1BQU07SUFTSixpQkFBaUI7Ozs7SUFFakIsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEQ7S0FDRjs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVzthQUN0Qjs7Ozs7bUJBRUUsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3VCQUNMLEtBQUs7aUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd2dC1oZWFkZXInXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgY3NzQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgY29udHJvbEhlaWdodDogc3RyaW5nO1xuICBASW5wdXQoKSBjb250cm9sV2lkdGg6IHN0cmluZztcbiAgQElucHV0KCkgaGVhZGVySGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGF1dG9XcmFwOiBib29sZWFuIHwgc3RyaW5nO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaWQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pZCA9IEJhc2VDb21wb25lbnQuZ2VuZXJhdGVVbmlxdWVJZChcImhlYWRlclwiKTtcbiAgICB9XG4gIH1cblxufVxuIl19