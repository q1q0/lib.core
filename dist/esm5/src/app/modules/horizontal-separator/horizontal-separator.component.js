/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, Renderer2, forwardRef, Optional, SkipSelf } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for Horizontal line (HR) component
 */
var HorizontalSeparatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HorizontalSeparatorComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]]
     * @param sessionService see [[BaseComponent]]
     * @param elementRef see [[BaseComponent]]
     * @param renderer see [[BaseComponent]]
     */
    function HorizontalSeparatorComponent(parent, sessionService, elementRef, renderer) {
        return _super.call(this, parent, sessionService, elementRef, renderer) || this;
    }
    /**
     * Init lifecycle method
     */
    /**
     * Init lifecycle method
     * @return {?}
     */
    HorizontalSeparatorComponent.prototype.ngOnInit = /**
     * Init lifecycle method
     * @return {?}
     */
    function () {
    };
    /**
     * Get JSON representation for this component
     */
    /**
     * Get JSON representation for this component
     * @return {?}
     */
    HorizontalSeparatorComponent.prototype.toJson = /**
     * Get JSON representation for this component
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        this.setJson(json, "borderColor", this.borderColor);
        return json;
    };
    HorizontalSeparatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-horizontal-separator',
                    template: "<hr [id]=\"id\" [style.backgroundColor]=\"borderColor\" [style.height]=\"controlHeight\" [style.maxWidth]=\"controlWidth\" />\n",
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return HorizontalSeparatorComponent; })
                        }
                    ],
                    styles: ["hr{margin-top:3px;margin-bottom:3px;border-color:#5c5c5c;box-shadow:0 1px 0 #fff}"]
                }] }
    ];
    /** @nocollapse */
    HorizontalSeparatorComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    HorizontalSeparatorComponent.propDecorators = {
        borderColor: [{ type: Input }]
    };
    return HorizontalSeparatorComponent;
}(BaseComponent));
export { HorizontalSeparatorComponent };
if (false) {
    /** @type {?} */
    HorizontalSeparatorComponent.prototype.borderColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9yaXpvbnRhbC1zZXBhcmF0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ob3Jpem9udGFsLXNlcGFyYXRvci9ob3Jpem9udGFsLXNlcGFyYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0lBZ0JWLHdEQUFhO0lBRzdEOzs7Ozs7T0FNRztJQUNILHNDQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQjtlQUNwSSxrQkFBTSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7S0FDcEQ7SUFFRDs7T0FFRzs7Ozs7SUFDSCwrQ0FBUTs7OztJQUFSO0tBQ0M7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2Q0FBTTs7OztJQUFOOztRQUNFLElBQU0sSUFBSSxHQUFRLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFJLENBQUM7S0FDYjs7Z0JBdkNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQywySUFBb0Q7b0JBRXBELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFJLE9BQUEsNEJBQTRCLEVBQTVCLENBQTRCLENBQUM7eUJBQzFEO3FCQUNGOztpQkFDRjs7OztnQkFoQlEsYUFBYSx1QkEyQlAsUUFBUSxZQUFJLFFBQVE7Z0JBMUIxQixjQUFjO2dCQUZLLFVBQVU7Z0JBQVMsU0FBUzs7OzhCQW1CckQsS0FBSzs7dUNBbkJSO0VBa0JrRCxhQUFhO1NBQWxELDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyLCBmb3J3YXJkUmVmLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZvciBIb3Jpem9udGFsIGxpbmUgKEhSKSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtaG9yaXpvbnRhbC1zZXBhcmF0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9yaXpvbnRhbC1zZXBhcmF0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob3Jpem9udGFsLXNlcGFyYXRvci5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+SG9yaXpvbnRhbFNlcGFyYXRvckNvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSG9yaXpvbnRhbFNlcGFyYXRvckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBib3JkZXJDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUgbWV0aG9kXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHRvSnNvbigpIHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICB0aGlzLnNldEpzb24oanNvbiwgXCJib3JkZXJDb2xvclwiLCB0aGlzLmJvcmRlckNvbG9yKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbn1cbiJdfQ==