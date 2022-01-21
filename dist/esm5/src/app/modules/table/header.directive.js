/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
var HeaderDirective = /** @class */ (function () {
    function HeaderDirective() {
    }
    /**
     * @return {?}
     */
    HeaderDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.id == null) {
            this.id = BaseComponent.generateUniqueId("header");
        }
    };
    HeaderDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-header'
                },] }
    ];
    /** @nocollapse */
    HeaderDirective.ctorParameters = function () { return []; };
    HeaderDirective.propDecorators = {
        text: [{ type: Input }],
        cssClass: [{ type: Input }],
        controlHeight: [{ type: Input }],
        controlWidth: [{ type: Input }],
        headerHeight: [{ type: Input }],
        autoWrap: [{ type: Input }],
        id: [{ type: Input }]
    };
    return HeaderDirective;
}());
export { HeaderDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvaGVhZGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztJQWNyRDtLQUFpQjs7OztJQUVqQixrQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO0tBQ0Y7O2dCQWxCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCOzs7Ozt1QkFFRSxLQUFLOzJCQUNMLEtBQUs7Z0NBQ0wsS0FBSzsrQkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSztxQkFDTCxLQUFLOzswQkFiUjs7U0FNYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3Z0LWhlYWRlcidcbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBjc3NDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBjb250cm9sSGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRyb2xXaWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBoZWFkZXJIZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgYXV0b1dyYXA6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKFwiaGVhZGVyXCIpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=