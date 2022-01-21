/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2, forwardRef, Optional, SkipSelf } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
/**
 * Class for Horizontal line (HR) component
 */
export class HorizontalSeparatorComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]]
     * @param {?} sessionService see [[BaseComponent]]
     * @param {?} elementRef see [[BaseComponent]]
     * @param {?} renderer see [[BaseComponent]]
     */
    constructor(parent, sessionService, elementRef, renderer) {
        super(parent, sessionService, elementRef, renderer);
    }
    /**
     * Init lifecycle method
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * Get JSON representation for this component
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "borderColor", this.borderColor);
        return json;
    }
}
HorizontalSeparatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-horizontal-separator',
                template: "<hr [id]=\"id\" [style.backgroundColor]=\"borderColor\" [style.height]=\"controlHeight\" [style.maxWidth]=\"controlWidth\" />\n",
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => HorizontalSeparatorComponent)
                    }
                ],
                styles: ["hr{margin-top:3px;margin-bottom:3px;border-color:#5c5c5c;box-shadow:0 1px 0 #fff}"]
            }] }
];
/** @nocollapse */
HorizontalSeparatorComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: Renderer2 }
];
HorizontalSeparatorComponent.propDecorators = {
    borderColor: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    HorizontalSeparatorComponent.prototype.borderColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9yaXpvbnRhbC1zZXBhcmF0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ob3Jpem9udGFsLXNlcGFyYXRvci9ob3Jpem9udGFsLXNlcGFyYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQWdCNUQsTUFBTSxtQ0FBb0MsU0FBUSxhQUFhOzs7Ozs7OztJQVU3RCxZQUFvQyxNQUFxQixFQUFFLGNBQThCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQjtRQUNwSSxLQUFLLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDckQ7Ozs7O0lBS0QsUUFBUTtLQUNQOzs7OztJQUtELE1BQU07O1FBQ0osTUFBTSxJQUFJLEdBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFJLENBQUM7S0FDYjs7O1lBdkNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQywySUFBb0Q7Z0JBRXBELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSw0QkFBNEIsQ0FBQztxQkFDMUQ7aUJBQ0Y7O2FBQ0Y7Ozs7WUFoQlEsYUFBYSx1QkEyQlAsUUFBUSxZQUFJLFFBQVE7WUExQjFCLGNBQWM7WUFGSyxVQUFVO1lBQVMsU0FBUzs7OzBCQW1CckQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyLCBmb3J3YXJkUmVmLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZvciBIb3Jpem9udGFsIGxpbmUgKEhSKSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtaG9yaXpvbnRhbC1zZXBhcmF0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9yaXpvbnRhbC1zZXBhcmF0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob3Jpem9udGFsLXNlcGFyYXRvci5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+SG9yaXpvbnRhbFNlcGFyYXRvckNvbXBvbmVudClcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgSG9yaXpvbnRhbFNlcGFyYXRvckNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBib3JkZXJDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBCYXNlQ29tcG9uZW50LCBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUgbWV0aG9kXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIHRvSnNvbigpIHtcbiAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcbiAgICB0aGlzLnNldEpzb24oanNvbiwgXCJib3JkZXJDb2xvclwiLCB0aGlzLmJvcmRlckNvbG9yKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbn1cbiJdfQ==